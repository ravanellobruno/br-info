import defaultPreferences from '@/defaultData/userPreferences';

export default {
  namespaced: true,
  state: {
    preferences: localStorage.getItem('brInfPreferences')
      ? JSON.parse(localStorage.getItem('brInfPreferences'))
      : defaultPreferences,
  },
  mutations: {
    SET_PREFERENCES(state, preferences) {
      localStorage.setItem('brInfPreferences', preferences);
      state.preferences = JSON.parse(localStorage.getItem('brInfPreferences'));
    },
  },
  actions: {
    setPreferences({ commit }, preferences) {
      commit('SET_PREFERENCES', preferences);
    },
  },
};
