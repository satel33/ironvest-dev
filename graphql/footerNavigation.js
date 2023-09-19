import { gql } from 'nuxt-graphql-request'
import ctaChunk from './ctaChunk'

export default gql`
   query {
      footerNav: navigations(id: "jjAB3DOHC4RTtraJsn8ri") {
         title
         navItems: navElementsCollection(limit: 30) {
            items {
               type: __typename
               ... on NavigationItem {
                  ...navFrag
               }
               ... on Navigations {
                  staticText: title
                  subNavItems: navElementsCollection(limit: 10) {
                     items {
                        ... on NavigationItem {
                           ...navFrag
                        }
                     }
                  }
               }
            }
         }
      }
      legal: navigations(id: "rqwJBaOMc0DRzvtVZVfOw") {
         navItems: navElementsCollection(limit: 30) {
            items {
               type: __typename
               ... on NavigationItem {
                  ...navFrag
               }
            }
         }
      }
   }

   fragment navFrag on NavigationItem {
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
   }
`
