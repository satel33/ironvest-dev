<template>
  <section class="embed-block" ref="el">
      <div v-html="block.code"></div>
  </section>
</template>

<script>
export default {
   name: 'EmbedBlock',
   props: {
      block: Object
   },
   mounted() {
      const bgColor = window.getComputedStyle(this.$refs.el.previousElementSibling).backgroundColor
      this.$refs.el.style.backgroundColor = bgColor
   }
}
</script>