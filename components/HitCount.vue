<script setup lang="ts">
import { openKv } from "@deno/kv"

const KV_ID = process.env.KV_ID
const kvUrl = `https://api.deno.com/databases/${KV_ID}/connect`

const kv = await openKv(kvUrl)

const props = defineProps({
    page: {
        type: String,
        required: true
    }
})

const key = ["hits", props.page]

const { value, versionstamp } = await kv.get(key)
const currentVal = (value as number) || 0
const newCount = currentVal + 1

// Attempt the atomic transaction with a versionstamp “check”
const res = await kv.atomic()
    .check({
        key,
        versionstamp
    })
    .set(key, newCount)
    .commit()

if (!res.ok) {
    // The transaction failed:
    // (e.g. someone else wrote to the same key at the same time)
    // In a real app, you could retry or handle the conflict differently.
    console.error("Conflict, could not update hits. Maybe retry?")
}


</script>

<template>
    <div class="hidden sm:flex flex-row items-center gap-1 justify-start">
        <Icon name="ri:information-2-line" size="1rem" mode="svg" />
        <h1>Page hits: {{ newCount }}</h1>
    </div>
</template>
