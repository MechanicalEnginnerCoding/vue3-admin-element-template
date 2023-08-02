import { createApp } from 'vue'; //从vue中引入createApp方法对vue application 产生对象

// permission 权限文件
/**
 * 1.产生设置路由，对路由拦截器进行动态控制
 * 2.使用vuex建立全局状态的管理
 * 3.引入npgrogress javascript库可以动态显示路由切换进度，减少用户不佳体验
 * 4.引入常用工具函数 getPageTitle
 * 5.引入软件设置setting
 */
import './config/permission';

// element
/**
 * 引入element-plus css样式表
 * 问题：除了样式表还需要其它吗？
 */
import 'element-plus/theme-chalk/display.css';
/**
 * 引入App.vue vue的程序入口并创建application object
 */
import App from './App.vue';
const app = createApp(App);
/**
 * 引入Vue 剪贴板，这样可以在vue应用中实现复制黏贴工作
 */
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
app.use(VueClipboard);

// layout components
/**
 * 引入所有组件componets
 * 组件componets和views的区别在于：
 * views会在路由表router的component中出现
 * component在引入到views中进行局部呈现
 */
import layoutComp from './layouts/components/export';
layoutComp(app);

// router
/**
 * 引入router到应用全局中
 * 这与permission的引入有区别
 */
import router from './router/index';
app.use(router);

// vuex
/**
 * 引入vuex中的全局状态变量引入
 */
import store from '@/store';
app.use(store);

// 按需注册方式
// import elementPlus from './plugin/el-comp';
// 注册 elementPlus组件/插件
// elementPlus(app);
// // 完整引入

// 注册字节跳动图标
/**
 * 这里使用了非常巧妙的办法，使用一个文件引入icon,
 * 这样main.js就比较简洁。
 */
import iconPark from './plugin/icon-park';
iconPark(app);
/**
 * 引入语言库方便双语转换
 */
import loadI18n from './plugin/i18n';
loadI18n(app);
/**
 * 挂载vue application到index.html app div中
 */
app.mount('#app');
