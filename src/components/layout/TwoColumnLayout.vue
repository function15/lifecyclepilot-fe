<script setup lang="ts">
withDefaults(defineProps<{
  sidebarWidth?: string
  contentWidth?: string
  sidebarClass?: string
  contentClass?: string
}>(), {
  sidebarWidth: 'md:basis-[30%]',
  contentWidth: 'md:basis-[70%]',
  sidebarClass: '',
  contentClass: '',
})
</script>

<template>
  <main>
    <div class="container mx-auto p-4">
      <div class="flex flex-col md:flex-row md:space-x-4">
        <aside
          :class="[
            'bg-white p-4 flex-auto',
            'md:mb-0',
            sidebarWidth,
            sidebarClass,
            'mb-4',
          ]"
        >
          <slot name="sidebar" />
        </aside>
        <section
          :class="[
            'bg-white p-4 flex-auto',
            'md:mb-0',
            contentWidth,
            contentClass,
            'mb-4',
          ]"
        >
          <slot />
        </section>
      </div>
    </div>
  </main>
</template>
