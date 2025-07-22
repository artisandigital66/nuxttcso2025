
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
        <v-row class="justify-center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-subtitle><h3>{{ annonce.soustitre }}</h3></v-card-subtitle>
              <v-card-subtitle>Département: {{ annonce.departement }}</v-card-subtitle>
              <h3 class="ml-3 mt-3">Description</h3>
              <v-card-text>{{ annonce.description }}</v-card-text>
              <h3 class="ml-3 mt-3">Conditions juridiques et financieres</h3>
              <v-card-text>{{ annonce.conditions }}</v-card-text>
              <h3 class="ml-3 mt-3">Environnement</h3>
              <v-card-text>{{ annonce.environnement }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mx-auto justify-center">
          <v-col cols="12" md="4">
            <v-carousel v-if="uniqueMedias.length" hide-delimiters>
              <v-carousel-item
                v-for="(media, index) in uniqueMedias"
                :key="media.url + index"
              >
                <v-img
                  :src="media.url"
                  alt="Image de l'annonce"
                  cover
                  @click="openImageModal(media.url)"
                  @error="handleImageError(media.url)"
                  @load="handleImageLoad(media.url)"
                />
              </v-carousel-item>
            </v-carousel>
            <v-alert v-else type="warning">
              Aucune image disponible pour cette annonce
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-btn variant ="outlined" class="mx-auto mt-10 mb-4" color="primary" @click="$router.back()">Retour</v-btn>
        </v-row>

        <!-- Visionneuse modale -->
        <v-dialog v-model="showModal" transition="dialog-top-transition">
          <v-card>
            <v-img
              :src="selectedImage"
              alt="Image agrandie"
              max-height="100vh"
              contain
              cover
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
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

const annonceStore = useAnnonceStore();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const selectedImage = ref('');

const annonce = computed(() => {
  const found = annonceStore.annonces.find((a) => a.id === route.params.id);
  // console.log('ID demandé:', route.params.id);
  // console.log('Annonces disponibles:', annonceStore.annonces);
  // console.log('Annonce trouvée:', found);
  // console.log('Images de l\'annonce:', found?.images);
  return found;
});

const uniqueMedias = computed(() => {
  if (!annonce.value?.images) return [];
  // Supprimer les doublons basés sur l'URL
  const seen = new Set();
  return annonce.value.images.filter((media) => {
    if (seen.has(media.url)) return false;
    seen.add(media.url);
    return true;
  });
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

onUnmounted(() => {
  unsubscribe();
});

watch(
  () => annonceStore.annonces,
  (newAnnonces) => {
    console.log('Annonces mises à jour:', newAnnonces);
    console.log('Images uniques:', uniqueMedias.value);
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
</style>