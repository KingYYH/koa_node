
const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

const {LikeError, DisLikeError} = require('../../core/http-exception')

const {Article} = require('./article')

class Favor extends Model {

  static async like(article_id, uid) {
    const favor = await Favor.findOne({
      where: {
        article_id,
        uid
      }
    })
    if (favor) {
      throw new LikeError();
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        article_id,
        uid
      }, {
        transaction: t
      })
      const art = await Article.getData(article_id)
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }


  static async dislike(article_id, uid) {
    const favor = await Favor.findOne({
      where: {
        article_id,
        uid
      }
    })
    if (!favor) {
      throw new DisLikeError();
    }
    return sequelize.transaction(async t => {
      await favor.destroy({
          force: true,
          transaction: t
      })
      const art = await Article.getData(article_id)
      await art.decrement('fav_nums', {
          by: 1,
          transaction: t
      })
  })
  }

}


Favor.init({
  uid: Sequelize.INTEGER,
  article_id: Sequelize.INTEGER
},{
  sequelize,
  tableName: 'favor'
})


module.exports = {
  Favor
}