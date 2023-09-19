import ctaChunk from './ctaChunk'
import mediaChunk from './mediaChunk'
const BlogBlockFrag = `

fragment BlogBlockFrag on BlogBlock {
   type: __typename
   internalTitle
   eyebrow
   headline
   
   posts : blogPostsCollection {
      items {
         sys{
            id
            date:publishedAt
         }
         dated
         headline
         source
         url
         ${mediaChunk}
      }
   }
   ${ctaChunk}
}`

export default BlogBlockFrag
