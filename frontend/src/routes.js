import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/loginview.vue';
import homeview from './views/homeview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: homeview,
    },
  ],
});

export default router;
