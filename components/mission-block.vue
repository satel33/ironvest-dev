<template>
   <section class="mission-block">
      <div class="text">
         <h6>{{block.eyebrow}}</h6>
         <richtext-partial :content="block.text.json" />
      </div>
      <div class="actions">
         <cta v-for="cta in block.ctas.items" :cta="cta" :key="cta.id"/>
      </div>
   </section>
</template>

<script>
import Cta from './partials/cta.vue'
import RichtextPartial from './partials/richtext-partial.vue'

export default {
   components: { RichtextPartial, Cta },
   props: {
      block: Object,
   },
}
</script>
