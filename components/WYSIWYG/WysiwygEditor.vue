<template>
  <div>
    <div ref="editorRef"></div>
  </div>
</template>

<script lang="ts">
import MyQuill from 'quill'
import 'quill/dist/quill.snow.css'

export default defineComponent({
  name: 'WysiwygEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLDivElement | null>(null)
    let quillInstance: MyQuill | null = null
    const contentHtml = ref(props.content)
    const updateValue = () => {
      if (quillInstance && editorRef.value) {
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
              ['bold', 'italic', 'underline'],
              [{ color: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link'],
            ],
          },
          theme: 'snow',
        })

        quillInstance.on('text-change', updateValue)
        quillInstance.setText(props.content)
      }
    })
    onUpdated(() => {
      const html = editorRef.value?.querySelector('.ql-editor')?.innerHTML || ''
      if (props.content !== html && quillInstance) {
        quillInstance.clipboard.dangerouslyPasteHTML(props.content || '')
        const length = quillInstance.getLength()
        quillInstance.setSelection(length, length)
      }
    })
    /*   watch(
          () => props.content,
          (newValue) => {
            contentHtml.value = newValue
            if (quillInstance) {
              quillInstance.clipboard.dangerouslyPasteHTML(newValue)
            }
          }
        )
    */
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
