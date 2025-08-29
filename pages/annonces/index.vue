<template>
  <ClientOnly>
    <v-row class="container justify-center mx-auto">
      <h1 class="headline">Liste des annonces</h1>

      <div v-if="loading">
        <v-skeleton-loader type="card" />
      </div>
      <div v-else-if="error">
        <v-alert type="error">
          Erreur : {{ error.message }}
        </v-alert>
      </div>
      <div v-else-if="filteredAnnonces && filteredAnnonces.length">
        <v-row>
          <v-col
            v-for="annonce in filteredAnnonces"
            :key="annonce.id"
            cols="12"
            sm="6"
            md="8"
            class="justify-center mx-auto"
          >
            <v-card class="justify-space-around px-3">
              <v-card-title><h3>{{ annonce.titre }}</h3></v-card-title>
              <v-card-subtitle><h4>{{ annonce.soustitre }}</h4></v-card-subtitle>
              <v-card-text v-html="renderMarkdown(annonce.description, 200)"></v-card-text>
              <v-row class="mx-auto justify-center">
                <v-col
                  class="mx-auto justify-center"
                  cols="12"
                  md="4"
                  v-for="(media, index) in annonce.images || []"
                  :key="media.url + index"
                >
                  <v-img
                    v-show="media.ordre == '1'"
                    :src="media.url"
                    :alt="image.titre"
                    cover
                    class="mx-auto justify-center"
                    @error="handleImageError(media.url)"
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
          Aucune annonce trouvée
        </v-alert>
      </div>
    </v-row>
    <v-row>
      <v-btn
        variant="outlined"
        class="mx-auto mt-10 mb-4"
        color="primary"
        @click="$router.back()"
      >
        Retour
      </v-btn>
    </v-row>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
});

const annonceStore = useAnnonceStore();
const loading = ref(true);
const error = ref(null);

const filteredAnnonces = computed(() => {
  return annonceStore.filteredAnnonces || [];
});

const renderMarkdown = (text, maxLength = 200) => {
  if (!text) return '';
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return md.render(truncated);
};

const handleImageError = (url) => {
  console.error('Erreur de chargement de l\'image:', url);
};

let unsubscribe = () => {};

onMounted(async () => {
  try {
    console.log('Démarrage du chargement des annonces...');
    unsubscribe = await annonceStore.fetchAnnonces();
    console.log('filteredAnnonces après chargement:', filteredAnnonces.value);
  } catch (err) {
    error.value = err;
    console.error('Erreur lors du chargement des annonces:', err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  unsubscribe();
});
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

:deep(h3) {
  font-size: 1.1rem;
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