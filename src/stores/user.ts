import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/ApiClient'
import { getUserProfile, type UserProfile } from '@/services/UserService'

export interface User {
  id: string
  username: string
  bio: string
  website: string
  createdDate: string
  following: string[]
  followers: string[]
  likedPosts: string[]
}

export interface UpdateUserDetails {
  id: string
  username: string
  bio: string
  website: string
  createdDate: string
}

export const useUserStore = defineStore('user', () => {

  const user = ref<User>()
  const userProfile = ref<UserProfile>()

  async function followUser(username: string) {
    try {
      await apiClient.post('/user/follow/' + username)
    } catch (error) {
      console.error('Failed to follow user:', error)
    }
  }

  async function unfollowUser(username: string) {
    try {
      await apiClient.post('/user/unfollow/' + username)
    } catch (error) {
      console.error('Failed to follow user:', error)
    }
  }

  async function loadUserByUsername(username: string) {
    try {
      const response = await apiClient.post('/user/find', { username })
      user.value = response.data[0]
    } catch (error) {
      console.error('Failed to load app config:', error)
    }
  }

  async function loadUsersByIds(ids: string[]) {
    try {
      const response = await apiClient.post('/user/find', { userIds: ids })
      return response.data
    } catch (error) {
      console.error('Failed to load users by ids:', error)
    }
  }

  async function loadUserProfile() {
    try {
      userProfile.value = await getUserProfile()
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  return { user, userProfile, loadUserByUsername, loadUsersByIds, followUser, unfollowUser, loadUserProfile }
})
