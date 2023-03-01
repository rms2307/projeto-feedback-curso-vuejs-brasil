import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/home/Home.vue')
const Feedback = () => import('@/views/feedback/Feedback.vue')
const Credencial = () => import('@/views/credencial/Credencial.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedbacks',
    name: 'Feedback',
    component: Feedback,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credencials',
    name: 'Credencial',
    component: Credencial,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
