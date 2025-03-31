<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const pageBackground = ref("bg-stone-100 dark:bg-neutral-900");

const isDark = useDark()
const toggleDark = useToggle(isDark)

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
    bodyAttrs: {
        class: pageBackground,
    },
});

const nav = ref([
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
</script>

<template>
    <div :class="`min-h-screen min-w-screen ${pageBackground}`">
        <div :class="[
            pageBackground,
            'text-gray-800 dark:text-gray-300',
            'min-h-screen max-w-4xl',
            'flex flex-col justify-between',
            'mx-auto px-6',
        ]">
            <header :class="[
                'border-b-2 border-stone-200 dark:border-stone-800',
                'py-8',
                'flex justify-between align-center',
            ]">
                <div class="flex items-center gap-4 sm:gap-6">
                    <img src="/logo.png" alt="Logo" class="hidden sm:block h-8" />
                    <NuxtLink to="/" class="text-xl leading-5 sm:text-2xl font-medium font-serif-bold">finxol's blog</NuxtLink>
                </div>

                <div class="flex items-center gap-4 sm:gap-8">
                    <div
                        class="cursor-pointer"
                        @click="toggleDark()"
                    >
                        <Icon v-if="isDark" name="ri:sun-fill" size="1.5rem" mode="svg" />
                        <Icon v-else name="ri:moon-fill" size="1.5rem" mode="svg" />
                    </div>
                    <nav :class="['flex items-start gap-4', 'text-gray-800 dark:text-gray-200', 'font-semibold']">
                        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">
                            {{ item.title }}
                        </NuxtLink>
                    </nav>

                    <div class="flex items-center gap-2">
                        <NuxtLink v-for="link in links" :key="link.title" :to="link.href" target="_blank" :aria-label="link.title">
                            <Icon :name="link.icon" size="2rem" :title="link.title" />
                        </NuxtLink>
                    </div>
                </div>
            </header>
            <NuxtPage />
            <footer :class="[
                'border-t-2 border-stone-200 dark:border-stone-800',
                'p-4',
                'flex justify-between',
            ]">
                <p>
                    &copy;
                    {{ date.getFullYear() }}
                    finxol
                </p>
                <button :class="['text-gray-600 dark:text-gray-300', 'font-light']" @click="scrollToTop">
                    Back to top
                </button>
            </footer>
        </div>
    </div>
</template>

<style>
@import "assets/fonts/orkney/orkney.css";
@import "assets/fonts/recoleta/recoleta.css";

body {
    font-family: 'OrkneyRegular', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'recoleta-regular', serif;
}
</style>
