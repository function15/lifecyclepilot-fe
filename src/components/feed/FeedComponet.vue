<template>
  <main>
    <div v-if="loading" class="mb-4 p-4 border rounded text-center">
      <LoadingComponent />
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="mb-4 p-4 border rounded">
        <PostComponent :post="post" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Post } from '@/stores/post'
import PostComponent from '@/components/post/PostComponent.vue'
import LoadingComponent from '@/components/helper/LoadingComponent.vue'

export default defineComponent({
  name: 'FeedComponent',
  components: { LoadingComponent, PostComponent },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
/* Add any scoped styles here */
</style>