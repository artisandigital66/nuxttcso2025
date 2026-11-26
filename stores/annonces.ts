import { defineStore } from 'pinia'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import type { Annonce } from '../types/annonce'

export const useAnnonceStore = defineStore('annonces', {
  state: () => ({
    annonces: [] as Annonce[],
    selectedDepartement: 'Tous' as string,
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    favoriteAnnonces: (state): Annonce[] => {
      return state.annonces
        .filter((a) => a.favorite === true)
        .slice(0, 10)
    },

    filteredAnnonces: (state): Annonce[] => {
      if (state.selectedDepartement === 'Tous') {
        return state.annonces
      }
      return state.annonces.filter(
        (a) => a.departement === state.selectedDepartement
      )
    },
  },

  actions: {
    /**
     * Charge les annonces en lecture ponctuelle (getDocs) avec cache en mémoire.
     * Retourne une fonction no-op pour rester compatible avec les pages
     * qui appellent encore `unsubscribe()` dans `onUnmounted`.
     */
    async fetchAnnonces(forceRefresh = false): Promise<() => void> {
      if (this.annonces.length > 0 && !forceRefresh) {
        return () => {}
      }

      this.loading = true
      this.error = null

      try {
        const db = useFirestore()
        const colRef = collection(db, 'annonces2025-tcso')
        const snap = await getDocs(colRef)

        this.annonces = snap.docs.map((d) => ({
          id: d.id,
          favorite: false,
          url: '',
          ...(d.data() as Omit<Annonce, 'id'>),
        }))
      } catch (err: any) {
        this.error = err?.message || 'Erreur lors du chargement des annonces'
        console.error('Erreur fetchAnnonces:', err)
      } finally {
        this.loading = false
      }

      return () => {}
    },

    async fetchAnnonceById(id: string): Promise<Annonce | null> {
      const existing = this.annonces.find((a) => a.id === id)
      if (existing) return existing

      const db = useFirestore()
      const docRef = doc(db, 'annonces2025-tcso', id)
      const snap = await getDoc(docRef)

      if (!snap.exists()) return null

      const annonce: Annonce = {
        id: snap.id,
        favorite: false,
        url: '',
        ...(snap.data() as Omit<Annonce, 'id'>),
      }
      this.annonces.push(annonce)
      return annonce
    },

    filterByDepartement(dept?: string | null) {
      this.selectedDepartement = dept || 'Tous'
    },
  },
})