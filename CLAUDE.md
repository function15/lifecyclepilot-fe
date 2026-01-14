# LifecyclePilot

## Project Overview

LifecyclePilot is a comprehensive subscription lifecycle management platform designed to reduce churn and maximize subscriber retention through intelligent cancellation flows, payment recovery, and reactivation campaigns. The frontend is built with Vue 3 + TypeScript and provides a modern, no-code interface for managing the complete subscriber lifecycle.

## Tech Stack

- **Framework**: Vue 3.5+ with Composition API (`<script setup>`)
- **Language**: TypeScript 5.9+
- **State Management**: Pinia 3.x
- **Routing**: Vue Router 4.x
- **Styling**: Tailwind CSS 3.4+ with custom plugins
- **UI Components**: Headless UI Vue + Heroicons
- **HTTP Client**: Axios
- **Build Tool**: Vite 7.x
- **Date Handling**: Moment.js with timezone support

## Core Features

### 1. Cancellation Flows

A sophisticated system for preventing subscription cancellations through personalized interventions and offers.

#### Key Capabilities
- **Personalization Engine**: Tailored experiences for every customer based on behavior, attributes, and history
- **Unlimited Cancel Flows**: Create and manage multiple cancellation prevention workflows
- **Customer Segmentation**: Advanced targeting with custom attributes and unlimited segments
- **A/B Testing**: Built-in experimentation engine to optimize conversion rates
- **Flexible Offers**:
  - Subscription pauses (temporary holds)
  - Discounts and promotional pricing
  - Payment delays
  - Plan downgrades/changes
  - Automatic trial extensions
- **Dynamic Branching**: Conditional logic that adapts flows based on user responses and attributes
- **Anti-Gamification**: Measures to prevent abuse of offers and maintain business integrity
- **No-Code Editor**: Visual builder for creating and modifying flows without development
- **Multi-Language Support**: Localized experiences for global audiences
- **Custom Branding**: White-label capabilities with custom CSS support
- **Team Collaboration**: Unlimited team members with role-based access
- **Access Control**: Block functionality for paused accounts

#### Technical Implementation Areas
```
src/components/cancellation/
  ├── FlowBuilder.vue          # Visual flow editor
  ├── FlowPreview.vue          # Real-time flow preview
  ├── SegmentBuilder.vue       # Customer segment configuration
  ├── ABTestManager.vue        # A/B test setup and analytics
  ├── OfferLibrary.vue         # Reusable offer templates
  └── BranchingLogic.vue       # Conditional flow logic editor

src/stores/cancellation.ts     # Pinia store for cancellation state
src/services/cancellation.ts   # API integration for flows
```

### 2. Payment Recovery

Automated dunning and payment retry system to recover failed payments and reduce involuntary churn.

#### Key Capabilities
- **Personalized Recovery**: Context-aware messaging based on customer history and payment failure reasons
- **Multi-Channel Campaigns**:
  - Unlimited email recovery campaigns
  - SMS recovery campaigns (optional)
- **Unlimited Scale**: Support for unlimited customers without volume restrictions
- **Pre-Optimized Templates**: Industry-tested email and SMS templates ready to deploy
- **Payment Processor Integration**: One-click setup with major payment gateways
- **Flexible Collection**:
  - Partial invoice collection
  - Future payment discounts
  - Payment plan options
- **Hosted Payment Flows**: Secure, branded payment update pages
- **Customer Portal Features**:
  - Billing history access
  - Cancellation notifications
  - Self-service payment updates
- **Precision Retries**: Smart retry logic that outperforms industry standards
- **No-Code Management**: Visual editor for campaign creation and modification
- **Access Control**: Block functionality for past-due accounts
- **Multi-Language Support**: Localized recovery communications
- **Custom Branding**: Match your brand identity

#### Technical Implementation Areas
```
src/components/payment-recovery/
  ├── CampaignBuilder.vue      # Email/SMS campaign editor
  ├── RetryScheduler.vue       # Smart retry timing configuration
  ├── PaymentPortal.vue        # Hosted payment update interface
  ├── BillingHistory.vue       # Customer-facing billing records
  ├── DunningAnalytics.vue     # Recovery performance metrics
  └── PartialPayment.vue       # Partial invoice collection flow

src/stores/payment-recovery.ts # Pinia store for dunning state
src/services/payment.ts        # Payment gateway integrations
```

### 3. Reactivation Campaigns

Win-back campaigns to re-engage churned subscribers and drive reactivations.

