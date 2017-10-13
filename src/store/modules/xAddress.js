
import api from '../../api/api'
import * as types from '../mutation';

const state = {
  addressdata:''
};


const actions =  {
  getAddressData({commit}){
    // "use strict";
    let token=sessionStorage.getItem('token');
    api.getAddressData(token,function (res) {
      commit(types.ADDRESS_DATA,res)
    })
  },
};


const mutations = {
  [types.ADDRESS_DATA](state,res){

    state.addressdata = res
  },

};

const getters = {
    getAddress:state => state.addressdata,
  };

export default {
  state,
  actions,
  mutations,
  getters
}
