import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';
Vue.prototype.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
console.log(uni.getSystemInfoSync());

const app = new Vue({
	...App
});
app.$mount();
