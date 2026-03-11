import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/page/NotFoundView.vue'
import SettingsView from '@/views/settings/SettingsView.vue'
import SettingsProfileView from '@/views/settings/SettingsProfileView.vue'
import LandingView from '@/views/page/LandingView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to) {
    if (to.name === 'disclaimer') {
      return { top: 0 }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/app/cancel',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/app/cancel/:flowId',
      name: 'cancellation-flow-detail',
      component: () => import('../views/CancellationFlowDetailView.vue')
    },
    {
      path: '/app/surveys',
      name: 'surveys',
      component: () => import('../views/SurveysView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/settings/profile',
      name: 'settings-profile',
      component: SettingsProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('../views/page/DisclaimerView.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/page/PrivacyPolicyView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

const publicRoutes = ['landing', 'login', 'register', 'disclaimer', 'terms-of-service', 'privacy-policy', '404']

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && !authStore.loggedInUser) {
    await authStore.loadLoggedInUser()
  }

  if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'dashboard' })
  } else if (!authStore.isAuthenticated && !publicRoutes.includes(to.name as string)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
