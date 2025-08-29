<template>
  <ClientOnly>
    <v-app>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>TCSO</v-app-bar-title>
        <!-- <div v-if="$route.name === 'annonces'">
          recherche par département
          <v-chip-group class="mr-3 flex">
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click29"
              :class="{ 'v-chip--selected': selectedDepartement === '29' }"
            >
              29
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click31"
              :class="{ 'v-chip--selected': selectedDepartement === '31' }"
            >
              31
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click34"
              :class="{ 'v-chip--selected': selectedDepartement === '34' }"
            >
              34
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click46"
              :class="{ 'v-chip--selected': selectedDepartement === '46' }"
            >
              46
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click56"
              :class="{ 'v-chip--selected': selectedDepartement === '56' }"
            >
              56
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click64"
              :class="{ 'v-chip--selected': selectedDepartement === '64' }"
            >
              64
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click65"
              :class="{ 'v-chip--selected': selectedDepartement === '65' }"
            >
              65
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="click71"
              :class="{ 'v-chip--selected': selectedDepartement === '71' }"
            >
              71
            </v-chip>
            <v-chip
              base-color="blue"
              density="compact"
              color="green"
              filter
              @click="clicktous"
              :class="{ 'v-chip--selected': selectedDepartement === 'Tous' }"
            >
              Tous
            </v-chip>
          </v-chip-group>
        </div> -->
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify?.display?.mobile ? 'bottom' : undefined"
        temporary
      >
        <ClientOnly>
          <v-list>
            <v-list-item to="/" prepend-icon="mdi-home">
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>
            <v-list-item to="/annonces" prepend-icon="mdi-text-box-plus-outline">
              <v-list-item-title>Annonces</v-list-item-title>
            </v-list-item>
            <v-list-item to="/informations" prepend-icon="mdi-information-outline">
              <v-list-item-title>Informations</v-list-item-title>
            </v-list-item>
            <v-list-item to="/qui" prepend-icon="mdi-account-search-outline">
              <v-list-item-title>Qui sommes nous?</v-list-item-title>
            </v-list-item>
            <v-list-item to="/contacts" prepend-icon="mdi-at">
              <v-list-item-title>Contacts</v-list-item-title>
            </v-list-item>
          </v-list>
        </ClientOnly>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <div class="py-0">
            <slot />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnnonceStore } from '~/stores/annonces';

const drawer = ref(false);
const selectedDepartement = ref('Tous');
const annonceStore = useAnnonceStore();
const route = useRoute();

onMounted(async () => {
  if (route.name === 'annonces') {
    try {
      await annonceStore.fetchAnnonces();
      annonceStore.filterAnnoncesByDepartement('Tous');
    } catch (err) {
      console.error('Erreur lors du chargement des annonces:', err);
    }
  }
});

const click29 = () => {
  selectedDepartement.value = '29';
  annonceStore.filterAnnoncesByDepartement('29');
};

const click31 = () => {
  selectedDepartement.value = '31';
  annonceStore.filterAnnoncesByDepartement('31');
};

const click34 = () => {
  selectedDepartement.value = '34';
  annonceStore.filterAnnoncesByDepartement('34');
};

const click46 = () => {
  selectedDepartement.value = '46';
  annonceStore.filterAnnoncesByDepartement('46');
};

const click56 = () => {
  selectedDepartement.value = '56';
  annonceStore.filterAnnoncesByDepartement('56');
};

const click64 = () => {
  selectedDepartement.value = '64';
  annonceStore.filterAnnoncesByDepartement('64');
};

const click65 = () => {
  selectedDepartement.value = '65';
  annonceStore.filterAnnoncesByDepartement('65');
};

const click71 = () => {
  selectedDepartement.value = '71';
  annonceStore.filterAnnoncesByDepartement('71');
};

const clicktous = () => {
  selectedDepartement.value = 'Tous';
  annonceStore.filterAnnoncesByDepartement('Tous');
};
</script>

<style scoped>
.v-chip--selected {
  background-color: teal !important;
  color: white !important;
}
</style>