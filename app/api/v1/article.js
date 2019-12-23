

const Router = require('koa-router');
const {Auth} = require('../../../middlewares/auth');
const {Resolve} = require('../../lib/helper')
const res = new Resolve();
const router = new Router({
  prefix: '/v1/article'
})

const AUTH_ADMIN = 16;

const {ArticleValidator, ArticleListValidator, AddZanValidator} = require('../../validators/article')
const {Article} = require('../../models/article')
const {Favor} = require('../../models/favor')

router.post('/',async(ctx, next)=>{
 const v = await new ArticleValidator().validate(ctx)
 // 创建文章
 const article = {
  listentype: v.get('body.listentype'),
  listenval: v.get('body.listenval')
}
 await Article.create(article);
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建文章成功');
})


router.post('/list', new Auth().m, async(ctx, next)=>{
  const v = await new ArticleListValidator().validate(ctx)

   // 获取文章列表
  const page_no = v.get('body.page_no')
  const articleList = await Article.list(page_no, ctx.auth.uid);
  ctx.response.status = 200;
  ctx.body = res.json(articleList);
 })

module.exports = router