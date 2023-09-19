<template>
   <section
      class="faq-block"
      ref="faq-block"
      :class="[
         `faq-block-${block.filtered ? 'filtered' : 'simple'}`,
         { 'rounded-corners': block.roundedCorners },
      ]"
      :data-rounded-corners="block.roundedCorners"
   >
      <richtext-partial
         v-if="block.text"
         class="text"
         :content="block.text.json"
      />
      <div
         :class="[
            `faq-wrapper`,
            `faq-${block.filtered ? 'filtered' : 'simple'}`,
         ]"
         v-if="rawFaqs.length"
      >
         <template v-if="block.filtered">
            <filter-partial
               :filters="categories"
               :current="currentCat"
               @handle-filter="handleFilter"
            />
            <h6 class="label">{{ this.currentCat.label }} questions</h6>
            <faq-item-partial
               v-for="(faq, i) in activeFilteredFaqs"
               :key="`faq-item-${i}`"
               :faq="faq"
               @handle-tab="handleTabs"
            />
         </template>
         <template v-else>
            <faq-item-partial
               v-for="(faq, i) in simpleFaqs"
               :key="`faq-item-${i}`"
               :faq="faq"
               @handle-tab="handleTabs"
            />
         </template>
      </div>
      <div :class="[`cta-wrapper`, block.ctaHeadline && `w-headline`]">
         <h4 :class="[`cta-headline`]" v-if="block.ctaHeadline">
            {{ block.ctaHeadline }}
         </h4>
         <cta
            v-if="block.cta"
            :cta="block.cta"
            :arrow="true"
            :mini="false"
            :dark="false"
         />
      </div>
   </section>
</template>

<script>
import RichtextPartial from './partials/richtext-partial.vue'
import FaqItemPartial from './partials/faq-item-partial.vue'
import FilterPartial from './partials/filter-partial.vue'
import Cta from './partials/cta.vue'
export default {
   name: 'FaqBlock',
   props: {
      block: Object,
   },
   components: {
      RichtextPartial,
      FaqItemPartial,
      FilterPartial,
      Cta,
   },
   data() {
      return {
         rawFaqs: Array.from(this.block.faqItemsCollection.items),
         simpleFaqs: [],
         filteredFaqs: [],
         activeFilteredFaqs: [],
         categories: [],
         currentCat: {
            slug: 'general',
            label: 'General',
         },
      }
   },
   methods: {
      handleTabs(targetFaq) {
         let targetFaqs = this.block.filtered
            ? this.activeFilteredFaqs
            : this.simpleFaqs
         targetFaq.open
            ? targetFaqs.forEach(faq => (faq.open = false))
            : targetFaqs.forEach(
                 faq => (faq.open = faq.id === targetFaq.id ? true : false)
              )
      },
      handleFilter(targetFilter) {
         if (targetFilter) {
            this.activeFilteredFaqs.forEach(faq => (faq.open = false))
            this.currentCat = targetFilter
            this.filteredFaqs.forEach((faqGroup, i) => {
               if (this.currentCat.slug === faqGroup.cat.slug) {
                  this.activeFilteredFaqs = faqGroup.faqs
               }
            })
         } else {
            this.filteredFaqs.forEach((faqGroup, i) => {
               if (this.currentCat.slug === faqGroup.cat.slug) {
                  this.activeFilteredFaqs = faqGroup.faqs
               }
            })
         }
      },
   },
   mounted() {
      // FILTERED
      if (this.block.filtered) {
         // gather unique categories
         this.rawFaqs.forEach((faq, i) => {
            if (faq.category.replace(/\s+/g, '-').toLowerCase() === 'general') {
               this.categories.unshift({
                  // general to start of arr
                  slug: faq.category.replace(/\s+/g, '-').toLowerCase(),
                  label: faq.category,
               })
            } else {
               this.categories.push({
                  // else to end of arr
                  slug: faq.category.replace(/\s+/g, '-').toLowerCase(),
                  label: faq.category,
               })
            }
         })
         this.categories = this.categories.filter(
            (value, index, self) =>
               index === self.findIndex(t => t.slug === value.slug)
         )
         // set current category
         this.currentCat = this.categories[0]
         // build filtered faqs - base categories
         this.categories.forEach((cat, i) => {
            this.filteredFaqs.push({
               id: i + 1,
               cat: cat,
               faqs: [],
            })
         })
         // build filtered faqs - insert matching faqs
         this.rawFaqs.forEach((faq, i) => {
            let rawFaqCat = faq.category.replace(/\s+/g, '-').toLowerCase()
            this.filteredFaqs.forEach(filter => {
               if (filter.cat.slug === rawFaqCat) {
                  filter.faqs.push({
                     id: i + 1,
                     data: faq,
                     open: false,
                  })
               }
            })
         })
         this.handleFilter()
         // SIMPLE
      } else {
         // build simple faqs
         this.rawFaqs.forEach((faq, i) => {
            this.simpleFaqs.push({
               id: i + 1,
               data: faq,
               open: false,
            })
         })
      }
   },
}
</script>
