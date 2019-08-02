import Vue from 'vue'
import Router from 'vue-router'
import states from "../store/states"
import { sources } from '../config/httpconfig'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/login',
      alias:'/accounts/login',
      name: '登录',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
        children:[
            //{path:"/c1",component: () => import(/* webpackChunkName: "about" */ '@/views/c1.vue')},
            {path:"/c1/:id?",name:"c1",component: () => import(/* webpackChunkName: "about" */ '@/views/c1.vue')},
            {path:"/c2",name:"c2",component: () => import(/* webpackChunkName: "about" */ '@/views/c2.vue')}
        ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }]
})
/**
 * @权限配置
 */
// 公共路由
let pubarr = ["/", "/login"];
// 学生路由
let stuarr = ["/student/home"];
// 老师路由
let teaarr = ["/teacher/home"];
let patharr = [];


router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  document.title = to.meta.title || to.name
  //路由发生变化时取消当前页面网络请求
  Object.keys(sources).forEach(item => {
    sources[item]('取消前页面请求')
  })
  for (var key in sources) {
    delete sources[key]
  }
  // 如果是老师，不能进学生路由
  // if (states.token.indexOf("TEACHER") != -1) {
  //   if (stuarr.indexOf(to.path) != -1) {
  //     return;
  //   }
  // }
  // // 如果是学生，不能进老师路由
  // else if (states.token.indexOf("STUDENT") != -1) {
  //   if (teaarr.indexOf(to.path) != -1) {
  //     return;
  //   }
  // }
  // else {// 游客
  //   if (pubarr.indexOf(to.path) == -1) {
  //     router.push("/login");
  //     return;
  //   }
  // }
  patharr.push(from.fullPath);
  next()
})

export default router