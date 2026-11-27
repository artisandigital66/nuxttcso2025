import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      title: 'TCSO, Immobilier Commercial',
      titleTemplate: '%s — %siteName',
      templateParams: { siteName: 'TCSO' },
      htmlAttrs: { lang: 'fr' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Agence Immobilière spécialisée dans la transaction de locaux commerciaux',
        },
      ],
      noscript: [{ textContent: 'JavaScript est requis pour afficher ce site.' }],
    },
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        ;(config.plugins ??= []).push(vuetify({ autoImport: true }) as any)
      })
    },
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-vuefire',
    '@pinia/nuxt',
    'nuxt-gtag',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: [
        'firebase/app',
        'firebase/firestore',
        'vuefire',
        'pinia',
      ],
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/vuetify/dist/**'],
      },
    },
  },

  vuefire: {
    firestore: true,
    auth: false,
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.DATABASEURL,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.PROJECTID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.STORAGEBUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.MESSAGINGSENDERID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.APPID,
    },
  },

  gtag: {
    initMode: 'manual', // Déclenché uniquement après consentement cookie
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-MYM02XCJFT',
    config: {
      anonymize_ip: true,
    },
  },

  cookieControl: {
    locales: ['fr'],
    barPosition: 'bottom-full',
    closeModalOnClickOutside: true,
    colors: {
      barBackground: '#3CA2A4',
      barButtonBackground: '#ffffff',
      barButtonColor: '#000000',
      barButtonHoverBackground: '#333333',
      barButtonHoverColor: '#ffffff',
      barTextColor: '#ffffff',
      controlButtonBackground: '#3CA2A4',
      controlButtonHoverBackground: '#2B7691',
      controlButtonIconColor: '#ffffff',
      controlButtonIconHoverColor: '#ffffff',
    },
    localeTexts: {
      fr: {
        bannerDescription:
          'Nous utilisons des cookies nécessaires au bon fonctionnement du site et des cookies de mesure d’audience anonymes.',
      },
    },
    cookies: {
      necessary: [
        {
          id: 'ncc',
          name: { fr: 'Préférences de cookies' },
          description: { fr: 'Enregistre votre choix concernant le consentement aux cookies.' },
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
      ],
      optional: [
        {
          id: 'ga',
          name: { fr: 'Google Analytics' },
          description: { fr: 'Mesure anonyme de la fréquentation du site TCSO.' },
          targetCookieIds: ['_ga', '_gid', '_gat'],
        },
      ],
    },
  },
})