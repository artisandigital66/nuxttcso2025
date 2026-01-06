<template>
  <ClientOnly>
    <v-app>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>TCSO</v-app-bar-title>

        <!-- V-SELECT DE LUXE -->
        <v-select
          v-if="$route.name === 'annonces'"
          v-model="selectedDepartement"
          :items="departements"
          color="#0c7ca2ff"
          label="Filtrer par département"
          variant="outlined"
          density="compact"
          clearable
          class="mr-3 mt-3 select"
          style="max-width: 200px;"
          @update:model-value="annonceStore.filterByDepartement"
        >

        <template v-slot:prepend-item>
    <v-list-item :value="'Tous'" @click="annonceStore.filterByDepartement('Tous')">
      <template v-slot:prepend>
        <v-icon icon="mdi-earth" class="mr-2" size="20"></v-icon>
      </template>
      <v-list-item-title>Tous les départements </v-list-item-title>
    </v-list-item>
    <v-divider class="mt-2"/>
  </template>

  <template v-slot:item="{ item, props }">
    <v-list-item v-bind="props">
      <template v-slot:prepend>
        <v-icon :icon="item.icon" class="mr-2" size="20"></v-icon>
      </template>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </template>

          <!-- Sélection affichée -->
  <template v-slot:selection="{ item }">
    <v-icon :icon="item.raw.icon" class="mr-2" size="18"></v-icon>
    <span class="text-caption font-weight-medium">{{ item.raw.value }}</span>
  </template>
        </v-select>
      </v-app-bar>
      <!-- MENU DÉROULANT -->
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify?.display?.mobile ? 'bottom' : undefined"
        temporary
      >
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
      </v-navigation-drawer>

      <!-- CONTENU PRINCIPAL -->
      <v-main>
        <v-container fluid class="noel px-0 pt-0">
          <div class="py-0">
            <slot />
          </div>
          <!-- COOKIES -->
          <!-- <CookieControl locale="fr" /> -->
        </v-container>
      </v-main>
          <!-- FOOTER COMPLET -->
          <v-footer class="d-flex flex-column" color="#0c7ca2ff" rounded="0">
            <div class="d-flex w-100 align-center px-4 py-2">
              <strong>Connectez-vous sur nos réseaux sociaux !</strong>
              <div class="d-flex ms-auto">
                <v-btn
                  icon="mdi-linkedin"
                  target="_blank"
                  color="white"
                  size="x-large"
                  variant="text"
                  href="https://www.linkedin.com/company/transaction-et-conseil-sud-ouest-tcso"
                  aria-label="Suivez nous sur LinkedIn"
                ></v-btn>
                <v-btn
                  icon="mdi-youtube"
                  target="_blank"
                  color="red"
                  size="x-large"
                  variant="text"
                  href="https://www.youtube.com/@laurentferreol9478/"
                  aria-label="Suivez nous sur Youtube"
                ></v-btn>
                
              </div>
            </div>
            
            <div class="px-4 py-2 bg-surface-variant text-center w-100 rounded-lg transpa">
              <div>
              Nicolas: 06 85 03 22 66
            </div>
            <div>
              nicolas@tcso.fr
            </div>
              <div>
                <v-btn :to="`/`" size="x-small" variant="text" class="mx-auto mt-3">
                  Accueil
                </v-btn>
              </div>
              <div>
                <v-btn :to="`/annonces`" size="x-small" variant="text" class="mx-auto mt-0">
                  Annonces
                </v-btn>
              </div>
              <div>
                <v-btn :to="`/mentions`" size="x-small" variant="text" class="mx-auto mb-3">
                  Mentions légales
                </v-btn>
              </div>
              {{ new Date().getFullYear() }} — <strong>© TCSO</strong>
            </div>

          </v-footer>
        
    </v-app>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnonceStore } from '~/stores/annonces'
import { storeToRefs } from 'pinia'

const drawer = ref(false)
const route = useRoute()
const annonceStore = useAnnonceStore()
const { selectedDepartement } = storeToRefs(annonceStore)

// ref local qui ne change de référence QUE si le contenu change vraiment
const departements = ref([])

// Cache pour réutiliser les mêmes objets
const cache = new Map()

const rebuildDepartements = () => {
  if (process.server) return

  const deps = [...new Set(annonceStore.annonces.map(a => a.departement).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))

  const countByDep = {}
  annonceStore.annonces.forEach(a => {
    if (a.departement) countByDep[a.departement] = (countByDep[a.departement] || 0) + 1
  })

  const newItems = []

  // "Tous" toujours le même objet
  const tousKey = 'tous'
  if (!cache.has(tousKey)) {
    cache.set(tousKey, {
      title: `Tous les départements (${annonceStore.annonces.length})`,
      value: 'Tous',
      icon: 'mdi-earth'
    })
  } else {
    cache.get(tousKey).title = `Tous les départements (${annonceStore.annonces.length})`
  }
  newItems.push(cache.get(tousKey))
  const departementNames = []
  
  // Départements : on réutilise les objets existants
  deps.forEach(dep => {
    const key = dep
    const title = `${dep} ${departementNames[dep] || ''} (${countByDep[dep]})`.trim()

    if (!cache.has(key)) {
      cache.set(key, { title, value: dep, icon: `flag-fr-${dep}` })
    } else {
      cache.get(key).title = title  // on met à jour le compteur seulement
    }
    newItems.push(cache.get(key))
  })

  // On ne change la référence QUE si vraiment nécessaire
  departements.value = newItems
}

// Reconstruit uniquement quand les annonces changent
watch(
  () => annonceStore.annonces,
  () => {
    if (process.client) {
      rebuildDepartements()
    }
  },
  { deep: true, immediate: false }
)

onMounted(() => {
  if (route.name === 'annonces') {
    annonceStore.fetchAnnonces()
    // petit délai pour être sûr que les annonces sont là
    setTimeout(rebuildDepartements, 500)
  }
})
</script>

<style scoped>
.transpa { opacity: 0.7; }
.select :deep(.v-field-label) { font-size: 0.875rem !important; }
.select :deep(.select__selection) { font-weight: 500 !important; }
.select {border-width: 5px !important;} 
.noel {
  background: url('../public/bg-noel.jpg');
  background-size: contain;
}
  
</style>