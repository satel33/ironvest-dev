import mobileMediaChunk from './mobileMediaChunk.js'
const PageHeroBlockFrag = `fragment PageHeroBlockFrag on PageHeroBlock {
   type: __typename
   style
   layout
   ctas:ctAsCollection(limit: 2) {
      items {
         text
         customUrl
         entry {
            title
            slug
         }
         target
         style
         extActive: useExtensionLinks
      }
   }
   text {
      json
   }
   mediaPlacement
   media: mediaCollection(limit:2){
      items{
         title
         contentType
         url
         height
         width
      }
   }
   mobileMedia: mobileMediaCollection(limit:2){
      items{
         title
         contentType
         url
         height
         width
      }
   }
   socialProofLogos : socialProofLogosCollection(limit:4){
      items{
         title
         contentType
         url
         height
         width
      }
   }
   socialProofRating {
      rating
      quote
   }
   modalVideoUrl
     
}
`
export default PageHeroBlockFrag
