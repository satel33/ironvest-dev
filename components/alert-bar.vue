<template>
   <div  v-if="alert" class="alert-bar" :class=[alert?.backgroundColor?.toLowerCase()] ref="alertBar">
      <p class="p-s">{{ alert.headline }}</p>
      <cta :cta="alert.cta" :arrow="true" :dark="true" />
      <div class="close-bar"></div>
   </div>
</template>
<script>
import cta from '~/components/partials/cta.vue'

export default {
   props: {
      alert: Object,
      isActive: Boolean,
   },
   components: {
      cta,
   },
   methods: {
      handleResize() {
         document.body.style.setProperty(
            '--alert-bar-height',
            this.$refs.alertBar?.offsetHeight ?? 0
         )
      },
   },
   
   mounted() {
      
      window.addEventListener('resize', this.handleResize, { passive: true })
      this.handleResize()
   },
   activated() {
      document.body.classList.add('alert-bar-active')
   },
   deactivated() {
      document.body.classList.remove('alert-bar-active')
   },
}
</script>
