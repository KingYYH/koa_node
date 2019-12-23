import {Token} from '/models/token'
App({
  onLaunch: function () {
     const token = new Token()
     token.verify()
  }
})