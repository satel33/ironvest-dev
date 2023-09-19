<template>
   <section class="testimonials-block">
      <h6 v-if="block.eyebrow" class="eyebrow">{{ block.eyebrow }}</h6>
      <div v-if="cards.length" 
         :class="[`testimonials-wrapper`, stackAniActive && 'playing', isStacked && 'stacked', isMarquee && 'marquee', isSmall && 'small', isSmallSlider && 'w-slider', `count-${cards.length}`]" 
         ref="testimonialsWrapper"
      >

         <!-- STACKED -->
         <template v-if="isStacked">
            <!-- current -->
            <testimonial-card-partial :card="current"
               class="testimonial-current"
               ref="testimonialCurrent"
            />
            <!-- incoming -->
            <testimonial-card-partial :card="incoming"
               class="testimonial-incoming"
               ref="testimonialIncoming"
            />
            <div class="testimonial-placeholder testimonial-placeholder-2" ref="testimonialPlaceholder2"></div>
            <div class="testimonial-placeholder testimonial-placeholder-1" ref="testimonialPlaceholder1"></div>
         </template>

         <!-- MARQUEE -->
         <div v-else-if="isMarquee"
            :class="[`testimonials`, !marqueeReady && `hide-marquee`]"
            ref="testimonialMarquee"
         >
            <testimonial-card-partial
               v-for="(card,i) in [...cards,...cards]"
               :card="card"
               :key="`testimonial-card-${i}`"
            />
         </div>

         <!-- SMALL -->
         <flickity v-else-if="isSmall && isSmallSlider"
            class="small-slider-wrapper"
            :options="flickityOptions" 
            ref="testimonialSlider"
         >
            <testimonial-card-partial
               v-for="(card,i) in cards"
               :card="card"
               :key="`testimonial-card-${i}`"
            />
         </flickity>

         <template v-else-if="isSmall">
            <testimonial-card-partial
               v-for="(card,i) in cards"
               :card="card"
               :key="`testimonial-card-${i}`"
            />
         </template>

      </div>
      <div v-if="isStacked || isSmallSlider"
         :class="[`slider-controls`, stackAniActive && 'disabled']"
      >
         <slider-ctrls @prev="prev" @next="next"
            :atStart="sliderAt.start" :atEnd="sliderAt.end"
         />
      </div>
   </section>
</template>

