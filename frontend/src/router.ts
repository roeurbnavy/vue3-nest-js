import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  // Not Found
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('./pages/NotFound.vue'),
    meta: {
      title: 'Not Found',
      noCache: true
    }
  },
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
    meta: {
      authRequired: true
    }
  },
  { path: '/auth', name: 'Auth', component: () => import('./pages/Auth.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
