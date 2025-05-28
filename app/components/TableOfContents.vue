<script setup>
const props = defineProps({
    post: Object
});

const { post } = toRefs(props);

const headings = [];
for (const tag of post.value.body.value) {
    if (["h1", "h2", "h3"].includes(tag[0])) headings.push(tag);
}
</script>

<template>
<aside v-if="headings.length > 0" class="md:w-[80%] mx-auto ">
    <h2 class="text-2xl font-bold">Table of Contents</h2>

    <ul class=" pl-8 mt-4">
        <li
            v-for="heading in headings"
            :key="heading[1].id"
            :class="['text-md mb-2', heading[0] === 'h3' ? 'ml-6' : '']"
        >
            <a :href="`#${heading[1].id}`">
                <span class="mr-2 text-gray-400 dark:text-gray-500">#</span>
                {{ heading[2] }}
            </a>
        </li>
    </ul>

    <div class="bg-stone-200 dark:bg-stone-700 h-[1px] my-8"></div>
</aside>
</template>
