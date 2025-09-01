<script setup lang="ts">
const config = useRuntimeConfig().public;
const route = useRoute();

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
    queryCollection("posts").path(route.path).first()
);

useSeoMeta({
    title: post.value?.title,
    description: post.value?.description
});

if (post.value) {
    defineOgImageComponent("Post", {
        title: post.value.title,
        date: post.value.date,
        author: post.value.authors[0]?.name
    });
}
</script>

<template>
    <div
        class="grow"
    >
        <NuxtLink
            class="print:hidden flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 mt-4"
            to="/"
        >
            <Icon name="ri:arrow-drop-left-line" mode="svg" />
            Go back
        </NuxtLink>
        <article
            v-if="post"
            class="pb-24"
        >
            <header class="mb-8 mt-4">
                <h1 class="text-4xl font-bold">
                    {{ post.title }}
                </h1>
                <div class="flex flex-wrap items-center justify-start gap-4 mt-4 text-neutral-600 dark:text-neutral-300">
                    <div v-if="post.authors" class="flex items-center gap-1">
                        <img v-if="post.authors[0]?.name === config.author" src="/logo.png" :alt="post.authors[0].name"
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
                    <span v-if="post.updated">
                        <span class="text-neutral-500 dark:text-neutral-400 ml-2 mr-4">·</span>
                        <span class="text-sm">
                            Updated: {{ new Date(post.updated).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) }}
                        </span>
                    </span>
                    ·
                    <div>
                        <span v-for="tag in post.tags" :key="tag" class="mr-2 mb-2 px-3 py-1 text-xs md:text-sm bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-full">
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <div class="bg-stone-200 dark:bg-stone-700 h-[1px] my-4"></div>

                <p
                    class="text-md text-neutral-500 dark:text-neutral-400 leading-7 my-8 text-justify md:w-[80%] mx-auto"
                >
                    {{ post.description }}
                </p>
            </header>

            <div class="bg-stone-200 dark:bg-stone-700 h-[1px] my-8 md:w-[80%] mx-auto"></div>

            <TableOfContents v-if="config.tableOfContents" :post="post" />

            <ContentRenderer :value="post" class="post-body prose prose-lg leading-7 prose-slate dark:prose-invert text-justify md:w-[80%] mx-auto text-zinc-800 dark:text-zinc-200" />

            <ShareActions :title="post.title" :description="post.description" :author="post.authors[0]?.name" />

        </article>

        <div v-else class="flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-4xl font-bold">404</h1>
                <p class="text-neutral-500">Page not found</p>
            </div>
        </div>
    </div>
</template>

<style>
.post-body p:first-of-type::first-line {
    font-weight: bold;
}

:target:before {
    content: "";
    display: block;
    height: 2rem;
    margin: -2rem 0 0;
}

</style>
