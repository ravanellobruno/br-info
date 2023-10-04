import Vue from 'vue';
import Vuex from 'vuex';

import common from '@/store/modules/common';
import user from '@/store/modules/user';
import data from '@/store/modules/data';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { common, user, data },
});
