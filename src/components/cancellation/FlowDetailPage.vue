<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCancellationStore } from '@/stores/cancellation'
import type { FlowSlideRef, CancellationSlide } from '@/types/cancellation'

const router = useRouter()
const route = useRoute()
const store = useCancellationStore()
const { currentFlow, slides, surveys, loadingFlow, loadingSlides, saving, error } = storeToRefs(store)

const flowId = computed(() => route.params.flowId as string)

const editingName = ref(false)
const nameInput = ref('')
const showAddSlidePanel = ref(false)
const showDeleteSlideConfirm = ref(false)
const slideToRemove = ref<FlowSlideRef | null>(null)

onMounted(async () => {
  await Promise.all([
    store.fetchFlow(flowId.value),
    store.fetchSlides(),
    store.fetchSurveys(),
  ])
})

watch(flowId, async (id) => {
  await store.fetchFlow(id)
})

function startEditName() {
  nameInput.value = currentFlow.value?.name ?? ''
  editingName.value = true
}

async function saveName() {
  if (!nameInput.value.trim() || !currentFlow.value) return
  await store.updateFlow(flowId.value, { name: nameInput.value.trim() })
  editingName.value = false
}

function cancelEditName() {
  editingName.value = false
}

async function toggleActive() {
  if (!currentFlow.value) return
  await store.updateFlow(flowId.value, { is_active: !currentFlow.value.is_active })
}

function slideDetail(slideId: string): CancellationSlide | undefined {
  return slides.value.find(s => s._id === slideId)
}

const surveyName = computed(() => {
  if (!currentFlow.value?.survey_populated) return null
  return currentFlow.value.survey_populated.header_1
})

const orderedSlides = computed<FlowSlideRef[]>(() => {
  if (!currentFlow.value) return []
  return [...currentFlow.value.slides].sort((a, b) => a.order - b.order)
})

const availableSlidesToAdd = computed(() => {
  if (!currentFlow.value) return slides.value
  const usedIds = new Set(currentFlow.value.slides.map(s => s.slide_id))
  return slides.value.filter(s => !usedIds.has(s._id))
})

async function addSlide(slide: CancellationSlide) {
  if (!currentFlow.value) return
  const maxOrder = currentFlow.value.slides.reduce((m, s) => Math.max(m, s.order), 0)
  const updatedSlides = [
    ...currentFlow.value.slides,
    { slide_id: slide._id, order: maxOrder + 1, is_mandatory: false, is_enabled: true },
  ]
  await store.updateFlow(flowId.value, { slides: updatedSlides })
  showAddSlidePanel.value = false
}

function confirmRemoveSlide(slideRef: FlowSlideRef) {
  slideToRemove.value = slideRef
  showDeleteSlideConfirm.value = true
}

async function executeRemoveSlide() {
  if (!currentFlow.value || !slideToRemove.value) return
  const updatedSlides = currentFlow.value.slides
    .filter(s => s.slide_id !== slideToRemove.value!.slide_id)
    .map((s, idx) => ({ ...s, order: idx + 1 }))
  await store.updateFlow(flowId.value, { slides: updatedSlides })
  showDeleteSlideConfirm.value = false
  slideToRemove.value = null
}

async function toggleSlideEnabled(slideRef: FlowSlideRef) {
  if (!currentFlow.value) return
  const updatedSlides = currentFlow.value.slides.map(s =>
    s.slide_id === slideRef.slide_id ? { ...s, is_enabled: !s.is_enabled } : s,
  )
  await store.updateFlow(flowId.value, { slides: updatedSlides })
}

async function moveSlide(slideRef: FlowSlideRef, direction: 'up' | 'down') {
  if (!currentFlow.value) return
  const sorted = [...orderedSlides.value]
  const idx = sorted.findIndex(s => s.slide_id === slideRef.slide_id)
  if (direction === 'up' && idx === 0) return
  if (direction === 'down' && idx === sorted.length - 1) return

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  ;[sorted[idx], sorted[swapIdx]] = [sorted[swapIdx], sorted[idx]]

  const reordered = sorted.map((s, i) => ({ slide_id: s.slide_id, order: i + 1 }))
  await store.reorderSlides(flowId.value, reordered)
}

