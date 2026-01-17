<template>
  <div class="flex min-h-[calc(100vh-60px)] items-center justify-center bg-white px-4">

    <div v-show="!isAuthenticated" class="w-full max-w-sm">
      <h2 class="text-xl font-bold mb-10">Welcome back</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Sign In
        </button>

        <div class="flex items-center justify-between">
          <a href="#" class="text-sm text-gray-900 hover:text-yellow-600">Create account</a>
          <a href="#" class="text-sm text-gray-900 hover:text-yellow-600">Forgot password?</a>
        </div>
      </form>
    </div>

  </div>
</template>


<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'LoginComponent',
  components: {
  },
  setup() {
    const store = useAuthStore()
    const isAuthenticated = computed(() => store.isAuthenticated)
    const username = computed(() => store.loggedInUser?.username)

    const form = reactive({
      email: '',
      password: ''
    })

    const handleSubmit = async () => {
      // TODO: Implement login API call
      console.log('Login submitted:', form.email)
    }

    return {
      isAuthenticated,
      username,
      form,
      handleSubmit
    }
  }
})
</script>

<style scoped>


</style>
