豆瓣租房信息爬虫
------------

实现功能：获取豆瓣租房信息，根据目标关键词过滤租房信息，存入本地数据库，并将过滤后的信息邮件发送至指定邮箱。

## 开发环境

- node v6.10.3
- MongoDB v3.4.4
- Mongoose v4.11.4

## 准备

- 搭建 NodeJs 环境
- 安装并配置 Mongodb 数据库
- 邮箱开启 [POP3/SMTP](http://jingyan.baidu.com/article/4f7d5712b1ac7c1a201927da.html) 服务

## 开始

```
git clone https://github.com/zhonce/rent-house-crawler.git

npm install

npm start
```

## 后记

还处在完善阶段，目前也存在一些不足的地方，例如 QQ 邮件中抓取的豆瓣租房详情图片，通过外链的方式无法展现，折腾了一下午也没能解决，待日后再来完善吧。
