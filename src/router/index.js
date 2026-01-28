import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
          path: ':id',
          name: 'game-detail',
          component: () => import('../views/GameDetail.vue'),
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
          path: ':id',
          name: 'event-detail',
          component: () => import('../views/EventDetail.vue'),
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
      component: () => import('../views/CreateEventView.vue')
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
}


  ],
})

export default router
