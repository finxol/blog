<script setup>
const config = useRuntimeConfig().public;

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
const { post } = toRefs(props);
</script>

<template>
    <NuxtLink v-if="post !== undefined" :to="post.path" :class="[
        'rounded-lg',
        'border border-neutral-200 dark:border-neutral-700',
        'px-8 py-6',
        'flex flex-col justify-between',
    ]">
        <div>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-300">
                {{ post.title }}
            </h1>
            <div class="mt-2 flex items-center gap-2">
                <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 text-xs bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-full">
                    {{ tag }}
                </span>
            </div>
        </div>
        <p :class="[
            'text-neutral-500 dark:text-zinc-400',
            'my-4',
        ]">
            {{ post.description }}
            <span class="text-neutral-400 underline dark:text-neutral-300 font-light hover:text-primary-600">
                Read more.
            </span>
        </p>

        <div class="flex items-center justify-start gap-4 text-neutral-600 dark:text-neutral-300">
            <div v-if="post.authors" class="flex items-center gap-1">
                <img v-if="post.authors[0].name === config.author" src="/logo.png" :alt="post.authors[0].name"
                    class="w-8 h-8 rounded-full mr-2">
                <span v-for="author in post.authors" :key="author.name">
                    {{ author.name }}
                </span>
            </div>
            ·
            <span>
                {{ new Date(post.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) }}
            </span>
        </div>
    </NuxtLink>
</template>
