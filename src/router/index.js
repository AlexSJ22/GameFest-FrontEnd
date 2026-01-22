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
      component: () => import('../views/GamesView.vue')
    },

    {
      path: '/games/:id',
      name: 'game-detail',
      component: () => import('../views/GameDetail.vue')
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
    }


  ],
})

export default router
