<template>
  <div>
    <div v-if="loading">
      <LoadingComponent />
    </div>
    <div v-else>
      <div v-for="reply in replies" :key="reply.id" class="mb-4 p-4 border rounded">
        <PostComponent :post="reply" :can-click-on-post="false" :display-views-count="false"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type PostReply, usePostStore } from '@/stores/post'
import PostComponent from '@/components/post/PostComponent.vue'
import LoadingComponent from '@/components/helper/LoadingComponent.vue'

export default defineComponent({
  name: 'PostRepliesComponent',
  components: { LoadingComponent, PostComponent },
  setup() {
    const route = useRoute()
    const postId = ref<string>((Array.isArray(route.params['postId']) ? route.params['postId'][0] : route.params['postId']) as string || '')
    const postStore = usePostStore()
    const loading = ref(true)
    const replies = ref<PostReply[]>([])

    onMounted(async () => {
      if (!postId.value) {
        loading.value = false
        return
      }
      await postStore.fetchPostReplies(postId.value)
      replies.value = postStore.replies
      loading.value = false
    })

    return {
      replies,
      loading
    }
  }
})
</script>