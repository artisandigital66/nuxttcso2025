import { defineStore } from 'pinia';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { inject } from 'vue';

export const useAnnonceStore = defineStore('annonces', {
  state: () => ({
    annonces: [],
    filteredAnnonces: [],
  }),
  getters: {
    favoriteAnnonces(state) {
      return state.annonces.filter(annonce => annonce.favorite === true) || [];
    },
  },
  actions: {
    async fetchAnnonces() {
      const db = inject('firestore') || getFirestore();
      const annoncesRef = collection(db, 'annonces2025-tcso');
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(annoncesRef, (snapshot) => {
          this.annonces = snapshot.docs.map(doc => ({
            id: doc.id,
            favorite: false,
            url: '', // Valeur par défaut pour éviter les erreurs
            ...doc.data(),
          }));
          this.filteredAnnonces = this.annonces.filter(annonce => annonce.online === true);
          console.log('Annonces chargées:', this.annonces.filter(annonce => annonce.online === true));
          console.log('Annonces favorites:', this.favoriteAnnonces);
          console.log('Annonces filtrées:', this.filteredAnnonces);
          resolve(unsubscribe);
        }, (error) => {
          console.error('Erreur Firestore:', error);
          reject(error);
        });
      });
    },
    filterAnnoncesByDepartement(departement) {
      if (departement === 'Tous') {
        this.filteredAnnonces = this.annonces;
      } else {
        this.filteredAnnonces = this.annonces.filter(annonce => annonce.departement === departement);
      }
      console.log('Annonces filtrées par département:', this.filteredAnnonces);
    },
  },
});