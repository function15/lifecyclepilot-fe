# Repository Guidelines

## Project Structure & Module Organization
The frontend lives in `src/`, organized by Vue feature folders: `components/` for reusable UI, `views/` for route targets, `stores/` for Pinia state, `router/` for route definitions, and `services/` for API adapters. Shared enums and constants sit in `Constants.ts`, while assets belong in `src/assets/`. Static files served by Vite belong in `public/`. Sample import data is stored under `sample/trades.json`; keep additional fixtures there. Configuration roots—`vite.config.ts`, `tailwind.config.js`, and `eslint.config.js`—stay at the project root for discoverability.

## Build, Test, and Development Commands
Run `npm install` once to sync dependencies. `npm run dev` performs linting, type checks, and then launches Vite’s dev server. Use `npm run build` for a production bundle; it runs `vue-tsc` before `vite build`. Preview a built bundle with `npm run preview`. Lint fixes can be applied with `npm run lint`. Format Vue and TypeScript sources via `npm run format`. When editing types, run `npm run type-check` to validate without rebuilding.

## Coding Style & Naming Conventions
The project uses Vue 3 + `<script setup>` with TypeScript. Prefer single-file components in `PascalCase.vue`; export Pinia stores and composables in `camelCase`. Keep filenames aligned with their default export. Prettier (3.x) enforces two-space indentation, and ESLint with `@vue/eslint-config-typescript` handles import order and Vue-specific rules. Tailwind utility classes should follow mobile-first ordering and group related concerns (layout, spacing, typography).

## Testing Guidelines
Automated testing has not been wired up yet. When adding tests, co-locate them next to the feature (`ComponentName.spec.ts`) and use vitest + @vue/test-utils for unit coverage. Mock network calls under `services/__mocks__/`. Ensure new tests run via `npm run test` once the script is introduced.

## Commit & Pull Request Guidelines
Recent history contains placeholder commit subjects (“x”), so improve clarity by writing imperative, concise summaries (e.g., “Add trade timeline chart”). Reference issue numbers in the body when available. Pull requests should describe the user-facing change, list manual verification steps, and include screenshots or GIFs for UI updates. Mention any follow-up tasks and ensure CI passes before requesting review.
