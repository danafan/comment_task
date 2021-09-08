import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/login'],resolve)
const home = resolve=>require(['@/pages/home'],resolve)
const comment_list = resolve=>require(['@/pages/CommentPages/comment_list'],resolve)

Vue.use(Router)

const router = new Router({
  routes: [
  { path: '/login',name:"登录", component: login},
  {
    path: '/home',
    component: home,
    children:[
    { path: '/comment_list',name:"评价列表", component: comment_list}
    ]
  }
  ]
})
// 路由跳转前的钩子
// router.beforeEach(function (to, from, next) {
//   let path = to.fullPath;
//   sessionStorage.setItem("tab",path);
//   next()
// })
// router.beforeEach((to,from,next)=>{
//   if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
//     if (sessionStorage['username']) {
//       next();
//     }else{
//       next({
//         path:"/login",
//         query:{
//           redirect:to.fullPath
//         }
//       });
//     }
//   }else{
//     next()
//   }
// });




const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;