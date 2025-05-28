import { defineBlogConfig } from "./globals";

export default defineBlogConfig({
    site: "https://finxol.io",
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
    links: {
        bluesky: "https://bluesky.app/profile/finxol.io",
        github: "https://github.com/finxol",
        mastodon: "https://mas.to/@finxol"
    }
});
