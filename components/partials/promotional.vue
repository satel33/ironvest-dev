<template>
   <!-- <div :class="[classes, { 'cta-block': block.subHeader }]"> -->
   <div v-if="block?.visual" class="cta-bar" :class="classes">
      <h3>{{ block.header }}</h3>
      <p class="subHeader" v-if="block.subHeader">{{ block.subHeader }}</p>
      <cta :cta="block.cta" :arrow="true" :dark="ctaDark" />
   </div>
</template>

<script>
import Cta from './cta.vue'
export default {
   components: { Cta },
   props: {
      classes: String,
      block: Object,
      ctaDark: Boolean,
   },
}
</script>
