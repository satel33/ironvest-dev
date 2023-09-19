<template>
   <div class="toggle">
      <p v-if="off" class="toggle-label label-false">{{ off }}</p>
      <label class="toggle-box">
         <input type="checkbox" @click="handleToggle">
         <span class="slider"></span>
      </label>
      <p v-if="on" class="toggle-label label-true">{{ on }}</p>
   </div>
</template>

<script>
export default {
   name: 'Toggle',
   props: {
      off: String,
      on: String
   },
   methods: {
      handleToggle(e) {
         this.$emit('toggle', e.target.checked)
      }
   }
}
</script>