<template>
  <div>
    <template v-if="post && !loading">
      <div class="pb-4">
        <PostComponent :post="post" :can-click-on-post="false" />
      </div>
      <PostRepliesComponent />
      <CreatePostReplyComponent v-if="isAuthenticated" :post="post" />
    </template>
    <template v-else>
      <div v-if="loading">
        <LoadingComponent />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Post, usePostStore } from '@/stores/post'
import PostComponent from '@/components/post/PostComponent.vue'
import PostRepliesComponent from '@/components/post/PostRepliesComponent.vue'
import CreatePostReplyComponent from '@/components/post/CreatePostReplyComponent.vue'
import LoadingComponent from '@/components/helper/LoadingComponent.vue'
import { useAuthStore } from '@/stores/auth' // Assuming you have an auth store

export default defineComponent({
  name: 'PostPage',
  components: { LoadingComponent, PostRepliesComponent, PostComponent, CreatePostReplyComponent },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const postId = ref<string>((Array.isArray(route.params['postId']) ? route.params['postId'][0] : route.params['postId']) as string || '')
    const postStore = usePostStore()
    const authStore = useAuthStore()
    const loading = ref(true)
    const post = ref<Post>()
    const isAuthenticated = computed(() => authStore.isAuthenticated)


    onMounted(async () => {
      if (!postId.value) {
        router.push({ name: '404' })
        loading.value = false
        return
      }
      await postStore.fetchPostById(postId.value)
      post.value = postStore.post

      if (!post.value) {
        router.push({ name: '404' })
      }

      loading.value = false
    })

    return {
      postId,
      post,
      loading,
      isAuthenticated
    }
  }
})
</script>