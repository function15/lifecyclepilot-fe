<template>
    <div class="min-h-full">

        <main>
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="grid gap-4 md:grid-cols-2 sm:grid-cols-1 px-4 py-8">
                  <h1>Not Found</h1>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NotFoundPage',
    setup() {
        const user = {
            name: 'Tom Cook',
            email: 'tom@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }
        const navigation = [
            { name: 'Home', href: '/', current: true },
            { name: 'Disclaimer', href: '/disclaimer', current: false },
        ]
        const userNavigation = [
            { name: 'Your Profile', href: '#' },
            { name: 'Settings', href: '#' },
            { name: 'Sign out', href: '#' },
        ]
        return {
            navigation,
            user,
            userNavigation
        }
    }
})
</script>

