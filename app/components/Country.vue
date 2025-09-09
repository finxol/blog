<script setup lang="ts">
const data = await $fetch("https://hook.finxol.io/sensors/country")
    .then((res) => {
        return res as { country: string; country_code: string };
    })
    .catch((e) => {
        console.error(e);
    });

const country = data?.country;

const letterA = "a".codePointAt(0);
//biome-ignore format: breaks emoji
const regionalIndicatorA = '🇦'.codePointAt(0);

const toRegionalIndicator = (char: string) =>
    //@ts-ignore
    String.fromCodePoint(char.codePointAt(0) - letterA + regionalIndicatorA);

const emoji = data?.country_code
    .split("")
    .map((char) => toRegionalIndicator(char))
    .join("");
</script>

<template>
    <div class="hidden md:flex flex-row items-center gap-2">
        <span>
            Currently in:
        </span>
        <div class="flex flex-row items-center gap-2 bg-stone-200/50 dark:bg-stone-700/60 py-1 px-2 rounded-lg">
            <span>
                {{ emoji }}
            </span>
            <span>
                {{ country }}
            </span>
        </div>
    </div>
</template>