#### Key Capabilities
- **Hyper-Personalization**: Leverage cancel reasons, customer health scores, and behavioral data
- **Unlimited Campaigns**: Create multiple win-back workflows for different scenarios
- **Advanced Segmentation**: Target specific cohorts with custom attributes
- **Enhanced Timing Logic**: Optimal send times based on customer behavior and time zones
- **Deliverability Optimization**: Email infrastructure tuned for maximum inbox placement
- **Data-Driven Targeting**:
  - Cancel reason analysis
  - Customer health scores
  - Engagement history
  - Lifetime value
  - Churn risk indicators
- **One-Click Reactivation**: Frictionless re-subscription experiences
- **Hosted Flows**: Branded reactivation landing pages
- **No-Code Tools**: Visual campaign builder and editor
- **Fallback Logic**: Handle every edge case gracefully
- **Multi-Language Support**: Localized win-back messaging
- **Custom Branding**: Maintain brand consistency
- **Payment Updates**: Allow customers to update billing info during reactivation

#### Technical Implementation Areas
```
src/components/reactivation/
  ├── CampaignBuilder.vue      # Win-back campaign editor
  ├── SegmentBuilder.vue       # Churned customer segmentation
  ├── TimingOptimizer.vue      # Send time optimization
  ├── ReactivationPortal.vue   # One-click resubscribe flow
  ├── CancelReasonAnalysis.vue # Churn reason analytics
  └── HealthScoring.vue        # Customer health metrics

src/stores/reactivation.ts     # Pinia store for reactivation state
src/services/reactivation.ts   # API integration for campaigns
```

## Project Structure

```
lifecyclepilot/
├── public/                    # Static assets served by Vite
├── src/
│   ├── assets/               # Images, fonts, global styles
│   ├── components/           # Vue components
│   │   ├── cancellation/    # Cancellation flow components
│   │   ├── payment-recovery/ # Payment recovery components
│   │   ├── reactivation/    # Reactivation campaign components
│   │   ├── settings/        # Settings and configuration
│   │   ├── sidebar/         # Navigation components
│   │   └── shared/          # Reusable UI components
│   ├── router/              # Vue Router configuration
│   ├── stores/              # Pinia state management
│   │   ├── auth.ts          # Authentication state
│   │   ├── user.ts          # User profile state
│   │   ├── cancellation.ts  # Cancellation flows state
│   │   ├── payment-recovery.ts
│   │   └── reactivation.ts
│   ├── services/            # API service layer
│   │   ├── api.ts           # Base Axios configuration
│   │   ├── cancellation.ts
│   │   ├── payment.ts
│   │   └── reactivation.ts
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions
│   ├── Constants.ts         # App-wide constants
│   ├── App.vue              # Root component
│   └── main.ts              # Application entry point
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── eslint.config.js         # Additional ESLint rules
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Development Workflow

### Initial Setup
```bash
# Install Node Version Manager (if not installed)
# Install Node 18.12.1
nvm install 18.12.1
nvm use 18.12.1

# Install dependencies
npm install
```

### Development Commands
```bash
# Start dev server with linting and type checking
npm run dev

# Type check without building
npm run type-check

# Lint and auto-fix issues
npm run lint

# Format code with Prettier
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style Guidelines

#### Vue Components
- Use Vue 3 Composition API with `<script setup>` syntax
- Component filenames in `PascalCase.vue`
- Single-file components with TypeScript
- Props should be typed with `defineProps<T>()`
- Emits should be typed with `defineEmits<T>()`

#### TypeScript
- Enable strict mode
- Prefer interfaces over types for object shapes
- Use type inference where possible
- Avoid `any` - use `unknown` or proper types

#### Styling
- Mobile-first Tailwind utility classes
- Group related utilities (layout, spacing, typography)
- Use Headless UI for interactive components
- Custom CSS only when necessary (via Tailwind plugins)

#### State Management
- Pinia stores in `camelCase`
- One store per feature domain
- Use `storeToRefs()` for reactive destructuring
- Keep business logic in stores, not components

#### API Integration
- Centralized Axios instance in `services/api.ts`
- Feature-specific service modules
- Proper error handling and loading states
- Type API responses with interfaces

## Feature Development Guidelines

### Adding a New Feature
1. **Plan the Architecture**: Identify components, stores, services, and types needed
2. **Create Type Definitions**: Define TypeScript interfaces in `src/types/`
3. **Build the Store**: Implement Pinia store for state management
4. **Create API Service**: Add service module for backend communication
5. **Build UI Components**: Create Vue components with Tailwind styling
6. **Add Routes**: Configure routes in `src/router/`
7. **Test Manually**: Verify functionality across browsers
8. **Document**: Update this file with feature details

### Cross-Feature Patterns

#### No-Code Editors
All three core features share a common no-code editor pattern:
- Drag-and-drop interface builders
- Real-time preview
- Template library
- Version history
- Import/export capabilities

