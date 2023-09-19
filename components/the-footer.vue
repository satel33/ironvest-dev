<template>
   <footer id="footer" v-if="footer">
      <cta-bar v-if="sock" :block="sock" classes="sock" />
      <div class="main-footer">
         <div class="left">
            <nuxt-link to="/" class="logo-home-link" aria-label="Ironvest Logo">
               <logo-w-text />
            </nuxt-link>
         </div>
         <div class="social-links mobile" v-if="$mq !== 'desktop'">
            <a
               href="http://linkedin.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <social-linkedin />
            </a>
            <a
               href="http://twitter.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <social-twitter />
            </a>
         </div>
         <div class="right">
            <nav-partial :nav="footer.footerNav.navItems.items" />
         </div>
      </div>
      <div class="bottom-footer">
         <div class="left">
            <form action="" id="newsletter" @submit.prevent="addCustomer">
               <div class="input-group">
                  <label for="email" class="h6"
                     >Interested in updates and releases?</label
                  >
                  <input
                     type="email"
                     name="email"
                     v-model="email"
                     id="email"
                     placeholder="Join our newsletter"
                     required
                  />
                  <button type="submit" form="newsletter" aria-label="Submit">
                     <cta-arrow-tip />
                  </button>
               </div>
               <p v-if="this.message" class="p-s">{{ this.message }}</p>
            </form>
         </div>
         <div class="right social-links" v-if="$mq === 'desktop'">
            <a
               href="https://www.linkedin.com/company/ironvest-hq/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="LinkedIn Outline"
               ><social-linkedin
            /></a>
            <a
               href="https://twitter.com/IronVestHQ"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Twitter Outline"
               ><social-twitter
            /></a>
         </div>
      </div>

      <div class="legal">
         <div class="left" v-if="footer?.legal?.navItems?.items.length">
            <a
               v-for="(item, index) in footer.legal.navItems.items"
               :key="index"
               :href="item.entry ? `/${item.entry.slug}` : item.url"
               :target="item.openInNewWindow && '_blank'"
               >{{ item.text }}</a
            >
            <!-- <a
               href="https://ironvest.com/legal/terms-of-service/"
               target="_blank"
               rel="noopener noreferrer"
               >Terms</a
            >
            <a
               href="https://ironvest.com/legal/privacy-policy/"
               target="_blank"
               rel="noopener noreferrer"
               >Privacy</a
            >
            <a
               href="https://ironvest.com/biometric-data-consent-form/"
               target="_blank"
               rel="noopener noreferrer"
               >Biometric Data Consent</a
            > -->
         </div>
         <div class="right">
            <small>© {{ year }} IronVest, Inc.</small>
         </div>
      </div>
   </footer>
</template>

<script>
import dayjs from 'dayjs'
import footerNavigation from '~/graphql/footerNavigation.js'
import NavPartial from './partials/nav-partial.vue'
import logoWText from '~/assets/images/logo-w-text.svg?inline'
import CtaBar from './partials/cta-bar.vue'
import SocialLinkedin from '~/assets/images/linkedin.svg?inline'
import SocialTwitter from '~/assets/images/twitter.svg?inline'
import CtaArrowTip from './svgs/cta-arrow-tip.vue'
const { TrackClient } = require('customerio-node')

export default {
   name: 'theFooter',
   components: {
      NavPartial,
      logoWText,
      CtaBar,
      SocialTwitter,
      SocialLinkedin,
      CtaArrowTip,
   },
   data() {
      return {
         footer: [],
         sock: null,
         year: dayjs().format('YYYY'),
         email: null,
         message: null,
      }
   },
   methods: {
      updateSock(sock) {
         this.sock = sock
      },
      addCustomerNew(form) {
         if (_cio) {
            _cio.identify({
               id: this.email,
               email: this.email,
            })
         }
      },
      async addCustomer(form) {
         this.$axios.defaults.headers.common['Authorization'] =
            'Basic ' +
            btoa(
               `${process.env.CUSTOMERIO_SITE_ID}:${process.env.CUSTOMERIO_API_KEY}`
            )

         const res = await this.$axios.put(
            `https://track.customer.io/api/v1/customers/${this.email}`,
            { email: this.email, created_at: dayjs().unix() }
         )

         if (res.status == 200) {
            this.email = null
            this.message = 'Success! Thanks for signing up.'
         } else {
            this.message =
               'Something seems to have gone wrong, Please try again.'
         }
         setTimeout(() => {
            this.message = null
         }, 5000)
      },
   },

   beforeMount() {
      this.$nuxt.$on('sock', this.updateSock)

      // bg color
      const lastEl = this.$el.previousElementSibling.lastElementChild
      const lastElStyles = window.getComputedStyle(lastEl)
      this.$el.style.backgroundColor = lastElStyles.backgroundColor
   },
   async fetch() {
      // This could also be an action dispatch

      this.footer = await this.$graphql.default.request(footerNavigation)
   },
}
</script>
