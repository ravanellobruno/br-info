export default {
  namespaced: true,
  state: {
    appTitle: document.title,
    configsIsVisible: false,
    timer: null,
    dataLoad: 0,
  },
  mutations: {
    TOGGLE_CONFIGS_IS_VISIBLE(state) {
      state.configsIsVisible = !state.configsIsVisible;
    },

    LOAD_DATA(state) {
      clearInterval(state.timer);
      state.dataLoad++;

      state.timer = setInterval(() => {
        state.dataLoad++;
      }, 600000);
    },
  },
  actions: {
    toggleConfigsIsVisible({ commit }) {
      commit('TOGGLE_CONFIGS_IS_VISIBLE');
    },

    loadData({ commit }) {
      commit('LOAD_DATA');
    },
  },
};
