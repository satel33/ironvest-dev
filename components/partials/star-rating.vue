<template>
   <div class="star-rating">
      <half-star v-if="num === 0.5" />
      <full-star v-if="num >= 1" />
      <half-star v-if="num === 1.5" />
      <full-star v-if="num >= 2" />
      <half-star v-if="num === 2.5" />
      <full-star v-if="num >= 3" />
      <half-star v-if="num === 3.5" />
      <full-star v-if="num >= 4" />
      <half-star v-if="num === 4.5" />
      <full-star v-if="num === 5" />
   </div>
</template>

<script>
import fullStar from '~/assets/images/rating-star-full.svg?inline'
import halfStar from '~/assets/images/rating-star-half.svg?inline'
export default {
   name: 'StarRating',
   components: { fullStar, halfStar },
   props: {
      rating: String
   },
   computed: {
      num() {
         return parseFloat(this.rating)
      }
   }
}
</script>