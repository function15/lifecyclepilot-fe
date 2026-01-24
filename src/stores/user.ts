import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserProfile, type UserProfile } from '@/services/UserService'

export interface User {
  id: string
  email: string
  bio: string
  website: string
  createdDate: string
  following: string[]
  followers: string[]
  likedPosts: string[]
}

export interface UpdateUserDetails {
  id: string
  email: string
  password?: string
  bio: string
  website: string
  createdDate: string
}

export const useUserStore = defineStore('user', () => {

  const user = ref<User>()
  const userProfile = ref<UserProfile>()

  async function loadUserProfile() {
    try {
      userProfile.value = await getUserProfile()
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  return { user, userProfile, loadUserProfile }
})
