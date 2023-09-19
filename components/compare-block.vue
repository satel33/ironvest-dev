<template>
   <section 
      :class="[`compare-block`, {'rounded-corners':block.roundedCorners}]"
      :data-rounded-corners="block.roundedCorners"
   >
      <!-- DESKTOP -->
      <template v-if="$mq !== 'mobile'">
         <!-- column headers -->
         <div class="header-row">
            <h3 v-if="block.headline" class="headline">{{ block.headline }}</h3>
            <div v-for="(colHeader,i) in colHeaders"
               :class="[`col-header`, `col-header-${i + 1}`]"
               :key="`col-header-${i}`"
            >
               <h6 class="col-header-headline">{{colHeader.planTitle}}</h6>
                  <p v-if="colHeader.monthlyPrice.toLowerCase().includes('free')" 
                  class="col-header-price" @click="scrollToPricing"
                  >{{colHeader.monthlyPrice}}</p>
                  <p v-else class="col-header-price" @click="scrollToPricing">{{colHeader.monthlyPrice}}/mo</p>
            </div>
         </div>
         <!-- groups -->
         <div v-for="(group,i) in block.groups.items"
            class="compare-group"
            :key="`compare-group-${i}`"
         >
            <div class="group-header">
               <media-partial v-if="group.icon"
                  class="group-icon"
                  :media="$helpers.getMedia(group.icon)"
               />
               <h4 class="group-headline">{{ group.headline }}</h4>
            </div>
            <!-- rows -->
            <div class="group-rows">
               <compare-row v-for="(row,i) in group.rows.items" 
                  :key="`compare-row-${i}`"
                  :row="row"
               />
            </div>
         </div>
      </template>
      <!-- MOBILE -->
      <template v-else>
         <h3 v-if="block.headline" class="mobile-headline">{{ block.headline }}</h3>
         <div class="accordion-wrapper">
            <compare-accordion-partial v-for="(acc,i) in accordion"
               :acc="acc"
               :accInd="i"
               :key="`accordion-${i}`"
               @handle-tab="handleTab"
            />
         </div>
      </template> 
   </section>
</template>

<script>
import CompareAccordionPartial from './partials/compare-accordion-partial.vue'
import CompareRow from './partials/compare-row-partial.vue'
import MediaPartial from './partials/media-partial.vue'
export default {
   name: 'CompareBlock',
   props: {
      block: Object
   },
   components: {
      MediaPartial,
      CompareRow,
      CompareAccordionPartial
   },
   data() {
      return {
         colHeaders: [
            this.block.column1,
            this.block.column2,
            this.block.column3
         ],
         accordion: []
      }
   },
   methods: {
      buildAccordion() {
         let acc1 = {
            id: 1,
            open: false,
            header: this.block.column1,
            groups: this.block.groups.items,
         }
         let acc2 = {
            id: 2,
            open: false,
            header: this.block.column2,
            groups: this.block.groups.items
         }
         let acc3 = {
            id: 3,
            open: false,
            header: this.block.column3,
            groups: this.block.groups.items
         }
         this.accordion = [acc1, acc2, acc3]
      },
      scrollTo(acc) {
         let headerOffset = 65.5
         let pos = acc.getBoundingClientRect().top
         let offsetPos = pos + window.pageYOffset - headerOffset;
         window.scrollTo({
            top: offsetPos,
            behavior: "smooth"
         });
      },
      handleTab(targetAcc, targetRef) {
         this.accordion.forEach(acc => {
            if (targetAcc.id === acc.id) {
               targetAcc.open === true ? acc.open = false : acc.open = true
            } else {
               acc.open = false
            }
         })
         this.scrollTo(targetRef)
      },
      scrollToPricing(){
         const pTop = document.querySelector('#pricing').offsetTop - 150 
         window.scrollTo({
            top: pTop,
            behavior: "smooth"
         });

      }
   },
   mounted() {
      this.$mq === 'mobile' && this.buildAccordion()
   },
   updated() {
      if (!this.accordion.length) {
         this.$mq === 'mobile' && this.buildAccordion()
      }
   }
}
</script>