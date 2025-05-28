<script setup lang="ts">
const props = defineProps<{ id?: string }>();
</script>

<template>
  <h2 :id="props.id">
    <a
      :href="`#${props.id}`"
    >
      <slot />
    </a>
  </h2>
</template>

<style scoped>
a {
    text-decoration: none !important;
}

:where(.prose).h-frontmatter a {
    pointer-events: none;
}

:where(.prose):not(.h-frontmatter) a:hover::before {
    @apply text-neutral-500;
    content: '#' !important;
    position: absolute;
    margin-left: -1em;
    text-decoration: none;
}
</style>
