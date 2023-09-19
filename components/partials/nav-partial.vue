<template>
   <ul :key="rebuildNavPartialCounter">
      <li
         v-for="(link, index) in nav"
         :key="`link-${index}-${link.text}`"
         :class="{
            'secondary-button': link.button,
            'has-children': link.staticText,
            'is-active': isActive(link),
         }"
      >
         <!-- if ext link -->
         <a
            v-if="link?.extActive && extLinksFound()"
            :ref="!main && link.button && 'replaceMe'"
            :href="getExtLink(link)"
            :target="link.openInNewWindow ? '_blank' : '_self'"
            rel="noreferrer"
            @click="handleMm"
            >{{ link.text }}</a
         >
         <!-- if custom URL -->
         <a
            v-else-if="link?.url"
            :ref="!main && link.button && 'replaceMe'"
            :href="link.url"
            :target="link.openInNewWindow ? '_blank' : '_self'"
            rel="noreferrer"
            @click="handleMm"
            >{{ link.text }}</a
         >
         <!-- If entry URL -->
         <a
            v-else-if="link?.entry"
            :href="`/${link.entry.slug}`"
            :target="link.openInNewWindow && '_blank'"
            rel="noreferrer"
            @click="handleMm"
            >{{ link.text }}</a
         >
         <span v-else-if="link.staticText" @click="toggleItem">{{
            link.staticText
         }}</span>

         <ul class="sub-menu" v-if="link.staticText">
            <li
               v-for="child in link.subNavItems.items"
               :class="{ 'secondary-button': child.button }"
               :key="child.id"
            >
               <!-- if custom URL -->
               <a v-if="child.url" :href="child.url" @click="handleSubItem">{{
                  child.text
               }}</a>
               <!-- If entry URL -->
               <a
                  v-else-if="child.entry"
                  :href="`/${child.entry.slug}`"
                  @click="handleSubItem"
                  >{{ child.text }}</a
               >
            </li>
         </ul>
      </li>
   </ul>
</template>

<script>
import _debounce from 'lodash.debounce'
import extensionStores from '~/assets/json/extensionUrls.json'
export default {
   name: 'NavPartial',
   props: {
      nav: Array,
      main: Boolean,
   },
   data() {
      return {
         btnOverride: null,
         isMobile: false,
         checkIsMobile: _debounce(() => {
            ++this.rebuildNavPartialCounter
            this.isMobile =
               this.$mq === 'mobile' || this.$mq === 'tablet' ? true : false
         }, 100),
         rebuildNavPartialCounter: 0,
      }
   },
   methods: {
      isActive(link) {
         if (this.main && link.entry) {
            // for nuxt links
            if (link.entry.slug === this.$route.params.slug) {
               return true
            } else {
               return false
            }
         } else if (this.main && link.subNavItems) {
            // for submenu headers
            let found = false
            link.subNavItems.items.forEach(sub => {
               if (sub.entry.slug === this.$route.params.slug) {
                  found = true
               }
            })
            return found
         }
      },
      getExtLink(link) {
         let href = null
         if (process.client) {
            const browser = this.$helpers.getBrowser()
            href = extensionStores[browser]
         }
         return href ? href : link.url ? link.url : `/${link.entry.slug}`
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
      toggleItem(event) {
         if (this.$mq !== 'desktop') {
            const parent = event.target.closest('.has-children')
            parent.classList.contains('open')
               ? parent.classList.remove('open')
               : parent.classList.add('open')
         }
      },
      handleMm() {
         if (this.$mq !== 'desktop') {
            this.$emit('handle-mm')
         }
      },
      handleSubItem(event) {
         this.handleMm()
         this.toggleItem(event)
      },
      handleOverride(btn) {
         this.btnOverride = btn
         this.nav.forEach(item => {
            if (item.button && this.btnOverride && !this.main) {
               item.url = this.btnOverride.customUrl
               item.text = this.btnOverride.text
            }
         })
      },
   },
   created() {
      this.$nuxt.$on('btnOverride', this.handleOverride)
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
