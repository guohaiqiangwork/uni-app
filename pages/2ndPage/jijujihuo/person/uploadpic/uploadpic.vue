<template>
	<view>
		<view class="" style=" background: #fff; padding-bottom: 15px; ">
			<view class="img_head">
				手持身份证
			</view>
			<view class="" style=" text-align: center; ">
				<image :src="uploadimg1" mode="" @click="uoloadPIC1" style=" width: 300upx; height: 200upx; "></image>
			</view>
		</view>
		<!-- <view class="mar_bt"></view> -->
		<view class="bottom_add">
			<view class="fixed_btm" @click="finsh">
				完成
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				uploadimg1: '../../../../../static/img/scsfz.png',
				uploadFileimg1:'',//保存线上路径
				dataFrom:'',
				flag:'0',
			}
		},
		onLoad(option) {
			this.dataFrom=JSON.parse(option.dataFrom)
			console.log(JSON.parse(option.dataFrom))
		},
		methods: {
			finsh(){
				if(this.uploadFileimg1==''){
					uni.showToast({
					    title: '请先上传附件信息',
					    duration: 2000,
						icon:'none',
					});
				}else{ 
					
					if(this.flag=='0'){
						this.flag='1';
						uni.showLoading({
								title: '提交中'
						});  
						this.dataFrom.cardHandHoldPhoto=this.uploadFileimg1;
						console.log(this.dataFrom)
						this.dataFrom.userid=uni.getStorageSync('id');
						
						this.$http.get('/api/v1/PersonalNetwork',this.dataFrom).then(res => {
							this.flag='0';
							uni.hideLoading();
							if(res.data.resultCode==200){
								uni.navigateBack({
									delta: 5,
									animationType: 'pop-out',
									animationDuration: 200
								});
							}else{
								uni.showToast({
								    title: res.data.message,
								    duration: 2000,
									icon:'none',
								});
							}
						}).catch(err => {
						
						})
					}else{
						
						uni.showLoading({
								title: '请勿重复点击，提交中'
						}); 
					}
				
				}
			},
			uoloadPIC1(){
				var that=this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    //sourceType: ['album'], //从相册选择
				    success: function (res) {
						that.uploadimg1=res.tempFilePaths[0]
						uni.showLoading({
								title: '上传中'
						});  
							uni.uploadFile({
								url: "https://www.nmgyf.com.cn/primary/api/v1/upload",
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {  
								    uni.hideLoading();
									console.log(uploadFileRes);
									console.log(uploadFileRes.data);
									that.uploadFileimg1=uploadFileRes.data;
										
								},  
							}) 
				    }
				});
			}
		}
	}
</script>

<style>
.img_head{
	    height: 100upx;
	    line-height: 100upx;
	    padding-left: 30upx;
	    color: #666;
	    font-size: 30upx;
}
.fixed_btm{
	height: 100upx;
	margin-top: 15upx;
	margin-left: 5%;
	background: #121826;
	border-radius: 50upx;
	text-align: center;
	line-height: 100upx;
	color: #EDB315; 
	width: 90%;
}
.bottom_add{
	height: 130upx;
	background: #fafafa;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
}
</style>
