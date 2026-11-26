<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template #prepend>
        <v-app-bar-nav-icon
          aria-label="Ouvrir le menu"
          @click.stop="drawer = !drawer"
        />
      </template>

      <v-app-bar-title>
        <NuxtLink to="/" class="text-decoration-none text-high-emphasis font-weight-bold">
          TCSO
        </NuxtLink>
      </v-app-bar-title>

      <!-- Filtre par département (affiché uniquement sur la page /annonces) -->
      <v-select
        v-if="route.name === 'annonces'"
        :model-value="selectedDepartement"
        :items="departements"
        item-title="title"
        item-value="value"
        color="#0c7ca2"
        label="Filtrer par département"
        variant="outlined"
        density="compact"
        hide-details
        clearable
        class="mr-3 select-dept"
        @update:model-value="onDepartementChange"
      >
        <template #item="{ item, props }">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-icon :icon="item.raw.icon" size="20" class="mr-2" />
            </template>
          </v-list-item>
        </template>

        <template #selection="{ item }">
          <v-icon :icon="item.raw.icon" size="18" class="mr-2" />
          <span class="text-caption font-weight-medium text-truncate">
            {{ item.raw.value }}
          </span>
        </template>
      </v-select>
    </v-app-bar>

    <!-- Menu latéral -->
    <v-navigation-drawer
      v-model="drawer"
      :location="isMounted && mobile ? 'bottom' : 'left'"
      temporary
    >
      <v-list nav>
        <v-list-item to="/" prepend-icon="mdi-home" title="Accueil" />
        <v-list-item to="/annonces" prepend-icon="mdi-text-box-plus-outline" title="Annonces" />
        <v-list-item to="/informations" prepend-icon="mdi-information-outline" title="Informations" />
        <v-list-item to="/qui" prepend-icon="mdi-account-search-outline" title="Qui sommes nous ?" />
        <v-list-item to="/contacts" prepend-icon="mdi-at" title="Contacts" />
      </v-list>
    </v-navigation-drawer>

    <!-- Contenu principal -->
    <v-main>
      <v-container fluid class="page-bg px-0 pt-0">
        <slot />
      </v-container>
    </v-main>

    <!-- Bandeau cookies RGPD -->
    <CookieControl locale="fr" />

    <!-- Footer -->
    <v-footer class="d-flex flex-column pa-0" color="#0c7ca2" rounded="0">
      <div class="d-flex w-100 align-center px-4 py-2 text-white">
        <strong>Connectez-vous sur nos réseaux sociaux !</strong>
        <div class="d-flex ms-auto">
          <v-btn
            icon="mdi-instagram"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            variant="text"
            href="https://www.instagram.com/transaction_et_conseil_sud.o/"
            aria-label="Suivez-nous sur Instagram"
          />
          <v-btn
            icon="mdi-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            variant="text"
            href="https://www.linkedin.com/company/transaction-et-conseil-sud-ouest-tcso"
            aria-label="Suivez-nous sur LinkedIn"
          />
          <v-btn
            icon="mdi-youtube"
            target="_blank"
            rel="noopener noreferrer"
            color="red-lighten-2"
            size="large"
            variant="text"
            href="https://www.youtube.com/@laurentferreol9478/"
            aria-label="Suivez-nous sur YouTube"
          />
        </div>
      </div>

      <div class="px-4 py-3 bg-surface-variant text-center w-100 transpa">
        <div>Nicolas : 06 85 03 22 66</div>
        <div>nicolas@tcso.fr</div>

        <div class="d-flex justify-center flex-wrap gap-2 my-2">
          <v-btn to="/" size="x-small" variant="text">Accueil</v-btn>
          <v-btn to="/annonces" size="x-small" variant="text">Annonces</v-btn>
          <v-btn to="/mentions" size="x-small" variant="text">Mentions légales</v-btn>
        </div>

        <div>{{ currentYear }} — <strong>© TCSO</strong></div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useAnnonceStore } from '~/stores/annonces'

interface DepartementOption {
  title: string
  value: string
  icon: string
}

const route = useRoute()
const { mobile } = useDisplay()
const annonceStore = useAnnonceStore()
const { annonces, selectedDepartement } = storeToRefs(annonceStore)

const drawer = ref(false)
const isMounted = ref(false)
const currentYear = new Date().getFullYear()

onMounted(() => {
  isMounted.value = true
})

const departements = computed<DepartementOption[]>(() => {
  const list = annonces.value || []
  const countByDep: Record<string, number> = {}

  for (const item of list) {
    if (item.departement) {
      countByDep[item.departement] = (countByDep[item.departement] || 0) + 1
    }
  }

  const sortedDeps = Object.keys(countByDep).sort((a, b) => a.localeCompare(b))

  return [
    {
      title: `Tous les départements (${list.length})`,
      value: 'Tous',
      icon: 'mdi-earth',
    },
    ...sortedDeps.map((dep) => ({
      title: `${dep} (${countByDep[dep]})`,
      value: dep,
      icon: 'mdi-map-marker-outline',
    })),
  ]
})

const onDepartementChange = (dept: string | null) => {
  annonceStore.filterByDepartement(dept || 'Tous')
}
</script>

<style scoped>
.transpa {
  opacity: 0.85;
}

.select-dept {
  max-width: 220px;
}

.select-dept :deep(.v-field-label) {
  font-size: 0.875rem !important;
}

.page-bg {
  background-image: url('/fond-transpa.jpg');
  background-size: contain;
  min-height: calc(100vh - 64px);
}
</style>