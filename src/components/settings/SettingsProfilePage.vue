<template>
  <div class="min-h-full">
    <main>
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Profile settings</h1>
          </div>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input v-model="newUsername" type="text" id="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea v-model="newBio" id="bio" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <div class="mb-4">
            <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
            <input v-model="newWebsite" type="text" id="website" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update
            </button>
          </div>
        </form>
        <div v-if="message" class="mt-4 text-green-500">
          {{ message }}
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'SettingsProfilePage',
  components: {},
  setup() {
    const store = useAuthStore()
    const user = computed(() => store.loggedInUser)
    const username = computed(() => user.value?.username)
    const bio = computed(() => user.value?.bio)
    const website = computed(() => user.value?.website)

    const newUsername = ref(username.value || '')
    const newBio = ref(bio.value || '')
    const newWebsite = ref(website.value || '')
    const message = ref('')

    // Watch for changes in the username, bio, website, and createdDate and update accordingly
    watch(username, (newVal) => {
      newUsername.value = newVal || ''
    })
    watch(bio, (newVal) => {
      newBio.value = newVal || ''
    })
    watch(website, (newVal) => {
      newWebsite.value = newVal || ''
    })

    const updateProfile = async () => {
      try {
        if (user.value) {
          await store.updateUser({
            id: user.value.id,
            username: newUsername.value,
            bio: newBio.value,
            website: newWebsite.value,
            createdDate: ''
          })
          message.value = 'Profile updated successfully!'
          console.log('Updated profile:', newUsername.value, newBio.value, newWebsite.value)
        }
      } catch (error) {
        message.value = 'Failed to update profile!'
        console.error('Failed to update profile:', error)
      }
    }

    return {
      newUsername,
      newBio,
      newWebsite,
      updateProfile,
      message
    }
  },
});
</script>