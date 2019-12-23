const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db')

const {Sequelize, Model} = require('sequelize')

const { ExistAdmin, AuthAdminFailed, AuthFailed } = require('../../core/http-exception')

class Admin extends Model {

  static async create(ad) {
    const hasAdmin = await Admin.findOne({
      where: {
        email: ad.email,
        deleted_at: null
      }
    });

    if (hasAdmin) {
      throw new ExistAdmin('管理员已存在');
    }
    const admin = new Admin()
    admin.email = ad.email
    admin.password = ad.password
    admin.nickname = ad.nickname
    admin.save() 
  }

  static async verify(email, plainPassword) {
    const admin = await Admin.findOne({
      where: {
        email
      }
    })
    if (!admin ) {
      throw new AuthAdminFailed('账号不存在或者密码不正确')
    }
    const psw = bcrypt.compareSync(plainPassword, admin.password)
    if (!psw) {
      throw new AuthAdminFailed('账号不存在或者密码不正确')
    }
    return admin
  }

  static async adminInfo(id) {
    const admin = await Admin.findOne({
      where: {
        id
      }
    })
    if (!admin ) {
      throw new AuthFailed('用户不存在')
    }
    return admin
  }
  
  

}


Admin.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  }
},{
  sequelize,
  tableName: 'admin'
})


module.exports = {
  Admin
}