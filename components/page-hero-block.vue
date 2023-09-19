<template>
   <section
      class="page-hero-block"
      :class="[block.style.toLowerCase(), layout]"
   >
      <svg width="100" height="100" viewBox="0 0 100 100" id="path">
         <path id="circle-path" />
      </svg>
      <div class="text" ref="text">
         <richtext-partial :content="block.text.json" />
         <div class="actions" v-if="block.ctas.items.length">
            <cta
               v-for="(cta, index) in block.ctas.items"
               :key="`home-hero-cta-${index}`"
               :cta="cta"
               :arrow="true"
               :mini="false"
               :dark="showLightCta"
            />
            <div
               v-if="block.modalVideoUrl"
               class="cta btn style-secondary video-cta"
               @click="toggleVideoModal"
            >
               <cta-play-btn />
               <span>Watch video</span>
            </div>
         </div>
         <div
            class="social-proof mt3"
            v-if="
               block.socialProofLogos?.items?.length && !block.socialProofRating
            "
         >
            <media-partial
               v-for="(media, index) in block.socialProofLogos.items"
               :key="index"
               class="badge"
               :media="$helpers.getMedia(media)"
            />
         </div>
         <div class="social-proof-rating mt3" v-else-if="block?.socialProofRating">
            <testimonial-card-partial
               :card="block.socialProofRating"
               class="testimonial"
            />
         </div>
         <!-- <media-partial
            v-if="block.appRating"
            class="badge mt2"
            :media="$helpers.getMedia(block.appRating)"
         /> -->
      </div>

      <!-- for SVG -->
      <mq-layout class="media" mq="tablet+">
         <div
            v-if="block.modalVideoUrl"
            ref="videoBtn"
            class="video-modal-btn"
            @click="toggleVideoModal"
         >
            <play-btn />
         </div>
         <div
            class="hero-svg"
            :class="cleanMediaAlignment"
            v-if="svg"
            v-html="svg"
            ref="svgDesktop"
         ></div>

         <media-partial
            v-else-if="heroMedia && !heroMedia.svg"
            :loop="false"
            :media="heroMedia"
            :secondVideoSrc="secondVideo"
            :classes="cleanMediaAlignment"
         />
      </mq-layout>

      <mq-layout mq="mobile" class="media">
         <div
            v-if="block.modalVideoUrl"
            class="video-modal-btn"
            ref="videoBtn"
            @click="toggleVideoModal"
         >
            <play-btn />
         </div>
         <div
            class="hero-svg"
            :class="cleanMediaAlignment"
            v-if="svg"
            v-html="svg"
            ref="svgMobile"
         ></div>

         <media-partial
            v-else
            :media="mobileMedia ? mobileMedia : heroMedia ? heroMedia : null"
            :loop="false"
            :secondVideoSrc="
               secondMobileVideo
                  ? secondMobileVideo
                  : secondVideo
                  ? secondVideo
                  : null
            "
            :classes="cleanMediaAlignment"
         />
      </mq-layout>
   </section>
</template>

<script>
import Cta from './partials/cta.vue'
import MediaPartial from './partials/media-partial.vue'
import RichtextPartial from './partials/richtext-partial.vue'
import PlayBtn from '~/assets/images/play-btn-green.svg?inline'
import CtaPlayBtn from '~/assets/images/cta-play-btn.svg?inline'
import TestimonialCardPartial from './partials/testimonial-card-partial.vue'

