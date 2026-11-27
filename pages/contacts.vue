<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="10" md="6" class="mt-5">
        <h1 class="text-h6 text-center">
          Vous souhaitez acheter, vendre ou louer des locaux ou murs commerciaux ?
          Retrouvez toutes nos informations de contact par email, téléphone ou réseaux sociaux.
        </h1>
      </v-col>
    </v-row>

    <v-row class="justify-center my-10">
      <v-col cols="8" md="6" class="text-center">
        <div>
          <h2>
            <v-icon color="primary">mdi-phone</v-icon>
            <span class="ml-3">06.85.03.22.66</span>
          </h2>
        </div>

        <div>
          <h2>
            <v-icon color="primary">mdi-email</v-icon>
            <span class="ml-3">nicolas@tcso.fr</span>
          </h2>
        </div>

        <br />

        <div>
          <h2>
            <v-icon color="primary">mdi-linkedin</v-icon>
            <a
              href="https://www.linkedin.com/company/transaction-et-conseil-sud-ouest-tcso"
              class="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="ml-3">LinkedIn</span>
            </a>
          </h2>
        </div>

        <div>
          <h2>
            <v-icon color="red">mdi-youtube</v-icon>
            <a
              href="https://www.youtube.com/@laurentferreol9478/"
              class="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="ml-3">YouTube</span>
            </a>
          </h2>
        </div>

        <div>
          <v-btn
            variant="outlined"
            class="mx-auto mt-10 mb-4"
            color="primary"
            @click="router.back()"
          >
            Retour
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

useSeoMeta({
  title: 'Contacter TCSO',
  description:
    'Vous souhaitez acheter, vendre ou louer des locaux ou murs commerciaux ? Retrouvez toutes nos informations de contact par email, téléphone ou réseaux sociaux.',
})
</script>

<style scoped>
.contact-link {
  text-decoration: none;
  color: black;
}
</style>