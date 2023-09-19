<template>
   <div class="search-container">
      <a v-if="isBack" href="/blogs" class="back-link">
         <prevArrowIcon /> Back to all blogs
      </a>
      <div class="search-box">
         <input
            class="search"
            id="searchleft"
            type="search"
            name="q"
            placeholder="Search"
         />
         <label class="searchbutton" for="searchleft">
            <searchIcon />
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
}
</script>
