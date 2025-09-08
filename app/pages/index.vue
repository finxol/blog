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
    description: `This is ${config.title}. Read all ${posts?.length || 0} posts published so far, and stay tuned for more!`
});

const tags =
    posts?.reduce((acc, post) => {
        for (const tag of post.tags as string[]) {
            if (!acc.includes(tag)) {
                acc.push(tag);
            }
        }
        return acc;
    }, [] as string[]) ?? [];

const filter = ref<string | undefined>(undefined);

const filteredPosts = computed(() => {
    if (!filter.value) return posts;
    return posts?.filter(
        (post) =>
            post.tags && (post.tags as string[]).includes(filter.value ?? "")
    );
});
</script>

<template>
    <header class="mt-6">
        <ContentRenderer  v-if="frontmatter" :value="frontmatter" class="prose prose-lg leading-7 prose-slate dark:prose-invert text-justify text-zinc-800 dark:text-zinc-200 h-frontmatter" />
        <p v-else>
            Welcome to this blog template!

            Change this content by editing the file <code>content/index.md</code>.
        </p>
    </header>

    <h2 class="text-2xl font-bold my-6">
        Posts
    </h2>

    <section class="my-6">
        <p>
            Filter posts:
        </p>
        <div class="w-full overflow-x-scroll flex flex-row items-start">
            <button
                v-for="tag in tags"
                :key="tag"
                    :class="[
                        'flex px-2 py-1 mr-2 mb-2 w-max flex-row items-center gap-2',
                        `${tag === filter ? 'bg-gray-500 dark:bg-gray-500 text-gray-100 dark:text-gray-100' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`,
                        'rounded-full text-sm font-medium lowercase'
                    ]"
                    @click="filter = filter === tag ? undefined : tag"
            >
                <Icon
                    v-if="tag === filter"
                    name="ri:close-line"
                    size="1rem"
                    mode="svg"
                />
                {{ tag }}
            </button>
        </div>
    </section>

    <PostPreviewAccent
        v-if="filteredPosts"
        :post="filteredPosts[0]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-8">
        <PostPreview
            v-for="post in filteredPosts?.slice(1)"
            :key="post.path"
            :post="post"
        />
    </div>
</template>
