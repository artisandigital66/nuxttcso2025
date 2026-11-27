export interface AnnonceMedia {
  url: string
  titre?: string
  ordre?: string | number
}

export interface Annonce {
  id: string
  titre: string
  soustitre?: string
  description?: string
  environnement?: string
  conditions?: string
  departement?: string
  favorite?: boolean
  url?: string
  images?: AnnonceMedia[]
  pdf?: string
  video?: string
}