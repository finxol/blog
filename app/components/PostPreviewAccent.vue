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
        'px-8 py-8',
        'grid grid-cols-1 lg:grid-cols-2 gap-4',
    ]">
        <div class="flex flex-col justify-between">
            <h1 class="text-4xl font-bold text-neutral-900 dark:text-neutral-300">
                {{ post.title }}
            </h1>
            <div class="mt-4 flex items-center justify-start gap-4 text-neutral-600 dark:text-neutral-300">
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
        </div>

        <p :class="[
            'text-lg text-neutral-500 dark:text-zinc-400',
        ]">
            {{ post.description }}
            <span class="text-neutral-400 underline dark:text-neutral-300 font-light hover:text-primary-600">
                Read more.
            </span>
        </p>
    </NuxtLink>
</template>
