import axios from 'axios';
//引入axios
//获取net.config的配置内容
import { netConfig } from '@/config/net.config';
const { baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode } =
  netConfig;
//引入vuex store
import store from '@/store/index.js';
//引入router
import router from '@/router/index.js';
//按需引入elmessagebox
import { ElMessageBox, ElMessage } from 'element-plus';
//对object进行字符连接作用或者解析
import qs from 'qs';
//引入软件setting
import { setting } from '@/config/setting';
const { tokenName } = setting;

// eslint-disable-next-line no-unused-vars
let tokenLose = true;

/**
 *
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      tokenLose = false;
      ElMessageBox.confirm('您已掉线，或者访问权限出错，请重新登录！', '重新登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 处理重新登录逻辑
        })
        .catch(() => {
          tokenLose = true;
        });
      break;
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {});
      break;
    default:
      console.log('---');
      ElMessage.error(msg || `后端接口${code}异常`);
      break;
  }
};

//create axios instance
//baseURL, common URL
//timeout, timeout error setting
//headers, header content define
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});

//axios apply request interceptors setting
instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers[tokenName] = store.getters['user/accessToken'];
    }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//axios get respone from API interceptors setting
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { data } = response;
    const { code, msg } = data;

    // 操作成功
    if (successCode.indexOf(code) !== -1) {
      return res;
    } else {
      console.log('---====', response);
      handleCode(code, msg);
      return Promise.reject();
    }
  },
  (error) => {
    const { response, message } = error;
    console.log(error);
    if (error.response && error.response.data) {
      const { status, data } = response;
      console.log('---===1222=', response);
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常';
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        console.log('---===2244=', response);
        message = '后端接口' + code + '异常';
      }
      console.log('---===224ee4=', response);
      ElMessage.error(message || `后端接口未知异常`);
      return Promise.reject(error);
    }
  }
);

export default instance;
