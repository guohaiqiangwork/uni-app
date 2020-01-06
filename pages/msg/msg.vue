<template>
	<view style="margin-top: 22upx;">
		<view class="msg_head" v-for="(item,index) in list" :key="item.value" v-if="list!=''">
			<view class="msg_time">
				<view class="">
					{{item.createtime}}
				</view>
			</view>
			<view class="msg_body">
				<view class="msg_title">
					<text class="icons L_icon">&#xe722;</text>
					<view class="">{{item.title}}</view>
				</view>
				<view class="msg_txt">
						{{item.content}}
				</view>
			</view>
		</view>
		
		<view v-if="list==''">
			<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
				<image src="../../static/img/nomore1.png" mode="aspectFit" ></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				list:'',
			}
		},
		onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.requestLIST();
		},
		onLoad() {
			//uni.getStorageSync('token')==''?this.notoken():''//判断登录状态
			var that=this;
			uni.startPullDownRefresh({
				success:function(res){
				 that.requestLIST();
				} 
			});  //这里表示当进入页面的时候就开始执行下拉刷新动画

		},    
		methods: { 
			requestLIST(){
				this.$http.get('/api/v1/getNotice', {id: uni.getStorageSync('id')}).then(res => {
					uni.stopPullDownRefresh();  //停止下拉刷新动画
					
					if(res.data.resultCode==200){
						this.list=res.data.data.notice
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
			notoken(){
				uni.showModal({
				title: '提示',
				content: '别着急，请先登录~',
				showCancel:false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url: '../login/login'
						});
					} 
				}
			});
			},
		}
	}
</script>

<style>

.msg_head{
	width: 90%;
	/* height: 280upx; */
	margin: 0 5%;
	/* border: 1px solid #eee; */
	text-align: center;
}
.msg_time{
	padding-top: 14upx;
	height:40upx; 
	line-height:40upx;
}
.msg_time view{ 
	font-size: 12px;
    background: #ccc;
    display: inline-block;
    padding: 0px 7px;
    border-radius: 3px;
    color: #fff;
}
.msg_body{
	background: #FFFFFF;
	/* height: 200upx; */
	margin-top: 20upx;
	border-radius: 10upx;
	box-shadow: -4px 3px 11px #ccc;
	padding-bottom: 30upx;
}
.msg_title{
	height: 35px;
    display: flex;
}
.msg_title view{
	line-height: 38px;
    height: 38px;
    font-weight: 700;
	font-size: 14px;
}
.msg_txt{
	text-align: left;
    padding: 0 4%;
    font-size: 12px;
    color: #888;
	line-height: 18px;
}

</style>
