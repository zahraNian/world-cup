<script setup lang="ts">
defineProps<{
  padding?: 'sm' | 'md' | 'lg'
}>()

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}
</script>

<template>
  <div
    class="glass rounded-xl transition-all duration-300"
    :class="paddingClasses[padding ?? 'md']"
  >
    <slot />
  </div>
</template>
