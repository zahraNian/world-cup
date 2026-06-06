<script setup lang="ts">
import { useAbrBusSubscriptions } from '~/shared/composables/useAbrBusSubscriptions.js'

useAbrBusSubscriptions()

const { brand } = useBrand()

useHead({
  title: () => brand.value.title,
})
</script>

<template>
  <div
    class="h-screen flex flex-col bg-no-repeat bg-fixed bg-center site-bg"
    dir="rtl"
  >
    <NuxtPage />
  </div>
</template>
