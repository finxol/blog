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
    <NuxtLink
        :to="post._path"
        :class="[
            'rounded-lg',
            'border border-neutral-200',
            'px-6 py-4',
            'mb-4',
            'flex flex-col justify-between',
        ]"
    >
        <h1
            class="text-2xl font-bold text-neutral-900"
        >
            {{ post.title }}
        </h1>
        <p
            :class="[
              'text-neutral-600',
              'my-4',
            ]"
        >
            {{ post.description }}
            <span
                class="text-neutral-500 font-light hover:text-primary-600"
            >
                Read more.
            </span>
        </p>

        <div
            class="flex items-center justify-start gap-4"
        >
            <div
            class="flex items-center gap-1"
            >
                <img
                    v-if="post.authors[0].name === 'finxol'"
                    src="/logo.png"
                    :alt="post.authors[0].name"
                    class="w-8 h-8 rounded-full mr-2"
                >
                <span
                    class="text-neutral-600"
                >
                    {{ post.authors[0].name }}
                </span>
            </div>
            ·
            <span
                class="text-neutral-600"
            >
                {{ new Date(post.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) }}
            </span>
        </div>
    </NuxtLink>
</template>
