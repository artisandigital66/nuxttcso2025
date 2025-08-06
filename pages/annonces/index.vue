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
      <div v-else-if="annonceStore.filteredAnnonces.length">
        <v-row>
          <v-col
            v-for="annonce in annonceStore.filteredAnnonces"
            :key="annonce.id"
            cols="12"
            sm="6"
            md="8"
            class="justify-center mx-auto"
          >
            <v-card class="justify-space-around px-3">
              <v-card-title><h3>{{ annonce.titre }}</h3></v-card-title>
              <v-card-subtitle><h4>{{ annonce.soustitre }}</h4></v-card-subtitle>
              <v-card-subtitle><h4>Département: {{ annonce.departement }}</h4></v-card-subtitle>
              <v-card-text v-html="renderMarkdown(annonce.description, 100)"></v-card-text>
              <v-row class="mx-auto justify-center">
                <v-col
                  cols="12"
                  md="4"
                  v-for="(media, index) in annonce.images"
                  :key="media.url + index"
                >
                  <v-img
                    v-if="media.ordre == '1'"
                    :src="media.url"
                    alt="Image de l'annonce"
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false, // Désactiver le HTML brut pour des raisons de sécurité
  breaks: true, // Convertir les sauts de ligne en <br>
  linkify: true, // Convertir les URLs en liens cliquables
});

const annonceStore = useAnnonceStore();
const loading = ref(true);
const error = ref(null);

const renderMarkdown = (text, maxLength) => {
  if (!text) return '';
  // Limiter le texte à maxLength caractères pour l'extrait
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return md.render(text);
};

let unsubscribe = () => {};

onMounted(async () => {
  try {
    console.log('Démarrage du chargement des annonces...');
    // unsubscribe = await annonceStore.fetchAnnonces();
    console.log('filteredAnnonces après chargement:', annonceStore.filteredAnnonces);
  } catch (err) {
    error.value = err;
    console.error('Erreur lors du chargement des annonces:', err);
  } finally {
    loading.value = false;
  }
});

watch(
  () => annonceStore.filteredAnnonces,
  (newAnnonces) => {
    console.log('filteredAnnonces mis à jour:', newAnnonces);
  }
);

// onUnmounted(() => {
//   unsubscribe();
// });
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