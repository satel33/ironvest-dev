<template>
   <section :class="[`career-block`, `bg-${block.backgroundColor.toLowerCase()}`]">
      <media-partial
         class="media"
         v-if="block.media"
         :media="$helpers.getMedia(block.media)"
      />
      <div class="text">
         <richtext-partial :content="block.text.json" class="blurb" />
         <div v-if="block.jobPosts.items" class="openings" >
            <a v-for="(post, i) in block.jobPosts.items"
               class="opening" 
               :href="post.url"
               target="_blank"
               rel="noopener noreferrer"
               :key="`post-${i}`"
            >
               {{ post.title }}
               <h6>{{ post.location }}</h6>
            </a>                
         </div>
         <cta v-if="block.cta" :cta="block.cta" :arrow="true" :dark="block.backgroundColor.toLowerCase() === 'dark'" />
      </div>
   </section>
</template>

<script>
import Cta from './partials/cta.vue'
import MediaPartial from './partials/media-partial.vue'
import RichtextPartial from './partials/richtext-partial.vue'
export default {
   name: 'CareerBlock',
   props: {
      block: Object,
   },
   components: {
      MediaPartial,
      RichtextPartial,
      Cta,
   },
}
</script>
