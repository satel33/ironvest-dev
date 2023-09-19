<template>
   <section class="text-block">
      <richtext-partial v-if="block.text" class="text" :content="block.text.json" />
      <div v-if="cards.length" class="card-wrapper">
         <text-card-partial
            v-for="(card,i) in cards"
            :key="`text-card-${i}`" 
            :card="card"
         />
      </div>
      <div class="full-width-media" v-if="block.fullWidthMedia?.media">
         <media-partial
            :media="$helpers.getMedia(block.fullWidthMedia.media)"
            :lazy="true"
         />
      </div>
      <cta v-if="block.cta"
         :cta="block.cta"
         :arrow="true"
         :dark="false"
         :mini="false"
      />
   </section>
</template>

<script>
import Cta from './partials/cta.vue'
import richtextPartial from './partials/richtext-partial.vue'
import TextCardPartial from './partials/text-card-partial.vue'
export default {
   name: 'TextBlock',
   props: {
      block: Object
   },
   components: { richtextPartial, TextCardPartial, Cta },
   data() {
      return {
         cards: [ ...this.block.textCards.items ]
      }
   }
}
</script>