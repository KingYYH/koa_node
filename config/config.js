module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
  },
  security: {
    secretKey: "afsafasf",
    expiresIn: 60*60*24*30
  },
  wx: {
    appId: 'wx3b5d451c09a044a9',
    appSecret: '5a7e511342e8d838ed30c8c997406aee',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}