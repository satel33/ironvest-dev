<template>
   <section v-if="page" class="blog-post">
      <!-- <SearchBar :isBack="true" /> -->
      <div class="search-container">
         <a href="/blog" class="back-link">
            <prevArrowIcon /> Back to all blogs
         </a>
      </div>
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
                  @click="navigateToBlogWithTag(tag.tagName)"
                  class="tag-name"
               >
                  # {{ tag.tagName }}
               </li>
               <!-- <nuxt-link
                  v-for="(tag, index) in page.tagsCollection.items"
                  :key="`tag-${index}`"
                  :to="{
                     name: 'blog',
                     params: { slug: 'blog' },
                     query: { tag: tag.tagName },
                  }"
                  class="tag-name"
               >
                  # {{ tag.tagName }}
               </nuxt-link> -->
            </ul>
            <div class="social-share">
               <p class="sharing-label">Share this article</p>
               <div class="social-icons">
                  <ShareNetwork
                     class="social-icon"
                     network="facebook"
                     :title="page.title"
                     :url="shareUrl"
                  >
                     <facebookIcon />
                  </ShareNetwork>
                  <ShareNetwork
                     class="social-icon"
                     network="email"
                     :title="page.title"
                     :url="shareUrl"
                  >
                     <mailIcon />
                  </ShareNetwork>

                  <ShareNetwork
                     class="social-icon"
                     network="linkedin"
                     :title="page.title"
                     :url="shareUrl"
                  >
                     <linkedinIcon />
                  </ShareNetwork>

                  <ShareNetwork
                     class="social-icon"
                     network="twitter"
                     :title="page.title"
                     :url="shareUrl"
                  >
                     <twitterIcon />
                  </ShareNetwork>
               </div>
            </div>
         </div>

         <RichtextPartial
            :content="page.content.json"
            class="text"
            :assetUrl="pageAssetUrl"
            :assetWidth="pageAssetWidth"
         />
      </article>
      <PromotionalBlock
         :block="page.promotionalSection"
         classes="article-cta"
      />
   </section>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import blogPageQl from '~/graphql/blogPage.js'
import SearchBar from '~/components/partials/search-bar.vue'
import MediaPartial from '~/components/partials/media-partial.vue'
import RichtextPartial from '~/components/partials/richtext-partial.vue'
import CtaBar from '~/components/partials/cta-bar.vue'
import PromotionalBlock from '~/components/partials/promotional.vue'

import facebookIcon from '~/assets/images/share-facebook.svg?inline'
import mailIcon from '~/assets/images/share-mail.svg?inline'
import linkedinIcon from '~/assets/images/share-linkedin.svg?inline'
import twitterIcon from '~/assets/images/share-twitter.svg?inline'
import prevArrowIcon from '~/assets/images/prev-arrow.svg?inline'

import assetQl from '../../../graphql/assetQl'

export default {
   name: 'BlogPage',
   components: {
      SearchBar,
      CtaBar,
      PromotionalBlock,
      MediaPartial,
      RichtextPartial,
      facebookIcon,
      mailIcon,
      linkedinIcon,
      twitterIcon,
      prevArrowIcon,
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
         shareUrl: '',
         assetUrl: {},
         assetWidth: {},
      }
   },
   methods: {
      navigateToBlogWithTag(tag) {
         this.$router.push({ path: '/blog', query: { tag: tag } })
      },
   },
   mounted() {
      this.$root.$emit('sock', this.page.sock ?? null)

      this.shareUrl = window.location.href
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
      pageAssetUrl() {
         return this.assetUrl
      },
      pageAssetWidth() {
         return this.assetWidth
      },
   },
   async fetch() {
      try {
         if (this.$route?.query.preview) {
            this.preview = await this.$graphql.preview.request(blogPageQl, {
               slug: this.$route.params.slug ?? '/',
               preview: true,
            })
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
         let assetUrl = {}
         let assetWidth = {}
         if (post?.blogPostCollection?.items[0]?.content?.json) {
            const content = post?.blogPostCollection?.items[0]?.content?.json

            const assetIds = []
            documentToHtmlString(content, {
               renderNode: {
                  [BLOCKS.EMBEDDED_ASSET]: node => {
                     const assetId = node.data.target.sys.id
                     assetIds.push(assetId)
                  },
               },
            })

            const promises = assetIds.map(async assetId => {
               const response = await $graphql.default.request(assetQl, {
                  id: assetId,
               })
               return response?.asset
            })
            assetUrl = await Promise.all(promises).then(res => {
               const data = {}
               res.map((asset, idx) => (data[assetIds[idx]] = asset.url))
               return data
            })
            assetWidth = await Promise.all(promises).then(res => {
               const data = {}
               res.map((asset, idx) => (data[assetIds[idx]] = asset.width))
               return data
            })
         }

         return {
            post: post.blogPostCollection.items[0],
            assetUrl,
            assetWidth,
         }
      }
   },
}
</script>
