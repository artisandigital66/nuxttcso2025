<template>
  <div class="home anchor">
    <!-- MOBILES -->
    <v-row class="justify-center text-center my-5 d-xs-flex d-md-none">
      <v-col cols="10" class="justify-center transpa my-5 bg-black">
        <h1 class="my-3 subtitle-1">
          TRANSACTION & CONSEIL <br />
          SUD OUEST
        </h1>
        <v-img
          alt="TCSO logo"
          width="50%"
          class="mx-auto mb-5"
          src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
        />
        <h2 class="my-3 subtitle-2">Immobilier Commercial</h2>
        <v-btn variant="outlined" to="/annonces" size="small" aria-label="Nos annonces" color="primary">
          Toutes nos annonces
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- DESKTOP -->
    <v-row class="justify-center text-center d-none d-md-flex d-lg-flex">
      <v-img
        class="bg-grey-lighten-2"
        height="600"
        src="https://res.cloudinary.com/dkhuquewc/image/upload/v1756972964/enseigne-macon2_tp4org.jpg"
        cover
      >
        <v-col cols="8" md="6" class="justify-center center-affix transpa mt-10 pb-5 elevation-4 bg-black mx-auto">
          <h1 class="my-3 display-1">
            TRANSACTION & CONSEIL <br />
            SUD OUEST
          </h1>
          <v-img
            alt="TCSO logo"
            width="30%"
            class="mx-auto"
            src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
          />
          <h2 class="my-3 headline">Immobilier Commercial</h2>
          <v-btn variant="outlined" to="/annonces" size="small" aria-label="Nos annonces" color="primary">
            Toutes nos annonces
            <v-icon class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-img>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center mt-0">
        <h3 class="mx-auto title my-3">LOTS DISPONIBLES IMMEDIATEMENT</h3>
        <v-carousel
          cycle
          interval="3000"
          hide-delimiters
          height="auto"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="transaction in recentTransactions"
            :key="transaction.id"
          >
            <v-card class="mx-auto bandeau mb-3" max-width="600">
              <v-card-title class="text-h6">
                <v-icon color="yellow" icon="mdi-star" class="mr-2" />
                {{ transaction.titre }}
              </v-card-title>
              <v-card-subtitle>{{ transaction.soustitre }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  :to="`/annonces/${transaction.id}`"
                  color="white"
                  variant="outlined"
                  class="mx-auto"
                  size="small"
                >
                  Voir les détails
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- Vidéo -->
    <v-card elevation="4">
      <v-responsive>
        <v-row justify="center" class="mb-0 mx-auto">
          <iframe
            width="100%"
            height="700"
            class="d-none d-md-block"
            src="https://www.youtube.com/embed/bieUNSr8GsA?si=ygrqSE0LacGO_b2e"
            title="Présentation TCSO video"
            frameborder="0"
            allow="autoplay, accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </v-row>
      </v-responsive>
    </v-card>

    <v-row>
      <v-col cols="12" md="8" class="mx-auto text-center">
        <h3 class="mx-auto title mt-10">
          ANNONCES FAVORITES
        </h3>
      </v-col>
    </v-row>

    <v-row class="container justify-center mx-auto">
      <div v-if="isLoading" class="w-100">
        <v-skeleton-loader type="card" />
      </div>

      <div v-else-if="error">
        <v-alert type="error">
          Erreur : {{ error }}
        </v-alert>
      </div>

      <div v-else-if="favoriteAnnonces.length">
        <v-row>
          <v-col
            v-for="annonce in favoriteAnnonces"
            :key="annonce.id"
            cols="12"
            sm="6"
            md="8"
            class="justify-center mx-auto"
          >
            <v-card class="justify-space-around px-3" elevation="4">
              <v-row>
                <v-col cols="3">
                  <v-img
                    alt="TCSO logo"
                    width="30%"
                    class="mx-auto my-2 pa-5"
                    src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
                  />
                </v-col>
                <v-col cols="8">
                  <h2 class="headline ml-3">{{ annonce.titre || 'Annonce' }}</h2>
                  <h3 class="mb-3 ml-3">{{ annonce.soustitre }}</h3>
                </v-col>
                <v-card-text
                  class="markdown-content"
                  v-html="renderMarkdown(annonce.description, 200)"
                />
              </v-row>

              <v-row v-if="getPrimaryImages(annonce).length" class="mx-auto justify-center">
                <v-col
                  v-for="(media, index) in getPrimaryImages(annonce)"
                  :key="media.url + index"
                  cols="12"
                  md="4"
                >
                  <v-img
                    :src="media.url"
                    :alt="media.titre || annonce.titre"
                    cover
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-btn
                  :to="`/annonces/${annonce.id}`"
                  color="primary"
                  variant="outlined"
                  class="mx-auto mt-3 mb-5"
                >
                  Voir les détails
                </v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-alert type="warning">
          Aucune annonce favorite trouvée
        </v-alert>
      </div>
    </v-row>

    <v-row class="container justify-center mx-auto">
      <v-col cols="12" md="8" class="mt-5 text-center">
        <v-card class="mb-5" elevation="4">
          <v-row class="mx-auto">
            <v-col cols="12" md="8" class="mx-auto text-center">
              <h3 class="mx-auto headline mt-3">PRESENTATION ET SERVICES</h3>
              <v-img
                alt="TCSO logo"
                width="10%"
                class="mx-auto mt-5 pa-5"
                src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
              />
              <h5 class="mx-auto title mt-10">
                Vendez votre affaire, 1 objectif plusieurs possibilités
              </h5>
              <p class="mx-auto mt-10 text-left">
                <span class="font-weight-bold">"Céder son affaire"</span>
                revêt différentes réalités juridiques. Ainsi acheteur et
                vendeur, selon leur situation, pourront céder ou acquérir à leur
                choix leur fonds de commerce, leur droit au bail ou leur
                société.
              </p>
              <p class="mx-auto mt-3 text-left">
                N’hésitez pas à aller jeter un coup d’œil sur notre page dédiée.
              </p>
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto justify-end">
            <v-btn to="/informations" color="primary">En savoir plus</v-btn>
          </v-card-actions>

          <v-row class="mx-auto">
            <v-col cols="12" md="8" class="mx-auto text-center">
              <h5 class="mx-auto title mt-10">
                Présentation de la société, méthodes, réseaux
              </h5>
              <p class="mt-5 text-left">
                Fort de mon expérience dans les secteurs immobiliers et
                financiers j’ai décidé aujourd’hui de mettre tout mon
                savoir-faire et mon énergie afin qu’acheteurs et vendeurs,
                bailleurs et locataires puissent se rencontrer dans les
                meilleures conditions.
              </p>
              <p class="mt-5 text-left">
                Passionné de course à pied avec une attirance pour les courses
                longues distances en semi autonomie mon maître mot est la
                persévérance.
              </p>
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto justify-end">
            <v-btn to="/qui" color="primary">En savoir plus</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAnnonceStore } from '~/stores/annonces'
