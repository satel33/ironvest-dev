<template>
   <section class="blog-block" data-rounded-corners="true">
      <header v-if="block.eyebrow || block.headline">
         <h6 v-if="block.eyebrow">{{ block.eyebrow }}</h6>
         <h2 v-if="block.headline">{{ block.headline }}</h2>
         <div class="actions" v-if="$mq !== 'desktop'">
            <cta :cta="block.cta" :arrow="true" :dark="true" :aria="block.headline"/>
         </div>
      </header>
      <div class="posts" v-if="$mq == 'desktop'">
         <blog-card
            v-for="(post, i) in block.posts.items"
            :key="`blog-${i}`"
            :post="post"
            :count="block.posts.items.length"
         />
      </div>
      <template v-else>
         <flickity class="posts" :options="flickityOptions" ref="blogSlider">
            <blog-card
               v-for="(post, i) in block.posts.items"
               :key="`blog-mobile-${i}`"
               :post="post"
               :count="block.posts.items.length"
            />
         </flickity>
         <div class="controls">
            <left-arrow @click="previous()" />
            <right-arrow @click="next()" />
         </div>
      </template>
      <div class="actions" v-if="$mq == 'desktop'">
         <cta :cta="block.cta" :arrow="true" :dark="true" />
      </div>
   </section>
</template>

<script>
import Flickity from './flickity.vue'
import BlogCard from './partials/blog-card.vue'
import cta from './partials/cta.vue'
import rightArrow from '~/assets/images/right-arrow-slider.svg?inline'
import leftArrow from '~/assets/images/left-arrow-slider.svg?inline'
export default {
   name: 'blogBlock',
   components: {
      cta,
      BlogCard,
      Flickity,
      rightArrow,
      leftArrow,
   },
   props: {
      block: Object,
   },
   data() {
      return {
         flickityOptions: {
            prevNextButtons: false,
            pageDots: false,
            wrapAround: false,
            cellSelector: '.blog-card',
         },
      }
   },
   methods: {
      next() {
         this.$refs.blogSlider.next()
      },
      previous() {
         this.$refs.blogSlider.previous()
      },
   },
}
</script>
