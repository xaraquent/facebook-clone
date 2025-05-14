import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/loginview.vue';
import homeview from './views/homeview.vue';
import homepageView from './views/homepageView.vue';
import createAccountView from './views/createAccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepageView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/users',
      name: 'createaccount',
      component: createAccountView,
    },
    {
      path: '/homeview/:userid',
      name: 'homeview',
      component: homeview,
    },
  ],
});

export default router;
