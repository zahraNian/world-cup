<script setup lang="ts">
import type { AppTheme } from '~/types'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  theme: AppTheme
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const themeClasses = computed(() => useThemeClasses(props.theme))

function goTo(page: number) {
  emit('update:currentPage', page)
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-line"
  >
    <button
      type="button"
      class="p-1.5 rounded-lg glass-inset hover:bg-white/[0.08] text-fg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      :disabled="currentPage === 1"
      @click="goTo(Math.max(1, currentPage - 1))"
    >
      <ChevronRight class="w-4 h-4" />
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      type="button"
      class="w-7 h-7 rounded-lg transition-all text-xs font-bold"
      :class="
        currentPage === page
          ? `${themeClasses.gradient} text-white shadow-md`
          : 'glass-inset text-fg-secondary hover:bg-white/[0.08]'
      "
      @click="goTo(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="p-1.5 rounded-lg glass-inset hover:bg-white/[0.08] text-fg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      :disabled="currentPage === totalPages"
      @click="goTo(Math.min(totalPages, currentPage + 1))"
    >
      <ChevronLeft class="w-4 h-4" />
    </button>
  </div>
</template>
