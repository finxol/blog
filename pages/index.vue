<script setup>
</script>

<template>
    <header class="my-6">
        <h1 class="text-4xl font-bold">Hi!</h1>
        <p class="text-lg mt-6">
            My name is Colin Ozanne, known online as finxol. I am a French and British software
            developer and CS student at Université de Rennes.
            <br /><br /><br />
        </p>

        <h2 class="text-2xl font-bold mt-6">
            Posts
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <ContentList path="posts" v-slot="{ list }">
                <PostPreview v-for="post in list.sort((a, b) => new Date(b.date) - new Date(a.date))" :key="post?._path"
                    :post="post" />
            </ContentList>
        </div>
    </header>
</template>
