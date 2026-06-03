<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white px-4" dir="rtl">
    <div class="text-center max-w-md">
      <h1 class="text-2xl font-bold mb-2">خطا در اتصال به سرور</h1>
      <p class="text-white/70 mb-6 text-sm">
        اتصال به سرویس backend برقرار نشد. لطفاً بعداً دوباره تلاش کنید.
      </p>
      <button
        type="button"
        class="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
        @click="reload"
      >
        تلاش مجدد
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
function reload() {
  if (import.meta.client) {
    window.location.href = '/'
  }
}
</script>
