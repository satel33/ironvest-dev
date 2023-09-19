<template>
   <div :class="[`acc`, acc.open && `acc-active`]" ref="acc">
      <div :class="[`acc-tab`]" @click="handleTab(acc)">
         <h5 class="acc-tab-header">{{ headerText }}</h5>
         <tab-icon-plus class="tab-icon tab-icon-plus" />
      </div>
      <div :class="[`acc-content`]" ref="accContent">
         <cta :cta="acc.header.cta" :dark="false" :arrow="true" :mini="true" />
         <div v-for="(group,j) in acc.groups"
            class="acc-group"
            :key="`acc-group-${j}`"
         >
            <div class="group-header">
               <media-partial v-if="group.icon"
                  class="group-icon"
                  :media="$helpers.getMedia(group.icon)"
               />
               <h5 class="group-headline">{{ group.headline }}</h5>
            </div>
            <div class="group-rows">
               <compare-row v-for="(row,k) in group.rows.items" 
                  :key="`compare-row-${k}`"
                  :row="row"
                  :select="accInd + 1"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import MediaPartial from './media-partial.vue'
import CompareRow from './compare-row-partial.vue'
import TabIconPlus from '~/assets/images/tab-icon-plus.svg?inline'
import Cta from './cta.vue'
export default {
   name: "CompareGroup",
   props: {
      acc: Object,
      accInd: Number
   },
   components: {
      MediaPartial,
      CompareRow,
      TabIconPlus,
      Cta
   },
   data() {
      return {

      }
   },
   methods: {
      handleTab() {
         this.$emit('handle-tab', this.acc, this.$refs.acc)
      }
   },
   computed: {
      headerText() {
         return `${this.acc.header.planTitle} ${this.acc.header.monthlyPrice}${!this.acc.header.monthlyPrice.toLowerCase().includes('free') ? '/mo' : null}`
      }
   },
   mounted() {
      if (this.accInd === 0) {
         this.acc.open = true
      }
   },
   updated() {
      this.acc.open ?
         this.$refs.accContent.style.maxHeight = this.$refs.accContent.scrollHeight + "px" :
         this.$refs.accContent.style.maxHeight = null
   }
}
</script>