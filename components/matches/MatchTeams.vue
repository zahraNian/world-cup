<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
import { getTeamFlagUrl, getTeamName } from '~/shared/constants/teams'

const props = defineProps<{
  firstItem: string
  secondItem: string
  accentClass?: string
  blurred?: boolean
  compact?: boolean
}>()

const firstTeamFlag = computed(() => getTeamFlagUrl(props.firstItem))
const secondTeamFlag = computed(() => getTeamFlagUrl(props.secondItem))
</script>

<template>
  <div
    class="flex items-center justify-center min-w-0"
    :class="[compact ? 'gap-3' : 'gap-4', { 'blur-[0.5px]': blurred }]"
  >
    <div class="flex flex-col items-center flex-1 min-w-0" :class="compact ? 'gap-1' : 'gap-1.5'">
      <img
        v-if="firstTeamFlag"
        :src="firstTeamFlag"
        :alt="getTeamName(firstItem)"
        class="object-cover rounded shadow-sm ring-1 ring-white/10"
        :class="compact ? 'w-8 h-5' : 'w-12 h-8'"
        loading="lazy"
      />
      <div
        class="font-bold text-fg text-center truncate w-full"
        :class="compact ? 'text-xs' : 'text-sm'"
      >
        {{ getTeamName(firstItem) }}
      </div>
    </div>

    <div class="flex flex-col items-center gap-0.5 flex-shrink-0">
      <Zap class="flex-shrink-0" :class="[accentClass, compact ? 'w-3 h-3' : 'w-3 h-3']" />
      <div class="text-[10px] font-bold text-fg-faint">VS</div>
    </div>

    <div class="flex flex-col items-center flex-1 min-w-0" :class="compact ? 'gap-1' : 'gap-1.5'">
      <img
        v-if="secondTeamFlag"
        :src="secondTeamFlag"
        :alt="getTeamName(secondItem)"
        class="object-cover rounded shadow-sm ring-1 ring-white/10"
        :class="compact ? 'w-8 h-5' : 'w-12 h-8'"
        loading="lazy"
      />
      <div
        class="font-bold text-fg text-center truncate w-full"
        :class="compact ? 'text-xs' : 'text-sm'"
      >
        {{ getTeamName(secondItem) }}
      </div>
    </div>
  </div>
</template>
