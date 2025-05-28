<script setup>
import { useDark, useToggle } from "@vueuse/core";

const config = useRuntimeConfig().public;

const pageBackground = ref("bg-stone-100 dark:bg-neutral-900");

const isDark = useDark();
const toggleDark = useToggle(isDark);

useHead({
    title: config.title,
    meta: [
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        },
        ...config.meta
    ],
    bodyAttrs: {
        class: pageBackground
    }
});

const { data } = await useAsyncData("navigation", () => {
    return queryCollectionNavigation("pages", [
        "path",
    ])
});

const pages = data.value ? data.value[0]?.children : [];

const links = ref(
    [
        {
            icon: "ant-design:github-filled",
            title: "GitHub",
            href: config.links.find(link => link.name === "github")?.url
        },
        {
            icon: "ri:mastodon-fill",
            title: "Mastodon",
            href: config.links.find(link => link.name === "mastodon")?.url
        },
        {
            icon: "ri:bluesky-fill",
            title: "BlueSky",
            href: config.links.find(link => link.name === "bluesky")?.url
        }
    ].reverse()
);

const date = new Date();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
</script>

<template>
    <div :class="`min-h-screen min-w-screen ${pageBackground}`">
        <div :class="[
            pageBackground,
            'text-gray-800 dark:text-gray-300',
            'min-h-screen max-w-4xl',
            'grid grid-cols-1 grid-rows-[auto_1fr_auto]',
            'mx-auto px-6',
        ]">
            <header :class="[
                'border-b-2 border-stone-200 dark:border-stone-800',
                'py-8',
                'flex justify-between align-center',
            ]">
                <div class="flex items-center gap-4 sm:gap-6">
                    <img src="/logo.png" alt="Logo" class="hidden sm:block h-8" />
                    <NuxtLink to="/" class="text-xl leading-5 sm:text-2xl font-medium font-serif-bold">
                        {{ config.title }}
                    </NuxtLink>
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
                        <NuxtLink v-for="item in pages" :key="item.path" :to="item.path.replace('/pages', '')">
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
            <main class=".content-grid">
                <NuxtPage />
            </main>
            <footer :class="[
                'border-t-2 border-stone-200 dark:border-stone-800',
                'p-4',
                'flex justify-between',
            ]">
                <p>
                    &copy;
                    {{ date.getFullYear() }}
                    {{ config.author }}

                    <span v-if="config.author !== 'finxol'" class="text-sm text-gray-500">
                        <span class="mx-3">
                            —
                        </span>
                            Theme by <a class="underline" href="https://github.com/finxol/nuxt-blog-template" target="_blank" rel="noopener noreferrer">finxol</a>
                    </span>
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
@import "assets/fonts/ibm-plex-mono/css/ibm-plex-mono-all.min.css";

body {
    font-family: 'OrkneyRegular', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'recoleta-regular', serif;
}

code, pre {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
}

.content-grid {
    --padding-inline: min(2%, 1.5rem);

    display: grid;
    grid-template-columns:
        [full-width-start] var(--padding-inline)
        [breakout-start] var(--padding-inline)
        [content-start] 1fr
        [content-end]
        var(--padding-inline) [breakout-end]
        var(--padding-inline) [full-width-end];
    justify-content: start;
    align-content: start;
    row-gap: calc(var(--spacing) * 4);
}

.content-grid > :not(.breakout, .full-width),
.full-width > :not(.breakout, .full-width) {
    grid-column: content;
}

.content-grid > .breakout {
    grid-column: breakout;
}

.content-grid > .full-width {
    grid-column: full-width;
}
</style>
