
const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')

const {NotFound} = require('../../core/http-exception')
const moment = require('moment')


class Article extends Model {
  // 获取列表
  static async list(page_no, uid) {
    const { Favor } = require('./favor')
    // scope 作用域  在db中配置
    const article = await Article.scope('pw').findAndCountAll({
      page_no,
      limit: 10,
      offset: (page_no - 1) * 10,
      where: {
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
    article.rows.forEach((art)=>{
      ids.push(art.article_id)
    })
    const favors = await Favor.findAll({
      where:{
        article_id:{
          [Op.in]:ids,
        },
        uid
      },
      group:['article_id'],
      attributes:['article_id', [Sequelize.fn('COUNT','*'),'count']]
    })
    article.rows.forEach(art=>{
      Article._getEachArticleStatus(art, favors)
    })
    return {
      data: article.rows,
      meta: {
        page_no: parseInt(page_no),
        page_size: 10,
        total: parseInt(article.count),
        total_pages: Math.ceil(article.count / 10)
      }
    }    
  }

  
  static _getEachArticleStatus(art, favors){
    let status = 0
    favors.forEach(favor=>{
      if(art.article_id === favor.article_id){
        status = 1
      }
    })
    art.setDataValue('status', status)
    return art
  }

  static async getData(article_id) {
    let art = null
    const finder = {
      where: {
        article_id
      }
    }
    art = await Article.findOne(finder)
    return art
  }
}


Article.init({
  article_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listentype: {
    type: Sequelize.STRING(128)
  },
  listenval: {
    type: Sequelize.STRING(128)
  },
  col_nums: {
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  fav_nums: {
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
},{
  sequelize,
  tableName: 'article'
})


module.exports = {
  Article
}