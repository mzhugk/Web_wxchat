
import api from '../../api/api'

const state = {
  test1:{
    item1: false,
    item2:'',
  },

  test2:56
};


const actions =  {
  testfun({commit}){
    // "use strict";
    api.test(function (res) {
      commit('testMu',res)
    })
  },
};


const mutations = {
  testMu(state,res){

    state.test2 = res
  },

};

const getters = {
  testgetter:state => state.test2,

};

export default {
  state,
  actions,
  mutations,
  getters
}
