<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="10" md="6" class="mt-5">
        <h1 class="title">
          Vous souhaitez acheter vendre ou louer des locaux commerciaux, acheter
          vendre ou louer des murs commerciaux, n’hésitez pas à retrouver toutes
          nos informations de contact par email ou téléphone ou réseaux sociaux
        </h1>
      </v-col>
    </v-row>

    <v-row class="justify-center my-10">
      <v-col cols="8" md="6" class="text-center">
        <li class="ligne mb-2 title">
          <v-icon color="primary">mdi-phone</v-icon
          ><span class="ml-3">06.85.03.22.66</span>
        </li>
        <li class="ligne title">
          <v-icon color="primary">mdi-email</v-icon
          ><span class="ml-3">contact@tcso.fr</span>
        </li>
      </v-col>
    </v-row>

    <div class="container contact-form justify-center">
      <v-row class="justify-center form mb-10">
        <v-col cols="12" md="6">
          <v-text-field label="Nom*" v-model="nom" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Email*" v-model="email" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea label="Message*" v-model="message" outlined></v-textarea>
        </v-col>
        <v-btn @click="sendEmail" color="primary"
          >Envoyer<v-icon class="ml-2">mdi-email-send</v-icon></v-btn
        >
      </v-row>
    </div>
  </div>
</template>

  <script>
export default {
  data: () => ({
    nom: "",
    email: "",
    message: "",
    loading: false,
  }),

  metaInfo: () => ({
    title: "Contacter TCSO",
    meta: [
      {
        name: "description",
        content:
          "Vous souhaitez acheter vendre ou louer des locaux commerciaux, acheter vendre ou louer des murs commerciaux, n’hésitez pas à retrouver toutes nos informations de contact par email ou téléphone ou réseaux sociaux",
      },
    ],
  }),
};
</script>

  <style scoped>
</style>