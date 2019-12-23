import lover from '../../api/lover'

const state = {
}

const mutations = {

}

const actions = {
  // 创建恋人信息
  createLover({state, commit}, params) {
    return lover.create(params);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
