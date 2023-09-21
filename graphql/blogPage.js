import compress from 'graphql-query-compress'
import { gql } from 'nuxt-graphql-request'
import mediaFrag from './mediaFrag'
import mediaChunk from './mediaChunk'
import ctaChunk from './ctaChunk'

export default compress(gql`
   query ($slug: String!, $preview: Boolean) {
      blogPostCollection(
         where: { slug: $slug }
         limit: 1
         preview: $preview
      ) {
         items {
            title
            slug
            ${mediaChunk}
            date
            author
            content {
               json
            }
            tagsCollection {
               items {
                  tagName
               }
            }
            promotionalSection {
               ... on PromotionalBlock {
                  header
                  subHeader
                  visual
                  ${ctaChunk}
               }
            }
            seoMeta {
               title
               description
               image {
                  ... on Asset {
                     ...mediaFrag
                  }
               }
            }
            sock: footerCtaBar {
               ... on CtaBar {
                  headline
                  ${ctaChunk}
               }
            }
         }
      }
   }
   ${mediaFrag}
`)
