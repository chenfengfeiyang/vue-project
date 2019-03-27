import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import list from '@/components/list'
// import login from '@/components/login'
// import index from '@/components/index'

//异步加载组件
const login = () =>import('@/components/login')
const index = () =>import('@/components/index')
const userList = () =>import('@/components/userList')
const userAdd = () =>import('@/components/userAdd')
const home = () =>import('@/components/home')

/*const login = function(){
  return import('@/components/login');
}*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: '/userList',
          name: 'userList',
          component: userList
        },
        {
          path: '/userAdd',
          name: 'userAdd',
          component: userAdd
        },
        {
          path: '',
          name: 'home',
          component: home
        }
      ]
    }
  ]
})
