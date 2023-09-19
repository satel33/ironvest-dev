const CardGroupBlock = `

fragment CardGroupBlockFrag on CardGroupBlock {
   type: __typename
   style
   headline
   text {
      json
   }
   infoCardsCollection {
      items {
         align
         eyebrow
         icon {
            title
            url
         }
         headline
         text
      }
   }
   infoCardAlignment
   infoCardStyle
}`
export default CardGroupBlock