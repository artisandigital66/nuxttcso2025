import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  debug: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    'nuxt-vuefire',
    '@pinia/nuxt'
  ],
  vite: {
    server: {
      watch: {
        usePolling: process.env.NODE_ENV === 'development' ? true : false,
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
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    vueJsx: {
      mergeProps: true
    }
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
    firestore: true, // Activer explicitement Firestore
  },
  
  plugins:
    []

})