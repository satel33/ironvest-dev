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
import PricingBlockFrag from './pricingBlockFrag'

export default gql`
   query{
      generalPagesCollection(limit: 30) {
         items {
            title
            slug
         }
      }
   }
   
  
`