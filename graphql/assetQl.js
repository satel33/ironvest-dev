import compress from 'graphql-query-compress'
import { gql } from 'nuxt-graphql-request'

export default compress(gql`
   query () {
      AssetCollection() {
         items {
            title
            contentType
            url
            height
            width
         }
      }
   }
`)