<script>
import Flickity from './flickity.vue'
import sliderCtrls from './partials/slider-ctrls.vue'
import TestimonialCardPartial from './partials/testimonial-card-partial.vue'
export default {
   components: { 
      sliderCtrls,
      TestimonialCardPartial,
      Flickity
   },
   name: 'TestimonialsBlock',
   props: {
      block: Object
   },
   data() {
      return {
         cards: this.block.testimonialsCollection.items,
         count: 0,
         current: {
            quote: null,
            name: null,
            title: null,
         },
         incoming: {
            quote: null,
            name: null,
            title: null,
         },
         max: this.block.testimonialsCollection.items.length - 1,
         aniDuration: .5, // secs
         stackAniActive: false,
         flickityOptions: {
            prevNextButtons: false,
            pageDots: false,
            wrapAround: false,
            cellSelector: '.testimonial-card',
            imagesLoaded: true,
            resize: true,
            cellAlign: 'left'
         },
         sliderAt: { start: true, end: false, index: 0 },
         marqueeReady: false,
      }
   },
   computed: {
      currentCard() {
         return this.cards[this.count]
      },
      isStacked() {
         if (this.block.format.toLowerCase() === 'stacked') {
            return true
         } else {
            return false
         }
      },
      isMarquee() {
         if (this.block.format.toLowerCase() === 'marquee') {
            return true
         } else {
            return false
         }
      },
      marqueeSpeed() {
         if (this.$mq === 'desktop' || this.$mq === 'tablet') {
            return 100
         } else if (this.$mq === 'mobile') {
            return 100
         }
      },
      isSmall() {
         if (this.block.format.toLowerCase() === 'small') {
            return true
         } else {
            return false
         }
      },
      isSmallSlider() {
         if (this.isSmall) {
            if (this.cards.length > 4 || this.$mq === 'mobile') {
               return true
            } else {
               return false
            }
         } else {
            return false
         }
      },
   },
   methods: {
      prev() {
         if (this.isStacked && !this.stackAniActive) {
            const oldCount = this.count
            if (this.count === 0) { this.count = this.max } else { --this.count }
            const newCount = this.count
            this.handleCards(oldCount, newCount)
         } else if (this.isSmallSlider) {
            this.$refs.testimonialSlider.previous()
            this.checkSliderAt(true)
         }
      },
      next() {
         if (this.isStacked && !this.stackAniActive) {
            const oldCount = this.count
            if (this.count === this.max) { this.count = 0 } else { ++this.count }
            const newCount = this.count
            this.handleCards(oldCount, newCount)
         } else if (this.isSmallSlider) {
            this.$refs.testimonialSlider.next()
            this.checkSliderAt()
         }
      },
      checkSliderAt(prev) {
         prev ?
            --this.sliderAt.index :
            ++this.sliderAt.index
         if (this.sliderAt.index === 0) {
            this.sliderAt.start = true
            this.sliderAt.end = false
         } else if (this.$mq !== 'mobile' && this.sliderAt.index === this.cards.length - 4) {
            this.sliderAt.start = false
            this.sliderAt.end = true
         } else if (this.sliderAt.index === this.cards.length - 1) {
            this.sliderAt.start = false
            this.sliderAt.end = true
         } else {
            this.sliderAt.start = false
            this.sliderAt.end = false
         }
      },
      // STACKED
      fillCurrent(count) {
         this.current = {
            quote: this.cards[count].quote,
            name: this.cards[count].name,
            title: this.cards[count].title
         }
      },
      fillIncoming(count) {
         this.incoming = {
            quote: this.cards[count].quote,
            name: this.cards[count].name,
            title: this.cards[count].title
         }
      },
      updateCards(self) {
         this.current = {
            quote: this.incoming.quote,
            name: this.incoming.name,
            title: this.incoming.title
         }
         this.incoming = {
            quote: null,
            name: null,
            title: null
         }
         self.$refs.testimonialsWrapper.style.height = ''
         self.$refs.testimonialCurrent.$el.parentElement.style.height = ''
         self.$refs.testimonialCurrent.$el.style.height = ''
         self.$refs.testimonialIncoming.$el.style.height = ''
         self.$refs.testimonialPlaceholder1.style.height = ''
         self.$refs.testimonialPlaceholder2.style.height = ''
      },
      handleCardHeight(quote) {
         const quoteH = quote.offsetHeight
         const attH = quote.nextElementSibling.offsetHeight
         const wrapper = window.getComputedStyle(quote.parentElement)
         return quoteH + attH + parseInt(wrapper.paddingTop) + parseInt(wrapper.paddingBottom)
      },
      handleWrapperHeight(curQuote, incQuote) {
         const curQuoteH = curQuote.offsetHeight
         const incQuoteH = incQuote.offsetHeight
         const quoteHDif = incQuoteH - curQuoteH
         return this.$refs.testimonialsWrapper.offsetHeight + quoteHDif
      },
      handleCards(cur, inc) {
         this.fillCurrent(cur)
         this.fillIncoming(inc)
         this.stackAniActive = true
         const curQuote = this.$refs.testimonialCurrent.$el.querySelector('.quote')
         const incQuote = this.$refs.testimonialIncoming.$el.querySelector('.quote')
         const self = this
         // animation
         const currentAni = this.$gsap.timeline({ ease: 'easeIn' })
         currentAni.to(this.$refs.testimonialCurrent.$el, {
            yPercent: 75,
            duration: this.aniDuration,
         })
         currentAni.to(this.$refs.testimonialIncoming.$el, {
            height: () => self.handleCardHeight(incQuote),
            y: 0,
            scaleX: 1,
            duration: this.aniDuration,
            onComplete() {
               currentAni.pause(), currentAni.seek(0)
               self.updateCards(self)
               self.stackAniActive = false
            }
         }, '<')
         currentAni.to(this.$refs.testimonialsWrapper, {
            height: () => self.handleWrapperHeight(curQuote, incQuote),
            duration: this.aniDuration,
         }, '<')
         currentAni.to(this.$refs.testimonialPlaceholder1, {
            height: () => self.handleCardHeight(incQuote),
            y: -13,
            scaleX: 0.95,
            duration: this.aniDuration
         }, '<')
         currentAni.to(this.$refs.testimonialPlaceholder2, {
            height: () => self.handleCardHeight(incQuote),
            y: 13, 
            duration: this.aniDuration
         }, '<'),
         currentAni.to(this.$refs.testimonialPlaceholder2, {
            opacity: 1,
            duration: 0.3
         }, `<0.2`)
         currentAni.to(this.$refs.testimonialCurrent.$el, {
            opacity: 0,
            duration: 0.3
         }, `-=0.4`)
      }
   },
   mounted() {
      if (this.isStacked) {
         this.fillCurrent(this.count)
      }
      if (this.isMarquee) {
         this.$helpers.marquee(this.$refs.testimonialMarquee, false, this.marqueeSpeed)
         this.marqueeReady = true
      }
   }
}
</script>
