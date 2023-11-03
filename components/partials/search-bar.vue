<template>
   <div class="search-container">
      <a v-if="isBack" href="/blogs" class="back-link">
         <prevArrowIcon /> Back to all blogs
      </a>
      <div v-if="$slots.left" class="search-left">
         <slot name="left" />
      </div>
      <div class="search-box">
         <input
            :class="['search', { 'search--expanded' : focused || searchQuery }]"
            id="searchleft"
            type="search"
            name="q"
            placeholder="Search"
            v-model="searchQuery"
            @keyup.enter="$emit('search', searchQuery)"
            @focus="focused = true"
            @blur="focused = false"
         />
         <label class="searchbutton" for="searchleft">
            <searchIcon @click="$emit('search', searchQuery)" />
         </label>
      </div>
   </div>
</template>

<script>
import searchIcon from '~/assets/images/search-icon.svg?inline'
import prevArrowIcon from '~/assets/images/prev-arrow.svg?inline'

export default {
   name: 'SearchBar',
   components: { searchIcon, prevArrowIcon },
   props: { isBack: Boolean },
   data() {
      return {
         searchQuery: '',
         focused: false
      }
   },
   watch: {
      searchQuery(newVal, oldVal) {
         if (oldVal && !newVal) {
            this.$emit('search', "")
         }
      }
   },
}
</script>
