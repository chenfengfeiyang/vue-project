import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//注册Vuex
Vue.use(Vuex)

//状态
const state = {
  userinfo : JSON.parse(localStorage.getItem('userinfo')),
  userlist : []
};

//mutations 主要用于操作state

const mutations = {
  //保持用户信息
  SAVE_USERINFO(state,userinfo){
    localStorage.setItem('userinfo',JSON.stringify(userinfo));
    state.userinfo = userinfo;
  },
  //获取全局得用户数据
  GET_USERLIST(state,userlist){
    state.userlist = userlist;
  },
  // ADD_USERINFO(state,data){
  //   console.log("mutations------------");
  //   // state.userlist.push(data);  //这个data是response
  //   console.log(data);
  // },
  // DEL_USERINFO(state,data){
  //   console.log('1111111');
  //   console.log(state);
  //   //mutations.GET_USERLIST
  //   // this.GET_USERLIST();
  // }
};

//定义actions 异步的 主要是 提交 mutations 由mutations来改变状态（数据）
const actions = {
  //这种方式为异步  需要改成同步
  /*GET_USERLIST({commit}){
    axios.post('api/getUserList').then(response => {
      commit('GET_USERLIST',response.data)
    })
  }*/
  //同步请求
  GET_USERLIST({commit}){
    return new Promise((resolve,reject)=>{
      axios.post('api/getUserList').then(response => {
        commit('GET_USERLIST',response.data);
        resolve();
      })
    })
  },
  ADD_USERINFO({commit},data){
    // console.log('actions');
    // console.log(data);
    // commit('ADD_USERINFO',data);
    return new Promise((resolve,reject) => {
      axios.post('api/addUserInfo',{data}).then(() => {
      // axios.post('api/addUserInfo',{data}).then(response => {
        // commit('ADD_USERINFO',response);  //调用上面mutations  感觉：返回值没有改变state,不用调用mutations
        // console.log(response);
        resolve();
      })
    })
  },
  DEL_USERINFO({},id){
    return new Promise((resolve,reject) => {
      axios.post('api/delUserInfo',{id}).then(() =>{
        // commit('DEL_USERINFO',response);
        resolve();
      })
    })
  },
  EDIT_USERINFO({},data){
    return new Promise((resolve,reject) => {
      axios.post('api/editUserInfo',{data}).then(() => {
        resolve();
      })
    })
  }

};

//定义全局共享属性， 多用于过滤数据
const getters = {
  oldUser: state => state.userlist.filter(v => v.age > 20),
  youngUser : function (state) {
    return state.userlist.filter(function (v) {
      return v.age < 21
    });
  },
  allUser : state => state.userlist
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
