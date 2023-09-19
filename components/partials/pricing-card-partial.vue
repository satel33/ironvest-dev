<template>
   <div :class="[`pricing-card`, { 'w-banner': card.bannerText }]">
      <div v-if="card.bannerText" class="card-banner">
         <p class="card-banner-text">{{ card.bannerText }}</p>
      </div>
      <div class="card-title-wrapper">
         <h4 class="card-title">{{ card.planTitle }}</h4>
         <p v-if="card.planDescription" class="card-desc">{{ card.planDescription }}</p>
      </div>
      <p v-if="annual" class="card-price annual">{{ card.annualPrice }}</p>
      <p v-else-if="!annual" class="card-price monthly">{{ card.monthlyPrice }}</p>
      <cta v-if="card.cta" :cta="card.cta" :arrow="true" :mini="false" :dark="false" />
      <richtext-partial v-if="card.text" class="card-text" :content="card.text.json" />
   </div>
</template>

<script>
import cta from './cta.vue'
import RichtextPartial from './richtext-partial.vue'
export default {
   name: 'PricingCard',
   props: {
      card: Object,
      annual: Boolean
   },
   components: { cta, RichtextPartial },
}
</script>