<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h5)))
</script>

<template>
  <h5 :id="props.id" class="prose-headings dark:invert dark:hue-rotate-180">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h5>
</template>

<style scoped>
a {
    text-decoration: none !important;
}

a:hover::before {
    @apply text-neutral-500;
    content: '#' !important;
    position: absolute;
    margin-left: -1em;
    text-decoration: none;
}
</style>
