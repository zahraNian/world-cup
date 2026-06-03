<script setup lang="ts">
import { useAbrBusSubscriptions } from '~/shared/composables/useAbrBusSubscriptions.js'

useAbrBusSubscriptions()
</script>

<template>
  <div
    class="h-screen flex flex-col bg-no-repeat bg-fixed bg-center site-bg"
    dir="rtl"
  >
    <NuxtPage />
  </div>
</template>
