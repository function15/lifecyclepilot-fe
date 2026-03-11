export interface FlowSlideRef {
  slide_id: string
  order: number
  is_mandatory: boolean
  is_enabled: boolean
}

export interface FlowStats {
  total_shown: number
  total_kept: number
  total_cancelled: number
}

export interface CancellationFlow {
  _id: string
  tenant_id: string
  name: string
  is_active: boolean
  slides: FlowSlideRef[]
  survey_id: string
  stats: FlowStats
  created_at: string
  updated_at: string
}

export interface SlideButton {
  label: string
  is_visible: boolean
}

export interface SlideBenefit {
  icon_url: string
  label: string
  order: number
}

export interface SlideContent {
  html: string
  css: string
}

export interface SlideStructuredContent {
  header_1: string
  header_2: string
  sub_header: string
  benefits: SlideBenefit[]
}

export interface CancellationSlide {
  _id: string
  tenant_id: string
  template_id: string | null
  name: string
  type: 'benefits' | 'offer' | 'testimonial' | 'custom'
  content: SlideContent
  structured_content: SlideStructuredContent
  buttons: {
    keep: SlideButton
    continue: SlideButton
  }
  created_at: string
  updated_at: string
}

export interface SlideTemplate {
  _id: string
  name: string
  type: 'benefits' | 'offer' | 'testimonial' | 'custom'
  description: string
  thumbnail_url: string
  default_content: SlideContent
  default_structured_content: SlideStructuredContent
  default_buttons: {
    keep: SlideButton
    continue: SlideButton
  }
  is_active: boolean
  created_at: string
}

export interface SurveyOption {
  id: string
  label: string
  order: number
  other: boolean
}

export interface CancellationSurvey {
  id: string
  tenantId: string
  header1: string | null
  header2: string | null
  options: SurveyOption[]
  cancelButtonLabel: string | null
  allowFreeText: boolean
  createdAt: number
  updatedAt: number
}

export interface CancellationFlowDetailed extends CancellationFlow {
  slides_populated: CancellationSlide[]
  survey_populated: CancellationSurvey
}

export interface CreateSurveyRequest {
  header_1: string
  header_2: string
  options: { label: string; order: number; other: boolean }[]
  cancel_button_label: string
  allow_free_text: boolean
}

export interface CreateFlowRequest {
  name: string
  survey_id: string
  slides?: {
    slide_id: string
    order: number
    is_mandatory?: boolean
    is_enabled?: boolean
  }[]
}

export interface UpdateFlowRequest {
  name?: string
  is_active?: boolean
  survey_id?: string
  slides?: {
    slide_id: string
    order: number
    is_mandatory?: boolean
    is_enabled?: boolean
  }[]
}
