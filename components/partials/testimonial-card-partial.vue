<template>
   <div class="testimonial-card">
      <star-rating v-if="card.rating" :rating="card.rating"/>
      <p class="quote">{{ card.quote }}</p>
      <div v-if="card.name || card.title" class="attribute">
         <p v-if="card.name" class="name">{{ card.name }}</p>
         <p v-if="card.title" class="title">{{ card.title }}</p>
      </div>
   </div>
</template>

<script>
import starRating from './star-rating.vue'
export default {
   name: 'TestimonialCardPartial',
   components: { starRating },
   props: {
      card: Object
   }
}
</script>