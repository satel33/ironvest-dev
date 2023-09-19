import ctaChunk from './ctaChunk'
const CareerBlockFrag = `

fragment CareerBlockFrag on CareerBlock {
   type: __typename
   backgroundColor
   text{
      json
   }
   media{
      ...mediaFrag
   }
   jobPosts: jobPostsCollection {
      items {
         title
         location
         url
      }
   }
   ${ctaChunk}
}`

export default CareerBlockFrag