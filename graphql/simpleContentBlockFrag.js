import ctaChunk from './ctaChunk'
import mediaChunk from './mediaChunk'
const SimpleContentBlockFrag = `
fragment SimpleContentBlockFrag on SimpleContentBlock {
   type: __typename
   internalTitle
   eyebrow
   headline
   content: contentCollection(limit:8){
      items{
         type: __typename
         ... on ContentItem {
            richtext:text{
               json
               links {
                  entries {
                     hyperlink{
                        ... on GeneralPages {
                           sys{ id }
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
         ... on MediaContentItem {
            ${mediaChunk}
         }
      }
   }
   
}`

export default SimpleContentBlockFrag
