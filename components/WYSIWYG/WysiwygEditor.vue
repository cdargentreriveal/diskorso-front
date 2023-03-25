<template>
  <div ref="editorRef"></div>
</template>

<script lang="ts">
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Ajouter cette ligne

export default defineComponent({
  name: 'WysiwygEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (editorRef.value && editorRef.value.parentNode) {
        const quill = new Quill(editorRef.value, {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'video'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['clean'],
            ],
          },
          theme: 'snow',
        })

        // Initialiser la valeur de l'éditeur avec la prop value
        quill.setContents(quill.clipboard.convert({ text: props.value }))

        // Écouter les changements de l'éditeur et émettre l'événement input
        quill.on('text-change', () => {
          const content = quill.getContents()
          emit('update:value', JSON.stringify(content))
        })
      } else {
        console.error('Invalid Quill container')
      }
    })

    return {
      editorRef,
    }
  },
})
</script>
<style scoped lnag="scss"></style>
