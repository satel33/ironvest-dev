const ctaFrag = `
fragment ctaFrag on Cta  {
   text
   customUrl
   entry {
      title
      slug
   }
   target
   style
   extActive: useExtensionLinks
}`

export default ctaFrag
