<template>
  <ClientOnly>
    <div class="container">
      <h1 class="headline">{{ annonce?.titre || 'Chargement...' }}</h1>

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
              <v-card-title><h2>{{ annonce.titre }}</h2></v-card-title>
              <v-card-subtitle>Département: {{ annonce.departement }}</v-card-subtitle>
              <h2 class="ml-3 mt-3">Description</h2>
              <v-card-text v-html="renderedDescription"></v-card-text>
              <h2 class="ml-3 mt-3">Conditions juridiques et financières</h2>
              <v-card-text v-html="renderedConditions"></v-card-text>
              <h2 class="ml-3 mt-3">Environnement</h2>
              <v-card-text v-html="renderedEnvironnement"></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="12">
            <v-carousel v-if="uniqueImages.length" hide-delimiters>
              <v-carousel-item
                v-for="(image, index) in uniqueImages"
                :key="image.url + index"
              >
                <v-img
                  :src="image.url"
                  alt="Image de l'annonce"
                  cover
                  @click="openImageModal(image.url)"
                  @error="handleImageError(image.url)"
                  @load="handleImageLoad(image.url)"
                />
              </v-carousel-item>
            </v-carousel>
            <v-alert v-else type="warning">
              Aucune image disponible pour cette annonce
            </v-alert>
          </v-col>
        </v-row>

        <!-- Visionneuse modale -->
        <v-dialog v-model="showModal" max-width="800">
          <v-card>
            <v-img
              :src="selectedImage"
              alt="Image agrandie"
              max-height="80vh"
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
      <v-row class="justify-center">
        <v-btn :href="annonce.url" color="red" variant="outlined">PDF</v-btn>
      </v-row>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false, // Désactiver le HTML brut pour des raisons de sécurité
  breaks: true, // Convertir les sauts de ligne en <br>
  linkify: true, // Convertir les URLs en liens cliquables
});

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
  // Supprimer les doublons basés sur l'URL
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
    if (!annonceStore.annonces.length) {
      console.log('Chargement des annonces...');
      unsubscribe = await annonceStore.fetchAnnonces();
      // Attendre que les annonces soient chargées
      await new Promise(resolve => setTimeout(resolve, 1000));
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

// onUnmounted(() => {
//  unsubscribe();
// });

watch(
  () => annonceStore.annonces,
  (newAnnonces) => {
    console.log('Annonces mises à jour:', newAnnonces);
    console.log('Images uniques:', uniqueImages.value);
  }
);

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

/* Styles pour le contenu Markdown */
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