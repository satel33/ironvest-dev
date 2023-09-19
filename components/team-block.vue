<template>
   <section class="team-block">
      <p v-if="block.eyebrow" class="eyebrow">{{ block.eyebrow }}</p>
      <h2 v-if="block.headline" class="headline">{{ block.headline }}</h2>
      <div v-if="block.teamCollection.items.length" class="team-wrapper">
         <div
            class="team-member"
            v-for="card in block.teamCollection.items"
            :key="`team-member-${card.name}`"
         >
            <figure v-if="card.media" class="member-media">
               <img
                  :id="`team-member-${card.title}`"
                  :data-loading="$helpers.loader(card.media.url)"
                  :alt="card.media.title"
                  :data-srcset="$helpers.srcset(card.media.url)"
                  v-lazy
               />
            </figure>
            <div class="info">
               <h4 class="member-name">{{ card.name }}</h4>
               <p class="member-title">{{ card.title }}</p>
               <div v-if="card.linkedIn || card.twitter" class="member-socials">
                  <a
                     v-if="card.linkedIn"
                     :href="card.linkedIn"
                     target="_blank"
                     rel="noreferrer"
                     class="member-linkedin"
                  >
                     <social-linkedin />
                  </a>
                  <a
                     v-if="card.twitter"
                     :href="card.twitter"
                     target="_blank"
                     rel="noreferrer"
                     class="member-twitter"
                  >
                     <social-twitter />
                  </a>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import SocialLinkedin from './svgs/social-linkedin.vue'
import SocialTwitter from './svgs/social-twitter.vue'
export default {
   name: 'TeamBlock',
   props: {
      block: Object,
   },
   components: {
      SocialLinkedin,
      SocialTwitter,
   },
}
</script>
