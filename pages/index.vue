<template>
  <div class="home anchor">
    <!-- MOBILES -->
    <v-row class="justify-center text-center my-5 d-xs-flex d-md-none">
      <v-col cols="10" class="justify-center transpa my-5 bg-black">
        <h1 class="my-3 subtitle-1">
          TRANSACTION & CONSEIL <br />
          SUD OUEST
        </h1>
        <v-img
          alt="TCSO logo"
          width="50%"
          class="mx-auto mb-5"
          src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
        ></v-img>
        <h2 class="my-3 subtitle-2">Immobilier Commercial</h2>
        <v-btn variant="outlined" to="/annonces" small aria-label="Nos annonces" color="primary">
          Toutes nos annonces
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- DESKTOP -->
    <v-row class="justify-center text-center d-none d-md-flex d-lg-flex">
      <v-img
        class="bg-grey-lighten-2"
        height="600"
        src="https://res.cloudinary.com/dkhuquewc/image/upload/v1756972964/enseigne-macon2_tp4org.jpg"
        cover
      >
        <v-col cols="8" md="6" class="justify-center center-affix transpa mt-10 pb-5 elevation-4 bg-black mx-auto">
          <h1 class="my-3 display-1">
            TRANSACTION & CONSEIL <br />
            SUD OUEST
          </h1>
          <v-img
            alt="TCSO logo"
            width="30%"
            class="mx-auto"
            src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
          ></v-img>
          <h2 class="my-3 headline">Immobilier Commercial</h2>
          <v-btn variant="outlined" to="/annonces" small aria-label="Nos annonces" color="primary">
            Toutes nos annonces
            <v-icon class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-img>
    </v-row>

    <v-col cols="12" class="text-center mt-0">
      <h3 class="mx-auto title my-3">LOTS DISPONIBLES IMMEDIATEMENT</h3>
      <ClientOnly>
        <v-carousel
          cycle
          interval="3000"
          hide-delimiters
          height=""
          :show-arrows="false"
          class=""
        >
          <v-carousel-item
            v-for="transaction in recentTransactions"
            :key="transaction.id"
          >
            <v-card class="mx-auto bandeau" max-width="600">
              <v-card-title class="text-h6">
                <v-icon color="yellow" icon="mdi-star" class="mr-2"></v-icon>
                {{ transaction.titre }}
              </v-card-title>
              <v-card-subtitle>{{ transaction.soustitre }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  :to="`/annonces/${transaction.id}`"
                  color="white"
                  variant="outlined"
                  class="mx-auto"
                  size="small"
                >
                  Voir les détails
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-carousel-item>
          <template v-if="!recentTransactions.length">
            <v-card class="mx-auto" max-width="300">
              <v-card-text>
                <v-alert type="warning">
                  Aucune transaction récente trouvée
                </v-alert>
              </v-card-text>
            </v-card>
          </template>
        </v-carousel>
      </ClientOnly>
    </v-col>

    <v-row>
      <v-col cols="12" md="8" class="mx-auto text-center">
        <h3 class="mx-auto title mt-10">
          ANNONCES FAVORITES
        </h3>
      </v-col>
    </v-row>

    <v-row class="container justify-center mx-auto">
      <div v-if="loading">
        <v-skeleton-loader type="card" />
      </div>
      <div v-else-if="error">
        <v-alert type="error">
          Erreur : {{ error.message }}
        </v-alert>
      </div>
      <div v-else-if="favoriteAnnonces && favoriteAnnonces.length">
        <v-row>
          <v-col
            v-for="annonce in favoriteAnnonces"
            :key="annonce.id"
            cols="12"
            sm="6"
            md="8"
            class="justify-center mx-auto"
          >
            <v-card class="justify-space-around px-3">
              <v-row>
                <v-col cols="3">
                  <v-img
                        alt="TCSO logo"
                        width="30%"
                        class="mx-auto my-2 pa-5"
                        src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
                    ></v-img>
                </v-col>
                <v-col cols="8">
                  <h1 class="headline ml-3">{{ annonce?.titre || 'Chargement...' }}</h1>
                  <h2 class="mb-3 ml-3">{{ annonce?.soustitre }}</h2>
                </v-col>
                <v-card-text v-html="renderMarkdown(annonce.description, 200)"></v-card-text>
              </v-row>
              <v-row class="mx-auto justify-center">
                <v-col
                  cols="12"
                  md="4"
                  v-for="(media, index) in annonce.images"
                  :key="media.url + index"
                >
                  <v-img
                    v-show="media.ordre == '1'"
                    :src="media.url"
                    :alt="media.titre"
                    cover
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
          Aucune annonce favorite trouvée
        </v-alert>
      </div>
    </v-row>

    <v-row class="justify-center py-5">
      <v-col cols="12" sm="8">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" class="mx-auto mt-10 text-center">
        <v-card class="justify-center">
          <v-row class="mx-auto">
            <v-col cols="12" md="8" class="mx-auto text-center">
              <h3 class="mx-auto headline">PRESENTATION ET SERVICES</h3>
              <v-img
                alt="TCSO logo"
                width="10%"
                class="mx-auto mt-5 pa-5"
                src="https://res.cloudinary.com/dkhuquewc/image/upload/v1755157410/tcso-600_cmuznd.png"
              ></v-img>
              <h5 class="mx-auto title mt-10">
                Vendez votre affaire, 1 objectif plusieurs possibilités
              </h5>
              <p class="mx-auto mt-10 text-left">
                <span class="strong">"Céder son affaire"</span>
                revêt différentes réalités juridiques. Ainsi acheteur et
                vendeur, selon leur situation, pourront céder ou acquérir à leur
                choix leur fonds de commerce, leur droit au bail ou leur
                société.
              </p>
              <p class="mx-auto mt-3 text-left">
                N’hésitez pas à aller jeter un coup d’œil sur notre page dédiée.
              </p>
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto justify-end">
            <v-btn to="/informations" class="" color="primary">En savoir plus</v-btn>
          </v-card-actions>

          <v-row class="mx-auto">
            <v-col cols="12" md="8" class="mx-auto text-center">
              <h5 class="mx-auto title mt-10">
                Présentation de la société, méthodes, réseaux
              </h5>
              <p class="mt-5 text-left">
                Fort de mon expérience dans les secteurs immobiliers et
                financiers j’ai décidé aujourd’hui de mettre tout mon
                savoir-faire et mon énergie afin qu’acheteurs et vendeurs,
                bailleurs et locataires puissent se rencontrer dans les
                meilleures conditions.
              </p>
              <p class="mt-5 text-left">
                Passionné de course à pied avec une attirance pour les courses
                longues distances en semi autonomie mon maître mot est la
                persévérance.
              </p>
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto justify-end">
            <v-btn to="/qui" class="" color="primary">En savoir plus</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
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

const recentTransactions = ref([
  {
    id: 'v8OM76B9YyjojnbTHiZL',
    titre: 'Saint Maixent (79)',
    soustitre: 'Local commercial 100m²',
  },
  {
    id: 'KVfosZdxMgNvQWPFKydO',
    titre: 'Brest (29)',
    soustitre: 'Local commercial 150m²',
  },
  {
    id: 'dmmM4mwkvFSThC8PW6PX',
    titre: 'Nissan-les-Enserunes (34)',
    soustitre: 'Local commercial 120m²',
  },
]);

const favoriteAnnonces = computed(() => annonceStore.favoriteAnnonces)

const renderMarkdown = (text, maxLength) => {
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
    console.log('Démarrage du chargement des annonces favorites...');
    unsubscribe = await annonceStore.fetchAnnonces();
    console.log('favoriteAnnonces après chargement:', favoriteAnnonces.value);
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
.transpa{
  opacity: 0.7;
}
.bandeau {
  background-color: darkslategrey;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.bandeau:hover {
  transform: scale(1.02);
}

.v-carousel {
  max-width: 800px;
  margin: 0 auto;
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.v-card-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
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