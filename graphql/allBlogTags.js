import { gql } from 'nuxt-graphql-request'

export default gql`
   query {
      blogTagCollection {
         items {
            tagName
         }
      }
   }
`
