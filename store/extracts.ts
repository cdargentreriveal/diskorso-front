import { defineStore } from 'pinia'
import { ExtractFetched } from '~~/types/Extracts'

export type Extracts = ExtractFetched[]

interface ExtractState {
  extracts: Extracts
}
export const useExtractStore = defineStore('extractStore', {
  state: (): ExtractState => ({
    extracts: [],
  }),
  actions: {
    addExtracts(extract: ExtractFetched) {
      const existingExtract = this.extracts.find(
        (extractP) => extractP.name === extract.name
      )
      if (existingExtract) {
        // eslint-disable-next-line no-console
        console.log('Cet extrait existe déjà.')
        return
      }

      // Ajouter l'extrait s'il n'existe pas encore
      this.extracts.push(extract)
    },
    removeExtract(id: number) {
      const index = this.extracts.findIndex((extract) => extract.id === id)
      if (index !== -1) {
        this.extracts.splice(index, 1)
      }
    },
  },
})
