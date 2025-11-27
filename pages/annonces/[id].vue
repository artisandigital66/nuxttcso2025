<template>
  <ClientOnly>
    <div class="container mx-auto">
      <v-card class="mb-5">
        <h1 class="headline ml-3">{{ annonce?.titre || 'Chargement...' }}</h1>
        <h2 class="mb-3 ml-3">{{ annonce?.soustitre }}</h2>
      </v-card>
      <div v-if="loading">
        <v-skeleton-loader type="card" />
      </div>
      <div v-else-if="error">
        <v-alert type="error">
          Erreur : {{ error.message }}
        </v-alert>
      </div>
      <div v-else-if="annonce">
        <v-row>
          <v-col cols="12" md="12">
            <v-card>
              
                <!-- <v-tabs
                bg-color="#3CA2A4"
                grow
              >
                  <v-tab value="description">Description</v-tab>

                  <v-tab value="environnement">Environnement commercial</v-tab>

                  <v-tab value="conditions">Conditions juridiques et financières</v-tab>
                </v-tabs>

                <v-tabs-window v-model="tab">
                  <v-tabs-window-item value="description">
                    <v-card class="mb-5">
                      <v-card-text v-html="renderedDescription"></v-card-text>
                    </v-card>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="environnement">
                    <v-card class="mt-3">
                      <v-card-text v-html="renderedConditions"></v-card-text>
                    </v-card>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="conditions">
                    <v-card class="mt-3">
                      <v-card-text v-html="renderedEnvironnement"></v-card-text>
                    </v-card>
                  </v-tabs-window-item>
                </v-tabs-window> -->
              <h3 class="ml-3 mt-3">Description</h3>
              <v-card class="mb-5">
                <v-card-text v-html="renderedDescription"></v-card-text>
              </v-card>
              <h3 class="ml-3 mt-3">Conditions juridiques et financières</h3>
              <v-card class="mt-3">
                <v-card-text v-html="renderedConditions"></v-card-text>
              </v-card>
              <h3 class="ml-3 mt-3">Environnement commercial</h3>
              <v-card class="mt-3">
                <v-card-text v-html="renderedEnvironnement"></v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" md="12">
            <ClientOnly>
              
              <v-card class="my-3">
                <h3 class="ml-3 mt-3">Medias et documents</h3>
                <v-carousel v-if="uniqueImages.length" hide-delimiters>
                  <v-carousel-item
                   class="mt-2 mb-5"
                    v-for="(image, index) in uniqueImages"
                    :key="image.url + index"
                  >
                    <v-img
                      :src="image.url"
                      :alt="image.titre"
                      
                      @click="openImageModal(image.url)"
                      @error="handleImageError(image.url)"
                      @load="handleImageLoad(image.url)"
                    />
                  </v-carousel-item>
                </v-carousel>
                
                <v-alert v-else type="warning">
                  Aucune image disponible pour cette annonce
                </v-alert>
                <v-row class="mb-10">
                <v-btn class="mx-auto mt-10 mb-4" color="red" :href="annonce.pdf">Téléchargez le pdf</v-btn>
              </v-row>
              </v-card>
              
            </ClientOnly>
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
              <v-btn color="primary" text @click="showModal = false">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-else>
        <v-alert type="warning">
          Aucune annonce trouvée pour l'ID {{ route.params.id }}
        </v-alert>
      </div>
      
      <v-row class="justify-center py-5">
        <v-col cols="12" sm="8">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn
          variant="outlined"
          class="mx-auto mt-10 mb-4"
          color="primary"
          @click="$router.back()"
        >
          Retour
        </v-btn>
      </v-row>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
});
const tab = ref(null)
const annonceStore = useAnnonceStore();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const selectedImage = ref('');

const annonce = computed(() => {
  const found = annonceStore.annonces.find((a) => a.id === route.params.id);
  console.log('ID demandé:', route.params.id);
  console.log('Annonces disponibles:', annonceStore.annonces);
  console.log('Annonce trouvée:', found);
  console.log('Images de l\'annonce:', found?.images);
  return found;
});

const uniqueImages = computed(() => {
  if (!annonce.value?.images) return [];
  const seen = new Set();
  return annonce.value.images.filter((image) => {
    if (seen.has(image.url)) return false;
    seen.add(image.url);
    return true;
  });
});

const renderedDescription = computed(() => {
  return annonce.value?.description ? md.render(annonce.value.description) : '';
});

const renderedConditions = computed(() => {
  return annonce.value?.conditions ? md.render(annonce.value.conditions) : '';
});

const renderedEnvironnement = computed(() => {
  return annonce.value?.environnement ? md.render(annonce.value.environnement) : '';
});

let unsubscribe = () => {};

onMounted(async () => {
  try {
    console.log('Chargement de l\'annonce...');
    if (!annonceStore.annonces.length) {
      unsubscribe = await annonceStore.fetchAnnonces();
    }
    if (!annonce.value) {
      error.value = new Error(`Aucune annonce trouvée pour l'ID ${route.params.id}`);
    }
  } catch (err) {
    error.value = err;
    console.error('Erreur lors du chargement de l\'annonce:', err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  unsubscribe();
});

const openImageModal = (url) => {
  console.log('Ouverture de la modale avec l\'image:', url);
  selectedImage.value = url;
  showModal.value = true;
};

const handleImageError = (url) => {
  console.error('Erreur de chargement de l\'image:', url);
};

const handleImageLoad = (url) => {
  console.log('Image chargée avec succès:', url);
};
</script>

<style scoped>
.container {
  padding: 20px;
}

:deep(h1) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

:deep(h2) {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

:deep(p) {
  margin-bottom: 1rem;
}

:deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(strong) {
  font-weight: bold;
}

:deep(em) {
  font-style: italic;
}
</style>