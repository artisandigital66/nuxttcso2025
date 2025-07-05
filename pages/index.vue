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
            src="/newlogotcso.png"
          ></v-img>
          <h2 class="my-3 subtitle-2">Immobilier Professionnel</h2>
          <v-btn variant ="outlined" to="/annonces" small aria-label="Nos annonces" color="primary"
            >Toutes nos annonces
            <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
          >
        </v-col>
      </v-row>

    <!-- DESKTOP -->
    
      <v-row class="justify-center text-center align-center my-5 d-none d-md-flex d-lg-flex">
        <v-col
          cols="6"
          md="4"
          class="my-5 justify-center transpa pb-5 elevation-4 bg-black"
        >
          <h1 class="my-3 display-1">
            TRANSACTION & CONSEIL <br />
            SUD OUEST
          </h1>
          <v-img
            alt="TCSO logo"
            width="30%"
            class="mx-auto"
            src="/newlogotcso.png"
          ></v-img>
          <h2 class="my-3 headline">Immobilier Professionnel</h2>
          <v-btn variant ="outlined" to="/annonces" small aria-label="Nos annonces" color="primary"
            >Toutes nos annonces
            <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
          >
        </v-col>
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
                src="/newlogotcso.png"
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
          <v-card-actions class="mx-auto justify-end"
            ><v-btn to="/informations" class="" color="primary"
              >En savoir plus</v-btn
            ></v-card-actions
          >

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
          <v-card-actions class="mx-auto justify-end"
            ><v-btn to="/qui" class="" color="primary"
              >En savoir plus</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
   
   <script setup>
</script>
   
   <style scoped>
</style>