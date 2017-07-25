const crawler = require('./services/crawler');

for (let i = 0; i < 100; i += 25) {
  crawler.fetchSingleDoubanList(i)
    .then(res => {
      console.log(res);
    })
}
