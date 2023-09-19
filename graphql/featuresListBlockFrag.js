import mediaChunk from './mediaChunk'
import ctaChunk from './ctaChunk'
const FeaturesListBlockFrag = `

fragment FeaturesListBlockFrag on FeaturesListBlock {
   type: __typename
   layout
   style
   ${mediaChunk}
   text {
      json
   }
   listItemsCollection {
      items {
         internalTitle
         ${mediaChunk}
         text {
            json
         }
      }
   }
   ${ctaChunk}
}`

export default FeaturesListBlockFrag