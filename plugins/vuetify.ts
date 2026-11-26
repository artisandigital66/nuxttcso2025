// import this after install `@mdi/font` package
// import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
// import 'vuetify/styles'
import { fr } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        locale: {
            locale: 'fr',
            fallback: 'fr',
            messages: { fr },
    },
    
    })
    app.vueApp.use(vuetify)
})