

const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/admin'
})

const {Resolve} = require('../../lib/helper')
const res = new Resolve();
const {AdminLoginValidator, RegisterValidator} = require('../../validators/validator')
const {Admin} = require('../../models/admin')
const {LoginManager} = require('../../services/admin')
const {Auth} = require('../../../middlewares/auth');



// 管理员注册
router.post('/register', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new RegisterValidator().validate(ctx);
  // 创建管理员
  const admin = {
    email:v.get('body.email'),
    password:v.get('body.password2'),
    nickname:v.get('body.nickname')
  }
  // 创建管理员
  await Admin.create(admin);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('注册成功');
})



router.post('/login', async(ctx, next)=>{
  const v = await new AdminLoginValidator().validate(ctx)

  const admin = {
    email: v.get('body.email'),
    password: v.get('body.password')
  }
  let token = await LoginManager.adminLogin(admin.email,admin.password )
    // 返回结果
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token
    }
})


// 获取用户信息
router.get('/auth', new Auth(16).m, async (ctx) => {

  // 获取用户ID
  const id = ctx.auth.uid;

  // 查询用户信息
  let userInfo = await Admin.adminInfo(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(userInfo)
})

module.exports = router