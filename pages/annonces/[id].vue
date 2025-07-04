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
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title><h2>{{ annonce.titre }}</h2></v-card-title>
              <v-card-subtitle>Département: {{ annonce.departement }}</v-card-subtitle>
              <h2 class="ml-3 mt-3">Description</h2>
              <v-card-text>{{ annonce.description }}</v-card-text>
              <h2 class="ml-3">Conditions financières et juridiques</h2>
              <v-card-text>{{ annonce.conditions }}</v-card-text>
              <h2 class="ml-3">Environnement</h2>
              <v-card-text>{{ annonce.environnement }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-carousel v-if="annonce.images?.length" hide-delimiters>
              <v-carousel-item
                v-for="(media, index) in annonce.images"
                :key="index"
                
              >
                <v-img
                  :src="media.url"
                  alt="Image de l'annonce"
                  cover
                  @click="openImage(media.url)"
                  @error="handleImageError(media.url)"
                  @load="handleImageLoad(media.url)"
                />
              </v-carousel-item>
            </v-carousel>
            <v-alert v-else type="warning">
              Aucune image disponible
            </v-alert>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-alert type="warning">
          Aucune annonce trouvée
        </v-alert>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';

const annonceStore = useAnnonceStore();
const route = useRoute();
const loading = ref(true);
const error = ref(null);

const annonce = computed(() => {
  const found = annonceStore.annonces.find((a) => a.id === route.params.id);
  console.log('Annonce trouvée:', found);
  return found;
});

let unsubscribe = () => {};

onMounted(async () => {
  try {
    if (!annonceStore.annonces.length) {
      unsubscribe = await annonceStore.fetchAnnonces();
    }
    if (!annonce.value) {
      error.value = new Error('Aucune annonce trouvée pour cet ID');
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

const openImage = (url) => {
  console.log('Ouvrir l\'image:', url);
  window.open(url, '_blank');
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
</style>