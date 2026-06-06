# World Cup Prediction — Nuxt 3

Persian RTL World Cup prediction campaign UI, converted from the Figma/React export in `../figma-output`.

## Stack

- Nuxt 3
- Vue 3 (Composition API + `<script setup>`)
- Tailwind CSS
- lucide-vue-next

## Run

```bash
npm install
npm run dev
```

## Component structure

```
components/
├── ui/              # Reusable primitives (AppCard, StatCard, Pagination, …)
├── layout/          # AppHeader
├── leaderboard/     # Panel, Row, UserRankCard
├── matches/         # Section, MatchCard
├── rewards/         # Section, ReferredUserRow
└── history/         # PredictionHistory

composables/
└── useTheme.ts      # Theme state + class helpers

stores/
└── campaign.ts      # Campaign API state (Pinia)

shared/
├── utils/campaign.ts
└── constants/campaign.js

types/
└── index.ts         # Shared TypeScript types
```

## Theme

Toggle between `orange` and `green` via the palette button in the header. Theme classes are centralized in `useThemeClasses()`.
