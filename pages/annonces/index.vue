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
            <v-card-text>{{ annonce.description }}</v-card-text>
              <v-row class="mx-auto justify-center">
                <v-col class="" cols="12" md="4" v-for="(media, index) in annonce.images"
                :key="media.url + index">
                    <v-img v-if="media.ordre == '1'"
                      :src="media.url"
                      alt="Image de l'annonce"
                      cover
                    />
                </v-col>
              </v-row>
              <v-row>
                <v-btn :to="`/annonces/${annonce.id}`" color="primary" variant ="outlined" class="mx-auto mt-3 mb-5">
                  Voir les détails
                </v-btn>
              </v-row>
            </v-card>
        </v-col>
      </div>
      
      <div v-else>
        <!-- <v-alert type="warning">
          Aucune annonce trouvée
        </v-alert> -->
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </div>
    </v-row>
    <v-row>
      <v-btn variant ="outlined" class="mx-auto mt-10 mb-4" color="primary" @click="$router.back()">Retour</v-btn>
    </v-row>
    
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