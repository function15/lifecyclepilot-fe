<template>
  <div>
    <FeedComponent :posts="posts" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import FeedComponent from '@/components/feed/FeedComponet.vue'
import { type Post, usePostStore } from '@/stores/post'

export default defineComponent({
  name: 'HomePage',
  components: { FeedComponent },
  setup() {
    const postStore = usePostStore()
    const posts = ref<Post[]>([])
    const loading = ref(true)

    onMounted(async () => {
      await postStore.fetchPosts()
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