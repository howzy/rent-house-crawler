require('./services/mongo');
const Topic = require('./models/topic');
const crawler = require('./services/crawler');

for (let i = 0; i < 100; i += 25) {
  crawler.fetchSingleDoubanList(i)
    .then(res => {
      for (let j = 0; j < res.length; j++) {
        Topic.create(res[j])
          .then(r => {
            // console.log(r);
          })
          .catch(e => {
            // console.log(e);
            // if (e.message.match('E11000 duplicate key')) {
            //  console.log('重复数据');
            // }
          })
      }
      // console.log(res);
    })
}
