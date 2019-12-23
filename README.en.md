#koa_node_mini_program
#（一）描述
这个项目是基于node.js koa2 + 小程序+ vue实战开发的一个项目，项目对koa2进行二次封装，可适用于多端开发的restful api，本项目只列举了小程序和简单的管理后台系统，更多的功能需求可以后期完善，或者伙伴自我探索

#相关技术
koa2 koa koa-router sequelize mysql miniprogram vue

#（二）服务端项目功能
用户与权限控制接口
文章管理接口
收藏接口
点赞接口
#（三）后台管理项目功能
恋人信息管理
#（四）优势/特点
精简的koa2进行二次封装，包含权限，状态等
前后端分离，前端后端一把梭
#（五）如何学习
1.克隆项目 首先把项目克隆下来

git clone https://github.com/KingYYH/koa_node.git
2.配置node环境，安装mysql环境，我使用的是xampp，Navicat for MySQL，请自行选择合适的 创建数据库，在项目中找到config/config修改自己的数据库信息，本项目没用配置数据库密码。 修改自己的appid和appsecret。

#进入根目录安装依赖，nodemon #cnpm i #启动项目 nodemon app.js
4.cd admin

cnpm i npm run serve
5.小程序开发者工具打开web

#（六）疑问
有问题可以提Issues，本项目是通过视频学习和参考伙伴的，样式什么的写的都很随意，有些是拷贝过来的
