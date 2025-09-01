<template>
    <NuxtLink
        :href="props.href"
        :target="props.href.at(0) === '#' ? '' : props.target"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
    href: {
        type: String,
        default: ""
    },
    target: {
        type: String as PropType<
            | "_blank"
            | "_parent"
            | "_self"
            | "_top"
            | (string & object)
            | null
            | undefined
        >,
        default: "_blank",
        required: false
    }
});
</script>

<style scoped>
a {
    font-weight: inherit;
    transition: background-size .3s ease;
    text-decoration: none;
    background-image: linear-gradient(to right, #000, #000);
    background-repeat: no-repeat;
    background-size: 100% .5px;
    background-position: bottom .2ch left;

    .dark & {
        background-image: linear-gradient(to right, #fff, #fff);
    }
}

a:hover {
    background-size: 0% .5px;
    background-position: bottom .2ch right;
}

</style>
