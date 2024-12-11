<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const { post } = toRefs(props)
</script>

<template>
    <NuxtLink v-if="post !== undefined" :to="post?._path" :class="[
        'rounded-lg',
        'border border-neutral-200 dark:border-neutral-700',
        'px-6 py-4',
        'flex flex-col justify-between',
    ]">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-300">
            {{ post.title }}
        </h1>
        <p :class="[
            'text-neutral-700 dark:text-neutral-200',
            'my-4',
        ]">
            {{ post.description }}
            <span class="text-neutral-600 dark:text-neutral-300 font-light hover:text-primary-600">
                Read more.
            </span>
        </p>

        <div class="flex items-center justify-start gap-4 text-neutral-600 dark:text-neutral-300">
            <div v-if="post.authors" class="flex items-center gap-1">
                <img v-if="post.authors[0].name === 'finxol'" src="/logo.png" :alt="post.authors[0].name"
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
