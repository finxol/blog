<script setup lang="ts">
const config = useRuntimeConfig().public;

const props = defineProps<{
    description: string;
}>();

const { description } = props;
</script>

<template>
  <div class="h-full w-full flex items-start justify-start bg-stone-100">
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full px-30 py-15" style="font-family: 'Recoleta'">
          <div class="flex flex-col justify-between">
            <h1 class="text-[90px] text-left">
            {{ config.title }}
            </h1>
            <h2 class="text-4xl text-left">
            {{ description }}
            </h2>
          </div>
        <div class="flex flex-row items-center justify-between text-4xl font-bold mb-0">
            <div class="flex flex-row items-center gap-8">
                <img src="/logo.png" alt="Author Avatar" height="56" width="56">
                <p>
                    {{ config.author }}
                </p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
