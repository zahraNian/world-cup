<script setup lang="ts">
import type { AppTheme } from '~/types'
import type { Component } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'

defineProps<{
  theme: AppTheme
  identifier: string
  statusText: string
  showWarning?: boolean
  badge: { bg: string; text: string; icon: Component }
}>()
</script>

<template>
  <div class="flex items-center justify-between p-2.5 glass-inset rounded-lg hover:bg-white/[0.08] transition-all">
    <div class="flex items-center gap-2 flex-1 min-w-0">
      <div class="min-w-0 flex-1">
        <div class="text-xs font-medium text-fg truncate">{{ identifier }}</div>
        <div class="text-[10px] flex items-center gap-0.5 mt-0.5" :class="badge.text">
          <component :is="badge.icon" class="w-2.5 h-2.5 flex-shrink-0" />
          <span class="truncate">{{ statusText }}</span>
        </div>
        <div v-if="showWarning" class="text-[10px] flex items-center gap-0.5 mt-1 text-amber-400">
          <AlertTriangle class="w-2.5 h-2.5 flex-shrink-0" />
          <span>هنوز احراز هویت نکرده — در محاسبه جایزه لحاظ نمی‌شود</span>
        </div>
      </div>
    </div>
  </div>
</template>
