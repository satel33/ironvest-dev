const TeamBlockFrag = `

fragment TeamBlockFrag on TeamBlock {
   type: __typename
   eyebrow
   headline
   teamCollection {
      items {
         name
         title
         linkedIn
         twitter
         media {
            title
            url
         }
      }
   }
}`

export default TeamBlockFrag