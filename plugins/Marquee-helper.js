import { animate } from 'motion'
import debounce  from 'lodash.debounce'
export default class Marquee {
   constructor(parent, directionRight = false, duration = 30) {
      this.cloneCount = 1
      this.parent = parent
      this.directionRight = directionRight
      this.duration = duration
      this.children = Array.from(this.parent.children)
      this.handleResize = debounce(this.calcMarqueeAni.bind(this), 150)
      this.windowW = 0 // initial needs to be 0
      this.buildMarquee()
   }

   // BUILD IT
   buildMarquee() {
      // save original Class + Width
      const originalClass = Array.from(this.parent.classList)[0]
      // const originalW = this.parent.offsetWidth

      // wrap parent in marquee if it doesnt exist
      if (!this.wrapper) {
         this.wrapper = document.createElement('div')
         this.wrapper.classList.add(`marquee-${originalClass}`)
         this.wrapper.style.cssText += `
            position: relative;
            width: 100vw;
            `
      }

      //

      this.parent.parentNode.insertBefore(this.wrapper, this.parent)
      this.wrapper.appendChild(this.parent)

      // assign base style for parent
      this.parent.style.cssText += `
         display: flex;
         flex-direction: row;
         flex-wrap: nowrap;
         width: max-content;
         position: absolute;
         top: 0;
         ${this.directionRight ? 'right' : 'left'}: 0;
      `
      // loop through set till the children cover double screen width
      const calcSetup = debounce(() => {
         this.cloneChildren()
         this.calcMarqueeAni()
         this.startListeners()
      }, 100)
      calcSetup()
      return this;
   }

   startListeners() {
      if (process.client) {
         window.addEventListener('resize', this.handleResize, {passive: true})
      }
   }

   cloneChildren() {
      ++this.cloneCount
      /* 
         NOTE: catch if statement below with '.length' prevented repeat, what is it for?
         if (this.parent.length == undefined) return;
      */
      if (this.parent == undefined) return;

      this.children.forEach(child => {
         let clone = child.cloneNode(true)
         clone.classList.add('clone')
         this.parent.appendChild(clone)
      })
      
      if (this.parent.scrollWidth > window.innerWidth * 2) {
         return
      } else {
         this.cloneChildren();
      }
   }

   calcMarqueeAni() {
      const curWindowW = window.innerWidth
      if (this.windowW != curWindowW) { // if window width has changed
         // remove animation if animated
         if (this.animation) this.animation.cancel()
         
         // get width of single set
         const originalW = this.parent.offsetWidth
         
         // calc slide X
         const slideX = this.directionRight ?
         originalW / this.cloneCount :
         -originalW / this.cloneCount
         
         this.animation = animate(
            this.parent,
            {
               x: slideX,
            },
            {
               duration: this.duration,
               easing: 'linear',
               repeat: Infinity,
            }
         )
            
         // add height to marquee wrapper
         this.wrapper.style.cssText += `
            height: ${this.parent.scrollHeight}px
         `
            
         // add pause on hover
         if (process.client) {
            this.parent.addEventListener("mouseenter", () => this.animation.pause(),{passive: true} )
            this.parent.addEventListener("mouseleave", () => this.animation.play(),{passive: true} )
         }
         this.windowW = curWindowW // update window w
      }
   }

   destroy() {
      // cancel animation
      window.removeEventListener('resize', this.handleResize)

      if (this.animation) this.animation.cancel()

      if (this.wrapper) {
         Array.from(this.wrapper.querySelectorAll('.clone')).forEach(item => {
            item.remove()
         })
         this.wrapper.style = null
      }
      if (this.parent) {
         // remove parent style
         this.parent.style = null
      }
   }
}
