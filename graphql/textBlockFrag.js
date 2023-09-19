import ctaChunk from './ctaChunk'
import mediaChunk from './mediaChunk'
const TextBlockFrag = `

fragment TextBlockFrag on TextBlock {
   type: __typename
   text {
      json
   }
   textCards: textCardsCollection {
      items {
         headline
         subheadline
         text {
            json
         }
      }
   }
   fullWidthMedia {
      ... on MediaContentItem {
         ${mediaChunk}
      }
   }
   ${ctaChunk}
}
`

export default TextBlockFrag