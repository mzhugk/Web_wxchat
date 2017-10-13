
import api from '../../api/api'
import * as types from '../mutation';

const state = {
  orderNum:'',
};


const actions =  {

};


const mutations = {
  [types.ORDER_NUM](state,res){

    state.orderNum = res
  },

};

const getters = {
  orderNum:state => state.orderNum,
};

export default {
  state,
  actions,
  mutations,
  getters
}
