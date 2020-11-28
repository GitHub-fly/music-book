<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 每个页面公共css */
@import url('@/static/style/app.scss');
/* 引入iconfont */
@import url('@/static/iconfont/iconfont.css');
@import url('/common/free.css');
@import url('/common/common.css');
@import url('/common/animate.css');
</style>
