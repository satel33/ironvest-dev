<template>
   <section :class="[`stats-block`, `style-${block.style.toLowerCase().replace('/','-')}`, checkHeaders && 'simple-headers']">
      <h6 v-if="block.eyebrow" class="eyebrow">{{ block.eyebrow }}</h6>
      <h2 v-if="block.headline && !checkHeaders" class="headline">{{ block.headline }}</h2>
      <h4 v-if="block.headline && checkHeaders" class="headline">{{ block.headline }}</h4>
      <p v-if="block.subheadline" class="subheadline">{{ block.subheadline }}</p>
      <div v-if="stats" :class="[`stat-card-wrapper`]" ref="stats-marquee">
         <stat-card-partial v-for="(card, i) in stats"
            :card="card"
            :isMarquee="isMarquee"
            :key="`stat-card-${i}`"
         />
      </div>
      <cta v-if="block.cta"
         :cta="block.cta"
         :arrow="true"
         :mini="false"
         :dark="false"
      />
   </section>
</template>

<script>
import cta from './partials/cta.vue'
import StatCardPartial from './partials/stat-card-partial.vue'
export default {
   name: 'statsBlock',
   components: {
      cta,
      StatCardPartial,
   },
   props: {
      block: Object,
   },
   data() {
      return {
         stats: this.block.statsCollection.items
      }
   },
   computed: {
      checkHeaders() {
         // changes classes/tags for when headline & subheadline are included
         if (this.block.headline && this.block.subheadline) {
            return false
         } else {
            return true
         }
      },
      isMarquee() {
         if (this.block.style.toLowerCase() == 'marquee') {
            return true
         } else {
            return false
         }
      },
   },
   mounted() {
      if (this.isMarquee) {
         const marquee = this.$helpers.marquee(this.$refs['stats-marquee'])
      }
   },
}
</script>
