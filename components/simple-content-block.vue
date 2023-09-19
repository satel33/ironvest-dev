<template>
   <section class="simple-content-block">
       <header v-if="block.eyebrow || block.headline">
         <h6 v-if="block.eyebrow">{{ block.eyebrow }}</h6>
         <h2 v-if="block.headline">{{ block.headline }}</h2>
      </header>
      <content-item
         v-for="(item, index) in block.content.items"
         :key="`simple-content-${index}`"
         :content="item"
         :contentType="contentType(item)"
         contentStyle="simple"
      />
   </section>
</template>

<script>
import contentItem from './partials/content-item.vue'
export default {
  components: { contentItem },
   props: {
      block: Object,
   },
   methods: {
      contentType(item) {
         if (item.type) {
            switch (item.type ) {
               case 'MediaContentItem':
                  return 'w-media' 
               case 'ContentItem':
                  return 'w-content'
            }
         } return false
      }
   }
}
</script>
