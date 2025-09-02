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
    return queryCollectionNavigation("pages", ["path"]);
});

const pages = data.value ? data.value[0]?.children : [];

const links = ref(
    [
        {
            icon: "ant-design:github-filled",
            title: "GitHub",
            href: config.links.github
        },
        {
            icon: "ri:mastodon-fill",
            title: "Mastodon",
            href: config.links.mastodon
        },
        {
            icon: "ri:bluesky-fill",
            title: "BlueSky",
            href: config.links.bluesky
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
        <div :class="[
            'page-container',
            pageBackground,
            'text-gray-800 dark:text-gray-300',
            'min-h-screen max-w-4xl',
            'grid grid-cols-1 grid-rows-[auto_1fr_auto]',
            'mx-auto px-6',
        ]">
            <header :class="[
                'border-b-2 border-stone-200 dark:border-stone-800',
                'py-6 md:py-8',
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
                        <template v-for="item in pages" :key="item.path">
                            <NuxtLink v-if="item.title" :to="item.path.replace('/pages', '')">
                                {{ item.title }}
                            </NuxtLink>
                        </template>
                    </nav>

                    <div class="flex items-center gap-2">
                        <template v-for="link in links" :key="link.title">
                            <NuxtLink v-if="link.href" :to="link.href" target="_blank" :aria-label="link.title">
                                <Icon :name="link.icon" size="2rem" :title="link.title" />
                            </NuxtLink>
                        </template>
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

html:not(.dark) .prose pre {
    background-color: oklch(0.95 0.0013 106.42);
    color: oklch(0.15 0.0013 106.42);
}

html.dark .schema {
    filter: invert(1);
}

@media print {
    @page {
        size: A4 portrait;
    }

    .page-container > *:not(main) {
        display: none;
    }

    :not(h1, h2, h3, h4, h5, h6, li) > a[href]:after {
        content: " (" attr(href) ")";
        font-family: 'IBM Plex Mono', 'Courier New', monospace;
    }

    p {
        break-inside: avoid-page;
        orphans: 3;
        widows: 3;
    }

    /* Force all backgrounds to be white and text to be black for print */
    html.dark * {
        background-color: white !important;
        color: black !important;
    }

    /* Preserve some specific text colors for readability */
    html.dark a {
        color: #1f2937 !important;
    }

    html.dark .text-sm {
        color: #6b7280 !important;
    }
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
