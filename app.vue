<script setup lang="ts">
useHead({
    title: "finxol's blog",
    meta: [
        {
            name: "description",
            content: "finxol's blog",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
        },
        {
            name: "fediverse:creator",
            content: "@finxol@mas.to",
        },
    ],
});

const nav = ref([
    {
        title: "Home",
        to: "/",
    },
    {
        title: "About",
        to: "/about",
    },
]);

const links = ref([
    {
        icon: "ant-design:github-filled",
        title: "GitHub",
        href: "https://github.com/finxol",
    },
    {
        icon: "ri:mastodon-fill",
        title: "Mastodon",
        href: "https://mas.to/@finxol",
    },
    {
        icon: "ri:bluesky-fill",
        title: "BlueSky",
        href: "https://bsky.app/profile/finxol.io",
    },
].reverse());

const date: Date = new Date();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

const pageBackground = ref("bg-stone-100");
</script>

<template>
    <div :class="`min-h-screen min-w-screen ${pageBackground}`">
        <div :class="[
            pageBackground,
            'text-gray-800',
            'min-h-screen max-w-4xl',
            'flex flex-col justify-between',
            'mx-auto',
        ]">
            <header :class="[
                'border-b-2 border-stone-200',
                'py-8 px-6',
                'flex justify-between',
            ]">
                <div class="flex items-center gap-6">
                    <img src="/logo.png" alt="Logo" class="h-8" />
                    <NuxtLink to="/" class="text-2xl">finxol's blog</NuxtLink>
                </div>

                <div class="flex items-center gap-8">
                    <nav :class="['flex items-start gap-4', 'text-gray-800', 'font-semibold']">
                        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">
                            {{ item.title }}
                        </NuxtLink>
                    </nav>

                    <div class="flex items-center gap-2">
                        <NuxtLink v-for="link in links" :key="link.title" :to="link.href" target="_blank">
                            <Icon :name="link.icon" size="2rem" :title="link.title" />
                        </NuxtLink>
                    </div>
                </div>
            </header>
            <div>
                <NuxtPage />
            </div>
            <footer :class="[
                'border-t-2 border-stone-200',
                'p-4',
                'flex justify-between',
            ]">
                <p>
                    &copy; finxol -
                    {{ date.getFullYear() }}
                </p>
                <button :class="['text-gray-400', 'font-light']" @click="scrollToTop">
                    Back to top
                </button>
            </footer>
        </div>
    </div>
</template>
