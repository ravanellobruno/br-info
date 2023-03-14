export default {
  namespaced: true,
  state: {
    isConfigsVisible: false,
  },
  mutations: {
    TOGGLE_IS_CONFIGS_VISIBLE(state) {
      state.isConfigsVisible = !state.isConfigsVisible;
    },
  },
  actions: {
    toggleIsConfigsVisible({ commit }) {
      commit('TOGGLE_IS_CONFIGS_VISIBLE');
    },
  },
};
