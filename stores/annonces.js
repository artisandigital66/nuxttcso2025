// stores/annonces.js
import { defineStore } from 'pinia';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const useAnnonceStore = defineStore('annonces', {
  state: () => ({
    annonces: [],
    filteredAnnonces: [],
  }),
  getters: {
    favoriteAnnonces(state) {
      return state.annonces.filter(annonce => annonce.favorite === true);
    },
  },
  actions: {
    async fetchAnnonces() {
      const db = getFirestore();
      const annoncesRef = collection(db, 'annonces2025-tcso');
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(annoncesRef, (snapshot) => {
          this.annonces = snapshot.docs.map(doc => ({
            id: doc.id,
            favorite: false, // Valeur par défaut si le champ favorite est absent
            ...doc.data()
          }));
          this.filteredAnnonces = this.annonces; // Pas de filtrage par défaut
          console.log('Annonces chargées:', this.annonces);
          console.log('Annonces favorites:', this.favoriteAnnonces);
          resolve(unsubscribe);
        }, (error) => {
          console.error('Erreur Firestore:', error);
          reject(error);
        });
      });
    },
  },
});
