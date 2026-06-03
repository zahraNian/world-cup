<script setup lang="ts">
import type { AppTheme, ReferredUser } from '~/types'
import type { Component } from 'vue'

const props = defineProps<{
  theme: AppTheme
  user: ReferredUser
  badge: { bg: string; text: string; icon: Component }
}>()

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <div class="flex items-center justify-between p-2.5 bg-surface-inset rounded-lg hover:bg-surface-hover border border-line/50 transition-all">
    <div class="flex items-center gap-2 flex-1 min-w-0">
      <div class="min-w-0 flex-1">
        <div class="text-xs font-medium text-fg truncate">{{ user.name }}</div>
        <div class="text-[10px] flex items-center gap-0.5 mt-0.5" :class="badge.text">
          <component :is="badge.icon" class="w-2.5 h-2.5 flex-shrink-0" />
          <span class="truncate">{{ user.statusText }}</span>
        </div>
      </div>
    </div>
    <div class="text-xs font-bold flex-shrink-0 mr-2" :class="themeClasses.text">
      +{{ formatFaNumber(user.reward) }}
    </div>
  </div>
</template>
