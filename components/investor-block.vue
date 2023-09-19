<template>
<!-- NOTE: this is called Logo Block in the CMS -->
   <section class="investor-block" :class="[block.style.toLowerCase(), {'rounded-corners':block.roundedCorners}]" :data-rounded-corners="block.roundedCorners">
      <h6 v-if="block.eyebrow" class="eyebrow">{{ block.eyebrow }}</h6>
      <h2 v-if="block.headline" :class="[`headline`, block.showMediaTitle && `h4`]">{{ block.headline }}</h2>
      <div v-if="investors.length" :class="[`investor-wrapper`, isMarquee && `w-marquee`]" ref="investors-marquee">
         <figure v-for="(logo,i) in investors"
            :key="`investor-${i}`"
            class="investor"
            :class="[{'smaller':block.showMediaTitle}]"
         >
            <media-partial
               class="logo"
               :media="$helpers.getMedia(logo)"
            />
            
            <h6 v-if="block.showMediaTitle">{{logo.title}}</h6>
         </figure>
      </div>
      <cta v-if="block.cta" :cta="block.cta" :arrow="true" :mini="false" :dark="false" />
   </section>
</template>

<script>
import cta from './partials/cta.vue'
import MediaPartial from './partials/media-partial.vue'
export default {
   name: 'InvestorBlock',
   props: {
      block: Object
   },
   components: {
      cta,
      MediaPartial
   },
   data() {
      return {
         investors: this.block.mediaCollection.items
      }
   },
   computed: {
      isMarquee() {
         if (this.investors.length > 6 || this.$mq === 'mobile') {
            return true
         } else {
            return false
         }
      },
      marqueeSpeed() {
         if (this.$mq === 'desktop' || this.$mq === 'tablet') {
            return 50
         } else if (this.$mq === 'mobile') {
            return 30
         }
      }
   },
   mounted() {
      if (this.isMarquee) {
         this.$helpers.marquee(this.$refs['investors-marquee'], false, this.marqueeSpeed)
      }
   }
}
</script>