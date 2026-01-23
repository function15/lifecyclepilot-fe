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
import { defineComponent, ref, onMounted } from 'vue'
import { type Post, usePostStore } from '@/stores/post'
import PostComponent from '@/components/post/PostComponent.vue'
import LoadingComponent from '@/components/helper/LoadingComponent.vue'

export default defineComponent({
  name: 'HomePage',
  components: { LoadingComponent, PostComponent },
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