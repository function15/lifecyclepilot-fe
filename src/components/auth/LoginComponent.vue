<template>
  <div class="bg-white p-4 flex-1 mb-4 md:mb-0">

    <div v-show="!isAuthenticated">
      <h2 class="text-xl font-bold mb-2">New to ATJ?</h2>
      <p>Sign up to get your own personalized timeline!</p>
      <div id="googleSignInDiv"></div>
    </div>

  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from 'vue'
import { callAuthCallback } from '@/services/Auth'
import { useAuthStore } from '@/stores/auth'

interface GoogleCredentialResponse {
  credential: string;
}

export default defineComponent({
  name: 'LoginComponent',
  components: {},
  mounted() {

    const checkGoogleAPI = () => {
      // @ts-expect-error - Google API
      if (window.google && window.google.accounts) {
        // @ts-expect-error - Google API
        window.google.accounts.id.initialize({
          client_id: '859579614230-762s4l5pv3unidsd2npiagjqlhvj261a.apps.googleusercontent.com',
          callback: this.handleCredentialResponse
        })

        // @ts-expect-error - Google API
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'), // Your button container
          {
            theme: 'outline',
            size: 'large'
          } // Customization options
        )
      } else {
        setTimeout(checkGoogleAPI, 100) // Check again after 100ms
      }
    }

    checkGoogleAPI()
  },
  methods: {
    async handleCredentialResponse(response: GoogleCredentialResponse) {
      const authResponse = await callAuthCallback(response.credential)
      const store = useAuthStore()
      await store.login(authResponse.data.token)

      // redirect to tracking page
      this.$router.push('/tracking')
    }
  },

  setup() {
    const store = useAuthStore()
    const isAuthenticated = computed(() => store.isAuthenticated)
    const username = computed(() => store.loggedInUser?.username)

    return {
      isAuthenticated,
      username,
    }
  }
})
</script>

<style scoped>


</style>
