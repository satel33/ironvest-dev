<template>
   <div class="stat-card">
      <h6 v-if="card.eyebrow" class="stat-eyebrow">{{ card.eyebrow }}</h6>
      <h4 v-if="card.headline && isMarquee" class="stat-headline">
         {{ card.headline }}
      </h4>
      <h2 v-else-if="card.headline && !isMarquee" class="stat-headline">
         {{ card.headline }}
      </h2>
      <p v-if="card.text" class="stat-text">{{ card.text }}</p>
   </div>
</template>

<script>
export default {
   name: 'StatCardPartial',
   props: {
      card: Object,
      isMarquee: Boolean
   }
}
</script>