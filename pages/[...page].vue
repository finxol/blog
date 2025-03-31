<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
    queryCollection("pages").path(`/pages${route.path}`).first()
);

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description
});
</script>

<template>
    <div
        v-if="page"
        class="py-8"
    >
        <h1
            class="text-3xl font-bold text-gray-900 dark:text-gray-200 sm:text-4xl md:text-5xl lg:text-6xl"
        >
            {{ page.title }}
        </h1>

        <ContentRenderer
            :value="page"
            :class="[
                'prose prose-lg prose-slate dark:prose-invert',
                'max-w-none mx-auto',
                'mt-6',
            ]"
        />
    </div>

    <div v-else>
        not found
    </div>
</template>
