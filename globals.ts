type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type BlogConfig = {
    tableOfContents: boolean;
    sharingProviders: ("bluesky" | "clipboard" | "native")[];
    title: string;
    author: string;
    meta: {
        name: string;
        content: string;
    }[];
    links: {
        name: "bluesky" | "github" | "mastodon";
        url: string;
    }[];
};

export function defineBlogConfig(config: Prettify<Partial<BlogConfig>>) {
    return {
        tableOfContents: config.tableOfContents ?? true,
        sharingProviders: config.sharingProviders
            ? config.sharingProviders.reduce(
                  (acc, provider) => {
                      acc[provider] = true;
                      return acc;
                  },
                  {} as Record<string, boolean>
              )
            : { bluesky: true, clipboard: true, native: true },
        title: config.title ?? "My Blog",
        author: config.author ?? "finxol",
        meta: config.meta ?? [
            { name: "description", content: "My blog description" }
        ],
        links: config.links ?? []
    };
}
