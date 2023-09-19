<template>
   <div class="compare-row">
      <div class="compare-text-wrapper">
         <p v-if="row.text" class="row-text">{{ row.text }}</p>
         <p v-if="row.note" class="row-note">{{ row.note }}</p>
      </div>
      <template v-if="select">
         <compare-option class="compare-opt" :type="`${selectNum}`" />
         <p v-if="selectText" class="col-text">{{ selectText }}</p>
      </template>
      <template v-else>
         <div class="col col-1">
            <compare-option class="compare-opt" :type="row.column1Option" />
            <p v-if="row.column1Text" class="col-text">{{ row.column1Text }}</p>
         </div>
         <div class="col col-2">
            <compare-option class="compare-opt" :type="row.column2Option" />
            <p v-if="row.column2Text" class="col-text">{{ row.column2Text }}</p>
         </div>
         <div class="col col-3">
            <compare-option class="compare-opt" :type="row.column3Option" />
            <p v-if="row.column3Text" class="col-text">{{ row.column3Text }}</p>
         </div>
      </template>
   </div>
</template>

<script>
import CompareOption from './compare-option-partial.vue'
export default {
   name: "CompareRow",
   props: {
      row: Object,
      select: Number // num 1-3
   },
   components: {
      CompareOption
   },
   computed: {
      selectNum() {
         if (this.select) {
            if (this.select === 1) {
               return this.row.column1Option
            } else if (this.select === 2) {
               return this.row.column2Option
            } else if (this.select === 3) {
               return this.row.column3Option
            }
         } else {
            return ''
         }
      },
      selectText() {
         if (this.select) {
            if (this.select === 1) {
               return this.row.column1Text
            } else if (this.select === 2) {
               return this.row.column2Text
            } else if (this.select === 3) {
               return this.row.column3Text
            }
         } else {
            return ''
         }
      }
   }
}
</script>