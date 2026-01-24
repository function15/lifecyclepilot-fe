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
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="newEmail" type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
            <input v-model="newPassword" type="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Leave blank to keep current password" />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Leave blank to keep current password" />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update
            </button>
          </div>
        </form>
        <div v-if="message" :class="['mt-4', errorMessage ? 'text-red-500' : 'text-green-500']">
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
    const email = computed(() => user.value?.email)

    const newEmail = ref(email.value || '')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const message = ref('')
    const errorMessage = ref(false)

    // Watch for changes in email and update accordingly
    watch(email, (newVal) => {
      newEmail.value = newVal || ''
    })

    const updateProfile = async () => {
      errorMessage.value = false
      message.value = ''

      // Validate password if provided
      if (newPassword.value || confirmPassword.value) {
        if (newPassword.value !== confirmPassword.value) {
          errorMessage.value = true
          message.value = 'Passwords do not match!'
          return
        }
        if (newPassword.value.length < 6) {
          errorMessage.value = true
          message.value = 'Password must be at least 6 characters!'
          return
        }
      }

      try {
        if (user.value) {
          await store.updateUser({
            id: user.value.id,
            email: newEmail.value,
            password: newPassword.value || undefined,
            bio: user.value.bio,
            website: '',
            createdDate: ''
          })
          message.value = 'Profile updated successfully!'
          newPassword.value = ''
          confirmPassword.value = ''
          console.log('Updated profile:', newEmail.value)
        }
      } catch (error) {
        errorMessage.value = true
        message.value = 'Failed to update profile!'
        console.error('Failed to update profile:', error)
      }
    }

    return {
      newEmail,
      newPassword,
      confirmPassword,
      updateProfile,
      message,
      errorMessage
    }
  },
});
</script>