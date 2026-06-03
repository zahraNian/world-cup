<script setup lang="ts">
defineProps<{
  label: string
  bgClass: string
  textClass: string
}>()
</script>

<template>
  <span
    class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold"
    :class="[bgClass, textClass]"
  >
    {{ label }}
  </span>
</template>
