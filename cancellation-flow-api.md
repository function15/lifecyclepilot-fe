# Cancellation Flow — API Endpoint Signatures

Base URL: `/api/v1`
Auth: Bearer token on all routes (omitted from individual signatures for brevity)

---

## 1. Cancellation Flows

### GET `/tenants/:tenantId/cancellation-flows`
Returns all cancellation flows for a tenant.

**Response `200`**
```ts
{
  data: CancellationFlow[]
}

type CancellationFlow = {
  _id: string
  tenant_id: string
  name: string
  is_active: boolean
  slides: {
    slide_id: string
    order: number
    is_mandatory: boolean
    is_enabled: boolean
  }[]
  survey_id: string
  stats: {
    total_shown: number
    total_kept: number
    total_cancelled: number
  }
  created_at: string   // ISO 8601
  updated_at: string
}
```

---

### GET `/tenants/:tenantId/cancellation-flows/:flowId`
Returns a single flow with fully populated slides and survey.

**Response `200`**
```ts
{
  data: CancellationFlow & {
    slides_populated: CancellationSlide[]
    survey_populated: CancellationSurvey
  }
}
```

---

### POST `/tenants/:tenantId/cancellation-flows`
Creates a new cancellation flow.

**Request Body**
```ts
{
  name: string
  survey_id: string
  slides?: {
    slide_id: string
    order: number
    is_mandatory?: boolean   // defaults to false; only first slide should be true
    is_enabled?: boolean     // defaults to true
  }[]
}
```

**Response `201`**
```ts
{ data: CancellationFlow }
```

---

### PATCH `/tenants/:tenantId/cancellation-flows/:flowId`
Updates flow metadata or slide order/enabled state.

**Request Body** *(all fields optional)*
```ts
{
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
```

**Response `200`**
```ts
{ data: CancellationFlow }
```

---

### DELETE `/tenants/:tenantId/cancellation-flows/:flowId`
Soft-deletes a flow (sets `is_active: false`). Does not delete slides or surveys.

**Response `200`**
```ts
{ message: "Flow deactivated" }
```

---

### PATCH `/tenants/:tenantId/cancellation-flows/:flowId/slides/reorder`
Reorders slides within a flow.

**Request Body**
```ts
{
  slides: {
    slide_id: string
    order: number        // new 1-based position
  }[]
}
```

**Response `200`**
```ts
{ data: CancellationFlow }
```

---

## 2. Cancellation Slides

### GET `/tenants/:tenantId/cancellation-slides`
Returns all slides belonging to a tenant.

**Query Params**
```
?type=benefits|offer|testimonial|custom   // optional filter
```

**Response `200`**
```ts
{ data: CancellationSlide[] }

type CancellationSlide = {
  _id: string
  tenant_id: string
  template_id: string | null
  name: string
  type: "benefits" | "offer" | "testimonial" | "custom"
  content: {
    html: string
    css: string
  }
  structured_content: {
    header_1: string
    header_2: string
    sub_header: string
    benefits: {
      icon_url: string
      label: string
      order: number
    }[]
  }
  buttons: {
    keep: { label: string; is_visible: boolean }
    continue: { label: string; is_visible: boolean }
  }
  created_at: string
  updated_at: string
}
```

---

### GET `/tenants/:tenantId/cancellation-slides/:slideId`
Returns a single slide.

**Response `200`**
```ts
{ data: CancellationSlide }
```

---

### POST `/tenants/:tenantId/cancellation-slides`
Creates a new slide, either from scratch or cloned from a platform template.

**Request Body**
```ts
{
  name: string
  type: "benefits" | "offer" | "testimonial" | "custom"
  template_id?: string         // if provided, pre-fills content from template
  content?: {
    html?: string
    css?: string
  }
  structured_content?: {
    header_1?: string
    header_2?: string
    sub_header?: string
    benefits?: {
      icon_url: string
      label: string
      order: number
    }[]
  }
  buttons?: {
    keep?: { label?: string; is_visible?: boolean }
    continue?: { label?: string; is_visible?: boolean }
  }
}
```

**Response `201`**
```ts
{ data: CancellationSlide }
```

