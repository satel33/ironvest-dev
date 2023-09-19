<template>
   <section
      :class="[
         `card-group-block`,
         `bg-${style}`,
         stacked && `stacked`,
         stackedBottom && `stacked-bottom`,
      ]"
      ref="cardGroupScroll"
   >
      <div class="stacked-wrapper">
         <h2
            v-if="block.headline"
            class="headline"
            ref="cardGroupScrollHeadline"
         >
            {{ block.headline }}
         </h2>
         <richtext-partial
            v-if="block.text"
            class="text"
            :content="block.text.json"
            ref="cardGroupScrollText"
         />
         <div
            v-if="block.infoCardsCollection.items"
            ref="cardGroupScrollCards"
            :class="[
               `info-card-wrapper`,
               `cards-align-${cardAlign}`,
               `cards-style-${cardStyle}`,
               `cards-count-${cardCount}`,
            ]"
         >
            <info-card-partial
               v-for="(card, i) in block.infoCardsCollection.items"
               :key="`info-card-${i}`"
               :card="card"
            />
         </div>
      </div>
   </section>
</template>

<script>
import ScrollOut from 'scroll-out'
import InfoCardPartial from './partials/info-card-partial.vue'
import RichtextPartial from './partials/richtext-partial.vue'
export default {
   name: 'cardGroupBlock',
   props: {
      block: Object,
   },
   components: {
      InfoCardPartial,
      RichtextPartial,
   },
   data() {
      return {
         style: this.block.style.toLowerCase(),
         cardAlign: this.block.infoCardAlignment.toLowerCase(),
         cardStyle: this.stacked
            ? 'dark'
            : this.block.infoCardStyle.toLowerCase(),
         cardCount: this.block.infoCardsCollection.items.length,
         stacked: false,
         stackedBottom: false,
      }
   },
   mounted() {
      // STACKED
      const nextBlock = this.$el.nextElementSibling
      const prevBlock = this.$el.previousElementSibling
      // check next block
      if (nextBlock.classList.contains('card-group-block')) {
         this.stacked = true
         this.so = ScrollOut({
            targets: '.card-group-block',
            cssProps: {
               intersectY: true,
            },
         })
      }
      // check previous block
      if (prevBlock.classList.contains('card-group-block')) {
         this.stackedBottom = true
      }
      // STAGGERED
      if (!this.stacked && this.cardAlign === 'offset') {
         this.so = ScrollOut({
            targets: '.cards-align-offset',
            threshold: 0.75,
            once: true,
         })
      }
   },
   destroyed() {
      this.so && this.so.teardown()
   },
}
</script>
