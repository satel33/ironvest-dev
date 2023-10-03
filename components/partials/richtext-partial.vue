<template>
   <div class="rich-text-wrapper" v-html="richTextToHtmlTest"></div>
</template>

<script>
import find from 'lodash.find'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

import cta from './cta.vue'

export default {
   name: 'RichtextPartial',
   components: { cta },
   props: ['content', 'links', 'assetUrl', 'assetWidth'],
   computed: {
      richTextToHtmlTest() {
         return documentToHtmlString(this.content, {
            renderNode: {
               [INLINES.HYPERLINK]: node => {
                  return `<a href="${node.data.uri}" target="_blank" rel="relreferrer">${node.content[0].value}</a>`
               },

               [BLOCKS.EMBEDDED_ASSET]: node => {
                  const assetId = node.data.target.sys.id
                  try {
                     const assetUrl = this.assetUrl[assetId]
                     return `<img src="${assetUrl}" alt="Asset" style="${
                        this.assetWidth[assetId] > 700
                           ? 'width: 100%'
                           : 'width: auto; margin-left:auto; margin-right:auto;'
                     }"/>`
                  } catch (error) {
                     console.error('Error fetching asset:', error)
                     return ''
                  }
               },

               [INLINES.ENTRY_HYPERLINK]: node => {
                  const slug = this.getSlug(node.data.target.sys.id)
                  return `<span class="text-link dark"><a href="${slug}">${node.content[0].value} <svg class="cta-arrow-tip" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 10.5L5.5 6L1 1.5" stroke="#07202D" stroke-width="2"stroke-linecap="round"/></svg></a></span>`
               },
            },
         })
      },
   },
   methods: {
      getSlug(entryId) {
         const match = find(this.links?.entries.hyperlink, {
            sys: { id: entryId },
         })
         return match?.slug
      },
   },
}
</script>

<style></style>
