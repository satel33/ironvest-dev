<template>
   <section class="blog-container">
      <h1 class="heading" v-if="block.internalTitle">
         {{ block.internalTitle }}
      </h1>

      <!-- <SearchBar /> -->
      <div class="blog-tags">
         <p class="blog-tags__label">Sort by</p>
         <ul class="blog-tags__list">
            <li
               class="tag-name"
               :class="{ active: currentTag === -1 }"
               @click="setAllTag"
            >
               All tags
            </li>
            <li
               v-if="tags.blogTagCollection?.items"
               v-for="(tag, index) in tags.blogTagCollection?.items"
               :key="`tag-${index}`"
               class="tag-name"
               :class="{ active: currentTag === index }"
               @click="handleTagClick(index)"
            >
               # {{ tag.tagName }}
            </li>
         </ul>
      </div>

      <div class="blog-list" v-if="filteredPosts">
         <a
            v-for="(article, index) in filteredPosts.slice(0, postShow)"
            :key="`post-${index}`"
            :href="`/blog/${article.slug}`"
         >
            <article class="article">
               <MediaPartial
                  class="article-img"
                  :media="$helpers.getMedia(article.media)"
               />
               <div class="article-inner">
                  <p class="article-date">
                     {{ $helpers.formatDate(article.date) }}
                  </p>
                  <p class="article-title">{{ article.title }}</p>
                  <p class="article-brief">{{ article.description }}</p>
                  <ul
                     class="blog-tags__list"
                     v-if="article.tagsCollection?.items"
                  >
                     <li
                        v-for="(tag, index) in article.tagsCollection?.items"
                        :key="`tag-${index}`"
                        class="tag-name"
                     >
                        # {{ tag.tagName }}
                     </li>
                  </ul>
               </div>
            </article>
         </a>
      </div>

      <button
         v-if="postShow < filteredPosts.length"
         class="btn style-primary btn-loadmore"
         @click="loadMorePosts"
      >
         Load More
      </button>
   </section>
</template>

<script>
import MediaPartial from './partials/media-partial.vue'
import SearchBar from './partials/search-bar.vue'
import allBlogPosts from '~/graphql/allBlogPosts.js'
import allBlogTags from '~/graphql/allBlogTags.js'

export default {
   name: 'blogListBlock',
   components: { MediaPartial, SearchBar },
   data() {
      return {
         posts: {},
         filteredPosts: {},
         tags: {},
         currentTag: -1,
         postShow: 6,
      }
   },
   props: {
      block: Object,
   },
   mounted() {
      const currentTagName = this.$route.query?.tag
      const tagIdx = this.tags.blogTagCollection.items.findIndex(
         tag => tag.tagName == currentTagName
      )

      if (tagIdx > -1) {
         this.handleTagClick(tagIdx)
      }
   },
   methods: {
      setAllTag() {
         this.currentTag = -1
         this.filteredPosts = this.posts.blogPostCollection.items
      },
      handleTagClick(index) {
         this.currentTag = index

         const allPosts = this.posts.blogPostCollection.items
         const currentTagName =
            this.tags.blogTagCollection.items[this.currentTag].tagName

         this.filteredPosts = allPosts.filter(item =>
            item.tagsCollection.items.find(
               tagItem => tagItem.tagName === currentTagName
            )
         )
      },
      loadMorePosts() {
         const postsLength = this.posts.blogPostCollection.items.length
         if (this.postShow >= postsLength) {
            return
         } else {
            this.postShow = this.postShow + 4
         }
      },
   },
   async fetch() {
      this.posts = await this.$graphql.default.request(allBlogPosts)
      this.filteredPosts = this.posts.blogPostCollection.items

      this.tags = await this.$graphql.default.request(allBlogTags)
   },
   fetchOnServer: true,
}
</script>
