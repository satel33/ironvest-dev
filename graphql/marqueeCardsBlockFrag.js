import ctaChunk from './ctaChunk'

const MarqueeCardsBlockFrag = `fragment MarqueeCardsBlockFrag on MarqueeCardsBlock {
   type: __typename
   style
   arcedMarquee
   roundedCorners
   eyebrow
   headline
   subHeadline
   cards: cardsCollection(limit: 10) {
      items {
         text
         icon{
            ...mediaFrag
         }
      }
   }
   ${ctaChunk}
}
`
export default MarqueeCardsBlockFrag
