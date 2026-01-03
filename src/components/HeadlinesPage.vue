<template>
    <div class="min-h-full">

        <main>
          <Headlines />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Headlines from "@/components/Headlines.vue";

export default defineComponent({
  name: 'HeadlinesPage',
  components: {
    Headlines,
  },
  setup() {
    return {}
  }
})
</script>

