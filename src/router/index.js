import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stock',
      name: 'stock',

      component: () => import('../views/StocksPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/staff',
      name: 'staff',

      component: () => import('../views/StaffPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/patients',
      name: 'patients',

      component: () => import('../views/PatientsPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/patient/:id',
      name: 'patient',

      component: () => import('../views/PatientDetailPage.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/register',
      name: 'register',

      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',

      component: () => import('../views/ForgotPasswordPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('clinicsyncAuthenticated')) {
      next('/login')
    }
    return next()
  } else {
    next()
  }
})
export default router
