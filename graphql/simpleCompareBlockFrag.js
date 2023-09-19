const SimpleCompareBlockFrag = `

fragment SimpleCompareBlockFrag on SimpleCompareBlock {
   type: __typename
   headline
   subheadline
   column1Header {
      title
      contentType
      url
      height
      width
   }
   column2Header
   column3Header
   rows: simpleCompareRowsCollection {
      items {
         text
         column1Option
         column2Option
         column3Option
      }
   }
   style
}`

export default SimpleCompareBlockFrag