
import api from '../../api/api'
import api2 from '../../api/commInfo'
import * as types from '../mutation';

const state = {
  addressdata:'',
  editdata:false,
  selFlag:false,
  selAddressInfo:''
};


const actions =  {
  getAddressData({commit}){
    // "use strict";
    let token=api2.getCookie('user_token');
    api.getAddressData(token,function (res) {
      commit(types.ADDRESS_DATA,res)
    })
  },
  setEditData({commit},data){
    // "use strict";
    commit(types.EDIT_DATA,data)
  },
  setSelFlag({commit},data){
    // "use strict";
    commit(types.SEL_FLAG,data)
  },
  selAddressInfo({commit},data){
    // "use strict";
    commit(types.SEL_ADDRESS_INFO,data)
  },
};


const mutations = {
  [types.ADDRESS_DATA](state,res){

    state.addressdata = res
  },
  [types.EDIT_DATA](state,res){

    state.editdata = res
  },
  [types.SEL_FLAG](state,res){

    state.selFlag = res
  },
  [types.SEL_ADDRESS_INFO](state,res){

    state.selAddressInfo = res
  },

};

const getters = {
    getAddress:state => state.addressdata,
    getEditData:state => state.editdata,
    getSelFlag:state => state.selFlag,
    getSelAddressInfo:state => state.selAddressInfo,
  };

export default {
  state,
  actions,
  mutations,
  getters
}
