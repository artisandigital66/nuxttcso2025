// stores/annonces.js
import { defineStore } from 'pinia';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { watch } from 'vue';

export const useAnnonceStore = defineStore('annonceStore', {
  state: () => ({
    annonces: [],
    filteredAnnonces: [], // Liste filtrée
    annonce: null,
    dpts: ['81', '31'],
  }),
  actions: {
    async fetchAnnonces() {
      if (!process.client) return; // Exécuter uniquement côté client
      try {
        const { $firestore: db } = useNuxtApp(); // Utiliser $firestore au lieu de $db
        if (!db) {
          throw new Error('Firestore instance not initialized');
        }
        // console.log('fetchAnnonces - Instance Firestore:', db);
        const { data: annonces } = useCollection(collection(db, 'annonces2025-tcso'), { ssr: true });
        watch(
          annonces,
          (newAnnonces) => {
            this.annonces = newAnnonces.map((annonce) => ({ id: annonce.id, ...annonce }));
            this.filteredAnnonces = [...this.annonces]; // Initialiser avec toutes les annonces
            console.log('Annonces récupérées:', this.annonces);
          },
          { immediate: true }
        );
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        this.annonces = [];
        this.filteredAnnonces = [];
        throw error;
      }
    },
    // Filtrer les annonces par département
    filterAnnoncesByDepartement(departement) {
      if (!this.annonces.length) {
        console.warn('Aucune annonce à filtrer');
        this.filteredAnnonces = [];
        return;
      }
      if (departement === 'Tous') {
        this.filteredAnnonces = [...this.annonces];
      } else {
        this.filteredAnnonces = this.annonces.filter((annonce) => annonce.departement === departement);
      }
      console.log(`Annonces filtrées par département ${departement}:`, this.filteredAnnonces);
    },
  },
});