---

### POST `/tenants/:tenantId/cancellation-slides/from-template/:templateId`
Clones a platform template into a new tenant slide. Convenience shorthand for the above.

**Request Body**
```ts
{
  name: string   // tenant's internal label for the cloned slide
}
```

**Response `201`**
```ts
{ data: CancellationSlide }
```

---

### PATCH `/tenants/:tenantId/cancellation-slides/:slideId`
Updates any part of a slide.

**Request Body** *(all fields optional)*
```ts
{
  name?: string
  type?: "benefits" | "offer" | "testimonial" | "custom"
  content?: {
    html?: string
    css?: string
  }
  structured_content?: {
    header_1?: string
    header_2?: string
    sub_header?: string
    benefits?: {
      icon_url?: string
      label?: string
      order?: number
    }[]
  }
  buttons?: {
    keep?: { label?: string; is_visible?: boolean }
    continue?: { label?: string; is_visible?: boolean }
  }
}
```

**Response `200`**
```ts
{ data: CancellationSlide }
```

---

### POST `/tenants/:tenantId/cancellation-slides/:slideId/compile-html`
Compiles `structured_content` into the `content.html` field and saves. 
Use when tenant edits the visual editor (not raw HTML).

**Response `200`**
```ts
{ data: CancellationSlide }   // returned with updated content.html
```

---

### DELETE `/tenants/:tenantId/cancellation-slides/:slideId`
Deletes a slide. Returns `409` if slide is currently used by an active flow.

**Response `200`**
```ts
{ message: "Slide deleted" }
```

**Response `409`**
```ts
{ error: "Slide is referenced by one or more active flows", flow_ids: string[] }
```

---

## 3. Slide Templates (Platform-level)

### GET `/slide-templates`
Returns all active platform slide templates (available to all tenants).

**Query Params**
```
?type=benefits|offer|testimonial|custom
```

**Response `200`**
```ts
{ data: SlideTemplate[] }

type SlideTemplate = {
  _id: string
  name: string
  type: "benefits" | "offer" | "testimonial" | "custom"
  description: string
  thumbnail_url: string
  default_content: { html: string; css: string }
  default_structured_content: {
    header_1: string
    header_2: string
    sub_header: string
    benefits: { icon_url: string; label: string; order: number }[]
  }
  default_buttons: {
    keep: { label: string; is_visible: boolean }
    continue: { label: string; is_visible: boolean }
  }
  is_active: boolean
  created_at: string
}
```

---

### GET `/slide-templates/:templateId`
Returns a single template.

**Response `200`**
```ts
{ data: SlideTemplate }
```

---

### POST `/slide-templates`
*(Admin-only)* Creates a new platform template.

**Request Body**
```ts
{
  name: string
  type: "benefits" | "offer" | "testimonial" | "custom"
  description: string
  thumbnail_url: string
  default_content: { html: string; css?: string }
  default_structured_content?: {
    header_1?: string
    header_2?: string
    sub_header?: string
    benefits?: { icon_url: string; label: string; order: number }[]
  }
  default_buttons?: {
    keep?: { label: string; is_visible: boolean }
    continue?: { label: string; is_visible: boolean }
  }
}
```

**Response `201`**
```ts
{ data: SlideTemplate }
```

---

### PATCH `/slide-templates/:templateId`
*(Admin-only)* Updates a platform template. Does NOT cascade to existing tenant slides.

**Request Body** *(all optional)*
```ts
{
  name?: string
  description?: string
  thumbnail_url?: string
  is_active?: boolean
  default_content?: { html?: string; css?: string }
  default_structured_content?: { ... }
  default_buttons?: { ... }
}
```

**Response `200`**
```ts
{ data: SlideTemplate }
```

---

## 4. Cancellation Surveys

### GET `/tenants/:tenantId/cancellation-surveys`
Returns all surveys for a tenant.

**Response `200`**
```ts
{ data: CancellationSurvey[] }

type CancellationSurvey = {
  _id: string
  tenant_id: string
  header_1: string
  header_2: string
  options: {
    _id: string
    label: string
    order: number
    is_other: boolean   // if true, renders a free-text input
  }[]
  cancel_button_label: string
  allow_free_text: boolean
  created_at: string
  updated_at: string
}
```

