const axios = require('axios');
const cheerio = require('cheerio');
var Promise = require('bluebird');

// 获取豆瓣租房列表页信息
function fetchSingleDoubanList(start) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`)
      .then(res => {
        let htmlText = res.data;

        const $ = cheerio.load(htmlText);
        const rs = $('a[title]');
        const resultList = [];

        // 提取列表页中每项的标题和链接
        for (let i = 0; i < rs.length; i++) {
          resultList.push({
            title: rs.eq(i).attr('title'),
            url: rs.eq(i).attr('href')
          })
        }

        resolve(resultList);
      })
      .catch(err => {
        reject(err);
      });
  })
}

// 获取豆瓣租房详情页信息
function fetchSingleDoubanTopic(url) {
  axios.get(url)
    .then(res => {
      let htmlText = res.data;

      const $ = cheerio.load(htmlText);
      const ps = $('.topic-content > p');
      const topicPics = $('.topic-content > img');
      const details = [];
      const pics = [];

      // 提取详情页中的描述文字
      for (let i = 0; i < ps.length; i++) {
        details.push(ps.eq(i).text());
      }

      // 提取详情页中的展示图片
      for (let i = 0; i < topicPics.length; i++) {
        pics.push(topicPics.eq(i).attr('src'));
      }

      return {
        details,
        pics
      }
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = {
  fetchSingleDoubanList,
  fetchSingleDoubanTopic
}
