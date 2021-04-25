import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Login from '../views/Login.vue';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    isPublic: true,
  },
},
{
  path: '/',
  name: 'main',
  component: Main,
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
    path: '/imgTemplate',
    name: 'imgTemplate',
    component: () => import('../views/ImgTemplate.vue'),
  },
  {
    path: '/imgTemplate/:id',
    name: 'imgTemplate',
    component: () => import('../views/ImgTemplate.vue'),
    props: true
  },
  {
    path: '/imgTemplateList',
    name: 'imgTemplateList',
    component: () => import('../views/ImgTemplateList.vue'),
  },
  {
    path: '/videoTemplate',
    name: 'videoTemplate',
    component: () => import('../views/VideoTemplate.vue'),
  },
  {
    path: '/videoTemplate/:id',
    name: 'videoTemplate',
    component: () => import('../views/VideoTemplate.vue'),
    props: true
  },
  {
    path: '/videoTemplateList',
    name: 'videoTemplateList',
    component: () => import('../views/VideoTemplateList.vue'),
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