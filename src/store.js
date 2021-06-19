import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
  },
  actions: {
    logInChange({ commit }, value) {
      commit("changeLogInStatus", value);
    },
  },
  mutations: {
    changeLogInStatus(state, value) {
      state.isLogged = value;
    },
  },
});
