<template>
  <div ref="editorRef"></div>
</template>

<script lang="ts">
import MyQuill from 'quill'
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
    const editorRef = ref<HTMLDivElement | null>(null)
    let quillInstance: MyQuill | null = null

    const updateValue = () => {
      if (quillInstance) {
        const html =
          editorRef.value?.querySelector('.ql-editor')?.innerHTML || ''
        emit('update:value', html)
      }
    }

    onMounted(() => {
      if (editorRef.value) {
        quillInstance = new MyQuill(editorRef.value, {
          modules: {
            toolbar: [
              [{ header: [2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link'],
            ],
          },
          theme: 'snow',
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
    }
  },
})
</script>
<style scoped lang="scss"></style>
