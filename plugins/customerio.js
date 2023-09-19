export default ({ app }) => {
   /*
    ** Only run on client-side and only in production mode
    */
   // if (process.env.NODE_ENV !== 'production') {
   //    return
   // }

   var _cio = _cio || [];
   (function () {
      var a, b, c
      a = function (f) {
         return function () {
            _cio.push([f].concat(Array.prototype.slice.call(arguments, 0)))
         }
      }
      b = ['load', 'identify', 'sidentify', 'track', 'page']
      for (c = 0; c < b.length; c++) {
         _cio[b[c]] = a(b[c])
      }
      var t = document.createElement('script'),
         s = document.getElementsByTagName('script')[0]
      // t.async = true
      t.defer = true
      t.id = 'cio-tracker'
      t.setAttribute('data-pagespeed-no-defer', true)
      t.setAttribute('data-site-id', process.env.CUSTOMERIO_SITE_ID)
      t.setAttribute('data-use-array-params', 'true')
      t.src = 'https://assets.customer.io/assets/track.js'
      s.parentNode.insertBefore(t, s)
   })();
   window._cio = _cio
}
