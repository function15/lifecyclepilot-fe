<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCancellationStore } from '@/stores/cancellation'
import type { CancellationFlow, CreateFlowRequest } from '@/types/cancellation'

const router = useRouter()
const store = useCancellationStore()
const { flows, surveys, loadingFlows, loadingSurveys, saving, error, overallStats } = storeToRefs(store)

const showCreateModal = ref(false)
const showDeleteConfirm = ref(false)
const flowToDelete = ref<CancellationFlow | null>(null)

const newFlowName = ref('')
const newFlowSurveyId = ref('')
const createError = ref('')

onMounted(async () => {
  await Promise.all([store.fetchFlows(), store.fetchSurveys()])
})

function openCreateModal() {
  newFlowName.value = ''
  newFlowSurveyId.value = surveys.value[0]?._id ?? ''
  createError.value = ''
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
}

async function submitCreate() {
  if (!newFlowName.value.trim()) {
    createError.value = 'Flow name is required'
    return
  }
  if (!newFlowSurveyId.value) {
    createError.value = 'A survey must be selected'
    return
  }

  const payload: CreateFlowRequest = {
    name: newFlowName.value.trim(),
    survey_id: newFlowSurveyId.value,
  }

  const created = await store.createFlow(payload)
  if (created) {
    showCreateModal.value = false
    router.push({ name: 'cancellation-flow-detail', params: { flowId: created._id } })
  }
}

function confirmDelete(flow: CancellationFlow) {
  flowToDelete.value = flow
  showDeleteConfirm.value = true
}

function cancelDelete() {
  flowToDelete.value = null
  showDeleteConfirm.value = false
}

async function executeDelete() {
  if (!flowToDelete.value) return
  const ok = await store.deleteFlow(flowToDelete.value._id)
  if (ok) {
    showDeleteConfirm.value = false
    flowToDelete.value = null
  }
}

async function toggleActive(flow: CancellationFlow) {
  await store.toggleFlowActive(flow)
}

function keepRate(flow: CancellationFlow): string {
  if (!flow.stats.total_shown) return '—'
  return ((flow.stats.total_kept / flow.stats.total_shown) * 100).toFixed(1) + '%'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Cancellation Flows</h1>
        <p class="mt-1 text-sm text-gray-500">Manage flows that appear when subscribers click cancel.</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Flow
      </button>
    </div>

    <!-- Global error -->
    <div v-if="error" class="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
      <span>{{ error }}</span>
      <button @click="store.clearError()" class="text-red-500 hover:text-red-700">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
      </button>
    </div>

    <!-- Stats overview -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Flows</p>
        <p class="mt-1 text-2xl font-bold text-gray-900">{{ flows.length }}</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Active</p>
        <p class="mt-1 text-2xl font-bold text-gray-900">{{ flows.filter(f => f.is_active).length }}</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Shown</p>
        <p class="mt-1 text-2xl font-bold text-gray-900">{{ overallStats.total_shown.toLocaleString() }}</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Keep Rate</p>
        <p class="mt-1 text-2xl font-bold text-yellow-500">
          {{ overallStats.total_shown ? (overallStats.keep_rate * 100).toFixed(1) + '%' : '—' }}
        </p>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loadingFlows" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-16 rounded-lg bg-gray-100 animate-pulse" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="flows.length === 0"
      class="rounded-lg border-2 border-dashed border-gray-200 bg-white py-16 text-center"
    >
      <svg class="mx-auto h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="mt-3 text-sm font-medium text-gray-500">No cancellation flows yet</p>
      <p class="mt-1 text-xs text-gray-400">Create your first flow to start reducing churn.</p>
      <button
        @click="openCreateModal"
        class="mt-4 inline-flex items-center gap-1 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500"
      >
        Create Flow
      </button>
    </div>

    <!-- Flows table -->
    <div v-else class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Shown</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Kept</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Keep Rate</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="flow in flows"
            :key="flow._id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="router.push({ name: 'cancellation-flow-detail', params: { flowId: flow._id } })"
          >
            <td class="px-6 py-4">
              <span class="text-sm font-medium text-gray-900">{{ flow.name }}</span>
              <span class="ml-2 text-xs text-gray-400">{{ flow.slides.length }} slide{{ flow.slides.length !== 1 ? 's' : '' }}</span>
            </td>
            <td class="px-4 py-4" @click.stop>
              <button
                @click="toggleActive(flow)"
                :class="[
                  'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
                  flow.is_active ? 'bg-yellow-400' : 'bg-gray-200'
                ]"
                :title="flow.is_active ? 'Deactivate' : 'Activate'"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    flow.is_active ? 'translate-x-4' : 'translate-x-0'
                  ]"
                />
              </button>
            </td>
            <td class="px-4 py-4 text-right text-sm text-gray-600">{{ flow.stats.total_shown.toLocaleString() }}</td>
            <td class="px-4 py-4 text-right text-sm text-gray-600">{{ flow.stats.total_kept.toLocaleString() }}</td>
            <td class="px-4 py-4 text-right">
              <span :class="['text-sm font-semibold', flow.stats.total_shown ? 'text-yellow-600' : 'text-gray-400']">
                {{ keepRate(flow) }}
              </span>
            </td>
            <td class="px-4 py-4 text-sm text-gray-500">{{ formatDate(flow.created_at) }}</td>
            <td class="px-4 py-4 text-right" @click.stop>
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="router.push({ name: 'cancellation-flow-detail', params: { flowId: flow._id } })"
                  class="rounded p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  title="Edit"
                >
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </button>
                <button
                  @click="confirmDelete(flow)"
                  class="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Flow Modal -->
    <Teleport to="body">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/40" @click="closeCreateModal" />
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Create Cancellation Flow</h2>
          </div>
          <div class="px-6 py-5 space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Flow name</label>
              <input
                v-model="newFlowName"
                type="text"
                placeholder="e.g. Standard Cancellation Flow"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                @keydown.enter="submitCreate"
              />
            </div>
            <!-- Survey -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Survey</label>
              <div v-if="loadingSurveys" class="h-9 rounded-md bg-gray-100 animate-pulse" />
              <select
                v-else-if="surveys.length"
                v-model="newFlowSurveyId"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              >
                <option v-for="s in surveys" :key="s._id" :value="s._id">{{ s.header_1 }}</option>
              </select>
              <p v-else class="text-sm text-red-500">No surveys found. Create a survey first.</p>
            </div>
            <!-- Create error -->
            <p v-if="createError" class="text-sm text-red-600">{{ createError }}</p>
          </div>
          <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              @click="closeCreateModal"
              class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              @click="submitCreate"
              :disabled="saving || !surveys.length"
              class="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Create Flow
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteConfirm && flowToDelete"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/40" @click="cancelDelete" />
        <div class="relative w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div class="px-6 py-5">
            <h2 class="text-base font-semibold text-gray-900">Delete flow?</h2>
            <p class="mt-1 text-sm text-gray-500">
              "<span class="font-medium text-gray-700">{{ flowToDelete.name }}</span>" will be deactivated and removed. This cannot be undone.
            </p>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button
              @click="cancelDelete"
              class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              @click="executeDelete"
              :disabled="saving"
              class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
