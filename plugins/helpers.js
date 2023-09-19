import Marquee from './Marquee-helper.js'
import UAParser from 'ua-parser-js'

const helpers = {
   isMobile() {
      if (
         /Mobile|tablet|ipad|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
         )
      ) {
         return true
      } else {
         return false
      }
   },
   slugify(str) {
      let slug = str.toLowerCase().trim().replace(/\s+/g, '-') // remove white space
      return slug
   },

   srcset(image, sizes = [1800, 1400, 1000, 700, 350, 150]) {
      let srcset = []
      sizes.forEach(size => {
         srcset.push(`${image}?fm=webp&w=${size} ${size}w`)
      })
      return srcset.join(', ')
   },

   loader(image) {
      return `${image}?fm=webp&w=500&q=1`
   },
   getMedia(media) {
      if (!media) return null
      let mediaObj = {
         srcset: null,
         src: `${media.url}?fm=webp&w=500&q=83`,
         loader: null,
         videoSrc: null,
         ratio: null,
         svg: false,
         alt: media.title ?? null,
         contentType: media.contentType ? media.contentType : null,
      }
      if (media.url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
         mediaObj.srcset = this.srcset(media.url)
         mediaObj.loader = this.loader(media.url)
      } else if (media.url.match(/\.(svg)$/)) {
         mediaObj.srcset = media.url
         mediaObj.loader = media.url
         mediaObj.svg = true
      } else {
         mediaObj.videoSrc = `${media.url}`
      }

      if (media.width >= media.height) {
         mediaObj.ratio = 'landscape'
      } else if (media.width < media.height) {
         mediaObj.ratio = 'portrait'
      }

      return mediaObj
   },

   getTwitterCard({ title, description, image, url }) {
      return [
         {
            name: 'twitter:card',
            content: 'summary_large_image',
         },
         {
            name: 'twitter:title',
            content: title,
         },
         {
            name: 'twitter:description',
            content: description,
         },
         {
            name: 'twitter:image',
            content: image,
         },
         { name: 'twitter:url', content: url },
         { name: 'twitter: site', content: '@IronVestHQ' },
      ]
   },

   marquee(wrapper, direction, duration) {
      return new Marquee(wrapper, direction, duration)
   },

   getBrowser() {
      const parser = new UAParser()
      return parser.getResult().browser.name.toLowerCase()
   },

   formatDate(date) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      const formattedDate = new Date(date).toLocaleDateString('en-US', options)

      const [month, day, year] = formattedDate.split(' ')

      const capitalizedMonth = month

      return `${day} ${capitalizedMonth} ${year}`
   },
}

export default (context, inject) => {
   inject('helpers', helpers)
   context.$helpers = helpers
}
