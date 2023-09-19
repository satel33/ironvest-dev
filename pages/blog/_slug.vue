<template>
   <section v-if="page" class="blog-post">
      <SearchBar :isBack="true" />

      <article class="article-detail">
         <h1 class="title">{{ page.title }}</h1>
         <p class="author">{{ page.author }}</p>
         <p class="date">
            {{ $helpers.formatDate(page.date) }}
         </p>
         <MediaPartial
            class="article-img"
            :media="$helpers.getMedia(page.media)"
         />

         <div class="article-middle">
            <ul class="blog-tags__list">
               <li
                  v-for="(tag, index) in page.tagsCollection.items"
                  :key="`tag-${index}`"
                  class="tag-name"
               >
                  # {{ tag.tagName }}
               </li>
            </ul>
            <div class="social-share">
               <p class="sharing-label">Share this article</p>
               <div class="social-icons">
                  <ShareNetwork
                     class="social-icon"
                     network="facebook"
                     :title="page.title"
                     url="https://news.vuejs.org/issues/180"
                  >
                     <facebookIcon />
                  </ShareNetwork>
                  <ShareNetwork
                     class="social-icon"
                     network="email"
                     :title="page.title"
                     url="https://news.vuejs.org/issues/180"
                  >
                     <mailIcon />
                  </ShareNetwork>

                  <ShareNetwork
                     class="social-icon"
                     network="linkedin"
                     :title="page.title"
                     url="https://news.vuejs.org/issues/180"
                  >
                     <linkedinIcon />
                  </ShareNetwork>

                  <ShareNetwork
                     class="social-icon"
                     network="twitter"
                     :title="page.title"
                     url="https://news.vuejs.org/issues/180"
                  >
                     <twitterIcon />
                  </ShareNetwork>
               </div>
            </div>
         </div>

         <RichtextPartial :content="page.content.json" class="text" />
      </article>
      <cta-bar :block="page.promotionalSection" classes="article-cta" />
   </section>
</template>

<script>
import blogPageQl from '~/graphql/blogPage.js'
import SearchBar from '~/components/partials/search-bar.vue'
import MediaPartial from '~/components/partials/media-partial.vue'
import RichtextPartial from '~/components/partials/richtext-partial.vue'
import CtaBar from '~/components/partials/cta-bar.vue'

import facebookIcon from '~/assets/images/share-facebook.svg?inline'
import mailIcon from '~/assets/images/share-mail.svg?inline'
import linkedinIcon from '~/assets/images/share-linkedin.svg?inline'
import twitterIcon from '~/assets/images/share-twitter.svg?inline'

export default {
   name: 'BlogPage',
   components: {
      SearchBar,
      CtaBar,
      MediaPartial,
      RichtextPartial,
      facebookIcon,
      mailIcon,
      linkedinIcon,
      twitterIcon,
   },
   head() {
      return {
         title: this.post?.seoMeta.title,
         meta: [
            {
               name: 'description',
               content: this.post?.seoMeta.description,
            },
            {
               name: 'og:title',
               content: this.post?.seoMeta.title,
            },
            {
               name: 'og:description',
               content: this.post?.seoMeta.description,
            },
            {
               name: 'og:image',
               content: this.post?.seoMeta.image?.url,
            },
            {
               name: 'og:url',
               content: this.$route.fullPath,
            },
            // twitter
            ...this.$helpers.getTwitterCard({
               title: this.post?.seoMeta.title,
               description: this.post?.seoMeta.description,
               image: this.post?.seoMeta.image?.url,
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
   },
   computed: {
      page() {
         return this.preview != null
            ? this?.preview?.blogPostCollection?.items[0]
            : this.post
      },
   },
   async fetch() {
      try {
         if (this.$route?.query.preview) {
            this.preview = await this.$graphql.preview.request(blogPageQl, {
               slug: this.$route.params.slug ?? '/',
               preview: true,
            })
            console.log(this.preview)
         }
      } catch (error) {
         this.$nuxt.error
      }
   },
   async asyncData({ $graphql, payload, params }) {
      if (payload) {
         return { post: payload }
      } else {
         const post = await $graphql.default.request(blogPageQl, {
            slug: params.slug,
            preview: false,
         })
         return {
            post: post.blogPostCollection.items[0],
         }
      }
   },
}
</script>
