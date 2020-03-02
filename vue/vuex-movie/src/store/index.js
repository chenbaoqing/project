import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading:true,
    city:"武汉"
  },
  mutations: {
    changeCity(state,city){
      state.city=city
    }
  },
  actions: {
    changeCity(ctx,city){
      ctx.commit("changeCity",city)
    }
  },
  modules: {
  }
})
