<!-- pages/annonces/[id].vue -->
<template>
  <div class="container mx-auto">
    <!-- En-tête d'origine -->
    <v-card elevation="6" class="mb-5">
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
          <h1 class="headline ml-3">{{ annonce?.titre || 'Chargement...' }}</h1>
          <h2 class="mb-3 ml-3">{{ annonce?.soustitre }}</h2>
        </v-col>
      </v-row>
    </v-card>

    <!-- Chargement -->
    <div v-if="pending">
      <v-skeleton-loader type="card" />
    </div>

    <!-- Erreur -->
    <div v-else-if="error">
      <v-alert type="error" title="Annonce introuvable" class="mb-6">
        {{ error.message || error }}
      </v-alert>
    </div>

    <!-- Contenu principal (empilé comme à l'origine) -->
    <div v-else-if="annonce">
      <v-row>
        <v-col cols="12" md="12">
          <v-card elevation="6" class="mb-6">
            <v-tabs
              v-model="activeTab"
              bg-color="#3CA2A4"
              color="white"
              grow
              slider-color="white"
            >
              <v-tab value="description">Description</v-tab>
              <v-tab value="environnement">Environnement commercial</v-tab>
              <v-tab value="conditions">Conditions juridiques & financières</v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="pa-6">
              <v-window-item value="description">
                <div v-html="renderedDescription" class="markdown-content" />
              </v-window-item>
              <v-window-item value="environnement">
                <div v-html="renderedEnvironnement" class="markdown-content" />
              </v-window-item>
              <v-window-item value="conditions">
                <div v-html="renderedConditions" class="markdown-content" />
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>

        <v-col cols="12" md="12">
          <v-card elevation="6" class="my-3">
            <h3 class="ml-3 mt-3">Médias et documents</h3>

            <v-carousel v-if="uniqueImages.length" hide-delimiters>
              <v-carousel-item
                v-for="(image, index) in uniqueImages"
                :key="image.url + index"
                class="mt-2 mb-5"
              >
                <v-img
                  :src="image.url"
                  :alt="image.titre || annonce.titre"
                  class="cursor-pointer"
                  @click="openImageModal(image.url)"
                />
              </v-carousel-item>
            </v-carousel>

            <v-alert v-else type="warning" class="ma-4">
              Aucune image disponible pour cette annonce
            </v-alert>

            <v-row v-if="annonce.pdf" class="mb-10">
              <v-btn
                class="mx-auto mt-10 mb-4"
                color="red"
                :href="annonce.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Téléchargez le pdf
              </v-btn>
            </v-row>

            <v-row v-if="annonce.video" class="justify-center mb-3">
              <iframe
                width="315"
                height="560"
                :src="annonce.video"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="showModal" max-width="800">
        <v-card>
          <v-img
            :src="selectedImage"
            alt="Image agrandie"
            max-height="100vh"
            max-width="80vw"
            contain
          />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" variant="text" @click="showModal = false">
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Introuvable -->
    <div v-else>
      <v-alert type="warning">
        Aucune annonce trouvée pour l'ID {{ annonceId }}
      </v-alert>
    </div>

    <v-row class="justify-center py-5">
      <v-col cols="12" sm="8">
        <v-divider />
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-btn
        variant="outlined"
        class="mx-auto mt-10 mb-4"
        color="primary"
        @click="router.back()"
      >
        Retour aux annonces
      </v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAnnonceStore } from '~/stores/annonces'

const route = useRoute()
const router = useRouter()
const annonceStore = useAnnonceStore()
const { renderMarkdown } = useMarkdown()

const annonceId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : String(route.params.id)

const { data: annonce, pending, error } = await useAsyncData(
  `annonce-${annonceId}`,
  () => annonceStore.fetchAnnonceById(annonceId)
)

const activeTab = ref('description')
const showModal = ref(false)
const selectedImage = ref('')

const uniqueImages = computed(() => {
  if (!annonce.value?.images) return []
  const seen = new Set<string>()
  return annonce.value.images.filter((image) => {
    if (!image?.url || seen.has(image.url)) return false
    seen.add(image.url)
    return true
  })
})

const renderedDescription = computed(() => renderMarkdown(annonce.value?.description))
const renderedEnvironnement = computed(() => renderMarkdown(annonce.value?.environnement))
const renderedConditions = computed(() => renderMarkdown(annonce.value?.conditions))

const openImageModal = (url: string) => {
  selectedImage.value = url
  showModal.value = true
}

useSeoMeta({
  title: () => annonce.value?.titre || 'Détail de l’annonce',
  ogTitle: () => (annonce.value?.titre ? `${annonce.value.titre} — TCSO` : 'TCSO'),
  description: () => annonce.value?.soustitre || 'Local commercial proposé par TCSO',
  ogDescription: () => annonce.value?.soustitre || 'Local commercial proposé par TCSO',
  ogImage: () =>
    uniqueImages.value[0]?.url ||
    'https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png',
})
</script>

<style scoped>
.container {
  padding: 20px;
}
.cursor-pointer {
  cursor: pointer;
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