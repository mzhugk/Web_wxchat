
import api from '../../api/api'
import * as types from '../mutation';

const state = {
  orderNum:'',
  orderType:0,
};


const actions =  {
  setOrderType({commit},data){
    // "use strict";
    commit(types.ORDER_TYPE,data)
  },
};


const mutations = {
  [types.ORDER_NUM](state,res){

    state.orderNum = res
  },
  [types.ORDER_TYPE](state,res){

    state.orderType = res
  },
};

const getters = {
  orderNum:state => state.orderNum,
  orderType:state => state.orderType,
};

export default {
  state,
  actions,
  mutations,
  getters
}
