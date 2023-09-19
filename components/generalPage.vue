<template>
   <div v-if="page" id="pageBlocks">
      <keep-alive>
         <alert-bar :alert="page.alertBar" v-if="alertBar" />
         <alert-bar :alert="page.mobileAlertBar" v-else-if="mobileAlertBar" />
      </keep-alive>

      <template v-for="(block, i) in page.pageBlocksCollection.items">
         <StatsBlock
            v-if="block.type === 'StatsBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <PageHeroBlock
            v-if="block.type === 'PageHeroBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <mission-block
            v-if="block.type === 'MissionBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />
         <marquee-cards-block
            v-if="block.type === 'MarqueeCardsBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <card-group-block
            v-if="block.type === 'CardGroupBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <team-block
            v-if="block.type === 'TeamBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <investor-block
            v-if="block.type === 'InvestorBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <testimonials-block
            v-if="block.type === 'TestimonialsBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <features-block
            v-if="block.type === 'FeaturesBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <features-list-block
            v-if="block.type === 'FeaturesListBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <simple-content-block
            v-if="block.type === 'SimpleContentBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <blog-block
            v-if="block.type === 'BlogBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <blog-list-block
            v-if="block.type === 'BlogListBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <faq-block
            v-if="block.type === 'FaqBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <pricing-block
            v-if="block.type === 'PricingBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <text-block
            v-if="block.type === 'TextBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <career-block
            v-if="block.type === 'CareerBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <compare-block
            v-if="block.type === 'CompareBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <simple-compare-block
            v-if="block.type === 'SimpleCompareBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <feature-tab-block
            v-if="block.type === 'FeaturesTabBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />

         <embed-block
            v-if="block.type === 'EmbedBlock'"
            :key="`${block.type}-${i}`"
            :block="block"
         />
      </template>
   </div>
</template>

<script>
import PageHeroBlock from '~/components/page-hero-block.vue'
import StatsBlock from '~/components/stats-block.vue'
import MissionBlock from '~/components/mission-block.vue'
import MarqueeCardsBlock from '~/components/marquee-cards-block.vue'
import CardGroupBlock from '~/components/card-group-block.vue'
import TeamBlock from '~/components/team-block.vue'
import InvestorBlock from '~/components/investor-block.vue'
import TestimonialsBlock from '~/components/testimonials-block.vue'
import FeaturesListBlock from '~/components/features-list-block.vue'
import FeaturesBlock from '~/components/features-block.vue'
import SimpleContentBlock from '~/components/simple-content-block.vue'
import BlogBlock from '~/components/blog-block.vue'
import BlogListBlock from '~/components/blog-list-block.vue'
import FaqBlock from '~/components/faq-block.vue'
import PricingBlock from '~/components/pricing-block.vue'
import TextBlock from '~/components/text-block.vue'
import CareerBlock from '~/components/career-block.vue'
import FeatureTabBlock from '~/components/feature-tab-block.vue'
import CompareBlock from '~/components/compare-block.vue'
import SimpleCompareBlock from '~/components/simple-compare-block.vue'
import EmbedBlock from '~/components/embed-block.vue'
import Cta from '~/components/partials/cta.vue'

export default {
   name: 'generalPage',
   props: {
      page: Object,
   },
   components: {
      StatsBlock,
      PageHeroBlock,
      MissionBlock,
      MarqueeCardsBlock,
      CardGroupBlock,
      TeamBlock,
      InvestorBlock,
      TestimonialsBlock,
      FeaturesListBlock,
      FeaturesBlock,
      SimpleContentBlock,
      BlogBlock,
      BlogListBlock,
      FaqBlock,
      PricingBlock,
      TextBlock,
      CareerBlock,
      FeatureTabBlock,
      CompareBlock,
      SimpleCompareBlock,
      EmbedBlock,
      Cta,
   },
   data() {
      return {
         stickyBlocks: [],
         scrollingDown: false,
         lastScrollY: 0,
         mounted: 0,
      }
   },
   computed: {
      alertBar() {
         if (!this.mounted) return false
         if (this.$mq !== 'mobile' && this.page.alertBar) {
            return true
         } else if (
            this.$mq == 'mobile' &&
            this.page.alertBar &&
            !this.page.mobileAlertBar
         ) {
            return true
         } else if (
            this.$mq == 'mobile' &&
            this.page.alertBar &&
            this.page.mobileAlertBar
         ) {
            return false
         } else {
            return false
         }
      },
      mobileAlertBar() {
         if (!this.mounted) return false
         if (this.$mq == 'mobile' && this.page.mobileAlertBar) {
            return true
         } else {
            return false
         }
      },
   },
   mounted() {
      this.mounted = true
      if (this.page.alertBar || this.page.mobileAlertBar) {
         this.$nuxt.$emit('alert-bar', true)
      }

      this.$root.$emit('sock', this.page.sock ?? null)

      // sticky scrolling behind rounded corners
      const roundedBlocks = document.querySelectorAll(
         '[data-rounded-corners=true]'
      )
      roundedBlocks.forEach(block => {
         this.stickyBlocks.push(block.previousElementSibling)
         block.previousElementSibling.setAttribute('data-stick', true)
      })

      window.addEventListener('scroll', this.handleScroll, { passive: true })
   },
   methods: {
      handleScroll() {
         this.stickyBlocks.forEach((block, i) => {
            const bounds = block.getBoundingClientRect()
            const delta = window.innerHeight - block.offsetHeight
            const bottomHit = block.offsetTop + bounds.height + delta
            const winBottom = window.scrollY + window.innerHeight

            this.scrollingDown = this.lastScrollY < window.pageYOffset
            this.lastScrollY = window.pageYOffset

            if (bounds.height >= window.innerHeight) {
               // if the bottom of the block hits the bottom of the window
               if (winBottom > bottomHit) {
                  block.classList.add('stuck-bottom')
                  block.style.top = delta + 'px'
               } else if (winBottom < bottomHit) {
                  block.classList.remove('stuck-bottom')
                  block.style.top = null
               }
               // if block is shorter than window
            } else {
               if (bounds.top <= 0) {
                  block.classList.add('stuck')
               } else {
                  block.classList.remove('stuck')
               }
            }
         })
      },
   },
   destroyed() {
      this.stickyBlocks = []
   },
}
</script>
