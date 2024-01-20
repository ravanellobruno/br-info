export default {
  namespaced: true,
  state: {
    docTitle: document.title,
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

    scrollTo(context, value) {
      window.scrollTo(0, document.getElementById(value).offsetTop);
    },
  },
};