import type { Annonce } from '../types/annonce'

useSeoMeta({
  title: 'TCSO, Immobilier Commercial',
  description:
    'Agence immobilière spécialisée dans la transaction de locaux commerciaux, fonds de commerce et droits au bail dans le Sud-Ouest.',
})

const annonceStore = useAnnonceStore()
const { favoriteAnnonces, loading, error } = storeToRefs(annonceStore)
const { renderMarkdown } = useMarkdown()

const recentTransactions = ref([
  {
    id: 'v8OM76B9YyjojnbTHiZL',
    titre: 'Saint Maixent (79)',
    soustitre: 'Local commercial 100m²',
  },
  {
    id: 'KVfosZdxMgNvQWPFKydO',
    titre: 'Brest (29)',
    soustitre: 'Local commercial 150m²',
  },
  {
    id: 'dmmM4mwkvFSThC8PW6PX',
    titre: 'Nissan-les-Enserunes (34)',
    soustitre: 'Local commercial 120m²',
  },
])

const { pending } = await useAsyncData('home-annonces', async () => {
  await annonceStore.fetchAnnonces()
  return true
})

console.log('Total:', annonceStore.annonces.length, 'Filtrées:', filteredAnnonces.value.length, 'Dept:', annonceStore.selectedDepartement)

const isLoading = computed(() => pending.value || loading.value)

const getPrimaryImages = (annonce: Annonce) => {
  return (annonce.images || []).filter(
    (media) => String(media.ordre) === '1' && Boolean(media.url)
  )
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.transpa {
  opacity: 0.7;
}
.bandeau {
  background-color: darkslategrey;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.bandeau:hover {
  transform: scale(1.02);
}
.v-carousel {
  max-width: 800px;
  margin: 0 auto;
}
.v-card-title {
  font-size: 1.2rem;
  font-weight: 600;
}
.v-card-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}
.v-btn {
  text-transform: none;
  font-weight: 500;
}
.markdown-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.markdown-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.markdown-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.markdown-content :deep(p) {
  margin-bottom: 1rem;
}
.markdown-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}
.markdown-content :deep(strong) {
  font-weight: bold;
}
.markdown-content :deep(em) {
  font-style: italic;
}
</style>