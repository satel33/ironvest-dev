import { gql, request } from 'nuxt-graphql-request'
import allGeneralPagesQuery from './graphql/allGeneralPages'
import allBlogPostsQuery from './graphql/allBlogPosts'

export default {
   // Target: https://go.nuxtjs.dev/config-target
   target: 'static',
   server: {
      port: 3000, // default: 3000
      host: '0.0.0.0', // default: localhost
   },
   // Global page headers: https://go.nuxtjs.dev/config-head
   head: {
      title: 'Ironvest',
      titleTemplate: '%s – IronVest',
      htmlAttrs: {
         lang: 'en',
      },
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         {
            name: 'facebook-domain-verification',
            content: 'diqcll7a00230c61c6y4po4h24k0bw',
         },
         { hid: 'description', name: 'description', content: '' },
         { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
         {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
         },
         {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap',
            defer: true,
         },
         {
            rel: 'stylesheet',
            href: 'https://cdn.plyr.io/3.7.3/plyr.css',
            defer: true,
         },
      ],
      script: [
         {
            type: 'text/javascript',
            id: 'hs-script-loader',
            rel: 'dns-prefetch',
            defer: true,
            src: '//js.hs-scripts.com/21261098.js',
         },
         {
            src: 'https://js.hsforms.net/forms/v2.js?',
            charset: 'utf-8',
            rel: 'dns-prefetch',
            defer: true,
            type: 'text/javascript',
         },
      ],
   },

   // Global CSS: https://go.nuxtjs.dev/config-css
   css: ['@/assets/scss/main.scss'],

   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: [
      '@plugins/helpers.js',
      '@plugins/lazyload.js',
      '@plugins/matomo.client.js',
      // '@plugins/plyr.client.js'
   ],

   // Auto import components: https://go.nuxtjs.dev/config-components
   // components: true,
   components: {
      dirs: ['~/components', '~/components/partials', '~/components/svgs'],
   },

   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
   buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      'nuxt-graphql-request',
      'nuxt-gsap-module',
      '@nuxtjs/svg',
      // '@nuxtjs/google-analytics',
      '@nuxtjs/gtm',
   ],

   // Modules: https://go.nuxtjs.dev/config-modules
   modules: [
      // https://go.nuxtjs.dev/content
      // "@nuxt/content"
      '@nuxtjs/axios',
      'nuxt-graphql-request',
      '@nuxtjs/sitemap',
      [
         'nuxt-mq',
         {
            defaultBreakpoint: 'mobile',
            breakpoints: {
               mobile: 767,
               tablet: 939,
               desktop: Infinity,
            },
         },
      ],
      'vue-social-sharing/nuxt',
   ],
   // https://www.npmjs.com/package/nuxt-gsap-module
   gsap: {
      extraPlugins: {
         motionPath: true,
         CSSPlugin: true,
         scrollTrigger: true,
      },
      // extraEases: {
      //   expoScaleEase: true
      // }
   },
   // Content module configuration: https://go.nuxtjs.dev/config-content
   content: {},
   sitemap: {
      hostname: 'https://ironvest.com',
      trailingSlash: true,
   },
   // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {},
   // https://nuxtjs.org/docs/configuration-glossary/configuration-generate/#function-which-returns-a-promise
   graphql: {
      clients: {
         default: {
            options: {},
         },
         preview: {
            options: {},
         },
      },
      options: {
         method: 'get',
      },
      useFetchPolyfill: true,
   },
   privateRuntimeConfig: {
      graphql: {
         /**
          * An Object of your GraphQL clients
          */
         clients: {
            default: {
               /**
                * The client endpoint url
                */
               endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}?include=2`,
               /**
                * Per-client options overrides
                * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
                */
               options: {
                  headers: {
                     authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
                  },
               },
            },
            preview: {
               endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}?access_token=${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
               options: {
                  headers: {
                     authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
                  },
               },
            },
         },

         /**
          * Options
          * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
          */
         options: {
            method: 'get', // Default to `POST`
         },

         /**
          * Optional
          * default: true (this includes cross-fetch/polyfill before creating the graphql client)
          */
         useFetchPolyfill: true,

         /**
          * Optional
          * default: false (this includes graphql-tag for node_modules folder)
          */
         includeNodeModules: true,
      },
   },

   generate: {
      crawler: false,
      cache: false,
      fallback: '404.html',
      async routes() {
         const generalPages = await request(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
            allGeneralPagesQuery,
            null,
            {
               authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            }
         )
         const blogPosts = await request(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
            allBlogPostsQuery,
            null,
            {
               authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            }
         )

         const routes = []

         // Create routes for general pages
         generalPages.generalPagesCollection.items.forEach(page => {
            routes.push({
               route: page.slug === '/' ? '/' : `/${page.slug}`,
               // payload: page,
            })
         })

         // Create routes for blog posts
         blogPosts.blogPostCollection.items.forEach(post => {
            routes.push({
               route: `/blog/${post.slug}`,
               // payload: post,
            })
         })

         return routes
      },
   },
   // googleAnalytics: {
   //    id: 'UA-XXX-X',
   // },
   gtm: {
      id: 'GTM-MKH7TT9',
      scriptDefer: true,
   },
   env: {
      CUSTOMERIO_SITE_ID: process.env.CUSTOMERIO_SITE_ID,
      CUSTOMERIO_API_KEY: process.env.CUSTOMERIO_API_KEY,
   },
   optimization: {
      splitChunks: {
         maxSize: 300000,
      },
   },
}
