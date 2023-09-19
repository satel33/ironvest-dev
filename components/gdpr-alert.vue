<template>
   <div class="gdpr-alert-bar" v-if="gdprActive">
      <div class="close"><close @click="closeAlert" /></div>
      <p>We respect your personal privacy</p>
      <p class="p-xs">
         We use cookies to provide a proactive support, enhance site navigation,
         analyze site usage, and assist in our marketing efforts. Read our
         <a href="/legal/privacy-policy">Privacy Policy</a>
      </p>
   </div>
</template>

<script>
import dayjs from 'dayjs'
import close from '~/assets/images/close.svg?inline'

export default {
   components: { close },
   data(){
      return{
         gdprActive:false,
      }
   },
   methods: {
      closeAlert() {
         localStorage.setItem('gdpr',  dayjs())
         this.gdprActive = false;
      },
   },
   mounted(){
      const setTime = localStorage.getItem('gdpr')

      if(localStorage.getItem('gdpr') ){
         if(dayjs(setTime).isAfter(dayjs(setTime).add(7, 'day')) ){
            localStorage.removeItem('gdpr')
            this.gdprActive = true;
         }
      }else{
         this.gdprActive = true;
      }
   }
}
</script>
