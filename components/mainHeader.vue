<template>
   <header
      v-if="nav"
      id="header"
      ref="header"
      :class="[
         {
            'menu-light': menuLight,
            scrolling: scrolling,
            'scrolling-down': scrollingDown,
         },
      ]"
   >
      <div class="navigation" role="navigation" v-if="$mq == 'desktop'">
         <div class="logo">
            <a href="/" aria-label="Ironvest Logo">
               <logo v-if="!menuLight" />
               <logo-white v-else />
            </a>
         </div>

         <nav class="center-nav" v-show="!hideCenterNav">
            <nav-partial
               :nav="nav.centerNav.navItems.items"
               :main="true"
               key="left"
            />
         </nav>
         <nav class="right-nav">
            <nav-partial :nav="nav.rightNav.navItems.items" key="right" />
         </nav>
      </div>

      <div v-else class="mobile-navigation" role="navigation">
         <div class="logo">
            <a v-if="mmOpen || menuLight" herf="/" @click="closeMenu">
               <logo-white />
            </a>
            <a href="/" v-else>
               <logo />
            </a>
         </div>
         <div class="mm-btn" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
         </div>
         <div class="mobile-nav-overlay">
            <nav class="mobile-main"  v-show="!hideCenterNav">
               <nav-partial
                  :nav="nav.centerNav.navItems.items"
                  :main="true"
                  @handle-mm="toggleMenu"
                  key="mobile"
               />
            </nav>
            <nav class="mobile-bottom">
               <nav-partial
                  :nav="nav.rightNav.navItems.items"
                  @handle-mm="toggleMenu"
                  key="mobile-btn"
               />
            </nav>
         </div>
      </div>
   </header>
</template>

<script>
import mainNavigation from '~/graphql/mainNavigation.js'
import NavPartial from './partials/nav-partial.vue'
import logo from '~/assets/images/logo.svg?inline'
import logoWhite from '~/assets/images/logo-white.svg?inline'
export default {
   name: 'MainHeader',
   components: { logo, NavPartial, logoWhite },
   data() {
      return {
         nav: [],
         mmOpen: false,
         menuLight: false,
         scrolling: false,
         lastScrollY: 0,
         scrollingDown: false,
         hideCenterNav: false,
      }
   },
   watch: {
      scrollingDown(val) {
         if (val) {
            document.body.classList.add('page-scrolling-down')
         } else {
            document.body.classList.remove('page-scrolling-down')
         }
      },
   },
   methods: {
      closeMenu() {
         this.mmOpen = false
         document.body.classList.remove('menu-open')
      },
      toggleMenu() {
         if (this.mmOpen) {
            document.body.classList.remove('menu-open')
         } else {
            document.body.classList.add('menu-open')
         }
         this.mmOpen = !this.mmOpen
      },
      updateColor(color) {
         // || !color
         if (color === 'navy' || this.$route.name == '404') {
            this.menuLight = true
         } else {
            this.menuLight = false
         }
      },

      handleScroll(ev) {
         if (window.pageYOffset > this.$refs.header.offsetHeight) {
            this.scrolling = true
            this.scrollingDown = this.lastScrollY < window.pageYOffset
            this.lastScrollY = window.pageYOffset
         } else {
            this.scrolling = false
         }
      },
   },
   mounted() {
      this.updateColor()
      this.$nuxt.$on('header-color', this.updateColor)
      window.addEventListener('scroll', this.handleScroll, { passive: true })
   },
   created() {
      this.$nuxt.$on('hideCenterNav', val => {
         this.hideCenterNav = val
      })
   },
   destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
   },

   async fetch() {
      // This could also be an action dispatch

      this.nav = await this.$graphql.default.request(mainNavigation)
   },
   fetchOnServer: true,
}
</script>
