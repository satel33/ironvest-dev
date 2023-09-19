<template>
   <div class="slider-ctrls">
      <slider-ctrl-left :class="['ctrl-btn', 'ctrl-btn-left', {'inactive' : atStart}]" @click.native="$emit('prev')" />
      <slider-ctrl-right :class="['ctrl-btn', 'ctrl-btn-right', {'inactive' : atEnd}]" @click.native="$emit('next')" />
   </div>   
</template>

<script>
import SliderCtrlLeft from '../svgs/slider-ctrl-left.vue'
import SliderCtrlRight from '../svgs/slider-ctrl-right.vue'
export default {
  components: { 
      SliderCtrlLeft, 
      SliderCtrlRight
   },
   props: {
      atStart: Boolean,
      atEnd: Boolean
   },
   name: 'SliderCtrls'
}
</script>