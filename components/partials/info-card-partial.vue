<template>
   <div :class="[`info-card`, `card-align-${align}`]">
      <figure v-if="card.icon" class="card-icon">
         <img
            :src="card.icon.url"
            :alt="card.icon.title"
         />
      </figure>
      <p v-if="card.eyebrow && alignCenter" class="card-eyebrow">{{ card.eyebrow }}</p>
      <h4 v-if="card.headline" class="card-headline">{{ card.headline }}</h4>
      <p v-if="card.text && !alignCenter" class="card-text">{{ card.text }}</p>
   </div>
</template>

<script>
export default {
   name: 'InfoCardPartial',
   props: {
      card: Object
   },
   data() {
      return {
         align: this.card.align.toLowerCase()
      }
   },
   computed: {
      alignCenter() {
         if (this.align === 'center') { return true } else { return false }
      }
   }
}
</script>