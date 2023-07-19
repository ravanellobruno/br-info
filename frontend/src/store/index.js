import Vue from 'vue';
import Vuex from 'vuex';

import common from '@/store/modules/common.js';
import user from '@/store/modules/user.js';
import data from '@/store/modules/data.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { common, user, data },
});
