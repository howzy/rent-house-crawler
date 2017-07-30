require('./services/mongo');
const Topic = require('./models/topic');
const crawler = require('./services/crawler');
const target = '东站';

for (let i = 0; i < 100; i += 25) {
  crawler.fetchSingleDoubanList(i)
    .then(res => {
      for (let j = 0; j < res.length; j++) {
        Topic.create(res[j])
          .then(r => {
            if (isNear(r.title, target)) {
              crawler.fetchSingleDoubanTopic(r.url);
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

function isNear(location, target) {
  return location.indexOf(target) > -1;
}
