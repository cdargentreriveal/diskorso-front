import { defineStore } from 'pinia'
import { ExtractFetched } from '~~/types/Extracts'

interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

export type Extracts = ExtractWithModal[]

interface ExtractState {
  extracts: Extracts
  tout_selectionner: number
}
export const useExtractStore = defineStore('extractStore', {
  state: (): ExtractState => ({
    extracts: [],
    tout_selectionner: 0,
  }),
  actions: {
    addExtracts(extract: ExtractWithModal) {
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
    removeAllExtract() {
      this.extracts.splice(0, this.extracts.length)
      this.tout_selectionner++
    },
  },
})
