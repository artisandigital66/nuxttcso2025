<template>
  <div class="container">
    <v-row class="justify-center mt-0 py-5">
      <v-col cols="12" md="8" class="justify-center">
        <h1 class="text-center title">Mentions Légales</h1>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="my-10 py-5">
      <v-col cols="12" md="9" class="mt-2">
        <p>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site tcso.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.

        </p>
        <div>
            <br>
          <h5>Edition du site </h5>
          <br>
            Le présent site, accessible à l’URL www.tcso.fr (le « Site »), est édité par :
            Nicolas Ferreol, résidant 35 Avenue Raymond Naves 31500 Toulouse, de nationalité Française (France), né(e) le 13/04/1972,  inscrite au R.C.S. de TOULOUSE sous le numéro 880 465 612 R.C.S. Toulouse,
            Le numéro individuel TVA de l’éditeur est : FR 33 880465612.
        </div>
        <div>
            <br>
          <h5>Hébergement</h5>
          <br>
            Le Site est hébergé par la société NETLIFY Inc., located at 512 2nd Street, Suite 200 San Francisco, CA 94107.
        </div>
        <div>
            <br>
          <h5>Directeur de publication </h5>
          <br>
            Le Directeur de la publication du Site est Nicolas Ferreol.
        </div>
        <div>
          <br>
          <h5>Nous contacter </h5><br>
            Par téléphone : +33685032266
            Par email : nicolas@tcso.fr
            Par courrier : 35 Avenue Raymond Naves 31500 Toulouse
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-btn variant ="outlined" class="mx-auto mb-4" color="primary" aria-label="Retour" @click="$router.back()"
        >Retour</v-btn
      >
    </v-row>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>