export default {
   components: {
      MediaPartial,
      RichtextPartial,
      Cta,
      PlayBtn,
      CtaPlayBtn,
      TestimonialCardPartial,
   },
   props: {
      block: Object,
   },
   data() {
      return {
         alertBar: null,
         svg: null,
         svgs: [],
      }
   },
   watch: {
      $mq() {
         this.animateText()
      },
      svg(val) {
         if (val && this.layout == 'animated') {
            this.$nextTick(() => {
               this.startAnimate()
            })
         }
      },
   },
   computed: {
      heroMedia() {
         return this.$helpers.getMedia(this.block.media.items[0])
      },
      mobileMedia() {
         return this.$helpers.getMedia(this.block.mobileMedia.items[0])
      },
      secondVideo() {
         return this.$helpers.getMedia(this.block.media.items[1] ?? null)
      },
      secondMobileVideo() {
         return this.$helpers.getMedia(this.block.mobileMedia.items[1] ?? null)
      },
      cleanMediaAlignment() {
         return this.block.mediaPlacement.toLowerCase().replace('/', '-')
      },
      layout() {
         return this.block.layout.toLowerCase().replace('/', '-')
      },
      showLightCta() {
         return this.block.style.toLowerCase() == 'navy' ? true : false
      },
      sizes() {
         return this.$mq === 'desktop' || this.$mq == 'tablet'
            ? this.getRandomArbitrary(200, 300)
            : this.$mq == 'mobile'
            ? this.getRandomArbitrary(75, 150)
            : null
      },
      svgPath() {
         let anchors = [
            {
               x: 0,
               y: 0,
            },
            {
               x: 5,
               y: 0,
            },
            {
               x: 5,
               y: 50,
            },
            {
               x: 0,
               y: 50,
            },
            {
               x: 0,
               y: 0,
            },
         ]
         const rawPath = this.$MotionPathPlugin.arrayToRawPath(anchors, {
            curviness: 1.25,
            // type: 'cubic',
         })
         const path = this.$el.querySelector('#circle-path')
         path.setAttribute('d', this.$MotionPathPlugin.rawPathToString(rawPath))
         return '#circle-path'
      },
   },
   methods: {
      getRandomArbitrary(min, max) {
         return Math.random() * (max - min) + min
      },
      updateAlertBar(alert) {
         this.alertBar = alert
      },
      animateText() {
         // loading animation
         this.$nextTick(() => {
            this.$gsap.to(this.$refs.text, {
               opacity: 1,
               delay: 0.5,
            })
            this.$gsap.to(this.$refs.videoBtn, {
               delay: 1,
               duration: 0.4,
               scale: 1,
            })
         })
      },
      setSvgSizes(el) {
         this.$gsap.set(el, {
            top: window.innerHeight / 2 - 25,
            width: 25,
         })
      },
      setSvgTracks() {
         if (!this.svgs) return
         const tops = [0, '10vh', '75vh', '20vh', '80vh', '12vh']
         const topsM = [0, '5vh', '75vh', '7vh', '80vh', '0vh']
         this.svgs.forEach((el, i) => {
            // for first large el
            if (i == 0) {
               this.$gsap.set(el, {
                  top: window.innerHeight / 2 - this.sizes,
                  width: this.sizes,
                  left: this.sizes / -2,
               })
            }
            // for second large el
            else if (i == this.svgs.length - 1) {
               this.$gsap.set(el, {
                  width: this.sizes,
                  left: window.innerWidth - this.sizes / 2,
               })
            } else {
               // All middle boxes
               this.$gsap.set(el, {
                  width: this.getRandomArbitrary(20, 30),
                  left: (window.innerWidth / this.svgs.length) * i,
                  top: this.$mq === 'mobile' ? topsM[i] : tops[i],
               })
            }

            this.animateSvg(el)
         })
      },
      animateSvg(el) {
         // const windowWrap = this.$gsap.utils.wrap(-100,window.innerHeight)
         this.$gsap.to(el, {
            // top: window.innerHeight,
            duration: this.getRandomArbitrary(15, 35),
            repeat: -1,
            ease: 'linear',
            // y: '200%',
            runBackwards: this.getRandomArbitrary(0, 1),
            yoyo: true,
            scale: this.getRandomArbitrary(0.7, 1.5),
            rotate: this.getRandomArbitrary(-15, 15),
            // delay: this.getRandomArbitrary(0, 3),

            motionPath: {
               path: this.svgPath,
               alignOrigin: [0.5, 0.5],
            },
         })
      },
      startAnimate() {
         const svgWrapper = this.$refs.svgDesktop ?? this.$refs.svgMobile
         const svg = svgWrapper.querySelector('svg')
         this.removeClones(svgWrapper)
         this.svgs = [svg]
         this.setSvgSizes(svg)

         for (let index = 6; index > 0; index--) {
            const clone = svg.cloneNode(true)
            clone.classList.add('clone')
            svgWrapper?.appendChild(clone)
            this.setSvgSizes(clone)
            this.svgs.push(clone)
         }
         this.setSvgTracks()
      },
      removeClones(svgWrapper) {
         Array.from(svgWrapper.querySelectorAll('.clone')).forEach(item => {
            item.remove()
         })
      },
      handleResize() {
         if (this.svg) {
            this.startAnimate()
         }
      },
      handleScroll() {
         this.$gsap.to(this.$refs.svgDesktop ?? this.$refs.svgMobile, {
            y: window.scrollY / -10,
         })
      },
      toggleVideoModal() {
         this.$store.commit('toggleVideoModalActive', {
            active: true,
            src: this.block.modalVideoUrl,
         })
      },
   },
   mounted() {
      this.$nuxt.$emit('header-color', this.block.style.toLowerCase())
      this.$nuxt.$on('alert-bar', this.updateAlertBar)
      this.animateText()

      if (this.layout === 'animated') {
         window.addEventListener('resize', this.handleResize, { passive: true })
         window.addEventListener('scroll', this.handleScroll, { passive: true })
         this.$fetch()
      }
   },
   // fetchOnServer: true,
   async fetch() {
      if (this.heroMedia?.svg && this.layout == 'animated') {
         this.svg = await this.$axios
            .get(this.heroMedia.srcset)
            .then(res => res.data)
      }
   },
   destroyed() {
      window.removeEventListener('resize', this.handleResize)
      window.removeEventListener('scroll', this.handleScroll)
      this.svg = null
   },
}
</script>
