<template>
   <div class="list-item" :class="classes">
      <h6 v-if="featuresListGrid && !item.media">{{ featuresListGridNumFormatted }}</h6>
      <media-partial class="list-item-icon" v-if="item.media" :lazy="false" :media="$helpers.getMedia(item.media)" />
      <div class="list-item-text" >
         <h4 v-if="featuresListGrid && item.internalTitle">{{ item.internalTitle }}</h4>
         <h4 v-else-if="item.headline">{{item.headline}}</h4>
         <richtext-partial v-if="item.text" :content="item.text.json" />
      </div>
   </div>
</template>

<script>
import MediaPartial from './media-partial.vue'
import RichtextPartial from './richtext-partial.vue'
export default {
   name: 'ListItemPartial',
   props: {
      item: Object,
      classes: String,
      featuresListGrid: {
         type: Boolean,
         default: false
      },
      featuresListGridNum: Number
   },
   components: {
      MediaPartial,
      RichtextPartial
   },
   computed: {
      featuresListGridNumFormatted() {
         if (this.featuresListGridNum > 9) {
            return this.featuresListGridNum
         } else {
            return `0${this.featuresListGridNum}`
         }
      }
   }
}
</script>