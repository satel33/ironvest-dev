<template>
   <section :class="[`simple-compare-block`, style]">
      <!-- text -->
      <div class="headline-wrapper">
         <h2 v-if="block.headline" class="headline">{{ block.headline }}</h2>
         <p v-if="block.subheadline" class="subheadline">{{ block.subheadline }}</p>
      </div>
      <!-- table -->
      <div class="compare-table" v-if="rows.length">
         <!-- rows -->
         <div class="rows-wrapper">
            <div v-for="(row,i) in rows"
               class="row"
               :key="`table-row-${i}`" 
            >
               <p :class="[`row-text`, $mq === 'mobile' && `p-s`]">{{ row }}</p>
            </div>
         </div>
         <!-- columns -->
         <flickity class="cols-wrapper" 
            :options="flickityOptions" 
            ref="simpleCompareSlider"
         >
            <div v-for="(col,i) in cols"
               class="col"
               :key="`table-col-${i}`"
            >
               <div class="col-header">
                  <media-partial v-if="col.headerType === 'img'"
                     class="col-header-logo"
                     :media="$helpers.getMedia(col.header)"
                  />
                  <h6 v-else :class="[`col-header-text`, , $mq === 'mobile' && `small`]">{{ col.header }}</h6>
               </div>
               <div class="col-options">
                  <div v-for="(option,i) in col.options" 
                     class="col-option"
                     :key="`col-option-${i}`"
                  >
                     <compare-option class="option" :type="option" />
                  </div>
               </div>
            </div>
         </flickity>
      </div>
      <div class="table-ctrls" v-if="$mq === 'mobile'">
         <h6 class="prompt">Swipe to view</h6>
         <div class="ctrls-wrapper">
            <slider-ctrls
               @prev="$refs.simpleCompareSlider.previous()"
               @next="$refs.simpleCompareSlider.next()"
            />
         </div>
      </div>
   </section>
</template>

<script>
import Flickity from './flickity.vue'
import CompareRow from './partials/compare-row-partial.vue'
import MediaPartial from './partials/media-partial.vue'
import CompareOption from './partials/compare-option-partial.vue'
import SliderCtrls from './partials/slider-ctrls.vue'
export default {
   name: 'SimpleCompareBlock',
   props: {
      block: Object
   },
   components: {
      MediaPartial,
      CompareRow,
      CompareOption,
      Flickity,
      SliderCtrls
   },
   data() {
      return {
         flickityOptions: {
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true,
            cellSelector: '.col',
            watchCSS: true
         },
         rows: [],
         cols: [],
         style: this.block.style?.toLowerCase(),
      }
   },
   methods: {
      buildTable() {
         let col1 = {
            headerType: 'img',
            header: this.block.column1Header,
            options: []
         }
         let col2 = {
            headerType: 'string',
            header: this.block.column2Header,
            options: []
         }
         let col3 = {
            headerType: 'string',
            header: this.block.column3Header,
            options: []
         }
         this.block.rows.items.forEach(row => {
            // rows
            this.rows = [...this.rows, row.text]
            // cols
            col1.options = [...col1.options, row.column1Option]
            col2.options = [...col2.options, row.column2Option]
            col3.options = [...col3.options, row.column3Option]
         });
         this.cols = [col1, col2, col3]
      }
   },
   mounted() {
      this.buildTable()
   }
}
</script>