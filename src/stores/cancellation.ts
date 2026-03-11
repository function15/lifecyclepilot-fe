import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import * as cancellationService from '@/services/cancellation'
import type {
  CancellationFlow,
  CancellationFlowDetailed,
  CancellationSlide,
  CancellationSurvey,
  CreateFlowRequest,
  UpdateFlowRequest,
} from '@/types/cancellation'

export const useCancellationStore = defineStore('cancellation', () => {
  const flows = ref<CancellationFlow[]>([])
  const currentFlow = ref<CancellationFlowDetailed | null>(null)
  const slides = ref<CancellationSlide[]>([])
  const surveys = ref<CancellationSurvey[]>([])

  const loadingFlows = ref(false)
  const loadingFlow = ref(false)
  const loadingSlides = ref(false)
  const loadingSurveys = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)

  const activeFlows = computed(() => flows.value.filter(f => f.is_active))

  const overallStats = computed(() => {
    const total_shown = flows.value.reduce((s, f) => s + f.stats.total_shown, 0)
    const total_kept = flows.value.reduce((s, f) => s + f.stats.total_kept, 0)
    const total_cancelled = flows.value.reduce((s, f) => s + f.stats.total_cancelled, 0)
    const keep_rate = total_shown > 0 ? total_kept / total_shown : 0
    return { total_shown, total_kept, total_cancelled, keep_rate }
  })

  function getTenantId(): string {
    const authStore = useAuthStore()
    return authStore.loggedInUser?.id ?? ''
  }

  async function fetchFlows() {
    loadingFlows.value = true
    error.value = null
    try {
      flows.value = await cancellationService.getFlows(getTenantId())
    } catch {
      error.value = 'Failed to load cancellation flows'
    } finally {
      loadingFlows.value = false
    }
  }

  async function fetchFlow(flowId: string) {
    loadingFlow.value = true
    error.value = null
    try {
      currentFlow.value = await cancellationService.getFlow(getTenantId(), flowId)
    } catch {
      error.value = 'Failed to load flow'
    } finally {
      loadingFlow.value = false
    }
  }

  async function createFlow(payload: CreateFlowRequest): Promise<CancellationFlow | null> {
    saving.value = true
    error.value = null
    try {
      const flow = await cancellationService.createFlow(getTenantId(), payload)
      flows.value.unshift(flow)
      return flow
    } catch {
      error.value = 'Failed to create flow'
      return null
    } finally {
      saving.value = false
    }
  }

  async function updateFlow(flowId: string, payload: UpdateFlowRequest): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      const updated = await cancellationService.updateFlow(getTenantId(), flowId, payload)
      const idx = flows.value.findIndex(f => f._id === flowId)
      if (idx !== -1) flows.value[idx] = updated
      if (currentFlow.value?._id === flowId) {
        currentFlow.value = { ...currentFlow.value, ...updated }
      }
      return true
    } catch {
      error.value = 'Failed to update flow'
      return false
    } finally {
      saving.value = false
    }
  }

  async function deleteFlow(flowId: string): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      await cancellationService.deleteFlow(getTenantId(), flowId)
      flows.value = flows.value.filter(f => f._id !== flowId)
      return true
    } catch {
      error.value = 'Failed to delete flow'
      return false
    } finally {
      saving.value = false
    }
  }

  async function toggleFlowActive(flow: CancellationFlow): Promise<void> {
    await updateFlow(flow._id, { is_active: !flow.is_active })
  }

  async function reorderSlides(flowId: string, slides: { slide_id: string; order: number }[]): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      const updated = await cancellationService.reorderFlowSlides(getTenantId(), flowId, slides)
      if (currentFlow.value?._id === flowId) {
        currentFlow.value = { ...currentFlow.value, ...updated }
      }
      return true
    } catch {
      error.value = 'Failed to reorder slides'
      return false
    } finally {
      saving.value = false
    }
  }

  async function fetchSlides() {
    loadingSlides.value = true
    try {
      slides.value = await cancellationService.getSlides(getTenantId())
    } catch {
      error.value = 'Failed to load slides'
    } finally {
      loadingSlides.value = false
    }
  }

  async function fetchSurveys() {
    loadingSurveys.value = true
    try {
      surveys.value = await cancellationService.getSurveys(getTenantId())
    } catch {
      error.value = 'Failed to load surveys'
    } finally {
      loadingSurveys.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    flows,
    currentFlow,
    slides,
    surveys,
    loadingFlows,
    loadingFlow,
    loadingSlides,
    loadingSurveys,
    saving,
    error,
    activeFlows,
    overallStats,
    fetchFlows,
    fetchFlow,
    createFlow,
    updateFlow,
    deleteFlow,
    toggleFlowActive,
    reorderSlides,
    fetchSlides,
    fetchSurveys,
    clearError,
  }
})
