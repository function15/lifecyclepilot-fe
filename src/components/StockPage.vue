<template>
  <div>
    <FeedComponent :posts="posts" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FeedComponent from '@/components/feed/FeedComponet.vue'
import { type Post, usePostStore } from '@/stores/post'

export default defineComponent({
  name: 'StockPage',
  components: { FeedComponent },
  setup() {
    const postStore = usePostStore()
    const posts = ref<Post[]>([])
    const route = useRoute()
    const loading = ref(true)

    onMounted(async () => {
      const stock = route.params.stock as string
      await postStore.fetchPostsByStock(stock)
      posts.value = postStore.posts
      loading.value = false
    })

    return {
      posts,
      loading
    }
  }
})
</script>