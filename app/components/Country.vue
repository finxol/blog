<script setup lang="ts">
const data = await $fetch("https://hook.finxol.io/sensors/country")
    .then((res) => {
        return res as {
            country: string;
            country_code: string;
            country_flag: string;
        };
    })
    .catch((e) => {
        console.error(e);
    });

const country = data?.country;
const emoji = data?.country_flag;
</script>

<template>
    <div v-if="data" class="hidden sm:flex flex-row items-center gap-2">
        <div class="tooltip-target flex flex-row items-center gap-2 bg-stone-200/50 dark:bg-stone-700/60 py-1 px-2 rounded-lg">
            I'm in
            <span class="flex flex-row items-center gap-2 font-bold">
                {{ emoji }}
                {{ country }}
            </span>
            !
        </div>

        <div class="anchored-tooltip">
            This gets automatically updated as I move around!
        </div>
    </div>
</template>

<style scoped>
.tooltip-target:hover + .anchored-tooltip,
.anchored-tooltip:hover {
    @supports (anchor-name: --infobox) {
        display: block;
    }
}

.tooltip-target {
    anchor-name: --infobox;
}

.anchored-tooltip {
    @apply text-stone-200;

    --bg-color: oklch(0.2685 0.0063 34.3 / 70%); /* bg-stone-800/70 */

    display: none;

    position-anchor: --infobox;
    position: absolute;
    margin: 0;
    top: calc(anchor(top) + 2.7rem);
    left: calc(anchor(center));
    transform: translateX(-50%);
    bottom: anchor(bottom);
    height: fit-content;
    width: fit-content;
    max-width: 15rem;
    padding: 0.5rem 1rem;
    text-align: center;
    background-color: var(--bg-color);
    border-radius: 0.5rem;
    animation: fade-in 200ms ease-in-out;

    &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        border-width: 10px 10px 0 10px;
        border-style: solid;
        border-color: var(--bg-color) transparent transparent transparent;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
}
</style>
