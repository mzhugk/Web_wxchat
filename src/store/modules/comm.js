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
  token:false,
};


const actions =  {
  gettoken({commit}){
    // "use strict";
    api.gettoken(function (res) {
      if(res.status==200){
        let token=res.data.token_secret;
      commit(types.COMM_TOKEN,token)
      }
    })
  },
};


const mutations = {
  [types.COMM_TOKEN](state,res){

      state.token = res
  },

};

const getters = {
  token:state => state.token,

};

export default {
  state,
  actions,
  mutations,
  getters
}
