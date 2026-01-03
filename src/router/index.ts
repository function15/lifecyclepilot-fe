import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/page/NotFoundView.vue'
import SettingsView from '@/views/settings/SettingsView.vue'
import SettingsProfileView from '@/views/settings/SettingsProfileView.vue'
import LandingView from '@/views/page/LandingView.vue'

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
      path: '/tracking',
      name: 'trades',
      component: () => import('../views/TradesView.vue')
    },
    {
      path: '/tracking/feed',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tracking/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/:username',
      name: 'user',
      component: () => import('../views/user/UserView.vue')
    },
    {
      path: '/:username/following',
      name: 'following',
      component: () => import('../views/user/FollowingView.vue')
    },
    {
      path: '/:username/followers',
      name: 'followers',
      component: () => import('../views/user/FollowersView.vue')
    },
    {
      path: '/:username/:postId',
      name: 'post',
      component: () => import('../views/PostView.vue')
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
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/post',
      name: 'create-post',
      component: () => import('../views/CreatePostView.vue')
    },
    {
      path: '/hashtag/:hashtag',
      name: 'hashtag',
      component: () => import('../views/HashtagView.vue')
    },
    {
      path: '/stock/:stock',
      name: 'stock',
      component: () => import('../views/StockView.vue')
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: () => import('../views/StocksView.vue')
    },
    {
      path: '/tracking/trades',
      redirect: '/tracking'
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue')
    },
    {
      path: '/liked',
      name: 'liked',
      component: () => import('../views/LikedPostsView.vue')
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('../views/page/DisclaimerView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/page/AboutView.vue')
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

export default router
