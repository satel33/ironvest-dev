import ctaChunk from './ctaChunk'
const StatsBlockFrag = `

fragment StatsBlockFrag on StatsBlock {
   type: __typename
   style
   eyebrow
   headline
   subheadline
   statsCollection(limit: 8) {
      items {
         eyebrow
         headline
         text
      }
   }
   ${ctaChunk}
}`
export default StatsBlockFrag