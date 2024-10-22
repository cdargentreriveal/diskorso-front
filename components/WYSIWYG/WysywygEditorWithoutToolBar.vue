<template>
  <div>
    <div ref="editorRef" class="my-editor"></div>
  </div>
</template>

<script lang="ts">
import MyQuill from 'quill'
import 'quill/dist/quill.snow.css' // Ajouter cette ligne
export default defineComponent({
  name: 'WysiwygEditorWithoutToolBar',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value', 'deleteContent'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLDivElement | null>(null)
    let quillInstance: MyQuill | null = null

    const updateValue = () => {
      if (process.client) {
        if (quillInstance && editorRef.value) {
          const html =
            editorRef.value?.querySelector('.ql-editor')?.innerHTML || ''
          emit('update:value', html)
        }
      }
    }

    const clearEditor = () => {
      if (quillInstance) {
        quillInstance.setText('')
      }
    }

    onMounted(() => {
      if (editorRef.value) {
        quillInstance = new MyQuill(editorRef.value, {
          modules: { toolbar: false },
          theme: 'snow',
          bounds: editorRef.value,
          placeholder: 'Collez votre contenu ici...', // Ajoutez cette ligne
        })

        quillInstance.on('text-change', updateValue)

        watch(
          () => props.value,
          (newValue) => {
            if (quillInstance) {
              quillInstance.setContents(
                quillInstance.clipboard.convert({ text: newValue })
              )
            }
          }
        )

        quillInstance.setContents(
          quillInstance.clipboard.convert({ text: props.value })
        )
      }
    })

    onUnmounted(() => {
      if (quillInstance) {
        quillInstance.off('text-change', updateValue)
        quillInstance = null
      }
    })

    return {
      editorRef,
      clearEditor,
    }
  },
})
</script>
