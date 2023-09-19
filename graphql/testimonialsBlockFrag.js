const TestimonialsBlockFrag = `

fragment TestimonialsBlockFrag on TestimonialsBlock {
   type: __typename
   eyebrow
   format
   testimonialsCollection {
      items {
         rating
         quote
         name
         title
      }
   }
}`

export default TestimonialsBlockFrag