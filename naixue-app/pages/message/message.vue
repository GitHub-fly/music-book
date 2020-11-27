<template>
	<view class="content" :style="'top:' + statusBarHeight + 'px;'">
		<view class="flex flex-column p-1">
			<textarea placeholder="请输入您要留言的内容" class="border w-100 p-1 rounded" style="height: 280rpx;" v-model="message.content"></textarea>
			<input type="text" class="mt-1 rounded p-1 border" v-model="message.name" placeholder="请输入用户名:" />
			<button @click="addMsg" class="submit w-100 mt-1" style="background-color: #bbdefb;">提交</button>
		</view>
		<view class="flex flex-column mt-2 p-2">
			<view class="flex-column mb-3" v-for="(item, index) in listData" :key="index">
				<view class="flex align-center">
					<text class="font text-primary">{{ item.name }}</text>
					<text class="ml-2 font-sm ">{{ item.content }}</text>
				</view>
				<text class="bg-warning text-center rounded mt-1 text-white font-sm" style="width: 80rpx;" @click="removeMsg(item._id)">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: this.$statusBarHeight,
			message: {
				name: '',
				content: ''
			},
			listData: [
				{
					_id: '',
					name: '',
					content: ''
				}
			]
		};
	},
	onLoad() {
		this.getData();
		console.log(this.statusBarHeight);
	},
	methods: {
		addMsg() {
			let data = this.message;
			uniCloud
				.callFunction({
					name: 'add',
					data: data
				})
				.then(res => {
					this.getData();
					this.message.name = ' ';
					this.message.content = '';
				});
		},
		getData() {
			uniCloud
				.callFunction({
					name: 'get'
				})
				.then(res => {
					this.listData = res.result.data;
				});
		},
		removeMsg(id) {
			console.log(id);
			let _id = id;
			uniCloud
				.callFunction({
					name: 'remove',
					data: {
						_id
					}
				})
				.then(res => {
					this.getData();
				});
		}
	}
};
</script>

<style>
</style>
