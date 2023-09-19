export const state = () => ({
   videoModalActive: false,
   videoModalSrc: null,
})

export const getters = {
   getVideoModalActive(state) {
      return state.videoModalActive
   },
   getVideoModalSrc(state) {
      return state.videoModalSrc
   }
}

export const mutations = {
   toggleVideoModalActive(state, payload) {
      state.videoModalActive = payload.active
      state.videoModalSrc = payload.src
   }
}