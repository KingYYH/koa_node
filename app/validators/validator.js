const {LinValidator, Rule} = require('../../core/lin-validator-v2')

const {User} = require('../models/user')
const {LoginType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super()
      this.id = [
          new Rule('isInt', '需要是正整数', {
              min: 1
          }),
      ]
  }
  
}

class AdminLoginValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 22
      })
    ]
  }
}

class LoverValidator extends LinValidator {
  constructor() {
    super();
    this.name = [
      new Rule('isLength', '姓名不能为空',{
        min: 1
      })
    ]
    this.age = [
      new Rule('isInt', '请输入年龄', {
        min: 1
      })
    ]
    this.constellation = [
      new Rule('isLength', '请输入星座', {
        min: 1
      })
    ]
    this.motto = [
      new Rule('isLength', '请输入座右铭', {
        min: 1
      })
    ]
    this.sex = [
      new Rule('isLength', '请输入性别', {
        min: 1
      })
    ]
    this.intro = [
      new Rule('isLength', '请输入介绍', {
        min: 1
      })
    ]
  }
}

class CheckLoverValidator extends LinValidator {
  constructor() {
    super();
    this.sex = [
      new Rule('isLength', '请传入性别',{
        min: 1
      })
    ]
  }
}




class RegisterValidator extends LinValidator{
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6位字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范',`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]`)
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '密码至少4位字符，最多32个字符', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(vals){
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where:{
        email
      }
    })

    if (user) {
      throw new Error('email已经存在')
    }
  }
}



class TokenValidator extends LinValidator{
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数')
    }

    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }

  }
}


class NotEmptyValidator extends LinValidator{
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 1
      })
    ]
  }

}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  AdminLoginValidator,
  LoverValidator,
  CheckLoverValidator
}