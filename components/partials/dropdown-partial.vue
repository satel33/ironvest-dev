<template>
   <div :class="[`dropdown-partial`, dropdownActive && `dropdown-active`]">
      <div class="dropdown-selected"
         @click="toggleDropdown"
      >
         <p class="selected-label">{{ active.label }}</p>
         <caret-down class="dropdown-arrow" />
      </div>
      <div :class="[`dropdown-options`]" ref="dropdown-options">
         <div v-for="option in options"
            :class="[`option`, active.slug === option.slug && `option-active`]"
            :key="`option-${option.slug}`"
            :value="`${option.slug}`"
            @click="handleDropdown(option)"
         >
            <p class="option-label">{{ option.label }}</p>
         </div>
      </div>
   </div>
</template>

<script>
import CaretDown from '~/assets/images/caret-down.svg?inline'
export default {
   name: 'DropdownPartial',
   props: {
      options: Array,
      active: Object
   },
   components: {
      CaretDown
   },
   data() {
      return {
         dropdownActive: false
      }
   },
   methods: {
      toggleDropdown() {
         this.dropdownActive = !this.dropdownActive
      },
      handleDropdown(option) {
         this.toggleDropdown()
         this.$emit('handle-dropdown', option)
      }
   },
   updated() {
      this.dropdownActive ?
         this.$refs['dropdown-options'].style.maxHeight = this.$refs['dropdown-options'].scrollHeight + "px" :
         this.$refs['dropdown-options'].style.maxHeight = null
   }
}
</script>