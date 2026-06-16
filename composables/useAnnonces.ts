import { collection, doc } from 'firebase/firestore'
import { useCollection, useFirestore, useDocument } from 'vuefire'

export const useAnnonces = () => {
  // Initialisation de Firestore via VueFire
  const db = useFirestore()

  /**
   * Récupère toutes les annonces de la collection 'annonces'
   * wait: true est important pour le SSR de Nuxt
   */
  const getAnnonces = () => {
    const annoncesRef = collection(db, 'annonces')
    return useCollection(annoncesRef, { wait: true })
  }

  /**
   * Récupère un seul document par son ID
   */
  const getAnnonceById = (id: string) => {
    const docRef = doc(db, 'annonces', id)
    return useDocument(docRef)
  }

  return {
    getAnnonces,
    getAnnonceById
  }
}