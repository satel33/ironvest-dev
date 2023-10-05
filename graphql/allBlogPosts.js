import { gql } from 'nuxt-graphql-request'
import mediaChunk from './mediaChunk'

export default gql`
   query {
      blogPostCollection(order: date_DESC) {
         items {
            title
            slug
            ${mediaChunk}
            date
            description
            tagsCollection {
               items {
                  tagName
               }
            }
         }
      }
   }
`
