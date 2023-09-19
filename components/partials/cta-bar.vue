<template>
   <!-- <div :class="[classes, { 'cta-block': block.subtext }]"> -->
   <div class="cta-bar" :class="classes">
      <h3>{{ block.headline }}</h3>
      <p class="subtext" v-if="block.subtext">{{ block.subtext }}</p>
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
