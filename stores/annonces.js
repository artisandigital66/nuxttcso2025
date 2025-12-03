// stores/annonces.js – VERSION QUI MARCHE POUR TOUT
import { defineStore } from 'pinia'
import { collection, onSnapshot } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export const useAnnonceStore = defineStore('annonces', {
  state: () => ({
    annonces: [],
    filteredAnnonces: [],
    selectedDepartement: 'Tous'
  }),

  getters: {
    // ← IMPORTANT : getter pour le bandeau d’accueil
    favoriteAnnonces: (state) => {
      return state.annonces
        .filter(a => a.favorite === true)
        .slice(0, 10) // ou sans limite si tu veux toutes
    }
  },

  actions: {
    async fetchAnnonces() {
      const db = useFirestore()
      const ref = collection(db, 'annonces2025-tcso')

      const unsub = onSnapshot(ref, (snap) => {
        this.annonces = snap.docs.map(doc => ({
          id: doc.id,
          favorite: false,        // ← garde false par défaut
          url: '',
          ...doc.data()
        }))

        // Réinitialise les filtres
        this.filterByDepartement('Tous')
      })

      return unsub
    },

    filterByDepartement(dept) {
      this.selectedDepartement = dept || 'Tous'
      this.filteredAnnonces = this.selectedDepartement === 'Tous'
        ? [...this.annonces]
        : this.annonces.filter(a => a.departement === this.selectedDepartement)
    }
  }
})