<template>
   <client-only>
      <div :class="['media-wrapper', classes]" v-if="media">
         <a v-if="url" :href="url" class="media-wrapper-link" target="_blank" />

         <img
            v-if="isImage && !lazy"
            :class="['obj-contain']"
            :data-ratio="ratio()"
            :alt="media.alt"
            :srcset="media.srcset"
         />
         <img
            v-else-if="isImage"
            :class="['obj-contain']"
            :data-ratio="ratio()"
            v-lazy="media.url"
            :data-loading="media.src"
            :alt="media.alt"
            :data-srcset="media.srcset"
         />
         <video
            v-else-if="isVideo"
            muted
            preload="auto"
            playsinline
            :autoplay="autoplay ? autoplay : true"
            :loop="loop ? loop : false"
            ref="videoRef"
         >
            <source
               v-if="secondVideoSrc && isSafari"
               :src="secondVideoSrc.videoSrc"
               :type="secondVideoSrc.contentType"
            />
            <source
               :src="media.videoSrc"
               :type="media.contentType"
            />
            <source
               v-if="secondVideoSrc && !isSafari"
               :src="secondVideoSrc.videoSrc"
               :type="secondVideoSrc.contentType"
            />
         </video>
      </div>
   </client-only>
</template>

<script>
export default {
   name: 'mediaSnippet',
   // props: ['media', 'url', 'classes', 'mobileMedia', 'autoplay', 'loop'],
   props: {
      lazy: {
         type: Boolean,
         default: true,
      },
      media: Object,
      url: String,
      classes: String,
      mobileMedia: Object,
      secondVideoSrc: Object,
      loop: Boolean,
      autoplay: Boolean,
   },

   computed: {
      isSafari() {
         if(!process.client){return false}
         return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      },
      isIOS() {
         if(!process.client){return false}
         return (
            [
               'iPad Simulator',
               'iPhone Simulator',
               'iPod Simulator',
               'iPad',
               'iPhone',
               'iPod',
            ].includes(navigator.platform) ||
            (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
         )
      },
      isImage() {
         return this.media.contentType.includes('image')
      },
      isVideo() {
         return this.media.contentType.includes('video')
      },
   },
   methods: {
      ratio() {
         if (this.media.ratio) {
            return this.media.ratio
         } else {
            return false
         }
      },
      videoEnded() {
         this.$emit('videoEnded', this.$refs.videoRef)
      }
   },
   mounted() {
      if (this.$refs.videoRef) {
         this.$refs.videoRef.addEventListener('ended', this.videoEnded)
      }
   },
   destroyed() {
      if (this.$refs.videoRef) {
         this.$refs.videoRef.removeEventListener('ended', this.videoEnded)
      }
   },
}
</script>
