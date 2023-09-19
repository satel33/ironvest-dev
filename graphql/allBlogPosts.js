import { gql } from 'nuxt-graphql-request'
import mediaChunk from './mediaChunk'

export default gql`
   query {
      blogPostCollection {
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
