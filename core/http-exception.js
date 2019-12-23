class HttpException extends Error {
  constructor(msg='服务器异常', errorCode=10000, code=400) {
    super()
    this.errorCode = errorCode
    this.code = code,
    this.msg = msg
  }
}


class ExistAdmin extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 412
    this.msg = msg || '账号已存在'
    this.errorCode = errorCode || 10005
  }
}

class ExistLover extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 413
    this.msg = msg || '角色不存在'
    this.errorCode = errorCode || 10009
  }
}


class AuthAdminFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 411
    this.msg = msg || '账号不存在或者密码不正确'
    this.errorCode = errorCode || 10007
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class Success extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

class NoteFound extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 404
    this.msg = msg || '资源没找到'
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}


class LikeError extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 400
    this.msg = msg || '你已经点赞过了'
    this.errorCode = errorCode || 60001
  }
}

class CollectError extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 400
    this.msg = msg || '收藏失败'
    this.errorCode = errorCode || 60003
  }
}


class DisLikeError extends HttpException {
  constructor(msg, errorCode){
    super()
    this.code = 400
    this.msg = msg || '你已取消点赞'
    this.errorCode = errorCode || 60002
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NoteFound,
  AuthFailed,
  Forbbiden,
  DisLikeError,
  LikeError,
  CollectError,
  ExistAdmin,
  AuthAdminFailed,
  ExistLover
}