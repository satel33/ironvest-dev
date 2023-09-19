<template>
   <div :class="[`faq-item`, faq.open && `tab-active`]" :data-cat="category">
      <div class="tab" @click="handleTab">
         <p class="question">{{ faq.data.q }}</p>
         <tab-icon-plus class="tab-icon tab-icon-plus" />
      </div>
      <div class="content" ref="tab-content">
         <richtext-partial v-if="faq.data.a" class="answer" :content="faq.data.a.json" />
      </div>
   </div>
</template>

<script>
import RichtextPartial from './richtext-partial.vue'
import TabIconPlus from '~/assets/images/tab-icon-plus.svg?inline'
export default {
   name: 'FaqItemPartial',
   props: {
      faq: Object
   },
   components: {
      RichtextPartial,
      TabIconPlus,
   },
   data() {
      return {
         category: this.faq.data.category.replace(/\s+/g,'-').toLowerCase(), //slugify category
      }
   },
   methods: {
      handleTab() {
         this.$emit('handle-tab', this.faq)
      }
   },
   updated() {
      this.faq.open ?
         this.$refs['tab-content'].style.maxHeight = this.$refs['tab-content'].scrollHeight + "px" :
         this.$refs['tab-content'].style.maxHeight = null
   }
}
</script>