const {LinValidator, Rule} = require('../../core/lin-validator-v2')

class ArticleValidator extends LinValidator {
  constructor() {
      super()
      this.listentype = [
          new Rule('isInt', '文章类型不能为空', {
              min: 1
          }),
      ]
      this.listenval = [
        new Rule('isLength', '文章内容不能为空', {
            min: 1
        }),
    ]
  }
}

class ArticleListValidator extends LinValidator {
  constructor() {
      super()
      this.page_no = [
          new Rule('isInt', '请传递页数', {
              min: 1
          }),
      ]
  }
}

class FlowListValidator extends LinValidator {
  constructor() {
      super()
      this.page_no = [
          new Rule('isInt', '请传递页数', {
              min: 1
          }),
      ]
  }
}

class AddZanValidator extends LinValidator {
  constructor() {
    super()
  }
}


module.exports = {
  ArticleValidator,
  ArticleListValidator,
  AddZanValidator,
  FlowListValidator
}