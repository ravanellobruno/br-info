export default {
  namespaced: true,
  state: {
    timer: null,
    dataLoad: 0,
  },
  mutations: {
    LOAD_DATA(state) {
      clearInterval(state.timer);
      state.dataLoad++;

      state.timer = setInterval(() => {
        state.dataLoad++;
      }, 300000);
    },
  },
  actions: {
    loadData({ commit }) {
      commit('LOAD_DATA');
    },
  },
};
