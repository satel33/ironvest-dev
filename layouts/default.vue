<template>
   <div :data-page="path" :class="{ 'lock-scroll': videoModalActive }">
      <MainHeader />
      <LazyDevGrid />
      <Transition name="video-modal-t" mode="out-in">
         <VideoModal v-if="videoModalActive" />
      </Transition>
      <Nuxt />
      <TheFooter />
      <GdprAlert />
   </div>
</template>

<script>
import VideoModal from '../components/partials/video-modal.vue';
export default {
   components: { VideoModal },
   computed: {
      path() {

         if (this.$route.params.slug) {
            return this.$route.params.slug
         } else {
            return this.$route.name
         }
      },
      videoModalActive() {
         return this.$store.getters['getVideoModalActive']
      }
   },
   methods:{},
   mounted(){
      if(window._paq){
         window._paq.push(['HeatmapSessionRecording::enable']); 
      }

   }
}
</script>
