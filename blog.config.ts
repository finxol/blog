import { defineBlogConfig } from "./globals";

export default defineBlogConfig({
    tableOfContents: true,
    sharingProviders: ["bluesky", "clipboard", "native"],
    title: "Template blog",
    author: "Your name",
    meta: [
        {
            name: "description",
            content: "This is a template blog",
        },
        {
            name: "fediverse:creator",
            content: "your fediverse handle",
        },
    ],
    links: [
        {
            name: "bluesky",
            url: "https://bsky.app/profile/yourhandle",
        },
        {
            name: "github",
            url: "https://github.com/yourusername",
        },
        {
            name: "mastodon",
            url: "https://mastodon.social/@yourhandle",
        },
    ],
});
