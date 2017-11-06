
import api from '../../api/api'
import * as types from '../mutation';

const state = {
  addressdata:'',
  editdata:false
};


const actions =  {
  getAddressData({commit}){
    // "use strict";
    let token=sessionStorage.getItem('token');
    api.getAddressData(token,function (res) {
      commit(types.ADDRESS_DATA,res)
    })
  },
  setEditData({commit},data){
    // "use strict";
    commit(types.EDIT_DATA,data)
  },
};


const mutations = {
  [types.ADDRESS_DATA](state,res){

    state.addressdata = res
  },
  [types.EDIT_DATA](state,res){

    state.editdata = res
  },

};

const getters = {
    getAddress:state => state.addressdata,
    getEditData:state => state.editdata,
  };

export default {
  state,
  actions,
  mutations,
  getters
}
