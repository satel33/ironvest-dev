const FeaturesTabBlockFrag = `
fragment FeaturesTabBlockFrag on FeaturesTabBlock {
   type: __typename
   eyebrow
   features: featureCardsCollection {
      items {
         headline
         category
         text{json}
         media : icon{
            ...mediaFrag
         }
      }
   }
}`

export default FeaturesTabBlockFrag