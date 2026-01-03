<template>
  <div class="min-h-full">
    <main>
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Post</h1>
          </div>
        </div>
        <form @submit.prevent="submitPost">
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
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
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePostStore } from '@/stores/post'

export default defineComponent({
  name: 'CreatePostPage',
  setup() {

    const content = ref('');
    const message = ref('');

    const submitPost = async () => {
      try {
        await usePostStore().createPost(content.value);
        content.value = '';
        message.value = 'Post created successfully!';
        console.log('Post submitted:', { content: content.value });
      } catch (error) {
        message.value = 'Failed to create post!';
        console.error('Failed to create post:', error);
      }

    };

    return {
      content,
      message,
      submitPost,
    }
  },
});
</script>