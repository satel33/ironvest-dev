import ctaChunk from './ctaChunk'
import mediaChunk from './mediaChunk'
const FeaturesBlockFrag = `
fragment FeaturesBlockFrag on FeaturesBlock {
   type: __typename
   internalTitle
   cornerStyle
   showNumbers
   eyebrow
   headline
   subHeadline:text
   features: featuresCollection(limit:8){
      ...on FeaturesBlockFeaturesCollection{
         items{
            richtext:text{
               json
               links {
                  entries {
                     hyperlink{
                        ... on GeneralPages {
                           sys{id}
                           slug
                        }
                     }
                  }
               }
            }
            ${mediaChunk}
            mediaNew: mediaNewCollection(limit:2){
               items{
                  title
                  contentType
                  url
                  height
                  width
               }
            }
            
         }
      }
   }
   ctaBar{
   ... on CtaBar {
         headline
         ${ctaChunk}
      }
   }
   
}`

export default FeaturesBlockFrag
