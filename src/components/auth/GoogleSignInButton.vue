<template>
  <div id="googleSignInDiv"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { callAuthCallback } from '@/services/Auth'
import { useAuthStore } from '@/stores/auth'

interface GoogleCredentialResponse {
  credential: string;
}

export default defineComponent({
  name: 'GoogleSignInButton',
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
          document.getElementById('googleSignInDiv'),
          {
            theme: 'outline',
            size: 'large'
          }
        )
      } else {
        setTimeout(checkGoogleAPI, 100)
      }
    }

    checkGoogleAPI()
  },
  methods: {
    async handleCredentialResponse(response: GoogleCredentialResponse) {
      const authResponse = await callAuthCallback(response.credential)
      const store = useAuthStore()
      await store.login(authResponse.data.token)

      this.$router.push('/tracking')
    }
  }
})
</script>
