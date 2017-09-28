/**
 * Created by linhaifeng on 2016/11/15.
 */

/*
* 文章内容
*
* */
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
