<template>

	<view>
		<view class="header">
			<view class="h_top" style="height: 60upx;"></view>
		</view>	
		<view class="logo" align="center">
			<image src="../../static/logo.png" mode="scaleToFill" style="width: 190upx; height: 190upx;margin: 0 auto;"></image>
		</view>
		
		<view class="L_form">
				<text class="icons L_icon">&#xe67f;</text>
			    <input class="L_input"  type="number" maxlength="11"  @input="keyPhone" placeholder="请输入您的手机号码" placeholder-style='color:#ccc' />
		</view>
		<view class="L_form">
				<text class="icons L_icon">&#xe67b;</text>
			    <input class="L_input" style="width: 70%;" @input="keyPwd" password  maxlength="20" placeholder="请输入密码" placeholder-style='color:#ccc' />
				<text class="forgetpwd" @click="forgetpwd">忘记密码？</text>
		</view>
		<view style="margin-top: 15upx;" @click="policy">
				<text class="policyAgree">登录即代表您已同意</text> <text class="policyAgree2">《用户隐私政策》</text>
		</view>
		 <view class="uni-padding-wrap uni-common-mt" style="margin: 40upx;">
				<button type="primary" style="background:#141A26;color: #EDB315;border-radius: 60upx;" v-bind:disabled="submitSate" v-bind:loading="submitSate"   @click="loginSubmit"> 登录</button>
		 </view>
		 <view style="margin-top: 40upx;text-align: center;">
		 		<text class="noregister">您还没有账号？</text> <text class="noregister2" @click="register">立即注册</text>
		 </view>
	</view>  
</template>

<script>
	export default {
		data() {
			return {
				userPhone:'',
				pwd:'',
				submitSate:false
			}
		},
		methods: {
			register(){
				uni.redirectTo({
					url: '../register/register'
				});
			},
			policy(){
				uni.navigateTo({
					url:'../2ndPage/policyPrivacy/policyPrivacy'
				});
			},
			keyPhone: function(event) {
            this.userPhone = event.target.value
			},
			keyPwd: function(event) {
			this.pwd = event.target.value
			},
			loginSubmit:function(){
				if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(this.pwd.length<6 || this.pwd.length>15){
					uni.showToast({
						title: '密码请输入不少于6位，不大于15位！',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}
				this.submitSate=true;
				this.$http.get('/api/v1/user_edit', {phone: this.userPhone, password: this.pwd}).then(res => {
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					if(res.data.resultCode==200){
						//登陆成功 
						console.log(res.data.data.token)
					  uni.setStorageSync('token', res.data.data.token);
					  uni.setStorageSync('id', res.data.data.user.id);
					  uni.setStorageSync('typeCustomer', res.data.data.user.type);
					  
					  //console.log(res.data.data.token)
						 uni.switchTab({
							url: '/pages/index/index'
						 }); 
						
						
					}else if(res.data.resultCode==400){
						//登录有误
					}
				this.submitSate=false;
				}).catch(err => {
				this.submitSate=false;
				})
			},
			forgetpwd:function(){
				uni.redirectTo({
					url: '../forgetPwd/forgetPwd'
				});
			}
		}
	}
</script>

<style>

</style>
