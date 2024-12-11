<script setup>
useHead({
  title: "About — finxol's blog",
})
</script>

<template>
    <div
        class="py-8"
    >
        <h1
            class="text-3xl font-bold text-gray-900 dark:text-gray-200 sm:text-4xl md:text-5xl lg:text-6xl"
        >
            About
        </h1>

        <ContentDoc
            path="about"
            :class="[
                'prose prose-lg prose-slate dark:prose-invert',
                'max-w-none mx-auto',
                'mt-6',
            ]"
        />
    </div>
</template>
