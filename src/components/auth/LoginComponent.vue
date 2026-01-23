<template>
  <div class="flex min-h-[calc(100vh-60px)] items-center justify-center bg-white px-4">
    <div class="w-full max-w-sm">
      <h2 class="text-xl font-bold mb-10">Welcome back</h2>

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
            :disabled="isLoading"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>

        <div class="flex items-center justify-between">
          <router-link :to="{ name: 'register' }" class="text-sm text-gray-900 hover:text-yellow-600">
            Create account
          </router-link>
          <a href="#" class="text-sm text-gray-900 hover:text-yellow-600">Forgot password?</a>
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
  name: 'LoginComponent',
  components: {
  },
  setup() {
    const store = useAuthStore()
    const router = useRouter()
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    const form = reactive({
      email: '',
      password: ''
    })

    const handleSubmit = async () => {
      error.value = null
      isLoading.value = true

      try {
        await store.login(form.email, form.password)
        // Redirect to Cancellation Flows after successful login
        router.push({ name: 'dashboard' })
      } catch (err: unknown) {
        const errorMessage = err instanceof Error && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data ? String(err.response.data.message) : 'Invalid email or password'
        error.value = errorMessage
        console.error('Login error:', err)
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
