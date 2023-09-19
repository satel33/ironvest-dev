<template>
   <div class="content-item" :class="[contentStyle, contentType]" data-scroll>
       <template v-if="contentType === 'w-media'">
         <media-partial
            :media="$helpers.getMedia(content.media)"
            :lazy="true"
         />
      </template>
      <template v-else>
         <media-partial
            :media="$helpers.getMedia(content.mediaNew.items[0])"
            :secondVideoSrc="$helpers.getMedia(content.mediaNew.items[1])"
            :lazy="true"
         />
         <div class="text">
            <h6 v-if="index && showNumber" class="number">0{{ index }}</h6>
            <richtext-partial
               v-if="content.richtext"
               :content="content.richtext.json"
               :links="content.richtext.links"
            />
         </div>
      </template>
     
   </div>
</template>

<script>
import MediaPartial from './media-partial.vue'
import RichtextPartial from './richtext-partial.vue'
export default {
   name: 'contentItem',
   components: {
      MediaPartial,
      RichtextPartial,
   },
   props: {
      content: Object,
      contentStyle: {
         type: String,
         default: 'w-content',
      },
      contentType: String,
      index: Number,
      showNumber: Boolean,
   },
}
</script>
