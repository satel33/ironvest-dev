


const MissionBlockFrag = `fragment MissionBlockFrag on MissionBlock {
   type: __typename
   eyebrow
   text {
      json
   }
   ctas: ctAsCollection(limit: 2) {
      items {
         ... on Cta{
            ...ctaFrag
         }
      }
   }
}
`
export default MissionBlockFrag
