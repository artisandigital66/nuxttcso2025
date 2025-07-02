<template>
  <ClientOnly>
    <v-app>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>TCSO</v-app-bar-title>

        <v-chip-group class="mr-3" v-if="$route.name == 'annonces'">
          <v-chip
            base-color="blue"
            color="green"
            filter
            @click="click31"
            :class="{ 'v-chip--selected': selectedDepartement === '31' }"
          >
            31
          </v-chip>
          <v-chip
            base-color="blue"
            color="green"
            filter
            @click="click81"
            :class="{ 'v-chip--selected': selectedDepartement === '81' }"
          >
            81
          </v-chip>
          <v-chip
            base-color="blue"
            color="green"
            filter
            @click="click09"
            :class="{ 'v-chip--selected': selectedDepartement === '09' }"
          >
            09
          </v-chip>
          <v-chip
            base-color="blue"
            color="green"
            filter
            @click="clicktous"
            :class="{ 'v-chip--selected': selectedDepartement === 'tous' }"
          >
            Tous
          </v-chip>
        </v-chip-group>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-group active-class="teal--text text--accent-4">
            <v-list-item to="/">
              <template v-slot:prepend>
                <v-icon>mdi-home</v-icon>
              </template>
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>

            <v-list-item to="/annonces">
              <template v-slot:prepend>
                <v-icon>mdi-text-box-plus-outline</v-icon>
              </template>
              <v-list-item-title>Annonces</v-list-item-title>
            </v-list-item>

            <v-list-item to="/informations">
              <template v-slot:prepend>
                <v-icon>mdi-information-outline</v-icon>
              </template>
              <v-list-item-title>Informations</v-list-item-title>
            </v-list-item>

            <v-list-item to="/qui">
              <template v-slot:prepend>
                <v-icon>mdi-account-search-outline</v-icon>
              </template>
              <v-list-item-title>Qui sommes nous?</v-list-item-title>
            </v-list-item>

            <v-list-item to="/contacts">
              <template v-slot:prepend>
                <v-icon>mdi-at</v-icon>
              </template>
              <v-list-item-title>Contacts</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <div class="py-0">
        <slot />
      </div>
    </v-app>
  </ClientOnly>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnnonceStore } from '~/stores/annonces';

const drawer = ref(false);
const group = ref(null);
const selectedDepartement = ref('tous'); // Suivre le département sélectionné
const annonceStore = useAnnonceStore();
const route = useRoute();

onMounted(() => {
  if (route.name === 'annonces') {
    annonceStore.fetchAnnonces();
    annonceStore.filterAnnoncesByDepartement('tous'); // Afficher toutes les annonces par défaut
    clicktous()
  }
});

watch(group, () => {
  drawer.value = false;
});

// Fonctions de filtrage
const click31 = () => {
  selectedDepartement.value = '31';
  annonceStore.filterAnnoncesByDepartement('31');
};
const click81 = () => {
  selectedDepartement.value = '81';
  annonceStore.filterAnnoncesByDepartement('81');
};
const click09 = () => {
  selectedDepartement.value = '09';
  annonceStore.filterAnnoncesByDepartement('09');
};
const clicktous = () => {
  selectedDepartement.value = 'tous';
  annonceStore.filterAnnoncesByDepartement('tous');
};
</script>

<style scoped>
.v-chip--selected {
  background-color: teal !important;
  color: white !important;
}
</style>