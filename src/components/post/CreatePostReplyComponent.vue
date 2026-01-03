<template>
  <div>
    <form @submit.prevent="submitPostReply">
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Reply</label>
        <textarea id="content" v-model="content" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
    </form>
    <div v-if="message" class="mt-4 text-green-500">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { Post } from '@/stores/post'
import { usePostStore } from '@/stores/post'

export default defineComponent({
  name: 'CreatePostReplyComponent',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    },
  },
  setup(props) {
    const content = ref('')
    const message = ref('')

    const submitPostReply = async () => {
      try {
        await usePostStore().createPostReply(props.post.id, content.value)
        content.value = ''
        message.value = 'Reply created successfully!'

        // refresh the page
        location.reload()

      } catch (error) {
        message.value = 'Failed to create reply!'
        console.error('Failed to create reply:', error)
      }
    }

    return {
      content,
      message,
      submitPostReply
    }
  }
})
</script>