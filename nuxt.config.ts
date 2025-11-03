// nuxt.config.ts
import vuetify from 'vite-plugin-vuetify'

export default {
  app: {
    head: {
      title: 'TCSO, Immobilier Commercial',
      htmlAttrs: { lang: 'fr' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Agence Immobilière spécialisée dans la transaction de locaux commerciaux' },
      ],
      noscript: [{ children: 'JavaScript is required' }],
      titleTemplate: '%s — %siteName',
      templateParams: { siteName: 'TCSO' }
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: false, timeline: { enabled: true } },
  debug: false,

  build: { transpile: ['vuetify'] },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || []
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-vuefire',
    '@pinia/nuxt',
    'nuxt-gtag'
  ],

  cookieControl: {},

gtag: {
  id: 'G-MYM02XCJFT', // TON ID GA4

  config: {
    debug_mode: false,
    send_page_view: true,
    anonymize_ip: true,
  },

  pageView: {
    enabled: true,
  },

  // CORRIGÉ : tags doit être un TABLEAU
  tags: [
    {
      id: 'G-MYM02XCJFT',
      config: {
        send_page_view: true,
      }
    }
  ]
},

  vite: {
    optimizeDeps: {
      include: [
        'firebase/app',
        'firebase/firestore',
        'vuefire',
        'pinia',
        'vuetify',
        'vuetify/components',
        'vuetify/directives',
      ],
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/vuetify/dist/**'],
      },
    },
  },

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
    },
    firestore: true,
    auth: false,
  },

  plugins: []
}