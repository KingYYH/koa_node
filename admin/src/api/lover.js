import fetch from './fetch';

export default {
  // 恋人
  create(params) {
    return fetch.post('/lover/create', params)
  }
}
