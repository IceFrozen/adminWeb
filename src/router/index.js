import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Dashboard from '@/views/home/Dashboard'
import LoginWX from '@/views/wx/LoginWX'
import JumpToWechat from '@/views/wx/JumpToWechat'
import SellerList from '@/views/seller/List'
import SellerDetails from '@/views/seller/Details'
import CashRebate from '@/views/seller/CashRebate'
import ApplyList from '@/views/seller/ApplyList'
import PlayerList from '@/views/player/List'
// import PlayerDetails from '@/views/player/Details'
// import InputPlayer from '@/views/player/Input'
import AdminDashboard from '@/views/admin/Dashboard'
import YiXueDashboard from '@/views/yixue/index'
// import CheckList from '@/views/yixue/check'
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
      component: Dashboard
    }, {
      path: 'seller/list',
      component: SellerList
    }, {
      path: 'seller/details/:id',
      component: SellerDetails
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
      path: 'seller/CashRebate',
      component: CashRebate
    },{
      path: 'seller/ApplyList',
      component: ApplyList
    }, {
      path: 'admin',
      component: AdminDashboard
    }, {
      path: 'yixue',
      component: YiXueDashboard
    }, {
      path: 'AlertCheck',
      component: AlertCheck,
      name:"AlertCheck"
    }, {
      path: 'checkMyself',
      component: function (resolve) {
        require(['../views/yixue/check'], resolve)
      }
    }, {
      path: 'knowMyself',
      component: function (resolve) {
        require(['../views/yixue/know'], resolve)
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
  }]
})
