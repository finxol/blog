<script setup>
const props = defineProps({
    url: String
});
</script>

<template>
    <NuxtLink
        :to="url"
        :class="[
            'flex flex-row items-center justify-start gap-4',
            'px-4 py-4 md:px-6 md:py-6 not-prose',
            'border border-gray-300 dark:border-gray-700 border-solid border-2 rounded-lg',
            'bg-stone-200/25 hover:bg-stone-200/50 dark:bg-stone-700/25 dark:hover:bg-stone-700/50',
            'transition-colors duration-200',
            'bookmark-link'
        ]"
    >
        <Icon name="ri:bookmark-fill" size="1.5rem" class="text-yellow-700" />
        <div class="bookmark-content flex flex-col items-start justify-start font-bold">
            <slot />
            <span class="text-xs text-gray-400 dark:text-gray-600">
                {{props.url}}
            </span>
        </div>
    </NuxtLink>
</template>

<style scope>
@media print {
    a.bookmark-link::after {
        content: "";
        display: none;
    }
}
</style>
