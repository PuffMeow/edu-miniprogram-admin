import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('../views/Login.vue'),
  meta: {
    isPublic: true,
  },
},
{
  path: '/',
  name: 'main',
  component: () => import('../views/Main.vue'),
  children: [{
    path: '/',
    name: 'welcom',
    component: () => import('../views/Welcome.vue'),
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('../views/Swiper.vue'),
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/PublishArtical.vue'),
  },
  {
    path: '/articalList',
    name: 'articalList',
    component: () => import('../views/ArticalList.vue'),
  },
  {
    path: '/classManage',
    name: 'classManage',
    component: () => import('../views/ClassManage.vue')
  },
  {
    path: '/ClassManage?id',
    name: 'classManage',
    component: () => import('../views/ClassManage.vue'),
    props: true
  },
  {
    path: '/ClassList',
    name: 'classList',
    component: () => import('../views/ClassList.vue'),
  }],
},
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (!to.meta.isPublic && !localStorage.token && !localStorage.username) {
  //   Vue.prototype.$message({
  //     type: 'error',
  //     message: '请登录',
  //   });
  //   return next('/login');
  // }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;