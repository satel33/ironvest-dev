import ctaChunk from './ctaChunk'
const InvestorBlockFrag = `

fragment InvestorBlockFrag on InvestorBlock {
   type: __typename
   style
   roundedCorners
   showMediaTitle
   eyebrow
   headline
   mediaCollection {
      items {
         title
         contentType
         url
         height
         width
      }
   }
   ${ctaChunk}
}`

export default InvestorBlockFrag
