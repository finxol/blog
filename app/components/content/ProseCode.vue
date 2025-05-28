<template>
  <code class="code text-zinc-700 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-800 rounded-md">
    <slot />
  </code>
</template>

<style scoped>
.code {
    display: inline-block;
    margin-inline: .1rem;
    padding-inline: .5rem;
    text-box-trim: trim-start;

    &::before {
        content: '';
    }

    &::after {
        content: '';
    }
}
</style>
