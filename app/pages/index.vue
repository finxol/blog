<script setup lang="ts">
const config = useRuntimeConfig().public;

const { data: frontmatter } = await useAsyncData("frontmatter", () =>
    queryCollection("pages").path("/pages").first()
);

const { data } = await useAsyncData("postList", () => {
    return queryCollectionNavigation("posts", [
        "path",
        "title",
        "date",
        "description",
        "authors",
        "tags"
    ])
        .where("published", "<>", false)
        .order("date", "DESC");
});

const posts = data.value ? data.value[0]?.children : [];

defineOgImageComponent("Page", {
    description: `This is ${config.title}. Read all ${posts?.length || 0} posts published so far, but stay tuned for more!`
});
</script>

<template>
    <header class="mt-6">
        <ContentRenderer  v-if="frontmatter" :value="frontmatter" class="prose prose-lg leading-7 prose-slate dark:prose-invert text-justify text-zinc-800 dark:text-zinc-200 h-frontmatter" />
        <p v-else>
            Welcome to this blog template!

            Change this content by editing the file <code>content/index.md</code>.
        </p>

        <h2 class="text-2xl font-bold my-6">
            Posts
        </h2>
    </header>

    <PostPreviewAccent
        v-if="posts"
        :post="posts[0]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-8">
        <PostPreview
            v-for="post in posts?.slice(1)"
            :key="post.path"
            :post="post"
        />
    </div>
</template>
