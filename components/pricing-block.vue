<template>
   <section class="pricing-block">
      <richtext-partial v-if="block.text" class="text" :content="block.text.json" />
      <toggle-partial
         off="Monthly"
         on="Annual"
         @toggle="handleToggle"
      />
      <p v-if="block.toggleText" class="toggle-text">{{ block.toggleText }}</p>
      <div v-if="cards && cards.length" class="pricing-card-wrapper" id="pricing">
         <pricing-card-partial v-for="(card,i) in cards"
            :key="`pricing-card-${i}`"
            :card="card"
            :annual="annual"
         />
      </div>
   </section>
</template>

<script>
import PricingCardPartial from './partials/pricing-card-partial.vue'
import richtextPartial from "./partials/richtext-partial.vue"
import TogglePartial from './partials/toggle-partial.vue'

export default 
{
   name: 'PricingBlock',
   props: {
      block: Object
   },
   components: { richtextPartial, PricingCardPartial, TogglePartial },
   data() {
      return {
         annual: false,
         cards: [...this.block.pricingCardsCollection.items], 
      }
   },
   watch:{
      block(val){
         if(val){
            this.cards = [...val.pricingCardsCollection.items]
         }
      },
   },
   methods: {
      handleToggle(on) {
         this.annual = on
      }
   },
   mounted() {
      this.$nuxt.$emit('header-color', 'light')
   }
}
</script>