<template>
   <section :class="[`features-list-block`, `layout-${layout}`, `style-${style}` ]">
      <div class="content">
         <media-partial class="media" v-if="block.media && layout === 'centered'" :lazy="false" :media="$helpers.getMedia(block.media)" />
         <richtext-partial v-if="block.text" class="text" :content="block.text.json" />
         <cta v-if="showSplitCta" :cta="block.cta" :arrow="true" :mini="false" :dark="false" />
      </div>
      <div :class="['list', `count-${listItems.length}`]" v-if="listItems">
         <list-item-partial v-for="(item,i) in listItems" :key="`list-item-$${i}`" :item="item" :featuresListGrid="layout === 'grid'" :featuresListGridNum="i + 1" />
      </div>
      <cta v-if="showCenteredCta" :cta="block.cta" :arrow="true" :mini="false" :dark="darkCta" />
   </section>
</template>

<script>
import cta from './partials/cta.vue'
import ListItemPartial from './partials/list-item-partial.vue'
import MediaPartial from './partials/media-partial.vue'
import RichtextPartial from './partials/richtext-partial.vue'
export default {
   name: "FeaturesListBlock",
   props: {
      block: Object
   },
   components: {
      MediaPartial,
      RichtextPartial,
      cta,
      ListItemPartial
   },
   data() {
      return {
         layout: this.block.layout.toLowerCase(),
         style: this.block.style.toLowerCase(),
         listItems: this.block.listItemsCollection.items,
      }
   },
   computed: {
      darkCta() {
         if (this.style === 'dark') {
            return true
         } else {
            return false
         }
      },
      showSplitCta() {
         if (this.block.cta && this.layout === 'split' && this.$mq === 'desktop') {
            return true
         } else {
            return false
         }
      },
      showCenteredCta() {
         if (this.block.cta) {
            if (this.layout === 'centered') {
               return true
            } else if (this.layout === 'split' && this.$mq === 'mobile') {
               return true
            } else {
               return false
            }
         } else {
            return false
         }
      }
   }
}
</script>