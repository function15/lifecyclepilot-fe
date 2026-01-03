import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/ApiClient'
import type { UpdateUserDetails, User } from '@/stores/user'

export const useAuthStore = defineStore('auth', () => {

  const isAuthenticated = ref(!!localStorage.getItem('authToken'))
  const loggedInUser = ref<User>()

  async function login(authToken: string) {
    try {
      localStorage.setItem('authToken', authToken)
      // call loadUser
      await loadLoggedInUser()
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  async function loadLoggedInUser() {
    try {
      const response = await apiClient.get('/auth')
      isAuthenticated.value = !!response.data?.id;
      loggedInUser.value = response.data;
    } catch (error) {
      console.error('Failed to load app config:', error)
    }
  }

  async function updateUser(updatedUser: UpdateUserDetails) {
    try {
      const response = await apiClient.put('/auth', updatedUser)
      loggedInUser.value = response.data
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  // logout
  function logout() {
    try {
      console.log('Logging out...')
      localStorage.removeItem('authToken')
      isAuthenticated.value = false
      loggedInUser.value = undefined
      console.log('Logout successful')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }
  return { isAuthenticated, loggedInUser, login, logout, loadLoggedInUser, updateUser }
})
