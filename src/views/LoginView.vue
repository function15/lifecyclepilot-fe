<script setup lang="ts">
import LoginComponent from '@/components/auth/LoginComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Top Menu -->
    <header class="fixed inset-x-0 top-0 z-50 h-[60px] bg-white shadow-sm">
      <nav class="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div class="flex items-center">
          <router-link :to="{ name: 'landing' }" class="flex items-center">
            <img src="@/assets/trader-logo.svg" alt="LifecyclePilot" class="h-8 w-auto" />
          </router-link>
        </div>
        <div class="flex items-center gap-x-8">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500">Pricing</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500">FAQ</a>
          <router-link
            :to="{ name: 'login' }"
            class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500"
          >
            Login
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="pt-[60px]">
      <LoginComponent />
    </div>
  </div>
</template>
