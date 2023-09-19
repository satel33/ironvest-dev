import ctaChunk from './ctaChunk'
const FaqBlockFrag = `

fragment FaqBlockFrag on FaqBlock {
   type: __typename
   text {
      json
   }
   faqItemsCollection {
      items {
         q: question
         category
         a: answer {
            json
         }
      }
   }
   filtered: layout
   roundedCorners
   ctaHeadline
   ${ctaChunk}
}`

export default FaqBlockFrag
