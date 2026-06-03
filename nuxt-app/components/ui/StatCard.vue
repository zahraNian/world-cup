<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  value: string
  gradient: string
}>()
</script>

<template>
  <UiAppCard padding="sm" class="hover:shadow-lg transition-all">
    <div
      class="p-2 rounded-lg bg-gradient-to-br w-fit mb-2"
      :class="gradient"
    >
      <component :is="icon" class="w-4 h-4 text-white" />
    </div>
    <div class="text-[10px] text-fg-secondary mb-1">{{ label }}</div>
    <div class="text-sm font-bold text-fg">{{ value }}</div>
  </UiAppCard>
</template>
