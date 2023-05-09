export default {
  namespaced: true,
  state: {
    isConfigsVisible: false,
    homePageKey: 0,
  },
  mutations: {
    TOGGLE_IS_CONFIGS_VISIBLE(state) {
      state.isConfigsVisible = !state.isConfigsVisible;
    },

    REFRESH_HOME_PAGE(state) {
      state.homePageKey++;
    },
  },
  actions: {
    toggleIsConfigsVisible({ commit }) {
      commit('TOGGLE_IS_CONFIGS_VISIBLE');
    },

    refreshHomePage({ commit }) {
      commit('REFRESH_HOME_PAGE');
    },
  },
};
