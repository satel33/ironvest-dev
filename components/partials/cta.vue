<template>
   <!-- <client-only> -->
   <!-- text -->
   <div
      v-if="textLink"
      :class="[`cta`, `text-link`, dark && 'dark', disabled && 'disabled']"
      :key="rebuildCTATextCounter"
   >
      <a
         v-if="cta.extActive && extLinksFound"
         :href="extLink"
         :target="cta.target ? '_blank' : '_self'"
         rel="noreferrer"
         >{{ cta.text }}<cta-arrow-tip
      /></a>
      <a v-else-if="cta.entry" :href="`/${cta.entry.slug}`"
         >{{ cta.text }}<cta-arrow-tip
      /></a>
      <a
         v-else-if="cta.customUrl"
         :href="cta.customUrl"
         :target="cta.target ? '_blank' : '_self'"
         rel="noreferrer"
         :aria-label="aria"
         >{{ cta.text }}<cta-arrow-tip
      /></a>
      <span v-else-if="disabled">{{ cta.text }}<cta-arrow-tip /></span>
   </div>
   <!-- btn -->
   <button
      v-else
      :class="[
         `cta`,
         `btn`,
         `style-${btnStyle}`,
         dark && 'dark',
         arrow && 'w-arrow',
         mini && 'mini',
         disabled && 'disabled',
      ]"
      :key="rebuildCTABtnCounter"
   >
      <a
         v-if="cta.extActive && extLinksFound"
         :href="extLink"
         :target="cta.target ? '_blank' : '_self'"
         rel="noreferrer"
         >{{ cta.text }}<cta-arrow-tip v-if="arrow"
      /></a>
      <a v-else-if="cta.entry" :href="`/${cta.entry.slug}`"
         >{{ cta.text }}<cta-arrow-tip v-if="arrow"
      /></a>
      <a
         v-else-if="cta.customUrl"
         :href="cta.customUrl"
         :target="cta.target ? '_blank' : '_self'"
         rel="noreferrer"
         >{{ cta.text }}<cta-arrow-tip v-if="arrow"
      /></a>
      <span v-else-if="disabled"
         >{{ cta.text }}<cta-arrow-tip v-if="arrow"
      /></span>
   </button>
   <!-- </client-only> -->
</template>

<script>
import _debounce from 'lodash.debounce'
import extensionStores from '~/assets/json/extensionUrls.json'
import CtaArrowTip from '../svgs/cta-arrow-tip.vue'
export default {
   name: 'cta',
   props: {
      cta: Object,
      dark: Boolean,
      arrow: Boolean,
      mini: Boolean,
      aria: {
         type: String,
         default: '',
      },
   },
   components: {
      CtaArrowTip,
   },
   data() {
      return {
         isMobile: false,
         checkIsMobile: _debounce(() => {
            ++this.rebuildCTATextCounter
            ++this.rebuildCTABtnCounter
            this.isMobile =
               this.$mq === 'mobile' || this.$mq === 'tablet' ? true : false
         }, 100),
         rebuildCTATextCounter: 0,
         rebuildCTABtnCounter: 0,
      }
   },
   computed: {
      textLink() {
         if (this.cta.style.toLowerCase().includes('text')) {
            return true
         }
      },
      btnStyle() {
         if (this.cta.style.toLowerCase().includes('primary')) {
            return 'primary'
         } else if (this.cta.style.toLowerCase().includes('secondary')) {
            return 'secondary'
         }
      },
      disabled() {
         if (!this.cta.customUrl && !this.cta.entry && !this.cta.extActive) {
            return true
         }
      },
      extLinksFound() {
         if (!this.isMobile) {
            return (
               extensionStores.chrome ||
               extensionStores.firefox ||
               extensionStores.safari ||
               extensionStores.edge
            )
         } else {
            return false
         }
      },
      extLink() {
         if (process.client) {
            let href = null
            const browser = this.$helpers.getBrowser()
            href = extensionStores[browser]
            if (!href) {
               if (this.cta?.customUrl) {
                  href = this.cta.customUrl
               } else if (this.cta?.entry?.slug) {
                  href = `/${this.cta.entry.slug}`
               }
            }
            return href
         }
      },
   },
   mounted() {
      this.checkIsMobile()
      window.addEventListener('resize', this.checkIsMobile)
   },
   destroyed() {
      window.removeEventListener('resize', this.checkIsMobile)
   },
}
</script>
