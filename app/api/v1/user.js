

const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/user'
})

const {Resolve} = require('../../lib/helper')
const res = new Resolve();
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')


router.post('/register', async(ctx, next)=>{
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  }
  await User.create(user)
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('注册成功');
})

module.exports = router