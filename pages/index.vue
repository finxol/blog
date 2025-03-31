<script setup lang="ts">
useHead({
	title: "finxol's blog",
});

const { data } = await useAsyncData("navigation", () => {
	return queryCollectionNavigation("posts", [
		"path",
		"title",
		"date",
		"description",
		"authors",
	])
		.where("published", "=", true)
		.order("date", "DESC");
});

const posts = data.value ? data.value[0]?.children : [];
</script>

<template>
    <header class="my-6">
        <h1 class="text-4xl font-bold">Hi!</h1>
        <p class="text-lg mt-6">
            My name is Colin Ozanne, known online as finxol. I am a French and British software
            developer and CS student at Université de Rennes.
        </p>

        <h2 class="text-2xl font-bold mt-6">
            Posts
        </h2>


        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <PostPreview
                v-for="post in posts"
                :key="post.path"
                :post="post"
            />
        </div>
    </header>
</template>
