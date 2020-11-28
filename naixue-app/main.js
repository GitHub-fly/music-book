import Vue from 'vue';
import App from './App';
//引入vuex
import store from './store';

Vue.config.productionTip = false;

App.mpType = 'app';
Vue.prototype.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
//设置vuex为全局组件
Vue.prototype.$store = store;


const app = new Vue({
	...App,
	store
});
app.$mount();
