const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db')

const {Sequelize, Model} = require('sequelize')
const { ExistLover } = require('../../core/http-exception')

class Lover extends Model {
  static async list(sex) {
    let lover = await Lover.findOne({
      where: {
        sex
      },
      order: [
        // 'DESC' 为降序
        ['created_at', 'DESC']
      ],
    })

    if (!lover) {
      throw new ExistLover('角色不存在')
    }
    return lover
  }
}


Lover.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  age: Sequelize.STRING,
  constellation: Sequelize.STRING,
  motto: Sequelize.STRING,
  sex: Sequelize.STRING,
  hobbies: Sequelize.STRING,
  intro: Sequelize.STRING,
},{
  sequelize,
  tableName: 'lover'
})


module.exports = {
  Lover
}