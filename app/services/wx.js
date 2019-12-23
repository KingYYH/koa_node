const util = require('util')
const axios = require('axios')
const {AuthFailed} = require('../../core/http-exception')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')


class WXManager {
  static async codeToToken(code) {
    //code  appid appsecret
    const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFailed('openId获取失败')
    }
    const errCode = result.data.errcode
    const errMsg = result.data.errmsg
    if (errCode) {
      throw new AuthFailed('openId获取失败' + errMsg)
    }

    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
  
}

module.exports = {
  WXManager
}