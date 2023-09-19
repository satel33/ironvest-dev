import ctaChunk from './ctaChunk'
const PricingBlockFrag = `

fragment PricingBlockFrag on PricingBlock {
   type: __typename
   text {
      json
   }
   toggleText
   pricingCardsCollection {
      items {
         bannerText
         planTitle
         planDescription
         annualPrice
         monthlyPrice
         ${ctaChunk}
         text {
            json
         }
      }
   }
}`

export default PricingBlockFrag