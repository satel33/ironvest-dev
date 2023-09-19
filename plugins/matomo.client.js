export default ({ app }) => {
   /*
    ** Only run on client-side and only in production mode
    */
   // if (process.env.NODE_ENV !== 'production') {
   //    return
   // }

   var _paq = (window._paq = window._paq || [])
   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
   _paq.push(['HeatmapSessionRecording::disable']);
   _paq.push(['trackPageView'])
   _paq.push(['enableLinkTracking'])
   ;(function () {
      var u = 'https://reporter.ironvest.com/'
      _paq.push(['setTrackerUrl', u + 'matomo.php'])
      _paq.push(['setSiteId', '2'])
      var d = document,
         g = d.createElement('script'),
         s = d.getElementsByTagName('script')[0]
      g.type = 'text/javascript'
      // g.async = true
      g.defer = true
      g.src = u + 'matomo.js'
      s.parentNode.insertBefore(g, s)
   })()
   
   /** Matomo Tag Manager */ 
   var _mtm = (window._mtm = window._mtm || [])
   _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
   var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
   g.type = 'text/javascript'
   // g.async = true
   g.defer = true
   g.src = 'https://reporter.ironvest.com/js/container_ozu10Gyz.js'
   g.setAttribute('data-pagespeed-no-defer', true)
   s.parentNode.insertBefore(g, s)
}
