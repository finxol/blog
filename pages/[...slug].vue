<script setup>
</script>

<template>
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
        <main class="py-12">
            <header class="mb-8">
                <h1 class="text-4xl font-bold">
                    {{ data.title }}
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
            </header>

            <div class="bg-stone-200 h-[1px] my-4"></div>
            <ContentDoc class="prose prose-lg prose-slate max-w-none mx-auto" />
        </main>
    </ContentQuery>
</template>
