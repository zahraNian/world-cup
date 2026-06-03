<script setup lang="ts">
import type { AppTheme } from '~/types'

const props = defineProps<{
  theme: AppTheme
  active?: boolean
  size?: 'sm' | 'md'
}>()

const themeClasses = computed(() => useThemeClasses(props.theme))

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
}
</script>

<template>
  <button
    type="button"
    class="border rounded-lg transition-all font-medium"
    :class="[
      sizeClasses[size ?? 'sm'],
      active
        ? `${themeClasses.lightBg} ${themeClasses.border} shadow-md`
        : 'bg-surface-inset text-fg-secondary hover:bg-surface-hover border-line hover:border-line-strong',
    ]"
  >
    <slot />
  </button>
</template>
