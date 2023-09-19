<template>
   <general-page :page="page" />
</template>

<script>
// import ScrollOut from 'scroll-out'
import generalPageQl from '~/graphql/generalPage.js'
import GeneralPage from '~/components/generalPage.vue'

export default {
   name: 'IndexPage',
   components: {
      GeneralPage,
   },
   head() {
      return {
         title: this.page?.seoMeta.title,
         meta: [
            {
               name: 'description',
               content: this.page?.seoMeta.description,
            },
            {
               name: 'og:title',
               content: this.page?.seoMeta.title,
            },
            {
               name: 'og:description',
               content: this.page?.seoMeta.description,
            },
            {
               name: 'og:image',
               content: this.page?.seoMeta.image?.url,
            },
            {
               name: 'og:url',
               content: this.$route.fullPath,
            },
            // twitter
            ...this.$helpers.getTwitterCard({
               title: this.page?.seoMeta.title,
               description: this.page?.seoMeta.description,
               image: this.page?.seoMeta.image?.url,
               url: this.$route.fullPath,
            }),
         ],
      }
   },
   data() {
      return {
         preview: null,
      }
   },
   mounted() {
      if (this.$route?.query.preview) {
         this.$fetch()
      }
      if (this.page?.btnOverride) {
         this.$root.$emit('btnOverride', this.page.btnOverride)
      }
   },
   // destroyed() {},
   computed: {
      page() {
         return this.preview != null
            ? this?.preview?.generalPagesCollection?.items[0]
            : this.entry
      },
   },

   async fetch() {
      try {
         if (this.$route?.query.preview) {
            this.preview = await this.$graphql.preview.request(generalPageQl, {
               slug: '/',
               preview: true,
            })
         }
      } catch (error) {
         this.$nuxt.error
      }
   },

   async asyncData({ $graphql, payload, params, error, route }) {
      if (payload) {
         return { entry: payload }
      } else {
         const page = await $graphql.default.request(generalPageQl, {
            slug: '/',
            preview: false,
         })
         // makes sure url has content otherwise pushes to 404
         return {
            entry: page.generalPagesCollection.items[0],
         }
      }
   },
}
</script>
