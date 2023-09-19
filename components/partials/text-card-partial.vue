<template>
   <div class="text-card">
      <div v-if="card.headline || card.subheadline" class="text-col text-left">
         <h4 v-if="card.headline" class="text-card-headline">{{ card.headline }}</h4>
         <p v-if="card.subheadline" class="text-card-subheadline">{{ card.subheadline }}</p>
      </div>
      <div v-if="card.text" class="text-col text-right">
         <richtext-partial class="text-card-text" :content="card.text.json" />
      </div>
   </div>
</template>

<script>
import richtextPartial from './richtext-partial.vue'
export default {
   name: 'TextCard',
   props: {
      card: Object
   },
   components: { richtextPartial }
}
</script>