<script setup>
const config = useRuntimeConfig().public.sharingProviders;

const props = defineProps({
    author: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    }
});

const { author, title, description } = props;

const hasShareSupport = ref(false);
const hasClipboardSupport = ref(false);
const copied = ref(false);
const url = ref(null);

const shareMessageText = computed(
    () => `Check out this post from ${author}!\n\n${url.value}`
);

const triggerShare = () => {
    if (!process.client || !hasShareSupport.value) return;

    navigator
        .share({
            title,
            url,
            text: description
        })
        .catch((error) => console.error("Error sharing", error));
};

const copyToClipboard = () => {
    if (!process.client || !hasClipboardSupport.value) return;

    navigator.clipboard
        .writeText(window.location)
        .then(() => {
            copied.value = true;
            setTimeout(() => (copied.value = false), 2000);
        })
        .catch((error) => console.error(error));
};

// Lifecycle hooks
onMounted(() => {
    // Check API support only on client-side
    if (process.client) {
        url.value = window.location;
        hasShareSupport.value = !!navigator.share;
        hasClipboardSupport.value = !!navigator.clipboard;

        if (!hasShareSupport.value && !hasClipboardSupport.value) {
            console.log("No support so revert to fallback content");
        }
    }
});
</script>

<template>
  <aside
      class="flex flex-row justify-center items-center gap-4 mt-24 md:w-[80%] mx-auto"
  >
      <div class="h-1 bg-stone-200 dark:bg-stone-700 grow" />
      <div class="whitespace-nowrap px-4 flex flex-row items-center gap-4">
          Share this post
          <NuxtLink
              v-if="config.bluesky"
              target="_blank"
              rel="noopener noreferer"
              :to="`https://bsky.app/intent/compose?text=${encodeURIComponent(shareMessageText)}`"
          >
              <Icon
                  name="ri:bluesky-fill"
                  size="1.5rem"
                  title="Share on Bluesky"
              />
          </NuxtLink>

          <template v-if="config.clipboard && hasClipboardSupport">
                <div class="relative">
                    <button @click="copyToClipboard">
                        <Icon
                            :class="{
                                'hidden': !copied
                            }"
                            data-name="copied"
                            name="ri:checkbox-line"
                            size="1.5rem"
                            title="Copied to clipboard"
                        />
                        <Icon
                            :class="{
                                'hidden': copied
                            }"
                            name="ri:file-copy-2-line"
                            size="1.5rem"
                            title="Copy link to clipboard"
                        />
                    </button>
                    <p v-if="copied" class="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-sm">
                        Copied to clipboard!
                    </p>
                </div>
          </template>

          <template v-if="config.native && hasShareSupport">
              <button @click="triggerShare">
                    <Icon
                        name="ri:share-2-fill"
                        size="1.5rem"
                        title="Other share options"
                    />
              </button>
          </template>
      </div>
      <div class="h-1 bg-stone-200 dark:bg-stone-700 grow" />
  </aside>
</template>

<style scoped>

</style>
