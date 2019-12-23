import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import admin from './modules/admin'
import lover from './modules/lover'

Vue.use(Vuex);

const state = {
  picture_modal: {
    picture: null,
    modal: false
  },
}

const mutations = {
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    admin,
    lover
  }
});
