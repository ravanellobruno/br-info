import Vue from 'vue';
import Vuex from 'vuex';

import ModuleCommon from '@/store/modules/ModuleCommon.js';
import ModuleUser from '@/store/modules/ModuleUser.js';
import ModuleData from '@/store/modules/ModuleData.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { ModuleCommon, ModuleUser, ModuleData },
});
