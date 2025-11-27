// nuxt.config.ts
import type { Plugin } from 'vite'
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
    (_options: any, nuxt: { hooks: { hook: (arg0: string, arg1: (config: { plugins: Plugin<any>[][] }) => void) => void } }) => {
      nuxt.hooks.hook('vite:extendConfig', (config: { plugins: Plugin<any>[][] }) => {
        config.plugins = config.plugins || []
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-vuefire',
    '@pinia/nuxt',
    'nuxt-gtag'
  ],

  cookieControl: {
    barPosition: 'bottom-full',
  // Switch to toggle if clicking the overlay outside the configuration modal closes the modal.
    closeModalOnClickOutside: true,
    colors: {
      barBackground: '#3CA2A4',
      barButtonBackground: '#3CA2A4',
      barButtonColor: '#000',
      barButtonHoverBackground: '#333',
      barButtonHoverColor: '#3CA2A4',
      barTextColor: '#fff',
      checkboxActiveBackground: '#000',
      checkboxActiveCircleBackground: '#fff',
      checkboxDisabledBackground: '#ddd',
      checkboxDisabledCircleBackground: '#fff',
      checkboxInactiveBackground: '#000',
      checkboxInactiveCircleBackground: '#fff',
      controlButtonBackground: '#3CA2A4',
      controlButtonHoverBackground: '#2B7691',
      controlButtonIconColor: '#fff',
      controlButtonIconHoverColor: '#fff',
      focusRingColor: '#808080',
      modalBackground: '#fff',
      modalButtonBackground: '#000',
      modalButtonColor: '#fff',
      modalButtonHoverBackground: '#333',
      modalButtonHoverColor: '#fff',
      modalOverlay: '#000',
      modalOverlayOpacity: 0.8,
      modalTextColor: '#22b85bff',
      modalUnsavedColor: '#fff',
    },
    text: {
      barTitle: 'Cookies',
      barDescription: 'We use our own cookies and third-party cookies so that we can show you this website and better understand how you use it, with a view to improving the services we offer. If you continue browsing, we consider that you have accepted the cookies.',
      acceptAll: 'Accept all',
      declineAll: 'Delete all',
      manageCookies: 'Manage cookies',
      unsaved: 'You have unsaved settings',
      close: 'Close',
      save: 'Save',
      necessary: 'Necessary cookies',
      optional: 'Optional cookies',
      functional: 'Functional cookies',
      blockedIframe: 'To see this, please enable functional cookies',
      here: 'here'
    },


// The cookies that are to be controlled.
// See detailed explanation further down below!
cookies: {
  // necessary: [],
  optional: [],
}
  },

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