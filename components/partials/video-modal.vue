<template>
   <div class="video-modal-bk">
      <div class="close-btn" @click="toggleVideoModal()"><closeIcon /></div>
      <div class="close-bk" @click="toggleVideoModal()"></div>
      <div class="modal">
         <div
            ref="videoModalPlyr"
            class="videoModalPlyr"
            :data-plyr-provider="videoProvider"
            :data-plyr-embed-id="videoId"
         ></div>
      </div>
   </div>
</template>

<script>
import closeIcon from '~/assets/images/close.svg?inline'
import Plyr from 'plyr'
export default {
   components: { closeIcon },

   data() {
      return {
         videoSrc: null,
         videoProvider: false,
         videoId: false,
         player: null,
      }
   },
   watch: {
      videoSrc(val) {
         this.getIdFromUrl(val)
      },
      videoId(val) {
         if (this.player) {
            this.player.destroy()
         }
         this.$nextTick(this.setupVideo)
      },
   },
   methods: {
      getIdFromUrl(url) {
         const youtube = url.match(
            'youtu(?:.be|be.com)/(?:.*v(?:/|=)|(?:.*/)?)([a-zA-Z0-9-_]+)'
         )
         const vimeo = url.match('vimeo.com/(?:.*#|.*/videos/)?([0-9]+)')

         this.videoProvider =
            vimeo && vimeo.length
               ? 'vimeo'
               : youtube && youtube.length
               ? 'youtube'
               : false

         this.videoId = this.videoProvider == 'vimeo' ? vimeo[1] : youtube[1]
      },
      toggleVideoModal() {
         this.$store.commit('toggleVideoModalActive', {
            active: false,
            src: null,
         })
      },

      setupVideo() {
         this.player = new Plyr(this.$refs.videoModalPlyr, {
            enabled: true,
            debug: false,
            controls: ['play', 'mute', 'volume', 'fullscreen', 'settings'],
            vimeo: {
               byline: false,
               hideControls: false,
               resetOnEnd: true,
               portrait: false,
               title: false,
               speed: true,
               transparent: false,
            },
            sources: [
               {
                  src: this.videoId,
                  provider: this.videoProvider,
               },
            ],
         })

         this.player.on('ready', () => {
            this.player.play()
         })
      },
   },
   mounted() {
      this.videoSrc = this.$store.getters['getVideoModalSrc']
   },
   destroyed() {
      this.player = null
   },
}
</script>
