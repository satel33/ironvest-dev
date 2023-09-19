<template>
   <section class="error">
      <div class="text-wrapper">
         <h6>Error 404</h6>
         <h1>We can't seem to find the page you requested.</h1>
         <cta :cta="backCta" :dark="true" :arrow="true" :mini="false" />
      </div>
      <div class="cube-wrapper">
         <cube class="cube cube-1" ref="cube1" />
         <cube class="cube cube-2" ref="cube2" />
         <cube class="cube cube-3" ref="cube3" />
         <cube class="cube cube-4" ref="cube4" />
         <cube class="cube cube-5" ref="cube5" />
      </div>
   </section>
</template>
<script>
import Cube from '~/assets/images/error-cube.svg?inline'
import Cta from '../components/partials/cta.vue'
export default {
   name: 'FourOhFour',
   props: {},
   components: {
      Cta,
      Cube,
   },
   data() {
      return {
         backCta: {
            entry: {
               slug: '/',
            },
            text: 'Go back',
            style: 'Secondary',
         },
      }
   },
   methods: {
      aniCube(num, x, y, rotation = 180, duration, delay) {
         this.$gsap.to(`.cube-${num}`, {
            x: `${x}vw`,
            y: `${y}vh`,
            duration: duration,
            ease: 'linear',
            rotate: `${rotation}deg`,
            repeat: -1,
            delay: delay,
         })
      },
   },
   mounted() {
      // ANIMATION
      this.$gsap.fromTo(
         '.cube',
         {
            autoAlpha: 0,
         },
         {
            autoAlpha: 1,
            duration: 1,
         }
      )
      this.maxW = this.$el.offsetWidth
      this.aniCube(1, '-127', '-40', '180', 90, 0)
      this.aniCube(2, '132', '20', '275', 80, 5)
      this.aniCube(3, '-124', '20', '540', 70, 2)
      this.aniCube(4, '110', '25', '-630', 60, 4)
      this.aniCube(5, '106', '-110', '-430', 50, 20)
      // HEADER

      this.$el.previousElementSibling.classList.remove('alert-bar-active')
      this.$el.previousElementSibling.classList.add('menu-light')
      if (this.$el.nextElementSibling) {
         this.$el.nextElementSibling.style.backgroundColor = '#07202d'
      }
   },
}
</script>