function slideTypeBadge(type: string): string {
  const map: Record<string, string> = {
    benefits: 'bg-blue-100 text-blue-700',
    offer: 'bg-green-100 text-green-700',
    testimonial: 'bg-purple-100 text-purple-700',
    custom: 'bg-gray-100 text-gray-600',
  }
  return map[type] ?? 'bg-gray-100 text-gray-600'
}

function keepRate(): string {
  if (!currentFlow.value?.stats.total_shown) return '—'
  return ((currentFlow.value.stats.total_kept / currentFlow.value.stats.total_shown) * 100).toFixed(1) + '%'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Back nav -->
    <button
      @click="router.push({ name: 'dashboard' })"
      class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
    >
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
      </svg>
      Cancellation Flows
    </button>

    <!-- Loading -->
    <div v-if="loadingFlow" class="space-y-4">
      <div class="h-10 w-64 rounded-lg bg-gray-100 animate-pulse" />
      <div class="h-24 rounded-lg bg-gray-100 animate-pulse" />
      <div class="h-40 rounded-lg bg-gray-100 animate-pulse" />
    </div>

    <template v-else-if="currentFlow">
      <!-- Error -->
      <div v-if="error" class="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
        <span>{{ error }}</span>
        <button @click="store.clearError()" class="text-red-500 hover:text-red-700">
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
        </button>
      </div>

      <!-- Flow name + status header -->
      <div class="flex items-start gap-4">
        <div class="flex-1 min-w-0">
          <div v-if="editingName" class="flex items-center gap-2">
            <input
              v-model="nameInput"
              type="text"
              class="rounded-md border border-gray-300 px-3 py-1.5 text-2xl font-bold text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full max-w-lg"
              @keydown.enter="saveName"
              @keydown.escape="cancelEditName"
              autofocus
            />
            <button
              @click="saveName"
              :disabled="saving"
              class="rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500 disabled:opacity-50"
            >
              Save
            </button>
            <button @click="cancelEditName" class="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
          </div>
          <div v-else class="flex items-center gap-2 group">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 truncate">{{ currentFlow.name }}</h1>
            <button
              @click="startEditName"
              class="opacity-0 group-hover:opacity-100 rounded p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              title="Rename"
            >
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Active toggle -->
        <div class="flex items-center gap-3 pt-1">
          <span class="text-sm text-gray-500">{{ currentFlow.is_active ? 'Active' : 'Inactive' }}</span>
          <button
            @click="toggleActive"
            :disabled="saving"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50',
              currentFlow.is_active ? 'bg-yellow-400' : 'bg-gray-200'
            ]"
          >
            <span
              :class="[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                currentFlow.is_active ? 'translate-x-5' : 'translate-x-0'
              ]"
            />
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Shown</p>
          <p class="mt-1 text-2xl font-bold text-gray-900">{{ currentFlow.stats.total_shown.toLocaleString() }}</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Kept</p>
          <p class="mt-1 text-2xl font-bold text-gray-900">{{ currentFlow.stats.total_kept.toLocaleString() }}</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Cancelled</p>
          <p class="mt-1 text-2xl font-bold text-gray-900">{{ currentFlow.stats.total_cancelled.toLocaleString() }}</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Keep Rate</p>
          <p class="mt-1 text-2xl font-bold text-yellow-500">{{ keepRate() }}</p>
        </div>
      </div>

      <!-- Slides section -->
      <div class="rounded-lg border border-gray-200 bg-white">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Slides</h2>
            <p class="text-xs text-gray-500 mt-0.5">Shown to subscribers in order during cancellation.</p>
          </div>
          <button
            @click="showAddSlidePanel = !showAddSlidePanel"
            class="inline-flex items-center gap-1.5 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Slide
          </button>
        </div>

        <!-- Add slide panel -->
        <div v-if="showAddSlidePanel" class="border-b border-yellow-100 bg-yellow-50 px-6 py-4">
          <p class="text-sm font-medium text-gray-700 mb-3">Select a slide to add:</p>
          <div v-if="loadingSlides" class="h-8 w-48 rounded bg-gray-200 animate-pulse" />
          <div v-else-if="availableSlidesToAdd.length" class="flex flex-wrap gap-2">
            <button
              v-for="slide in availableSlidesToAdd"
              :key="slide._id"
              @click="addSlide(slide)"
              :disabled="saving"
              class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-yellow-400 hover:bg-yellow-50 disabled:opacity-50"
            >
              <span :class="['inline-block h-2 w-2 rounded-full', slideTypeBadge(slide.type).split(' ')[0]]" />
              {{ slide.name }}
            </button>
          </div>
          <p v-else class="text-sm text-gray-500">No additional slides available. All slides are already in this flow.</p>
          <button @click="showAddSlidePanel = false" class="mt-3 text-xs text-gray-400 hover:text-gray-600">
            Dismiss
          </button>
        </div>

        <!-- Slide list -->
        <div v-if="orderedSlides.length" class="divide-y divide-gray-100">
          <div
            v-for="(slideRef, idx) in orderedSlides"
            :key="slideRef.slide_id"
            :class="['flex items-center gap-4 px-6 py-3', !slideRef.is_enabled && 'opacity-50']"
          >
            <!-- Order badge -->
            <span class="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
              {{ slideRef.order }}
            </span>

            <!-- Slide info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-900 truncate">
                  {{ slideDetail(slideRef.slide_id)?.name ?? slideRef.slide_id }}
                </span>
                <span
                  v-if="slideDetail(slideRef.slide_id)"
                  :class="['inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', slideTypeBadge(slideDetail(slideRef.slide_id)!.type)]"
                >
                  {{ slideDetail(slideRef.slide_id)!.type }}
                </span>
                <span
                  v-if="slideRef.is_mandatory"
                  class="inline-flex items-center rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-white"
                >
                  mandatory
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-1 flex-shrink-0">
              <!-- Move up -->
              <button
                @click="moveSlide(slideRef, 'up')"
                :disabled="idx === 0 || saving"
                class="rounded p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move up"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <!-- Move down -->
              <button
                @click="moveSlide(slideRef, 'down')"
                :disabled="idx === orderedSlides.length - 1 || saving"
                class="rounded p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move down"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <!-- Enable toggle -->
              <button
                @click="toggleSlideEnabled(slideRef)"
                :disabled="saving"
                :class="[
                  'relative mx-1 inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50',
                  slideRef.is_enabled ? 'bg-yellow-400' : 'bg-gray-200'
                ]"
                :title="slideRef.is_enabled ? 'Disable slide' : 'Enable slide'"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    slideRef.is_enabled ? 'translate-x-4' : 'translate-x-0'
                  ]"
                />
              </button>
              <!-- Remove -->
              <button
                @click="confirmRemoveSlide(slideRef)"
                :disabled="saving"
                class="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50"
                title="Remove from flow"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="px-6 py-10 text-center">
          <p class="text-sm text-gray-400">No slides added yet. Click "Add Slide" to get started.</p>
        </div>
      </div>

      <!-- Survey section -->
      <div class="rounded-lg border border-gray-200 bg-white px-6 py-5">
        <h2 class="text-base font-semibold text-gray-900 mb-3">Survey</h2>
        <div v-if="currentFlow.survey_populated" class="flex items-center gap-3">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ currentFlow.survey_populated.header_1 }}</p>
            <p class="text-xs text-gray-500">{{ currentFlow.survey_populated.options.length }} option{{ currentFlow.survey_populated.options.length !== 1 ? 's' : '' }}</p>
          </div>
        </div>
        <div v-else class="flex items-center gap-3">
          <div>
            <p class="text-sm text-gray-500">No survey linked.</p>
            <p class="text-xs text-gray-400">Edit this flow to attach a cancellation survey.</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Not found -->
    <div v-else-if="!loadingFlow && !error" class="text-center py-16 text-gray-400 text-sm">
      Flow not found.
    </div>
  </div>

  <!-- Remove slide confirmation -->
  <Teleport to="body">
    <div v-if="showDeleteSlideConfirm && slideToRemove" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="showDeleteSlideConfirm = false" />
      <div class="relative w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-gray-200 px-6 py-5">
        <h2 class="text-base font-semibold text-gray-900">Remove slide from flow?</h2>
        <p class="mt-1 text-sm text-gray-500">
          "<span class="font-medium text-gray-700">{{ slideDetail(slideToRemove.slide_id)?.name ?? slideToRemove.slide_id }}</span>" will be removed from this flow. The slide itself will not be deleted.
        </p>
        <div class="mt-4 flex justify-end gap-3">
          <button @click="showDeleteSlideConfirm = false" class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
          <button @click="executeRemoveSlide" :disabled="saving" class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">Remove</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
