<template>
	<view>
	<uni-list style="margin-top: 24upx;">
		<!-- <uni-list-item :title="dataList.name" :note="dataList.phone"  :thumb="dataList.avatar" ></uni-list-item> -->
		<view style="display: flex;margin-left: 4%;border-bottom: 1px solid #fafafa;height: 134upx;padding-top: 26upx;" @click='personMsg'>
			<image :src="dataList.avatar" mode="" style="height: 108upx;width: 108upx;border-radius: 50%;"></image>
			<view style=" padding-left: 3%; line-height: 64upx; font-size: 28upx;flex: 1; ">
				<view class="">
					{{dataList.name}}
				</view>
				<view style=" font-size: 24upx; line-height: 24upx; color: #666; ">
					{{dataList.phone}}
				</view>
			</view>
			<view style=" width: 20%; margin-top: 17px; ">
				<view style="line-height: 20px;width: 49%;height: 20px;border: 1px solid #121826;font-size: 12px;text-align: center;border-radius: 4px;color: #121826;">
					编辑
				</view>
			</view>
		</view>
		<uni-list-item title="我的收货地址" @click='shipaddr'></uni-list-item>
	</uni-list>
	<view class="mar_bt"></view>
	<uni-list>
		<uni-list-item title="修改手机号码" @click='changephone'></uni-list-item>
		<uni-list-item title="修改登录密码" @click='changePwd'></uni-list-item>
		<uni-list-item title="修改支付密码" @click='changePwdzf' badge-text="未设置" :show-badge="dataList.paypwd==''"></uni-list-item>
	</uni-list>
	<!-- <view class="mar_bt"></view>
	<uni-list v-if="dataList.isrealname==0">
		<uni-list-item title="实名认证" @click='authReal' badge-text="未认证" :show-badge="dataList.isrealname==0"></uni-list-item>  
	</uni-list> -->
	<view class="mar_bt"></view>
	<uni-list>
		<uni-list-item title="帮助中心"></uni-list-item>
		<uni-list-item title="关于我们" @click="aboutUs"></uni-list-item>
	</uni-list>
	<view style="height: 200upx;"></view>
		<!-- <button type="primary" plain="true"  @click="request" >退出登录</button> -->
		 <view class="bottom_add">
			<view class="fixed_btm" @click="request">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		 components: {uniList,uniListItem},
		data() { 
			return {
				dataList:''
			}
		},
		onShow:function(option){
			uni.getStorageSync('token')==''?this.notoken():''//初始首页判断登录状态
			this.requestLIST();
		},
		//  onPullDownRefresh() {
  //       //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		// 	this.requestLIST();
		// },
		methods: {
			requestLIST(){
				var id= uni.getStorageSync('id')
				this.$http.get('/api/v1/getuserinfo', {id: id}).then(res => {
					uni.stopPullDownRefresh();  //停止下拉刷新动画
					if(res.data.resultCode==200){
						//成功 
						this.dataList=res.data.data.user;
						console.log(this.dataList)
					}else{
						//有误
						uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 2000,
						position:'top',
						});
					}
				}).catch(err => {
				
				})
			},
			shipaddr(){
				uni.navigateTo({ 
					url: '../shipAddress/shipAddress'
				});
			},
			authReal(){
				uni.navigateTo({ 
					url: '../authReal/authReal'
				});
			},
			aboutUs(){
				uni.navigateTo({ 
					url: '../usAbout/usAbout'
				});
			},
			personMsg(){
				uni.navigateTo({ 
					url: "../personMsg/personMsg?avatar="+this.dataList.avatar+"&name="+this.dataList.name+""
				});
			},
			changephone(){
				uni.navigateTo({ 
					url: '../changephone/changephone'
				});
			},
			changePwd(){
				uni.navigateTo({ 
					url: '../changePwd/changePwd?phone='+this.dataList.phone
				});
			},
			changePwdzf(){ 
				uni.navigateTo({ 
					url: '../changePwdzf/changePwdzf?phone='+this.dataList.phone
				});
			},
			request(){
				uni.removeStorageSync('token');//清除token缓存
				const res = uni.getStorageInfoSync();
					console.log(res.keys);
				uni.showModal({
					title: '提示',
					content: '已退出登录！',
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: '../../login/login'
							});
						} 
					}
				});
			
			},
		}
	}
</script>

<style>

.uni-list-cell__containe:after{
	background-color: red;
}
.uni-list[data-v-8577f66e]:after{
	background-color: #fff;
}
.uni-list[data-v-8577f66e]:before{
	background-color: #fff;
}

.bottom_add{
	height: 130upx;
	background: #fafafa;
	width: 100%;
	position: fixed;
	/* bottom: 0; */
	left: 0%;
	width: 100%;
	z-index: 99;
	bottom:0;
	
}
.fixed_btm {
	color:#EDB315;
}
</style>
