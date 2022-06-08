import theme from '@jsilva-pt/nuxt-content-theme-blog'

const settings = {
    baseUrl: 'https://finxol.io',

    githubOwner: 'finxol',
    githubRepository: 'blog',
    githubMainBranch: 'main',

    twitterUsername: '_finxol',
    linkedinUsername: '',

    logo: 'logo.png',

    footerLinks: {
        discover: [
            {
                key: 'footer.links.discover.ourTeam',
                href: 'https://github.com/finxol'
            },
            {
                key: 'footer.links.discover.contactUs',
                href: 'mailto:contact@finxol.io'
            }
        ],
        help: [
            {
                key: 'footer.links.help.resources',
                href: 'https://github.com/finxol/blog'
            },
        ]
    }
}

export default theme({
    feedOptions: {
        title: 'Finxol Blog',
        description: 'Articles and write-ups about technology, cyber security, and more.',
        link: settings.baseUrl
    },
    publicRuntimeConfig: {
        ...settings
    },
    pwa: {
        manifest: {
            short_name: 'Finxol Blog'
        },
        meta: {
            name: 'Finxol Blog',
            author: 'Finxol',
            theme_color: '#2C3E50',
            ogHost: settings.baseUrl,
            twitterCard: 'summary_large_image',
            twitterSite: settings.twitterUsername,
            twitterCreator: settings.twitterUsername
        }
    },
    i18n: {
        locales: [
            {
                code: 'fr',
                iso: 'fr-FR',
                name: 'Français'
            },
            {
                code: 'en',
                iso: 'en-GB',
                name: 'English'
            }
        ],
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            messages: {
                en: require('./i18n/en-GB'),
                fr: require('./i18n/fr-FR')
            }
        }
    }
})
