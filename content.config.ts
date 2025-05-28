import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: "page",
            source: "pages/**/*.md",
            schema: z.object({})
        }),
        posts: defineCollection({
            type: "page",
            source: {
                include: "posts/**/*.md"
            },
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: z.string().date(),
                updated: z.string().date().optional(),
                authors: z.array(
                    z.object({
                        name: z.string(),
                        avatar: z.string().optional()
                    })
                ),
                tags: z.array(z.string()),
                published: z.boolean().optional()
            })
        })
    }
});
