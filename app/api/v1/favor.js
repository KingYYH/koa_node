

const Router = require('koa-router');
const {Auth} = require('../../../middlewares/auth');
const {Resolve} = require('../../lib/helper')

const { Favor } = require('../../models/favor')
const { Flow } = require('../../models/flow')
const res = new Resolve();
const router = new Router({
  prefix: '/v1/favor'
})

const {AddZanValidator, FlowListValidator} = require('../../validators/article')
const {Article} = require('../../models/article')


 router.post('/like', new Auth().m, async(ctx, next)=>{
  const v = await new AddZanValidator().validate(ctx)
  const article_id =  v.get('body.article_id')
  const uid =  ctx.auth.uid
  let aa = Article.getData(article_id)
  await Favor.like(article_id, uid);
  ctx.response.status = 200;
  ctx.body =  res.success('点赞成功');
 })



 router.post('/dislike', new Auth().m, async(ctx, next)=>{
  const v = await new AddZanValidator().validate(ctx)
  const article_id =  v.get('body.article_id')
  const uid =  ctx.auth.uid
  await Favor.dislike(article_id, uid);
  ctx.response.status = 200;
  ctx.body =  res.success('取消点赞成功');
 })



 router.post('/collect', new Auth().m, async(ctx, next)=>{
  const v = await new AddZanValidator().validate(ctx)
  const article_id =  v.get('body.article_id')
  const uid =  ctx.auth.uid
  await Flow.collect(article_id, uid);
  ctx.response.status = 200;
  ctx.body =  res.success('收藏成功');
 })


 router.post('/list', new Auth().m, async(ctx, next)=>{
  const v = await new FlowListValidator().validate(ctx)
   // 获取收藏列表
  const page_no = v.get('body.page_no')
  const flowList = await Flow.list(page_no, ctx.auth.uid);
  ctx.response.status = 200;
  ctx.body = res.json(flowList);
 })




module.exports = router