---

### GET `/tenants/:tenantId/cancellation-surveys/:surveyId`
Returns a single survey.

**Response `200`**
```ts
{ data: CancellationSurvey }
```

---

### POST `/tenants/:tenantId/cancellation-surveys`
Creates a new survey.

**Request Body**
```ts
{
  header_1: string
  header_2: string
  cancel_button_label: string
  allow_free_text?: boolean   // defaults to false
  options: {
    label: string
    order: number
    is_other?: boolean        // defaults to false
  }[]
}
```

**Response `201`**
```ts
{ data: CancellationSurvey }
```

---

### PATCH `/tenants/:tenantId/cancellation-surveys/:surveyId`
Updates a survey. Replaces `options` array in full if provided.

**Request Body** *(all optional)*
```ts
{
  header_1?: string
  header_2?: string
  cancel_button_label?: string
  allow_free_text?: boolean
  options?: {
    _id?: string       // include to update an existing option; omit to create new
    label?: string
    order?: number
    is_other?: boolean
  }[]
}
```

**Response `200`**
```ts
{ data: CancellationSurvey }
```

---

### DELETE `/tenants/:tenantId/cancellation-surveys/:surveyId`
Deletes a survey. Returns `409` if attached to an active flow.

**Response `200`**
```ts
{ message: "Survey deleted" }
```

**Response `409`**
```ts
{ error: "Survey is referenced by an active flow", flow_id: string }
```

---

## 5. Cancellation Events (Analytics)

### POST `/cancellation-events`
Records a cancellation flow interaction from the end-user-facing client.

**Request Body**
```ts
{
  tenant_id: string
  flow_id: string
  end_user_id: string
  subscription_id: string
  outcome: "kept" | "cancelled" | "abandoned"
  kept_on_slide?: number          // 1-based slide order; required if outcome = "kept"
  slides_shown: string[]          // ordered array of slide ObjectIds shown to user
  survey_response?: {
    survey_id: string
    selected_option_ids: string[]
    free_text?: string
  }
}
```

**Response `201`**
```ts
{ data: { event_id: string } }
```

---

### GET `/tenants/:tenantId/cancellation-events`
Returns paginated event log for a tenant.

**Query Params**
```
?flow_id=...            // filter by flow
?outcome=kept|cancelled|abandoned
?from=ISO8601           // date range start
?to=ISO8601             // date range end
?page=1
?limit=50
```

**Response `200`**
```ts
{
  data: CancellationEvent[]
  pagination: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

type CancellationEvent = {
  _id: string
  tenant_id: string
  flow_id: string
  end_user_id: string
  subscription_id: string
  started_at: string
  completed_at: string
  outcome: "kept" | "cancelled" | "abandoned"
  kept_on_slide: number | null
  slides_shown: string[]
  survey_response: {
    survey_id: string
    selected_option_ids: string[]
    free_text: string | null
  } | null
}
```

---

### GET `/tenants/:tenantId/cancellation-events/summary`
Returns aggregated analytics for the admin dashboard.

**Query Params**
```
?flow_id=...
?from=ISO8601
?to=ISO8601
```

**Response `200`**
```ts
{
  data: {
    total_shown: number
    total_kept: number
    total_cancelled: number
    total_abandoned: number
    keep_rate: number            // 0.0–1.0
    cancellation_rate: number
    kept_by_slide: {             // which slide triggered "Keep" most
      slide_order: number
      count: number
    }[]
    survey_results: {
      option_id: string
      label: string
      count: number
      percentage: number
    }[]
  }
}
```

---

## Error Schema (all endpoints)

```ts
// 4xx / 5xx
{
  error: string        // human-readable message
  code?: string        // machine-readable slug e.g. "SLIDE_IN_USE"
  details?: object     // optional extra context
}
```

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `400` | Bad request / validation error |
| `401` | Unauthenticated |
| `403` | Forbidden (wrong tenant) |
| `404` | Resource not found |
| `409` | Conflict (e.g. deleting a resource in use) |
| `500` | Internal server error |
