import { defineBlogConfig } from "./globals";

export default defineBlogConfig({
    title: "finxol's blog",
    author: "finxol",
    meta: [
        {
            name: "description",
            content: "finxol's blog"
        },
        {
            name: "fediverse:creator",
            content: "@finxol@mas.to"
        },
        {
            name: "fediverse:creator",
            content: "@User038418@mamot.fr"
        }
    ],
    links: [
        {
            name: "bluesky",
            url: "https://bluesky.app/profile/finxol.io"
        },
        {
            name: "github",
            url: "https://github.com/finxol"
        },
        {
            name: "mastodon",
            url: "https://mas.to/@finxol"
        }
    ]
});
