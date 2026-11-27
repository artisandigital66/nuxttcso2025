<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-6 text-center">
          Liste des annonces
        </h1>
      </v-col>
    </v-row>

    <v-row v-if="isLoading" justify="center">
      <v-col v-for="n in 3" :key="n" cols="12" md="8">
        <v-skeleton-loader type="card" class="mb-4" />
      </v-col>
    </v-row>

    <v-row v-else-if="error" justify="center">
      <v-col cols="12" md="8">
        <v-alert type="error" variant="tonal">
          Erreur : {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="filteredAnnonces.length" justify="center">
      <v-col
        v-for="annonce in filteredAnnonces"
        :key="annonce.id"
        cols="12"
        md="8"
      >
        <v-card elevation="3" class="pa-4 mb-2">
          <v-row align="center">
            <v-col cols="12" sm="3" class="text-center">
              <v-img
                alt="TCSO logo"
                max-width="90"
                class="mx-auto"
                src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
              />
            </v-col>

            <v-col cols="12" sm="9">
              <h2 class="text-h6 font-weight-bold">
                {{ annonce.titre || 'Annonce' }}
              </h2>
              <p v-if="annonce.soustitre" class="text-subtitle-2 text-medium-emphasis mt-1">
                {{ annonce.soustitre }}
              </p>
            </v-col>
          </v-row>

          <v-card-text
            v-if="annonce.description"
            class="markdown-content px-0"
            v-html="renderMarkdown(annonce.description, 200)"
          />

          <v-row v-if="getPrimaryImages(annonce).length" class="mt-1">
            <v-col
              v-for="(media, index) in getPrimaryImages(annonce)"
              :key="media.url + index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-img
                :src="media.url"
                :alt="media.titre || annonce.titre"
                height="180"
                cover
                rounded="lg"
              />
            </v-col>
          </v-row>

          <v-card-actions class="justify-center pt-4">
            <v-btn
              :to="`/annonces/${annonce.id}`"
              color="primary"
              variant="outlined"
              aria-label="Voir les détails de l'annonce"
            >
              Voir les détails
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="12" md="8">
        <v-alert type="warning" variant="tonal">
          Aucune annonce trouvée pour ce critère.
        </v-alert>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8 mb-4">
      <v-btn
        variant="outlined"
        color="primary"
        aria-label="Retour"
        @click="router.back()"
      >
        Retour
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAnnonceStore } from '~/stores/annonces'
import type { Annonce } from '../types/annonce'

useSeoMeta({
  title: 'Nos annonces',
  description: 'Consultez toutes nos offres de locaux commerciaux, fonds de commerce et droits au bail.',
})

const router = useRouter()
const annonceStore = useAnnonceStore()
const { filteredAnnonces, loading, error } = storeToRefs(annonceStore)
const { renderMarkdown } = useMarkdown()

const { pending } = await useAsyncData('annonces-list', async () => {
  await annonceStore.fetchAnnonces()
  return true
})

const isLoading = computed(() => pending.value || loading.value)

const getPrimaryImages = (annonce: Annonce) => {
  return (annonce.images || []).filter(
    (media: { ordre: any; url: any }) => String(media.ordre) === '1' && Boolean(media.url)
  )
}
</script>

<style scoped>
.markdown-content :deep(h1) {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.markdown-content :deep(h2) {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.markdown-content :deep(p) {
  margin-bottom: 0.75rem;
}
.markdown-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}
</style>
