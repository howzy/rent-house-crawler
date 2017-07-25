const axios = require('axios');
const cheerio = require('cheerio');

// 获取豆瓣租房列表页信息
function fetchSingleDoubanList(start) {
  axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`)
    .then(res => {
      // console.log(res);
      let htmlText = res.data;

      const $ = cheerio.load(htmlText);
      const rs = $('a[title]');
      const resultList = [];

      for (let i = 0; i < rs.length; i++) {
        resultList.push({
          title: rs.eq(i).attr('title'),
          url: rs.eq(i).attr('href')
        })
      }

      // console.log(resultList);
      return resultList;
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = {
  fetchSingDoubanList: fetchSingDoubanList
}
