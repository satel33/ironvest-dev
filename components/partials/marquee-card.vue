<template>
   <div class="marquee-card" :class="classes">
      <media-partial :lazy="false" :media="$helpers.getMedia(card.icon)" />
      <h5 class="serif">{{card.text}}</h5>
   </div>
</template>

<script>
import MediaPartial from './media-partial.vue'
export default {
   components:{ MediaPartial },
   props: {
      card: Object,
      classes:String
   },
}
</script>
