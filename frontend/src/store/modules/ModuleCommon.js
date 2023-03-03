export default {
  namespaced: true,
  state: {
    section: {
      value: '',
      version: 0,
    },
    isConfigsVisible: false,
  },
  mutations: {
    SET_SECTION(state, value) {
      state.section.value = value;
      state.section.version++;
    },

    TOGGLE_IS_CONFIGS_VISIBLE(state) {
      state.isConfigsVisible = !state.isConfigsVisible;
    },
  },
  actions: {
    setSection({ commit }, value) {
      commit('SET_SECTION', value);
    },

    toggleIsConfigsVisible({ commit }) {
      commit('TOGGLE_IS_CONFIGS_VISIBLE');
    },
  },
};
