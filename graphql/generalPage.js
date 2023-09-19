import compress from 'graphql-query-compress'
import { gql } from 'nuxt-graphql-request'
import PageHeroBlockFrag from './pageHeroBlockFrag'
import StatsBlockFrag from './statsBlockFrag'
import MissionBlockFrag from './missionBlockFrag'
import MarqueeCardsBlockFrag from './marqueeCardsBlockFrag'
import CardGroupBlockFrag from './cardGroupBlockFrag'
import TeamBlockFrag from './teamBlockFrag'
import InvestorBlockFrag from './investorBlockFrag'
import ctaFrag from './ctaFrag'
import TestimonialsBlockFrag from './testimonialsBlockFrag'
import FeaturesBlockFrag from './featuresBlockFrag'
import FeaturesListBlockFrag from './featuresListBlockFrag'
import SimpleContentBlockFrag from './simpleContentBlockFrag'
import FaqBlockFrag from './faqBlockFrag'
import mediaFrag from './mediaFrag'
import BlogBlockFrag from './blogBlockFrag'
import BlogListBlockFrag from './blogListBlockFrag'
import PricingBlockFrag from './pricingBlockFrag'
import TextBlockFrag from './textBlockFrag'
import CareerBlockFrag from './careerBlockFrag'
import FeaturesTabBlockFrag from './featuresTabBlockFrag'
import SimpleCompareBlockFrag from './simpleCompareBlockFrag'
import CompareBlockFrag from './compareBlockFrag'
import EmbedBlockFrag from './embedBlockFrag'
import ctaChunk from './ctaChunk'

export default compress(gql`
   query ($slug: String!, $preview:Boolean) {
      generalPagesCollection(where: { slug: $slug,pageBlocksCollection_exists:true }, limit: 1, preview:$preview) {
         items {
            title
            slug
            btnOverride :navBarCtaOverride{
               ... on Cta {
                  text
                  customUrl
                  entry {
                     title
                     slug
                  }
                  target
                  style
               }
            }
            alertBar{
               ... on CtaBar {
                  headline
                  backgroundColor
                  ${ctaChunk}
               }
            }
            mobileAlertBar{
               ... on CtaBar {
                  headline
                  backgroundColor
                  ${ctaChunk}
               }
            }
            seoMeta {
               title
               description
               image {
                  ... on Asset {
                     ...mediaFrag
                  }
               }
            }
            hideCenterNavigation
            sock: footerCtaBar {
               ... on CtaBar {
                  headline
                  ${ctaChunk}
               }
            }
            pageBlocksCollection(limit: 15) {
               items {
                  ... on PageHeroBlock {
                     ...PageHeroBlockFrag
                  }
                  ... on StatsBlock {
                     ...StatsBlockFrag
                  }
                  ... on CardGroupBlock {
                     ...CardGroupBlockFrag
                  }
                  ... on TeamBlock {
                     ...TeamBlockFrag
                  }
                  ... on InvestorBlock {
                     ...InvestorBlockFrag
                  }
                  ... on MissionBlock {
                     ...MissionBlockFrag
                  }
                  ... on MarqueeCardsBlock {
                     ...MarqueeCardsBlockFrag
                  }
                  ... on TestimonialsBlock {
                     ...TestimonialsBlockFrag
                  }
                  ... on FeaturesBlock {
                     ...FeaturesBlockFrag
                  }
                  ... on FeaturesListBlock {
                     ...FeaturesListBlockFrag
                  }
                  ... on SimpleContentBlock {
                     ...SimpleContentBlockFrag
                  }
                  ... on FaqBlock {
                     ...FaqBlockFrag
                  }
                  ... on BlogBlock {
                     ...BlogBlockFrag
                  }
                  ... on BlogListBlock {
                     ...BlogListBlockFrag
                  }
                  ... on PricingBlock {
                     ...PricingBlockFrag
                  }
                  ... on TextBlock {
                     ...TextBlockFrag
                  }
                  ... on CareerBlock {
                     ...CareerBlockFrag
                  }
                  ... on FeaturesTabBlock {
                     ...FeaturesTabBlockFrag
                  }
                  ... on SimpleCompareBlock {
                     ...SimpleCompareBlockFrag
                  }
                  ... on CompareBlock {
                     ...CompareBlockFrag
                  }
                  ... on EmbedBlock {
                     ...EmbedBlockFrag
                  }
               }
            }
         }
      }
   }

   ${PageHeroBlockFrag}
   ${StatsBlockFrag}
   ${MissionBlockFrag}
   ${MarqueeCardsBlockFrag}
   ${CardGroupBlockFrag}
   ${TeamBlockFrag}
   ${InvestorBlockFrag}
   ${TestimonialsBlockFrag}
   ${FeaturesBlockFrag}
   ${FeaturesListBlockFrag}
   ${FaqBlockFrag}
   ${SimpleContentBlockFrag}
   ${ctaFrag}
   ${mediaFrag}
   ${BlogBlockFrag}
   ${BlogListBlockFrag}
   ${PricingBlockFrag}
   ${TextBlockFrag}
   ${CareerBlockFrag}
   ${FeaturesTabBlockFrag}
   ${SimpleCompareBlockFrag}
   ${CompareBlockFrag}
   ${EmbedBlockFrag}
`)
