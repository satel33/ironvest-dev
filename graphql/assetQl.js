import compress from 'graphql-query-compress'
import { gql } from 'nuxt-graphql-request'

export default gql`
   query ($id: String!) {
      asset(id: $id) {
         url
         title
         width
      }
   }
`
