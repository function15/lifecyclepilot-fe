<template>
  <div class="flex min-h-[calc(100vh-60px)] items-center justify-center bg-white px-4">
    <div class="w-full max-w-sm">
      <h2 class="text-xl font-bold mb-10">Create your account</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Error message -->
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :disabled="isLoading"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            minlength="8"
            :disabled="isLoading"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            :disabled="isLoading"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>

        <div class="text-center">
          <router-link :to="{ name: 'login' }" class="text-sm text-gray-900 hover:text-yellow-600">
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterComponent',
  setup() {
    const store = useAuthStore()
    const router = useRouter()
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    const form = reactive({
      email: '',
      password: '',
      confirmPassword: ''
    })

    const handleSubmit = async () => {
      error.value = null

      // Validate passwords match
      if (form.password !== form.confirmPassword) {
        error.value = 'Passwords do not match'
        return
      }

      // Validate password length
      if (form.password.length < 8) {
        error.value = 'Password must be at least 8 characters'
        return
      }

      isLoading.value = true

      try {
        await store.register({
          email: form.email,
          password: form.password
        })
        // Redirect to dashboard after successful registration
        router.push({ name: 'dashboard' })
      } catch (err: any) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.'
        console.error('Registration error:', err)
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      handleSubmit,
      error,
      isLoading
    }
  }
})
</script>

<style scoped>
</style>
