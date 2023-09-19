<template>
   <yes v-if="iconType === 'yes'" class="compare-yes" />
   <no v-else-if="iconType === 'no'" class="compare-no" />
   <maybe v-else-if="iconType === 'maybe'" class="compare-maybe" />
   <p v-else-if="iconType === 'sometimes'" class="compare-sometimes">Sometimes</p>
</template>

<script>
import Yes from '~/assets/images/compare-yes.svg?inline'
import No from '~/assets/images/compare-no.svg?inline'
import Maybe from '~/assets/images/compare-maybe.svg?inline'
export default {
   name: 'CompareOption',
   props: {
      type: String
   },
   components: {
      Yes,
      No,
      Maybe
   },
   data() {
      return {
         iconType: this.type.toLowerCase().replace(/\s+/g,'-')
      }
   }
}
</script>