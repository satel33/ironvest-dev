import { gql } from 'nuxt-graphql-request'

export default gql`
   query {
      centerNav: navigations(id: "3dy6xWQX78IwAohEHzhIid") {
         ...navFrag
      }
      rightNav: navigations(id: "1GB8feu0fYJ1VQeuecXjR5") {
         ...navFrag
      }
   }

   fragment navItemFrag on NavigationItem {
      text: linkText
      url: customUrl
      button
      openInNewWindow
      entry: entryRelationship {
         ... on GeneralPages {
            title
            slug
         }
      }
      extActive: useExtensionLinks
   }

   fragment navFrag on Navigations {
      title
      navItems: navElementsCollection(limit: 10) {
         items {
            type: __typename
            ... on NavigationItem {
               ...navItemFrag
            }
            ... on Navigations {
               staticText: title
               subNavItems: navElementsCollection(limit: 10) {
                  items {
                     type: __typename
                     ... on NavigationItem {
                        ...navItemFrag
                     }
                  }
               }
            }
         }
      }
   }
`
