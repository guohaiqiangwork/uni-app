<template>
	<view>
		<view style="text-align: center;">
			<view style="padding-top:120upx">
			<image src="../../../static/img/aboutus.png" ></image>
			</view>
			<view class="two">惠客+</view>
			<view class="three">版本：V1.0.0</view>
			<view class="four" @click="userXieyi">《惠客+用户协议》</view>
			<view class="five" @click="policy">《用户隐私政策》</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			userXieyi(){
				uni.navigateTo({
					url:'../userProtocol/userProtocol'
				});
				
			},
			policy(){
				uni.navigateTo({
					url:'../policyPrivacy/policyPrivacy'
				});
			}
			
		}
	}
</script>

<style>
 image {
	 height:210upx;
	 width:211upx;
 }
 .two{
	 column-rule: #303030;;
	 font-size:30Upx;
 }
 .three{
	 font-size:26upx;
	 color:#5A5A5A;
	 padding-top:20upx;
 }
 .four {
	 color:#A0A0A0;
	font-size: 26upx;
	
	padding-top: 600upx; 
 }
 .five{
	  color:#A0A0A0;
	 font-size: 26upx;
	 padding-top:18upx;
 }
</style>
