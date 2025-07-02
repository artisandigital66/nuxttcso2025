<template>
  <ClientOnly>
    <!-- <h1>annonce-{{ id }}</h1> -->
    <div class="anchor container">
      <div v-if="loading.value">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </div>

      <div>
        <v-row class="justify-center py-10">
          <!--    --------------------    IMAGES   --------------     -->

          <v-col cols="12" md="12">
            <!--    --------------------    TITRE   --------------     -->

            <v-card class="mb-3 ml-3 mt-5 pl-2 py-2 d-flex">
              <h1 class="headline">
                {{ annonce1.titre }} ({{
                  annonce1.departement
                }})
              </h1>

              <v-spacer></v-spacer>
            </v-card>
          </v-col>

          <!--    --------------------    DESCRIPTION DU BIEN   --------------     -->

          <v-col cols="12" md="12">
            <v-card class="mb-3 pl-2">
              <h2 class="headline font-weight-light">Description du bien</h2>
              <v-divider class="mb-3 mt-1"></v-divider>
              <div class="subtitle-1 py-3">
                {{ annonce1.description }}
                <div class="d-flex align-center pb-2">
                </div>
              </div>
            </v-card>

            <!--    --------------------    CONDITIONS FINANCIERES & JURIDIQUES   --------------     -->

            <v-card class="mb-3 pl-2">
              <h2 class="headline font-weight-light">
                Conditions financières & juridiques
              </h2>
              <v-divider class="mb-3 mt-1"></v-divider>
              {{ annonce1.conditions }}
            </v-card>

            <div class="d-none d-print-block">
              <v-img
                alt="TCSO logo"
                width="30%"
                class="mx-auto"
                src="https://firebasestorage.googleapis.com/v0/b/tcso-b3ea7.appspot.com/o/main%2Ftest-tcso-bleu.png?alt=media&token=bd5cbfb6-437a-443b-92bf-f01c1177c731"
              ></v-img>
            </div>

            <!--  -------------   ENVIRONNEMENT   ---------------- -->

            <div class="page-break"></div>
            <v-card class="mb-3 pl-2">
              <h2 class="headline font-weight-light">
                Environnement et localisation
              </h2>
              <v-divider class="mb-3 mt-1"></v-divider>
              {{ annonce1.environnement }}
            </v-card>
          </v-col>
        </v-row>
        <div class="page-break"></div>
      </div>

      <!-- -------------    IMAGES    ---------------- -->
            <div class="page-break"></div>
            <v-divider class="mb-3 mt-1"></v-divider>
            <v-row>
              <v-col cols="12" class="">
                <v-card class="elevation-2 grey darken-4 py-5 justify-center">
                  <v-carousel>
                    <v-carousel-item
                      v-for="(thumb, thumbIndex) in medias"
                      :key="thumbIndex"
                      :src="thumb.url"
                    >
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
            </v-row>

      <!-- -------------- Boutons   ----------    -->

      <v-row class="d-print-none">
        <v-col class="d-flex justify-space-between">
          <v-btn class="mr-3" text @click="print">Imprimer</v-btn>

          <v-btn
            v-if="annonce1.pdf"
            class="mx-auto red white--text"
            small
            :href="annonce1.pdf.url"
            ><v-icon small>mdi-file-pdf</v-icon>Téléchargez le dossier
            commercial</v-btn
          >

          <v-btn class="mr-3" text to="/annonces#anchor">Retour</v-btn>
        </v-col>
      </v-row>
    </div>
  </ClientOnly>
</template>
 
 <script setup>
import { useAnnonceStore } from "../stores/annonces";

const loading = ref(true);
const { id } = useRoute().params;

const annonceStore = useAnnonceStore();

const print = () => {
  window.print();
};

// console.log("id from [id].vue: ", id);

console.log("annonce from [id].vue:", annonceStore.annonces.find((annonce) => id == annonce.id))
 const annonce1 = annonceStore.annonces.find((annonce) => id == annonce.id)
 const medias = annonce1.images
</script>

 <style scoped>
</style>