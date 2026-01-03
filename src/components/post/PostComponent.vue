<template>
  <div :class="['post-container', { 'cursor-pointer': canClickOnPost }]" @click="redirectToPost">
    <div class="post-header flex justify-between items-center">
      <router-link :to="'/' + post.username" class="text-blue-500 hover:underline" @click.stop>
        @{{ post.username }}
      </router-link>
      <span class="text-gray-500 text-sm">{{ formattedDate }}</span>
    </div>
    <div class="post-content my-2">
      <span v-for="(part, index) in formattedContent" :key="index">
        <router-link v-if="part.isHashtag" :to="{ name: 'hashtag', params: { hashtag: part.text.substring(1) } }" class="text-blue-500 hover:underline" @click.stop>
          {{ part.text }}
        </router-link>
        <router-link v-else-if="part.isStock" :to="{ name: 'stock', params: { stock: part.text.substring(1) } }" class="text-green-500 hover:underline" @click.stop>
          {{ part.text }}
        </router-link>
        <span v-else>{{ part.text }}</span>
      </span>
    </div>
    <div class="post-actions flex justify-between text-gray-500 text-sm mt-2">
      <button @click.stop="comment" class="flex items-center space-x-1 hover:text-blue-500">
        <ChatBubbleLeftIcon class="h-5 w-5" />
        <span>{{ post.replyCount || 0 }}</span>
      </button>
      <button @click.stop="repost" class="flex items-center space-x-1 hover:text-green-500">
        <ArrowPathIcon class="h-5 w-5" />
        <span>{{ post.repostCount || 5 }}</span>
      </button>
      <button @click.stop="like" class="flex items-center space-x-1 hover:text-red-500">
        <HeartIcon :class="['h-5 w-5', isLiked ? 'text-red-300 fill-current' : 'text-gray-500']" />
        <span>{{ likeCount }}</span>
      </button>
      <button v-if="displayViewsCount" class="flex items-center space-x-1 hover:text-gray-500">
        <EyeIcon class="h-5 w-5" />
        <span>{{ post.viewCount || randomInt }}</span>
      </button>
      <button @click.stop="share" class="flex items-center space-x-1 hover:text-blue-500">
        <ShareIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import { type Post, usePostStore } from '@/stores/post'
import moment from 'moment'
import { ChatBubbleLeftIcon, ArrowPathIcon, HeartIcon, ShareIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'PostComponent',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    },
    canClickOnPost: {
      type: Boolean,
      default: true
    },
    displayViewsCount: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ChatBubbleLeftIcon,
    ArrowPathIcon,
    HeartIcon,
    ShareIcon,
    EyeIcon
  },
  setup(props) {
    const router = useRouter()
    const userStore = useAuthStore()
    const user = computed(() => userStore.loggedInUser)
    const isAuthenticated = computed(() => userStore.isAuthenticated)

    const formattedDate = computed(() => moment(props.post.createdDate).fromNow())
    const isLiked = ref(user.value?.likedPosts?.includes(props.post.id) || false)
    const likeCount = ref(props.post.likeCount)
    const randomInt = Math.max(Math.floor(Math.random() * 20), 5)

    const redirectToPost = () => {
      if (!props.canClickOnPost) return
      router.push({ name: 'post', params: { username: props.post.username, postId: props.post.id } })
    }

    const comment = () => {
      console.log('Comment action triggered')
    }

    const repost = () => {
      console.log('Repost action triggered')
    }

    const like = async () => {
      if(!isAuthenticated.value) {
        router.push({ name: 'login' })
        return
      }
      isLiked.value = !isLiked.value
      likeCount.value += isLiked.value ? 1 : -1
      try {
        await usePostStore().likePost(props.post.id, isLiked.value)
      } catch (error) {
        console.error('Failed to update like post:', error)
        // Revert the like status and count in case of an error
        isLiked.value = !isLiked.value
        likeCount.value += isLiked.value ? 1 : -1
      }
    }

    const share = () => {
      console.log('Share action triggered')
    }

    const formattedContent = computed(() => {
      const parts = props.post.content.split(/(#\w+|\$\w+)/g)
      return parts.map(part => ({
        text: part,
        isHashtag: part.startsWith('#'),
        isStock: part.startsWith('$')
      }))
    })

    return {
      formattedDate,
      isLiked,
      redirectToPost,
      comment,
      repost,
      like,
      share,
      formattedContent,
      likeCount,
      randomInt
    }
  }
})
</script>