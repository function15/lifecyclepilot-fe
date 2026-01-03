<template>
    <div class="min-h-full relative flex w-full flex-col">

        <main class="flex-auto">
          <EconomicEventsAndEarnings />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EconomicEventsAndEarnings from "@/components/EconomicEventsAndEarnings.vue";

export default defineComponent({
  name: 'HeadlinesPage',
  components: {
    EconomicEventsAndEarnings,
  },
  setup() {
    return {}
  }
})
</script>

