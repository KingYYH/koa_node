const Router = require('koa-router');

const {TokenValidator, NotEmptyValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {ParameterException} = require('../../../core/http-exception')

const {generateToken} = require('../../../core/util')

const { Auth } = require('../../../middlewares/auth')

const { WXManager } = require('../../services/wx')
const router = new Router({
  prefix: '/v1/token'
})


const {User} = require('../../models/user')

router.post('/', async (ctx, next)=>{
  const v = await new TokenValidator().validate(ctx)

  let token;

  switch(v.get('body.type')) {
    case LoginType.USER_EMAIL:
        token = await emailLogin(v.get('body.account'),v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new ParameterException('没有相应的处理函数')
  }
  ctx.body= {
    token
  }
})

  router.post('/verify', async (ctx, next)=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result =  Auth.verifyToken(v.get('body.token'))
    ctx.body = {
      result
    }
  })


async function emailLogin(account,secret) {
  const user = await User.verifyEmailPassword(account,secret)
  return token = generateToken(user.id, 2)
}


module.exports = router