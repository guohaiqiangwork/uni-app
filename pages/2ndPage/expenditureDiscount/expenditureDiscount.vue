<template>
				<view>
					<view class="e_b" v-for="(item,index) in imgList" :key="index" style="background-color: #FFFFFF;" v-if="imgList!=''" @click="resultsFinout(index)">
						<view class="e_l">
							<view class="e_t">
								提现
							</view>
							<view class="e_d">
								{{item.createtime}}
							</view>
						</view>
						<view class="e_r">
							{{item.pay.toFixed(2)}}
						</view>
					</view>
					
				<view v-if="imgList==''">
					<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
						<image src="../../../static/img/nomore2.png" mode="aspectFit" ></image>
					</view>
				</view>
				
				</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:'',  
				starttime:'',
				endtime:'',
			}
		},	
		onPullDownRefresh() {
			this.requestLIST();
		},
		onLoad(option) {
			if(option.startTime){
				this.starttime=option.startTime
				this.endtime=option.endTime
			}
			//uni.getStorageSync('token')==''?this.notoken():''//判断登录状态
			var that=this;
			uni.startPullDownRefresh({
				success:function(res){
				 that.requestLIST();
				} 
			});  //这里表示当进入页面的时候就开始执行下拉刷新动画
		
		},   
		methods: {
			resultsFinout(e){
				uni.navigateTo({
					url: '../resultsFinout/resultsFinout?resultList='+encodeURIComponent(JSON.stringify(this.imgList[e]))
				});
			},
				
			
			requestLIST(){
				var that=this;
				this.$http.get('/api/v1/selectCashList', {userid: uni.getStorageSync('id'),starttime:this.starttime,endtime:this.endtime}).then(res => {
					uni.stopPullDownRefresh();  //停止下拉刷新动画
					
					if(res.data.resultCode==200){
						this.imgList=res.data.data.userCash;
					}else if(res.data.resultCode==400){
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
			
		},
	}
</script>

<style>
.e_b {
	background-color: #fff;
	display: flex;
	padding-left: 6upx;
	border-bottom: 1px solid #eee;
}
.e_l {
	width: 50%;
	height:140upx;
}
.e_t {
	padding-left:70upx;
	font-size:30upx;
	line-height:104upx;
}
.e_t {
	padding-left:60upx;
	font-size:30upx;
	line-height:100upx;
	height:70upx;
}
.e_d {
	padding-left: 60upx;
	font-size:30upx;
	color:#a6a6a6;
	line-height: 74upx;
	height: 70upx;
}
.e_r {
	flex: 1;
	line-height:146upx;
	font-size: 17px;
	text-align: right;
    padding-right: 60upx;
}
</style>
