<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="text-center lg:text-left">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">About Us</h1>
      <p class="mt-4 text-lg text-gray-600">Learn more about our platform and mission</p>
    </div>

    <nav class="" aria-label="Footer">
      <div v-for="item in navigation" :key="item.name" class="pb-6">
        <template v-if="item.external">
          <a :href="item.to" target="_blank" rel="noopener noreferrer" class="text-sm leading-6 text-gray-300 hover:text-white">
            {{ item.name }}
          </a>
        </template>
        <template v-else>
          <router-link type="a"
                       :class="[$route.name === item.route ? 'underline' : '', 'text-sm leading-6 text-gray-300 hover:text-white']"
                       :to="{name: item.route}">
            {{ item.name }}
          </router-link>
        </template>
      </div>
    </nav>
    <p>&copy; {{ new Date().getFullYear() }} lifecyclepilot.com</p>
    <p>
      lifecyclepilot.com - Tools for futures, currency & options involves substantial risk & is not appropriate for everyone. Only risk capital should be used for trading. Testimonials appearing on this website may not be representative of other clients or customers and is not a guarantee of future performance or success.
      <router-link class="text-sm underline text-gray-500 hover:text-white" type="a" :to="{name: 'disclaimer'}">
        Read our Full Risk Disclosure Here
      </router-link>
    </p>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage',
  components: {  },
  setup() {
    const navigation = [
      { name: 'Top 10 Best Stocks To Buy Now', route: 'home' },
      { name: 'About', route: 'about' },
      { name: 'Contact Us', to: 'https://x.com/BasedCapital1st', external: true },
      { name: 'Privacy Policy', route: 'privacy-policy' },
      { name: 'Terms Of Service', route: 'terms-of-service' }
    ]
    return {
      navigation
    }
  }
})
</script>
