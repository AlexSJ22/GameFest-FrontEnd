import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesView.vue'),
      children: [
        {
          path: '/games/:id(\\d+)',
          name: 'game-detail',
          component: () => import('@/views/GameDetail.vue'),
          props: true,
          meta: { skipTransition: true }
        }
      ]
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      children: [
        {
          path: '/events/:id(\\d+)',
          name: 'event-detail',
          component: () => import('@/views/EventDetail.vue'),
          meta: { skipTransition: true },
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/events/create',
      name: 'create-event',
      component: () => import('../views/CreateEventView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/404',
      name: 'Not-Found',
      component: () => import('../views/404.vue'),
      meta: { hideHeader: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/games/:id(\\d+)',
      redirect: '/404'
    },
    {
      path: '/MyEvents',
      name: 'my-events',
      component: () => import('../views/MyEventsView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.loading) {
    await authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'home' })
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    return next({ name: 'home' })
  }

  next()
})


export default router