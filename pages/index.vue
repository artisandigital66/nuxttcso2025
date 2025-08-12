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
          src="https://res.cloudinary.com/dkhuquewc/image/upload/v1752131487/newlogotcso_rnmy5a.png"
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
              src="https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          src="https://res.cloudinary.com/dkhuquewc/image/upload/v1752131487/newlogotcso_rnmy5a.png"
        ></v-img>
        <h2 class="my-3 headline">Immobilier Commercial</h2>
        <v-btn variant="outlined" to="/annonces" small aria-label="Nos annonces" color="primary">
          Toutes nos annonces
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
          </v-img>
      
    </v-row>

    <v-row class="justify-center py-5">
      <v-col cols="12" sm="8">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-col cols="12" class="text-center">
      <h3 class="mx-auto title my-0">DERNIERES TRANSACTIONS</h3>
      <v-carousel
        cycle
        interval="3000"
        hide-delimiters
        height="200"
        :show-arrows="false"
        class="mt-4"
      >
        <v-carousel-item
          v-for="recentTransaction in recentTransactions"
          :key="recentTransaction.id"
          class=""
        >
          <v-card
            class="mx-auto bandeau"
            max-width="100%"
          >
            <v-card-title class="text-h6"><v-icon color="yellow" icon="mdi-star"></v-icon>{{ recentTransaction }}</v-card-title>
          
          </v-card>
        </v-carousel-item>
        <template v-if="!recentTransactions">
          <v-card class="mx-auto" max-width="300">
            <v-card-text>
              <v-alert type="warning">
                Aucune transaction récente trouvée
              </v-alert>
            </v-card-text>
          </v-card>
        </template>
      </v-carousel>
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
                src="https://res.cloudinary.com/dkhuquewc/image/upload/v1752131487/newlogotcso_rnmy5a.png"
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
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false, // Désactiver le HTML brut pour des raisons de sécurité
  breaks: true, // Convertir les sauts de ligne en <br>
  linkify: true, // Convertir les URLs en liens cliquables
});

const annonceStore = useAnnonceStore();
const loading = ref(true);
const error = ref(null);
const recentTransactions = ["transac1","transac2","transac3","transac4","transac5",]

const favoriteAnnonces = computed(() => {
  return annonceStore.favoriteAnnonces || [];
});

const renderMarkdown = (text, maxLength) => {
  if (!text) return '';
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return md.render(truncated);
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

watch(
  () => favoriteAnnonces.value,
  (newAnnonces) => {
    console.log('favoriteAnnonces mis à jour:', newAnnonces);
  }
);

onUnmounted(() => {
  unsubscribe();
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.bandeau {
  background-color: darkslategrey;
  color: white
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