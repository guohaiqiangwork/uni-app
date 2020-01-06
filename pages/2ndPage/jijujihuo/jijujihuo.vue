<template>
	<view>
		<view class="card_header" v-if="datastauts=='0'" @click="ruwang()">
			<view class="" style="width: 40%;padding-left: 5%;justify-content: center;align-items: center;display: flex;">
				<image src="../../../static/img/hkrt.png" mode="scaleToFill" style="width:267upx;height: 60upx;"></image>
			</view>
			<view style=" flex: 1; text-align: right;height: 172upx;line-height:172upx;">
				<text style="padding-right: 10upx;" class="font-color2" >●</text> 未入网
			</view>
			<view style=" width: 10%; text-align: center;height: 172upx;line-height:172upx;">
				<text class="icon_4">&#xe769;</text>
			</view>
		</view>
		<view class="card_header" v-if="datastauts=='1'" @click="acMachine">
			<view class="" style="width: 40%;padding-left: 5%;justify-content: center;align-items: center;display: flex;">
				<image src="../../../static/img/hkrt.png" mode="scaleToFill" style="width:267upx;height: 60upx;"></image>
			</view>
			<view style=" flex: 1; text-align: right;height: 172upx;line-height:172upx;">
				<text style="padding-right: 10upx;color:#EDB315"  >●</text> 机具绑定
			</view>
			<view style=" width: 10%; text-align: center;height: 172upx;line-height:172upx;">
				<text class="icon_4">&#xe769;</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datastauts:'',
			}
		},
		onShow() {
			var id= uni.getStorageSync('id')
			this.$http.get('/api/v1/accessPlatform', {userid: id}).then(res => { 
				if(res.data.resultCode==200){
					this.datastauts=res.data.data.plats[0].haike;
				}else{
					//有误
					// uni.showToast({
					// title: res.data.message,
					// icon:'none',
					// duration: 2000,
					// position:'top',
					// });
				}
			}).catch(err => {
			
			})
		},
		methods: {
			acMachine(){
				uni.navigateTo({
					url: 'accNet/accNet'
				});
			},
			ruwang(){
				uni.navigateTo({
					url: 'ruwang/ruwang'
				});
			},
// 		    onNavigationBarButtonTap:function(e){
// 			          uni.navigateTo({
// 			          	url: '../jijuquestion/jijuquestion'
// 			          });
// 			},
		}
	}
</script>

<style>
.card_header{
	height: 172upx;line-height:172upx;width: 90%;margin-left: 5%;border: 1px solid #eee;background: #fff;margin-top: 30upx;display: flex;color: #080808;
}
.icon_4{
		font-family: iconfont;
		font-size: 24upx;
		color: #A0A0A0;
		padding-left: 4upx;
	}
</style>
