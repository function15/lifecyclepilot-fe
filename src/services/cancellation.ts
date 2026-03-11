import apiClient from '@/services/ApiClient'
import type {
  CancellationFlow,
  CancellationFlowDetailed,
  CancellationSlide,
  CancellationSurvey,
  CreateFlowRequest,
  UpdateFlowRequest,
  CreateSurveyRequest,
} from '@/types/cancellation'

const BASE = '/api/v1'

// Flows

export async function getFlows(tenantId: string): Promise<CancellationFlow[]> {
  const res = await apiClient.get(`${BASE}/tenants/${tenantId}/cancellation-flows`)
  return res.data.data
}

export async function getFlow(tenantId: string, flowId: string): Promise<CancellationFlowDetailed> {
  const res = await apiClient.get(`${BASE}/tenants/${tenantId}/cancellation-flows/${flowId}`)
  return res.data.data
}

export async function createFlow(tenantId: string, payload: CreateFlowRequest): Promise<CancellationFlow> {
  const res = await apiClient.post(`${BASE}/tenants/${tenantId}/cancellation-flows`, payload)
  return res.data.data
}

export async function updateFlow(
  tenantId: string,
  flowId: string,
  payload: UpdateFlowRequest,
): Promise<CancellationFlow> {
  const res = await apiClient.patch(`${BASE}/tenants/${tenantId}/cancellation-flows/${flowId}`, payload)
  return res.data.data
}

export async function deleteFlow(tenantId: string, flowId: string): Promise<void> {
  await apiClient.delete(`${BASE}/tenants/${tenantId}/cancellation-flows/${flowId}`)
}

export async function reorderFlowSlides(
  tenantId: string,
  flowId: string,
  slides: { slide_id: string; order: number }[],
): Promise<CancellationFlow> {
  const res = await apiClient.patch(
    `${BASE}/tenants/${tenantId}/cancellation-flows/${flowId}/slides/reorder`,
    { slides },
  )
  return res.data.data
}

// Slides

export async function getSlides(tenantId: string, type?: string): Promise<CancellationSlide[]> {
  const params = type ? { type } : {}
  const res = await apiClient.get(`${BASE}/tenants/${tenantId}/cancellation-slides`, { params })
  return res.data.data
}

export async function deleteSlide(tenantId: string, slideId: string): Promise<void> {
  await apiClient.delete(`${BASE}/tenants/${tenantId}/cancellation-slides/${slideId}`)
}

// Surveys

export async function getSurveys(tenantId: string): Promise<CancellationSurvey[]> {
  const res = await apiClient.get(`${BASE}/tenants/${tenantId}/cancellation-surveys`)
  return res.data.data
}

export async function createSurvey(tenantId: string, payload: CreateSurveyRequest): Promise<CancellationSurvey> {
  const res = await apiClient.post(`${BASE}/tenants/${tenantId}/cancellation-surveys`, payload)
  return res.data.data
}

export async function deleteSurvey(tenantId: string, surveyId: string): Promise<void> {
  await apiClient.delete(`${BASE}/tenants/${tenantId}/cancellation-surveys/${surveyId}`)
}
