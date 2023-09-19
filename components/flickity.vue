<template>
   <div>
      <slot></slot>
   </div>
</template>

<script>

export default {
   props: {
      options: Object,
   },
   mounted() {
      const Flickity = require('flickity')
      this.$flickity = new Flickity(this.$el, this.options)
      this.$emit('init', this.$flickity)
   },
   beforeDestroy() {
      this.$flickity.destroy()
      this.$flickity = null
   },
   methods: {
      flickity() {
         return this.$flickity
      },
    
      select(index, isWrapped, isInstant) {
         this.$flickity.select(index, isWrapped, isInstant)
      },
      
      next(isWrapped, isInstant) {
         this.$flickity.next(isWrapped, isInstant)
      },
      
      previous(isWrapped, isInstant) {
         this.$flickity.previous(isWrapped, isInstant)
      },
      
   },
}
</script>
<style src='../node_modules/flickity/dist/flickity.css'></style>