<template>
   <section class="feature-tab-block">
      <div class="left">
         <h6>{{ block.eyebrow }}</h6>

         <div v-for="cat in categories" :key="cat">
            <div class="tab" :class="[{ active: catSelected == cat }]"  @click="handleTabs(cat)">
               <h2>{{ cat }}</h2>

               <div v-if="$mq !== 'desktop'" class="plus">
                  <span></span><span></span>
               </div>
            </div>
            <!-- Mobile only -->
            <TransitionGroup
               @enter="onEnterExpand"
               @leave="onLeaveExpand"
               @before-enter="onBeforeEnterExpand"
               tag="div"
               class="expandable"
            >
               <div :key="cat" v-if="$mq !== 'desktop' && cat == catSelected">
                  <list-item-partial
                     v-for="(item, i) in groupedCards[cat]"
                     :key="`mobile-item-$${i}`"
                     :item="item"
                     classes="feature-tab-card"
                  />
               </div>
            </TransitionGroup>
         </div>
      </div>
      <!-- Desktop Only -->
      <div class="right" v-if="block.features.items && $mq == 'desktop'">
         <TransitionGroup
            mode="out-in"
            name="card-list"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
         >
            <template v-for="(item, i) in block.features.items">
               <list-item-partial
                  :key="`list-item-$${i}`"
                  v-if="catSelected == item.category"
                  :item="item"
                  classes="feature-tab-card"
               />
            </template>
         </TransitionGroup>
      </div>
   </section>
</template>

<script>
import listItemPartial from './partials/list-item-partial.vue'
export default {
   components: { listItemPartial },
   name: 'feature-tab-block',
   props: {
      block: Object,
   },
   computed: {},
   data() {
      return {
         categories: [],
         catSelected: null,
         groupedCards: [],
         blockInitial: true
      }
   },
   methods: {
      onBeforeEnter(el) {
         this.$gsap.set(el, { y: '20px', opacity: 0 })
      },
      onBeforeLeave(el) {
         this.$gsap.set(el, { position: 'absolute', opacity: 0 })
      },
      onEnter(el, done) {
         this.TL.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            onComplete: done,
            ease: 'Power4.inOut',
         })
      },
      onLeave(el, done) {
         this.$gsap.to(el, {
            opacity: 0,
            duration: 0,
            onComplete: done,
         })
      },
      onBeforeEnterExpand(el) {
         this.$gsap.set(el, { height: 0 })
      },
     
      onEnterExpand(el, done) {
         var totalHeight = 0
         el.childNodes.forEach(card => {
            var height = card.offsetHeight
            var style = getComputedStyle(card)
            totalHeight += height + parseInt(style.marginBottom)
         })

         this.$gsap.to(el, {
            height: totalHeight,
            duration: 0.5,
            onComplete() {
               const elTop = el.parentNode.parentNode.getBoundingClientRect().top
               window.scrollBy({
                  top: elTop - 75,
                  behavior: 'smooth'
               })
            },
         })
      },
      onLeaveExpand(el, done) {
         this.$gsap.to(el, {
            height: 0,
            duration: 0.5,
            onComplete: done,
         })
      },
      handleTabs(cat) {
         this.blockInitial = false
         this.catSelected = cat
      }
   },
   watch: {
      catSelected: function(val) {
         if (!this.blockInitial) {
            if (this.$mq === 'desktop' || this.$mq === 'tablet') {
               window.scrollBy({
                  top: this.$el.getBoundingClientRect().top,
                  behavior: 'smooth'
               })
            }
         }
      }
   },
   mounted() {
      this.categories = this.block.features.items.map(item => item.category)
      this.categories = [...new Set(this.categories)]
      this.catSelected = this.categories[0]

      // Get filtered cards for mobile
      this.categories.filter(cat => {
         const filteredCards = this.block.features.items.filter(
            item => item.category == cat
         )
         this.groupedCards[cat] = filteredCards
      })

      this.TL = this.$gsap.timeline()
    
   },
}
</script>
