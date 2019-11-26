import App from './src/App';
import Vue from 'vue';
import {
    registeComponents
} from './src/common/register-components';
import { globalPlugin } from './src/common/global-plugin';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.use(globalPlugin);

// 注册全局组件
registeComponents(Vue);

new Vue({
    render: h => h(App)
}).$mount('#app');