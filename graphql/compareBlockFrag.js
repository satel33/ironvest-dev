import ctaChunk from './ctaChunk'
const CompareBlockFrag = `

fragment CompareBlockFrag on CompareBlock {
   type: __typename
   headline
   roundedCorners
   column1 {
      planTitle
      monthlyPrice
      ${ctaChunk}
   }
   column2 {
      planTitle
      monthlyPrice
      ${ctaChunk}
   }
   column3 {
      planTitle
      monthlyPrice
      ${ctaChunk}
   }
   groups: compareGroupsCollection(limit:20)  {
      items {
         headline
         icon {
            title
            contentType
            url
            height
            width
         }
         rows: compareRowsCollection(limit:20) {
            items {
               text
               note
               column1Option
               column1Text
               column2Option
               column2Text
               column3Option
               column3Text
            }
         }
      }
   }
}`

export default CompareBlockFrag