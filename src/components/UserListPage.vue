<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">@{{username}} {{title}}</h2>
    <ul>
      <li v-for="user in users" :key="user.id" class="mb-2 flex justify-between items-center">
        <div>
          <router-link :to="{ name: 'user', params: { username: user.username } }" class="text-blue-500">
            @{{ user.username }}
          </router-link>
          <p>{{ user.bio }}</p>
        </div>
        <FollowButton :user="user" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { type User, useUserStore } from '@/stores/user'
import type { PropType } from 'vue'
import FollowButton from '@/components/button/FollowButton.vue'

export default defineComponent({
  name: 'UserListPage',
  components: { FollowButton },
  props: {
    usersIds: {
      type: Array as PropType<string[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const userStore = useUserStore()
    const users = ref<User[]>([])

    watch(() => props.usersIds, async (newIds) => {
      if (newIds.length > 0) {
        users.value = await userStore.loadUsersByIds(newIds)
      }
    }, { immediate: true })

    const followUser = async (username: string) => {
      await userStore.followUser(username)
    }

    return { users, followUser }
  }
})
</script>

<style scoped>
/* Add any necessary styles here */
</style>