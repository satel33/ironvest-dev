<template>
   <div class="rich-text-wrapper" v-html="richTextToHtml(content)" />
</template>

<script>
import find  from 'lodash.find'
// import assetQl from '../../graphql/assetQl'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import cta from './cta.vue'
export default {
   name: 'RichtextPartial',
   components: { cta },
   props: ['content', 'links'],
   methods: {
      richTextToHtml(content) {
         return documentToHtmlString(content, {
            renderNode: {
               [INLINES.HYPERLINK]: node => {
                  return `<a href="${node.data.uri}" target="_blank" rel="relreferrer">${node.content[0].value}</a>`
               },
               // [BLOCKS.EMBEDDED_ASSET]: node => {
               //    return `<figure><img  ref="${node.data.target.sys.id}" /></figure>`
               // },

               [INLINES.ENTRY_HYPERLINK]: node => {
                  const slug = this.getSlug(node.data.target.sys.id)
                  return `<span class="text-link dark"><a href="${slug}">${node.content[0].value} <svg class="cta-arrow-tip" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 10.5L5.5 6L1 1.5" stroke="#07202D" stroke-width="2"stroke-linecap="round"/></svg></a></span>`
               },
            },
         })
      },
      getSlug(entryId) {

         const match = find(this.links?.entries.hyperlink, {
            sys: { id: entryId },
         })
         return match?.slug
      },
     
      // async getAsset(assetId) {
      //    const image = await this.$graphql.default.request(assetQl, {id:assetId})
      //    return image?.asset
      // },
   },
}
</script>

<style></style>
