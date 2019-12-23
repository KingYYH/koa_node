import {
  HTTP
} from '../util/http-p.js'

class LoverModel extends HTTP {
  list(sex){
      return this.request({
          url: 'lover/list',
          method: 'post',
          data: {
            sex
          }
      })
  }
}

export {
  LoverModel
}