<template>
   <section
      :data-rounded-corners="block.roundedCorners"
      class="marquee-cards-block"
      :class="[
         blockStyle,
         {
            'round-corners': block.roundedCorners,
            straight: !block.arcedMarquee,
            curved: block.arcedMarquee,
         },
      ]"
   >
      <div class="text">
         <h6 v-if="block.eyebrow">{{ block.eyebrow }}</h6>
         <h2 v-if="block.headline && block.arcedMarquee">
            {{ block.headline }}
         </h2>
         <h3 v-if="block.headline && !block.arcedMarquee" class="serif">
            {{ block.headline }}
         </h3>
         <p v-if="block.subHeadline">{{ block.subHeadline }}</p>
      </div>
      <!-- Straight -->
      <div class="cards" v-if="!block.arcedMarquee">
         <div class="row_1" ref="row_1">
            <marquee-card
               v-for="(card, i) in block.cards.items"
               :key="`row_1-${i}`"
               :card="card"
            />
         </div>
         <div class="row_2" ref="row_2">
            <marquee-card
               v-for="(card, i) in cardsClone"
               :key="`${i}_row_2`"
               :card="card"
            />
         </div>
         <div class="row_3" ref="row_3" v-show="$mq !== 'desktop'">
            <marquee-card
               v-for="(card, i) in cardsClone"
               :key="`${i}_row_3`"
               :card="card"
            />
         </div>
      </div>

      <!-- Curved Desktop -->
      <div class="cards" v-else ref="cardWrapper">
         <svg><path ref="marqueePath"></path></svg>
         <div class="overlay">
            <img src="~/assets/images/logo-in-block.svg" alt="ironvest-icon" />
            <img src="~/assets/images/lock.svg" alt="lock-icon" />
         </div>

         <div ref="mobileCardWrapper" class="mobile">
            <marquee-card
               v-for="(card, i) in block.cards.items"
               :key="`marquee-card-${i}`"
               :card="card"
               classes="large"
               ref="cards"
            />
         </div>
      </div>
      <div class="action" v-if="block.arcedMarquee">
         <cta :cta="block.cta" :arrow="true" :dark="true" />
      </div>
   </section>
</template>

<script>
import  shuffle  from 'lodash.shuffle'
import marqueeCard from './partials/marquee-card.vue'
import Cta from './partials/cta.vue'

export default {
   components: { marqueeCard, Cta },
   // components: { RichtextPartial, Cta },
   props: {
      block: Object,
   },
   computed: {
      cardsClone() {
         return shuffle(this.block.cards.items)
      },
      blockStyle() {
         return this.block.style.toLowerCase()
      },
   },
   watch: {
      $mq: {
         handler(val) {
            if (this.$refs.row_3 && val !== 'desktop') {
               this.marqueeMobile = this.$helpers.marquee(this.$refs.row_3)
            } else {
               this.marqueeMobile?.destroy()
            }
         },
         deep: true,
      },
   },
   data() {
      return {
         cards: null,
      }
   },
   methods: {
      shuffleArray(arr) {
         arr.sort(() => Math.random() - 0.5)
      },
      resizeMarquee() {
         let anchors = [
            {
               x: window.innerWidth / -4,
               y: 140,
            },
            {
               x: window.innerWidth / 2,
               y: 40,
            },
            {
               x: window.innerWidth * 1.25,
               y: 140,
            },
         ]
         let rawPath = this.$MotionPathPlugin.arrayToRawPath(anchors, {
            curviness: 2,
         })
         this.$refs.marqueePath.setAttribute(
            'd',
            this.$MotionPathPlugin.rawPathToString(rawPath)
         )
      },
      startMarquee() {
         const duration = 18
         const cardW =
            this.$refs.cardWrapper.querySelector('.marquee-card').offsetWidth
         this.cards = this.$refs.cardWrapper.querySelectorAll('.marquee-card')
         this.resizeMarquee()
         // NOTE:
         // pathDataToBezier may work for preseting the cards on the path
         // https://greensock.com/forums/topic/18033-moving-an-element-along-a-custom-path/
         /**
            NOTE:
            ** 250 is width set in PX in CSS file
            ** 15 is duration
         */
         const lineWidth = window.innerWidth * 1.5
         const gap =
            cardW +
            ((lineWidth - this.cards.length * cardW) / this.cards.length - 1)
         const pxSecond = (window.innerWidth * 1.5) / duration
         const time = gap / pxSecond

         const animation = this.$gsap.to(this.cards, {
            // delay:1,
            immediateRender: true,
            stagger: {
               repeat: -1,
               // each:2,//10/cards.length
               each: time,
            },
            duration: duration,
            repeat: -1,
            ease: 'linear',
            motionPath: {
               // markers: true,
               path: this.$refs.marqueePath,
               align: this.$refs.marqueePath,
               autoRotate: true,
               alignOrigin: [0, 0],
            },
         })
         // animation.pause();
         animation.seek(18)
         // animation.play();
      },
      handleCurvedMarquee() {
         this.$gsap.killTweensOf(this.cards)
         this.$gsap.set(this.cards, { clearProps: 'transform' })

         if (this.$mq === 'desktop' || this.$mq === 'tablet') {
            this.marquee?.destroy()
            this.marquee = null
            this.startMarquee()
         } else {
            if (!this.marquee) {
               this.marquee = this.$helpers.marquee(
                  this.$refs.mobileCardWrapper,
                  true
               )
            }
         }
      },
   },
   mounted() {
      if (!this.block.arcedMarquee) {
         this.$helpers.marquee(this.$refs.row_1, false, 45)
         this.$helpers.marquee(this.$refs.row_2, true, 45)
         if (this.$refs.row_3 && this.$mq !== 'desktop') {
            this.marqueeMobile = this.$helpers.marquee(
               this.$refs.row_3,
               false,
               45
            )
         }
      } else {
         this.handleCurvedMarquee()
         window.addEventListener('resize', this.handleCurvedMarquee, {
            passive: true,
         })
      }
   },
   destroyed() {
      window.removeEventListener('resize', this.handleCurvedMarquee)
   },
}
</script>
