<template>
  <div>
    <div class="user-details mb-4 p-4 flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold">@{{ username }}</h2>
        <p v-if="bio" class="text-gray-700">{{ bio }}</p>
        <a v-if="website" :href="website" class="text-blue-500" target="_blank">{{ website }}</a>
        <p v-if="createdDate" class="text-gray-400">🗓️ Joined {{ formattedDate }}</p>
        <div class="flex space-x-4">
          <router-link :to="{ name: 'following', params: { username: username } }" class="text-blue-500">{{ followingCount }} following</router-link>
          <router-link :to="{ name: 'followers', params: { username: username } }" class="text-blue-500">{{ followersCount }} followers</router-link>
        </div>
      </div>
      <FollowButton :user="user" />
    </div>
    <FeedComponent :posts="posts" :loading="loading"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Post, usePostStore } from '@/stores/post'
import FeedComponent from '@/components/feed/FeedComponet.vue'
import moment from 'moment'
import { type User, useUserStore } from '@/stores/user'
import FollowButton from '@/components/button/FollowButton.vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'UserPage',
  components: { FollowButton, FeedComponent },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const username = ref<string>((Array.isArray(route.params['username']) ? route.params['username'][0] : route.params['username']) as string || '')
    const postStore = usePostStore()
    const userStore = useUserStore()
    const authStore = useAuthStore()
    const loading = ref(true)
    const posts = ref<Post[]>([])
    const user = ref<User>()

    onMounted(async () => {
      if (!username.value) {
        router.push({ name: '404' })
        loading.value = false
        return
      }

      await postStore.fetchPostsByUsername(username.value)
      posts.value = postStore.posts

      // Check if viewing own profile
      const isOwnProfile = authStore.loggedInUser?.username === username.value

      if (isOwnProfile) {
        // Load detailed profile for logged-in user
        await userStore.loadUserProfile()
        // Map userProfile to user for display
        if (userStore.userProfile) {
          user.value = {
            id: userStore.userProfile.id,
            username: userStore.userProfile.username,
            bio: userStore.userProfile.bio || '',
            website: '',
            createdDate: '',
            following: [],
            followers: [],
            likedPosts: []
          }
        }
      } else {
        // Load public user profile for other users
        await userStore.loadUserByUsername(username.value)
        user.value = userStore.user
      }

      if (!user.value) {
        router.push({ name: '404' })
      }

      loading.value = false
    })

    const bio = computed(() => user.value?.bio || '')
    const website = computed(() => user.value?.website || '')
    const createdDate = computed(() => user.value?.createdDate || '')
    const formattedDate = computed(() => {
      return createdDate.value ? moment(createdDate.value).format('MMMM, YYYY') : ''
    })

    const followingCount = computed(() => user.value?.following.length || 0)
    const followersCount = computed(() => user.value?.followers.length || 0)

    return {
      username,
      posts,
      loading,
      bio,
      website,
      createdDate,
      formattedDate,
      followingCount,
      followersCount,
      user
    }
  }
})
</script>