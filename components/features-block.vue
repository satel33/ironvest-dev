<template>
   <section class="features-block" :class="[block.cornerStyle.toLowerCase()]">
      <header v-if="block.eyebrow || block.headline || block.subHeadline">
         <h6 v-if="block.eyebrow">{{ block.eyebrow }}</h6>
         <h2 v-if="block.headline">{{ block.headline }}</h2>
         <p class="p-s" v-if="block.subHeadline">{{ block.subHeadline }}</p>
      </header>
      <mq-layout mq="tablet+" class="features">
         <div class="images">
            <media-partial
               v-for="(item, index) in block.features.items"
               :key="`feature-media-${index}`"
               :media="$helpers.getMedia(item.mediaNew.items[0])"
               :secondVideoSrc="$helpers.getMedia(item.mediaNew.items[1])"
               :lazy="true"
               :data-index="index"
               :ref="`media-${index}`"
               :class="[{ active: index == activeImage }]"
            />
         </div>

         <div class="text-content">
            <div
               class="text"
               v-for="(item, index) in block.features.items"
               :key="`feature-text-${index}`"
               :data-index="index"
               data-scroll
            >
               <h6 v-if="index + 1 && block.showNumbers" class="number">
                  0{{ index + 1 }}
               </h6>
               <richtext-partial
                  :content="item.richtext.json"
                  :links="item.richtext.links"
               />
            </div>
         </div>
      </mq-layout>
      <mq-layout mq="mobile">
         <content-item
            v-for="(item, index) in block.features.items"
            :key="`features-block-${index}`"
            :content="item"
            :showNumber="block.showNumbers"
            :index="index + 1"
            :ref="`media-${index}`"
            contentType="feature"
         />
      </mq-layout>
      <cta-bar
         v-if="block.ctaBar"
         :block="block.ctaBar"
         classes="sticky"
         :ctaDark="true"
      />
   </section>
</template>

<script>
import ScrollOut from 'scroll-out'

import ContentItem from './partials/content-item.vue'
import CtaBar from './partials/cta-bar.vue'
import cta from './partials/cta.vue'
import MediaPartial from './partials/media-partial.vue'
import RichtextPartial from './partials/richtext-partial.vue'
export default {
   name: 'featuresBlock',
   components: {
      cta,
      ContentItem,
      CtaBar,
      MediaPartial,
      RichtextPartial,
   },
   props: {
      block: Object,
   },
   data() {
      return {
         activeImage: null,
         so: null,
      }
   },
   watch: {
      activeImage(val) {
         // for desktop only
         if (!val) return
         const wrapper = this.$refs[`media-${val}`][0]?.$el
         // if div;
         if (wrapper.nodeType !== 1) return
         const video = wrapper.querySelector('video')
         // if video
         if (!video) return
         // restart video
         video.currentTime = 0
         video.play()
      },
   },
   mounted() {
      this.$nextTick(() => {
         this.so = ScrollOut({
            targets: '[data-scroll]',
            threshold: 0.85,
            cssProps: {
               intersectY: true,
            },
            onShown: el => {
               this.activeImage = el.dataset.index
               // for Mobile
               const video = el.querySelector('video')
               if (!video) return
               video.currentTime = 0
               video.play()
            },
         })
      })
   },
   destroyed() {
      if(this.so){
         this.so.teardown()
      }
   },
}
</script>
