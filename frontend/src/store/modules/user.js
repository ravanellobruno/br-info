import defaultPreferences from '@/defaultData/userPreferences';

export default {
  namespaced: true,
  state: {
    preferences: localStorage.getItem('brInfPreferences')
      ? JSON.parse(localStorage.getItem('brInfPreferences'))
      : defaultPreferences,
  },
  mutations: {
    SET_PREFERENCES(state, data) {
      localStorage.setItem('brInfPreferences', data);
      state.preferences = JSON.parse(localStorage.getItem('brInfPreferences'));
    },
  },
  actions: {
    setPreferences({ commit }, data) {
      commit('SET_PREFERENCES', data);
    },
  },
};
