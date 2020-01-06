<template>
		<view class="header">
			<view class="h_top"></view>
			<view class="h_main" >
				<text>{{title}}</text>
				<!-- <view> -->
				<view class="msg" @click="msg">
					<image src="../../static/img/msg.png" mode="" style="height:45upx;width:45upx"></image>
				</view>
				<!-- </view> -->
				<!-- <view> -->
				<view class="dian" v-show="orangeD!=0">●</text>
				<!-- </view>  -->
				</view>
			</view>
		</view>	
</template> 

<script>
	export default {
		data() {
			return {
				text:''
			}
		},
		computed: {
			orangeD: function () {//状态管理中state数据实时展示在本页面
				return this.$store.state.orangeD;
			},
			title: function () {//状态管理中state数据实时展示在本页面
				return this.$store.state.title;
			},
		},
		// onShow() {
		// 	uni.showToast({
		// 		title: '消息通知',
		// 		icon:'none', 
		// 		duration: 1500,
		// 		position:'top'
		// 	});
		// },
		methods: {
			 msg(e){
				uni.navigateTo({
					url:"../../pages/msg/msg"
				})
				
			},
		}
	}
</script>

<style>
.msg{
		position: absolute;
		left: 28upx;
		top: 7%;
	}	
	.dian{
		    position: absolute;
		    left: 64upx;
		    top: -30%;
		    color: #E50000;
			font-size:20upx;
		
	}
	
</style>
