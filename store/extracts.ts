import { defineStore } from 'pinia'
import { ExtractFetched } from '~~/types/Extracts'

interface ExtractWithModal extends ExtractFetched {
  showModal?: boolean
}

export type Extracts = ExtractWithModal[]

interface ExtractState {
  extracts: Extracts
  tout_selectionner: number
  extractSelected: ExtractWithModal | null
  // nameInputEdit: string
  // sourceInputEdit: string
  // contentInputEdit: string
}
export const useExtractStore = defineStore('extractStore', {
  state: (): ExtractState => ({
    extracts: [],
    tout_selectionner: 0,
    extractSelected: null,
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
      this.saveExtractsToLocalStorage()
    },
    saveExtractsToLocalStorage() {
      localStorage.setItem('extracts', JSON.stringify(this.extracts))
    },
    loadExtractsFromLocalStorage() {
      const extracts = localStorage.getItem('extracts')
      if (extracts) {
        this.extracts = JSON.parse(extracts)
      }
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
    selectExtract(extract: ExtractWithModal) {
      this.extractSelected = extract
    },
    setEditNameExtract(name: string) {
      this.extractSelected!.name = name
    },
    setEditSourceExtract(source: string) {
      this.extractSelected!.source = source
    },
  },
})
