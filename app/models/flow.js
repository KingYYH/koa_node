const {sequelize} = require('../../core/db')
const {Sequelize,Model, Op} = require('sequelize')

const {CollectError} = require('../../core/http-exception')
const {Article} = require('./article')
class Flow extends Model{
    static async collect(article_id, uid) {
        const flow = await Flow.findOne({
            where: {
              article_id,
              uid
            }
          })
          if (flow) {
            throw new CollectError();
          }
          return sequelize.transaction(async t => {
            await Flow.create({
              article_id,
              uid
            }, {
              transaction: t
            })
            const art = await Article.getData(article_id)
            await art.increment('col_nums', {
              by: 1,
              transaction: t
            })
          })
    }
    static async list(page_no, uid) {
        const flow = await Flow.scope('pw').findAll({
            page_no,
            limit: 10,
            offset: (page_no - 1) * 10,
            where: {
              uid,
              deleted_at: null
            },
            order: [
              // 'DESC' 为降序
              ['created_at', 'ASC']
            ],
            attributes: {
              exclude: ['updated_at']
            },
          })

          const ids = []
          flow.forEach((art)=>{
            ids.push(art.article_id)
          })
          const articles = await Article.findAll({
            where:{
              article_id:{
                [Op.in]:ids,
              }
            }
          })
          flow.forEach(flow=>{
            Flow._getEachArticleStatus(flow, articles)
          })

          return {
            data: flow,
            meta: {
              page_no: parseInt(page_no),
              page_size: 10,
              total: parseInt(flow.count),
              total_pages: Math.ceil(flow.count / 10)
            }
          }   
    }


    static _getEachArticleStatus(flow, articles){
      let status = 0
      let col_nums = 0
      let fav_nums = 0
      let listenval = ''
      let listentype = 0
      articles.forEach(art=>{
        if(flow.article_id === art.article_id){
          col_nums = art.col_nums
          fav_nums = art.fav_nums
          listenval = art.listenval
          listentype = art.listentype
        }
      })
      flow.setDataValue('status', status)
      flow.setDataValue('col_nums', col_nums)
      flow.setDataValue('fav_nums', fav_nums)
      flow.setDataValue('listentype', listentype)
      flow.setDataValue('listenval', listenval)
      return flow
    }
  
}

Flow.init({
    uid: Sequelize.INTEGER,
    article_id: Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}