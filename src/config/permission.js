/**
 * @author hujiangjun 1217437592@qq.com
 * @description 路由控制
 */
//import router object, it come from router/index
import router from '@/router';
//import vuex store instance
import store from '@/store';
//import NProgress to show page loading status
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//import get page title function
import { getPageTitle } from '@/utils/index';
//import software setting
import { setting } from '@/config/setting';
const { authentication, loginInterception, progressBar, routesWhiteList, recordRoute } = setting;

//set NProgress
NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});
//set router before each function
router.beforeEach(async (to, from, next) => {
  if (progressBar) NProgress.start();

  let hasToken = store.getters['user/accessToken'];
  if (!loginInterception) hasToken = true;

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      if (progressBar) NProgress.done();
    } else {
      const hasPermissions =
        store.getters['user/permissions'] && store.getters['user/permissions'].length > 0;
      if (hasPermissions) {
        next();
      } else {
        try {
          let permissions;
          if (!loginInterception) {
            //settings.js loginInterception为false时，创建虚拟权限
            await store.dispatch('user/setPermissions', ['admin']);
            permissions = ['admin'];
          } else {
            permissions = await store.dispatch('user/getUserInfo');
          }

          let accessRoutes = [];
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('routes/setRoutes', permissions);
          } else if (authentication === 'all') {
            accessRoutes = await store.dispatch('routes/setAllRoutes');
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item);
          });
          next({ ...to, replace: true });
        } catch {
          await store.dispatch('user/resetAccessToken');
          if (progressBar) NProgress.done();
        }
      }
    }
  } else {
    // 免登录路由
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute) {
        next(`/login?redirect=${to.path}`);
      } else {
        next('/login');
      }
      if (progressBar) NProgress.done();
    }
  }
  document.title = getPageTitle(to.meta.title);
});
//set router after Each
router.afterEach(() => {
  if (progressBar) NProgress.done();
});
