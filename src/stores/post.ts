import { defineStore } from 'pinia'
import apiClient from '@/services/ApiClient'
import { ref } from 'vue'

export interface Post {
  id: string
  content: string
  userId: string
  email: string
  hashtags: string[]
  stocks: string[]
  createdDate: string
  replyCount: number
  repostCount: number
  likeCount: number
  viewCount: number
}

export interface PostReply extends Post {
  postId: string
}

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const post = ref<Post>()
  const replies = ref<PostReply[]>([])

  async function fetchPosts() {
    try {
      const response = await apiClient.get('/posts')
      posts.value = response.data
    } catch (error) {
      console.error('Failed to fetch posts', error)
    }
  }

  async function createPostReply(postId: string, content: string) {
    try {
      const response = await apiClient.post(`/replies/${postId}`, { content })
      console.log('Post reply created:', response.data)
    } catch (error) {
      console.error('Failed to create post reply', error)
      throw error
    }
  }

  async function fetchPostsByEmail(email: string) {
    try {
      const response = await apiClient.post(`/posts/search`, { email })
      posts.value = response.data
    } catch (error) {
      console.error('Failed to fetch posts', error)
    }
  }

  async function fetchPostById(id: string) {
    try {
      const response = await apiClient.get(`/posts/${id}`)
      post.value = response.data
    } catch (error) {
      console.error('Failed to fetch post', error)
    }
  }


  async function fetchPostReplies(postId: string) {
    try {
      const response = await apiClient.get(`/replies/${postId}`)
      replies.value = response.data
    } catch (error) {
      console.error('Failed to fetch replies', error)
    }
  }


  async function likePost(postId: string, value: boolean) {
    try {
      const response = await apiClient.post(`/posts/${postId}/like`, { value })
      console.log('Post liked:', response.data)
    } catch (error) {
      console.error('Failed to like post', error)
      throw error
    }
  }

  return {
    posts, post, replies,
    fetchPosts, createPostReply,
    fetchPostsByEmail, fetchPostById,
    likePost,
    fetchPostReplies
  }
})