#### Personalization Engine
Shared personalization infrastructure:
- Customer attribute system
- Segmentation builder
- A/B testing framework
- Dynamic content rendering
- Multi-language support

#### Custom Branding
White-label capabilities across all features:
- Logo and color customization
- Custom CSS injection
- Domain mapping
- Email template branding
- Hosted page styling

## Common Patterns

### Loading States
```typescript
import { ref } from 'vue'

const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  try {
    const data = await apiService.getData()
    return data
  } catch (err) {
    error.value = 'Failed to load data'
  } finally {
    isLoading.value = false
  }
}
```

### Form Handling
```typescript
import { reactive } from 'vue'

const form = reactive({
  field1: '',
  field2: ''
})

const errors = reactive({
  field1: '',
  field2: ''
})

const validate = () => {
  // Validation logic
}

const submit = async () => {
  if (!validate()) return
  await apiService.submit(form)
}
```

### Store Pattern
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFeatureStore = defineStore('feature', () => {
  // State
  const items = ref<Item[]>([])
  const loading = ref(false)

  // Getters
  const activeItems = computed(() =>
    items.value.filter(item => item.active)
  )

  // Actions
  const fetchItems = async () => {
    loading.value = true
    try {
      items.value = await apiService.getItems()
    } finally {
      loading.value = false
    }
  }

  return { items, loading, activeItems, fetchItems }
})
```

## Key Dependencies

### UI Framework
- **Vue 3**: Progressive JavaScript framework
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: SVG icon library
- **Tailwind CSS**: Utility-first CSS framework

### State & Routing
- **Pinia**: Vue state management
- **Vue Router**: Official router for Vue

### HTTP & API
- **Axios**: Promise-based HTTP client

### Utilities
- **Moment.js**: Date/time manipulation
- **Unhead**: Document head management

### Development Tools
- **Vite**: Next-generation frontend tooling
- **TypeScript**: Typed JavaScript
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **vue-tsc**: Vue TypeScript compiler

## Environment Configuration

### Environment Variables
Create `.env` files for environment-specific configuration:

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=LifecyclePilot Dev

# .env.production
VITE_API_BASE_URL=https://api.lifecyclepilot.com
VITE_APP_NAME=LifecyclePilot
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## Testing Strategy

Testing infrastructure is not yet implemented. When adding tests:

- Use **Vitest** for unit testing
- Use **@vue/test-utils** for component testing
- Co-locate tests: `ComponentName.spec.ts`
- Mock network calls in `services/__mocks__/`
- Aim for coverage of critical business logic
- Test user interactions and edge cases

## Performance Considerations

- Lazy-load routes with `() => import()`
- Use `v-show` for frequently toggled elements
- Implement virtual scrolling for large lists
- Debounce expensive operations (search, autosave)
- Optimize images and assets in `public/`
- Code-split vendor bundles in Vite config

## Accessibility

- Use semantic HTML elements
- Provide ARIA labels for interactive elements
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers
- Use Headless UI for accessible patterns

## Security Best Practices

- Validate and sanitize user input
- Use HTTPS in production
- Implement CSRF protection
- Secure authentication tokens
- Avoid exposing sensitive data in frontend
- Regularly update dependencies

## Deployment

### Build for Production
```bash
npm run build
```

Output goes to `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment Targets
- **Static Hosting**: Netlify, Vercel, AWS S3 + CloudFront
- **Container**: Docker with Nginx
- **CDN**: CloudFlare, Fastly

## Troubleshooting

### Common Issues

**TypeScript errors after dependency update:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run type-check
```

**Vite dev server not hot-reloading:**
- Check file watchers limit on Linux
- Restart dev server
- Clear browser cache

**Tailwind classes not applying:**
- Check `tailwind.config.js` content paths
- Verify PostCSS is configured
- Restart dev server

**ESLint/Prettier conflicts:**
- Run `npm run format` then `npm run lint`
- Check for conflicting rules in configs

## Contributing

### Commit Guidelines
- Use imperative mood ("Add feature" not "Added feature")
- Keep subject line under 72 characters
- Reference issue numbers in commit body
- Avoid placeholder messages like "x" or "update"

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with clear commits
3. Run `npm run lint` and `npm run type-check`
4. Update documentation if needed
5. Create PR with:
   - Clear description of changes
   - Manual verification steps
   - Screenshots for UI changes
   - List of follow-up tasks

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Headless UI Documentation](https://headlessui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

## Support

For questions or issues:
- Check existing documentation
- Review similar implementations in codebase
- Consult team members
- Create GitHub issue with reproduction steps

## License

Proprietary - All rights reserved

---

**Last Updated**: 2026-01-13
**Version**: 0.0.0
**Maintained By**: LifecyclePilot Team
