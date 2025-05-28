type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type SharingProvider = "bluesky" | "clipboard" | "native";

export type BlogConfig = {
    site: string;
    tableOfContents: boolean;
    sharingProviders: SharingProvider[];
    title: string;
    author: string;
    meta: {
        name: string;
        content: string;
    }[];
    links: {
        bluesky?: `https://bsky.app/profile/${string}`;
        github?: `https://github.com/${string}`;
        mastodon?: `https://${string}/@${string}`;
    };
};

export function defineBlogConfig(config: Prettify<Partial<BlogConfig>>) {
    return {
        site: config.site ?? "https://example.com",
        tableOfContents: config.tableOfContents ?? true,
        sharingProviders: config.sharingProviders
            ? config.sharingProviders.reduce(
                  (acc, provider) => {
                      acc[provider] = true;
                      return acc;
                  },
                  {} as Record<SharingProvider, boolean>
              )
            : { bluesky: true, clipboard: true, native: true },
        title: config.title ?? "My Blog",
        author: config.author ?? "finxol",
        meta: config.meta ?? [
            { name: "description", content: "My blog description" }
        ],
        links: config.links ?? {}
    };
}
