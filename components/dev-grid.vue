<template>
   <div class="gridMe" v-if="active" v-on:keyup.71="toggle">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div v-if="$mq == 'desktop'"></div>
      <div v-if="$mq == 'desktop'"></div>
      <div v-if="$mq == 'desktop'"></div>
      <div v-if="$mq == 'desktop'"></div>
   </div>
</template>

<script>
export default {
   name: 'DevGrid',
   data() {
      return {
         active: false,
      }
   },
   mounted() {
      document.addEventListener('keydown', this.toggle)
   },
   methods: {
      toggle(event) {
         if (event.key == '|') {
            this.active = !this.active
         }
      },
   },
}
</script>
