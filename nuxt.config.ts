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
      // apiKey: "AIzaSyCWfpuj6RrETqsTlzjBTQy_4Yvk0MMCGow",
      // authDomain: "tcso-b3ea7.firebaseapp.com",
      // databaseURL: "https://tcso-b3ea7.firebaseio.com",
      // projectId: "tcso-b3ea7",
      // storageBucket: "tcso-b3ea7.appspot.com",
      // messagingSenderId: "959363696145",
      // appId: "1:959363696145:web:50f6cd9535ff7f4853d3b0",
      // measurementId: "G-B128LH1X1F"
      apiKey: "AIzaSyDyGtsOSLSyUdszfp_xXQSi76bQFuHFQuQ",
      authDomain: "staging-tcso.firebaseapp.com",
      databaseURL: "https://staging-tcso.firebaseio.com",
      projectId: "staging-tcso",
      storageBucket: "staging-tcso.firebasestorage.app",
      messagingSenderId: "638341825999",
      appId: "1:638341825999:web:6e9caf22bea2ac7e49beba"
    },
    firestore: true, // Activer explicitement Firestore
  },
  
  plugins:
    []

})