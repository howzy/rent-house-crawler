require('./services/mongo');
const mailer = require('./services/mailer');
const Topic = require('./models/topic');
const crawler = require('./services/crawler');
const target = ['城西'];

function crawlerTopic() {
  for (let i = 0; i < 850; i += 25) {
    crawler.fetchSingleDoubanList(i)
      .then(topicList => {
        for (let j = 0; j < topicList.length; j++) {
          Topic.create(topicList[j])
            .then(r => {
              if (isNear(r.title, target)) {
                crawler.fetchSingleDoubanTopic(r.url)
                  .then(singleTopic => {
                    Topic.findOneAndUpdate({ url: r.url }, { $set: { createTime: singleTopic.createTime, details: singleTopic.details, pics: singleTopic.pics } }, { new: true })
                      .then(rr => {
                        mailer.sendMail(rr);
                      });
                  })
              }
            })
            .catch(e => {
              if (e.message.match('E11000 duplicate key')) {
                console.log('重复数据');
              }
            })
        }
      })
  }
}

var count = 0;
crawlerTopic();
setInterval(function () {
  crawlerTopic();
  console.log(++count);
}, 60000);

// 判断给定的位置中是否含有目标关键词
function isNear(location, target) {
  let patt = new RegExp(target.join('|'));
  return patt.test(location);
}
