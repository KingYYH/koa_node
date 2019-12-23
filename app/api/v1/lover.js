

const Router = require('koa-router');
const {Auth} = require('../../../middlewares/auth');
const {Resolve} = require('../../lib/helper')

const {LoverValidator, CheckLoverValidator} = require('../../validators/validator')
const res = new Resolve();
const router = new Router({
  prefix: '/v1/lover'
})


const {Lover} = require('../../models/lover')


router.post('/create', new Auth().m, async(ctx, next)=>{
  const v = await new LoverValidator().validate(ctx)
  let hobbies = v.get('body.hobbies').join(',')
  let lover = {
    name: v.get('body.name'),
    constellation: v.get('body.constellation'),
    age: v.get('body.age'),
    motto: v.get('body.motto'),
    sex: v.get('body.sex'),
    hobbies: hobbies,
    intro: v.get('body.intro'),
  }
  await Lover.create(lover);
  ctx.response.status = 200;
  ctx.body = res.success('创建成功');
 })



 router.post('/list', new Auth().m, async(ctx, next)=>{
  const v = await new CheckLoverValidator().validate(ctx)
  const sex = v.get('body.sex')
  let lover = await Lover.list(sex)
  ctx.response.status = 200;
  ctx.body = res.json(lover);
 })

module.exports = router