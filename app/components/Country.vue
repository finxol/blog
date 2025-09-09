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
