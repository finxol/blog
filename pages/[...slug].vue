<script setup>
</script>

<template>
    <div
        class="grow"
    >
        <button
            class="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 mt-4"
            @click="$router.back()"
        >
            <Icon name="tabler:chevron-left" />
            Go back
        </button>
        <ContentQuery :path="$route.path" find="one">
            <template #default="{ data }">
                <main class="pb-12">
                    <header class="mb-8 mt-4">
                        <h1 class="text-4xl font-bold">
                            {{ data?.title }}
                        </h1>
                        <div class="flex items-center justify-start gap-4 mt-4">
                            <div v-if="data.authors" class="flex items-center gap-1">
                                <img v-if="data.authors[0].name === 'finxol'" src="/logo.png" :alt="data.authors[0].name"
                                    class="w-8 h-8 rounded-full mr-2">
                                <span v-for="author in data.authors" :key="author.name" class="text-neutral-600">
                                    {{ author.name }}
                                </span>
                            </div>
                            ·
                            <span class="text-neutral-600">
                                {{ new Date(data.date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) }}
                            </span>
                        </div>

                        <div class="bg-stone-200 h-[1px] my-4"></div>

                        <p
                            class="text-md text-neutral-500 leading-7 mb-8"
                        >
                            {{ data.description }}
                        </p>
                    </header>

                    <div class="bg-stone-200 h-[1px] my-8"></div>
                    <ContentDoc :path="data._path" class="prose prose-lg prose-slate max-w-none mx-auto" />
                </main>
            </template>
            <template #not-found>
                <div class="flex items-center justify-center">
                    <div class="text-center">
                        <h1 class="text-4xl font-bold">404</h1>
                        <p class="text-neutral-500">Page not found</p>
                    </div>
                </div>
            </template>
        </ContentQuery>
    </div>
</template>
