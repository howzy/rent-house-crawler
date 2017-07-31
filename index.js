require('./services/mongo');
const Topic = require('./models/topic');
const crawler = require('./services/crawler');
const target = '东站';

for (let i = 0; i < 100; i += 25) {
  crawler.fetchSingleDoubanList(i)
    .then(topicList => {
      for (let j = 0; j < topicList.length; j++) {
        Topic.create(topicList[j])
          .then(r => {
            if (isNear(r.title, target)) {
              crawler.fetchSingleDoubanTopic(r.url)
                .then(singleTopic => {
                  Topic.update({ url: r.url }, { $set: { details: singleTopic.details, pics: singleTopic.pics } });
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

// 判断给定的位置中是否含有目标关键词
function isNear(location, target) {
  return location.indexOf(target) > -1;
}
