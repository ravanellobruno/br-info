import Vue from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
require('./assets/main.scss');

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
