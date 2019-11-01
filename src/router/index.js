import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Dashboard from '@/views/home/Dashboard'
import LoginWX from '@/views/wx/LoginWX'
import JumpToWechat from '@/views/wx/JumpToWechat'
import PlayerList from '@/views/player/List'
import NumberTool from '@/views/shuce/NumberTool'
// import PlayerDetails from '@/views/player/Details'
// import InputPlayer from '@/views/player/Input'
import AdminDashboard from '@/views/admin/Dashboard'
import YiXueDashboard from '@/views/yixue/index'
import CheckList from '@/views/yixue/check'
import AlertCheck from '@/views/AlertCheck'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Dashboard,
      meta: { requiresAuth: false }
    }, {
      path: 'player/list',
      component: PlayerList
    }, {
      path: 'player/details',
      // component: InputPlayer 异步加载
      component: function (resolve) {
        require(['../views/player/Input.vue'], resolve)
      }
    }, {
      path: 'admin',
      component: AdminDashboard
    }, {
      path: 'yixue',
      component:YiXueDashboard
      // component: function (resolve) {
      //   require(['../views/yixue/index'], resolve)
      // }
    }, {
      path: 'AlertCheck',
      component: AlertCheck,
      name:"AlertCheck"
    }, {
      path: 'checkMyself',
      component:CheckList
      // component: function (resolve) {
      //   require(['../views/yixue/check'], resolve)
      // }
    }, {
      path: 'knowMyself',
      component:CheckList
      // component: function (resolve) {
      //   require(['../views/yixue/check'], resolve)
      // }
    }, {
      path: 'mark',
      component: function (resolve) {
        require(['../views/yixue/check'], resolve)
      }
    }]
  }, {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  }, {
    path: '/wx/loginWX',
    component: LoginWX,
    meta: { requiresAuth: false }
  }, {
    path: '/wx/jumpToWechat',
    component: JumpToWechat,
    meta: { requiresAuth: false }
  }, {
    path: '/shuce/NumberTool',
    component: NumberTool,
    meta: { requiresAuth: false }
  }]
})
