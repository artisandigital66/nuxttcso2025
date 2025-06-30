<template>
  <ClientOnly>
    <div class="container">
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
            md="4"
          >
            <v-card>
              <v-card-title>{{ annonce.titre }}</v-card-title>
              <v-card-subtitle>Département: {{ annonce.departement }}</v-card-subtitle>
              <v-card-text>{{ annonce.description }}</v-card-text>
              <v-card-actions>
                <v-btn :to="`/annonces/${annonce.id}`" color="primary">
                  Voir les détails
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-alert type="warning">
          Aucune annonce trouvée dans ce département
        </v-alert>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAnnonceStore } from '~/stores/annonces';
import { ref, onMounted, onUnmounted } from 'vue';

const annonceStore = useAnnonceStore();
const loading = ref(true);
const error = ref(null);

let unsubscribe = () => {};
onMounted(async () => {
  try {
    unsubscribe = await annonceStore.fetchAnnonces();
  } catch (err) {
    error.value = err;
    console.error('Erreur lors du chargement des annonces:', err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  // unsubscribe();
});
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>