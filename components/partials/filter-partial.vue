<template>
   <div :class="[`filter-partial`, $mq === 'desktop' ? 'toggle' : 'dropdown']" v-if="filters.length">
      <div class="filter-wrapper">
         <!-- Desktop -->
         <template  v-if="$mq === 'desktop'">
            <div v-for="filter in filters" 
               :class="[`filter`, current.slug === filter.slug && 'filter-active']"
               :key="`filter-${filter.slug}`"
               @click="handleFilter(filter)"
            >
               <p class="filter-label">{{ filter.label }}</p>
            </div>
         </template>
         <!-- Dropdown -->
         <dropdown-partial v-else
            :options="filters"
            :active="current"
            @handle-dropdown="handleFilter"
         />
      </div>
   </div>
</template>

<script>
import DropdownPartial from './dropdown-partial.vue'
export default {
   name: 'FilterPartial',
   props: {
      filters: Array,
      current: Object
   },
   components: {
      DropdownPartial
   },
   methods: {
      handleFilter(filter) {
         this.$emit('handle-filter', filter)
      }
   }
}
</script>