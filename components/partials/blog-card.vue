<template>
   <div class="blog-card" :class="[`count-${count}`]">
      <a :href="post.url" target="_blank" rel="noopener noreferrer">
         <media-partial
            v-if="post.media"
            class="media"
            :media="$helpers.getMedia(post.media)"
         />

         <h6>{{ postMeta }}</h6>
         <p>{{ post.headline }}</p>
      </a>
      <cta :arrow="true" :cta="readMore" :dark="true" />
   </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Cta from './cta.vue'
import MediaPartial from './media-partial.vue'
dayjs.extend(relativeTime)
export default {
   name: 'blogCard',
   components: {
      MediaPartial,
      Cta,
   },
   props: {
      post: Object,
      count: Number,
   },
   computed:{
      postMeta() {
         if (this.post.dated) {
            return `${this.post.source} • ${dayjs(this.post.dated).format('D MMM, YYYY')}`
         } else {
            return `${this.post.source}`
         }
      }
   },
   data() {
      return {
         readMore: {
            customUrl: this.post.url,
            text: 'Read More',
            style: 'Text Link',
            target:'_blank'
         },
      }
   },
}
</script>
