<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCancellationStore } from '@/stores/cancellation'
import type { CancellationSurvey, CreateSurveyRequest } from '@/types/cancellation'

const store = useCancellationStore()
const { surveys, loadingSurveys, saving, error } = storeToRefs(store)

// Create modal
const showCreateModal = ref(false)
const createError = ref('')

const newHeader1 = ref('')
const newHeader2 = ref('')
const newCancelLabel = ref('Continue to cancel')
const newAllowFreeText = ref(false)
const newOptions = ref<{ label: string; is_other: boolean }[]>([
  { label: '', is_other: false },
])

// Delete modal
const showDeleteConfirm = ref(false)
const surveyToDelete = ref<CancellationSurvey | null>(null)

onMounted(() => store.fetchSurveys())

function openCreateModal() {
  newHeader1.value = ''
  newHeader2.value = ''
  newCancelLabel.value = 'Continue to cancel'
  newAllowFreeText.value = false
  newOptions.value = [{ label: '', is_other: false }]
  createError.value = ''
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
}

function addOption() {
  newOptions.value.push({ label: '', is_other: false })
}

function removeOption(index: number) {
  newOptions.value.splice(index, 1)
}

async function submitCreate() {
  createError.value = ''
  if (!newHeader1.value.trim()) {
    createError.value = 'Survey question is required'
    return
  }
  const validOptions = newOptions.value.filter(o => o.label.trim())
  if (validOptions.length === 0) {
    createError.value = 'Add at least one option'
    return
  }

  const payload: CreateSurveyRequest = {
    header_1: newHeader1.value.trim(),
    header_2: newHeader2.value.trim(),
    options: validOptions.map((o, i) => ({ label: o.label.trim(), order: i + 1, other: o.is_other })),
    cancel_button_label: newCancelLabel.value.trim() || 'Continue to cancel',
    allow_free_text: newAllowFreeText.value,
  }

  const created = await store.createSurvey(payload)
  if (created) {
    showCreateModal.value = false
  }
}

function confirmDelete(survey: CancellationSurvey) {
  surveyToDelete.value = survey
  showDeleteConfirm.value = true
}

function cancelDelete() {
  surveyToDelete.value = null
  showDeleteConfirm.value = false
}

async function executeDelete() {
  if (!surveyToDelete.value) return
  const ok = await store.deleteSurvey(surveyToDelete.value.id)
  if (ok) {
    showDeleteConfirm.value = false
    surveyToDelete.value = null
  }
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys</h1>
        <p class="mt-1 text-sm text-gray-500">Cancellation reason surveys shown to subscribers.</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Survey
      </button>
    </div>

    <!-- Global error -->
    <div v-if="error" class="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
      <span>{{ error }}</span>
      <button @click="store.clearError()" class="text-red-500 hover:text-red-700">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loadingSurveys" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-16 rounded-lg bg-gray-100 animate-pulse" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="surveys.length === 0"
      class="rounded-lg border-2 border-dashed border-gray-200 bg-white py-16 text-center"
    >
      <svg class="mx-auto h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
      <p class="mt-3 text-sm font-medium text-gray-500">No surveys yet</p>
      <p class="mt-1 text-xs text-gray-400">Create a survey to attach to your cancellation flows.</p>
      <button
        @click="openCreateModal"
        class="mt-4 inline-flex items-center gap-1 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500"
      >
        Create Survey
      </button>
    </div>

    <!-- Surveys table -->
    <div v-else class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Question</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Options</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Free text</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="survey in surveys" :key="survey.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <p class="text-sm font-medium text-gray-900">{{ survey.header1 }}</p>
              <p v-if="survey.header2" class="text-xs text-gray-400 mt-0.5">{{ survey.header2 }}</p>
            </td>
            <td class="px-4 py-4 text-right text-sm text-gray-600">{{ survey.options.length }}</td>
            <td class="px-4 py-4 text-sm text-gray-500">{{ survey.allowFreeText ? 'Yes' : 'No' }}</td>
            <td class="px-4 py-4 text-sm text-gray-500">{{ formatDate(survey.createdAt) }}</td>
            <td class="px-4 py-4 text-right" @click.stop>
              <button
                @click="confirmDelete(survey)"
                class="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50"
                title="Delete"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Survey Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="closeCreateModal" />
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-2xl ring-1 ring-gray-200 max-h-[90vh] flex flex-col">
          <div class="px-6 py-5 border-b border-gray-100 flex-shrink-0">
            <h2 class="text-lg font-semibold text-gray-900">Create Survey</h2>
          </div>

          <div class="px-6 py-5 space-y-4 overflow-y-auto">
            <!-- header_1 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Question <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newHeader1"
                type="text"
                placeholder="e.g. Why are you cancelling?"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <!-- header_2 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                v-model="newHeader2"
                type="text"
                placeholder="e.g. Your feedback helps us improve"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <!-- Options -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Options <span class="text-red-500">*</span></label>
              <div class="space-y-2">
                <div v-for="(option, index) in newOptions" :key="index" class="flex items-center gap-2">
                  <input
                    v-model="option.label"
                    type="text"
                    :placeholder="`Option ${index + 1}`"
                    class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  />
                  <label class="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                    <input type="checkbox" v-model="option.is_other" class="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                    Other
                  </label>
                  <button
                    v-if="newOptions.length > 1"
                    @click="removeOption(index)"
                    class="rounded p-1 text-gray-400 hover:text-red-500"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
              <button
                @click="addOption"
                class="mt-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add option
              </button>
            </div>

            <!-- Cancel button label -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cancel button label</label>
              <input
                v-model="newCancelLabel"
                type="text"
                placeholder="Continue to cancel"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <!-- Allow free text -->
            <div class="flex items-center gap-3">
              <button
                @click="newAllowFreeText = !newAllowFreeText"
                :class="[
                  'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
                  newAllowFreeText ? 'bg-yellow-400' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    newAllowFreeText ? 'translate-x-4' : 'translate-x-0'
                  ]"
                />
              </button>
              <span class="text-sm text-gray-700">Allow free text response</span>
            </div>

            <!-- Error -->
            <p v-if="createError" class="text-sm text-red-600">{{ createError }}</p>
          </div>

          <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
            <button
              @click="closeCreateModal"
              class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              @click="submitCreate"
              :disabled="saving"
              class="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Create Survey
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm && surveyToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="cancelDelete" />
        <div class="relative w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div class="px-6 py-5">
            <h2 class="text-base font-semibold text-gray-900">Delete survey?</h2>
            <p class="mt-1 text-sm text-gray-500">
              "<span class="font-medium text-gray-700">{{ surveyToDelete.header_1 }}</span>" will be removed. Flows using this survey may be affected.
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
