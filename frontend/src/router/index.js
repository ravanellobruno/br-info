import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      title: 'Início',
      path: '/',
      component: HomePage,
      icon: 'mdi-home',
    },
    {
      name: 'sobre',
      title: 'Sobre',
      path: '/sobre',
      component: AboutPage,
      icon: 'mdi-information',
    },
    {
      name: 'contato',
      title: 'Contato',
      path: '/contato',
      component: ContactPage,
      icon: 'mdi-email',
    },
  ],
});
