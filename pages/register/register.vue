<template>
	<view>
		<view class="header">
			<view class="h_top"></view>
		</view>	
		<view class="" style="margin-top: 140upx;height: 120upx;">
			<text class="icons L_icon iconfixed" @click="returnback">&#xe768;</text>
		<!-- 	<view style="background: red;">
				<text @click="returnlogin">返回</text>
			</view> -->
			<text class="ljzc">立即注册</text>
		</view>
		<view class="L_form">
			<text class="icons L_icon">&#xe67f;</text>
			<input class="L_input" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style='color:#ccc' />
		</view>
		<view class="L_form">
			<text class="icons L_icon">&#xe691;</text>
			<input class="L_input" maxlength="10" @input="keyRecommendCode" placeholder="请输入推荐码" placeholder-style='color:#ccc' />
		</view>
		<view class="L_form">
				<text class="icons L_icon">&#xe7a4;</text>
			    <input class="L_input" style="width: 70%;" @input="keyCode" maxlength="6" placeholder="请输入验证码" placeholder-style='color:#ccc' />
				<text  class="forgetpwd huoqucolor" @click="yzm" >{{countdown}}<text v-show="timestatus"  class="forgetpwd2">秒重获</text></text>
			<!-- 	<text  class="forgetpwd" v-show="timestatus" >{{countdown}}<text v-show="timestatus">秒重获</text></text> -->
		</view>
		<view class="L_form">
			<text class="icons L_icon">&#xe67b;</text>
			<input class="L_input" maxlength="15" password @input="keyPwd" placeholder="请输入登录密码" placeholder-style='color:#ccc' />
		</view>
		<view style="margin-top: 15upx;"  @click="policy">
				<text class="policyAgree">注册即代表您已同意</text> <text class="policyAgree2">《用户隐私政策》</text>
		</view>
		 <view class="uni-padding-wrap uni-common-mt" style="margin: 40upx;">
						<button type="primary" style="background:#131926;color:#EDB315;border-radius: 60upx;" @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone:'',
				recommendCode:'',
				keyCodes:'',
				keyPwds:'',
				countdown:'获取验证码',
                disabled:false,
                timestatus:false,
                clear:'',
				messageid:'',
			}
		},
		methods: {
			policy(){
				uni.navigateTo({
					url:'../2ndPage/policyPrivacy/policyPrivacy'
				});
			},
			keyPhone(event){
				 this.userPhone = event.target.value
			},
			keyRecommendCode(event){
				 this.recommendCode = event.target.value
			},
			keyCode(event){
				 this.keyCodes = event.target.value
			},
			keyPwd(event){
				 this.keyPwds = event.target.value
			},
			yzm(){
				var that = this;
				if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon:'none',
					duration: 1500,
					position:'top',
				});
				return false;
				}else if(this.timestatus==true){
					uni.showToast({
						title: '请勿重复点击',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}
			 that.disabled = true;//禁用点击
			this.$http.get('/api/v1/getmessage', {phone: this.userPhone,status:'1'}).then(res => {
					uni.showToast({ 
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					if(res.data.resultCode==200){
						 
                        that.countdown = 60;
                        that.timestatus = true;
                        that.clear = setInterval(that.countDown,1000);
						that.messageid=res.data.data.messageid;
					}else{
						   that.disabled = false; //获取失败开启点击
						
					}
				}).catch(err => {
				   that.disabled = false; //获取失败开启点击
				})
				
			},
			      // 倒计时
            countDown(){
                var that = this;
                if(!that.countdown){                    
                    that.disabled = false;
                    that.timestatus = false;
                    that.countdown = '获取验证码';
                    clearInterval(that.clear);
                }else{
                    --that.countdown;
                }
	        },
			register(){ 
					if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(this.keyPwds.length<6 || this.keyPwds.length>15){
					uni.showToast({
						title: '密码请输入不少于6位，不大于15位！',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(this.messageid==''){
						uni.showToast({
							title: '请先获取验证码',
							icon:'none',
							duration: 1500,
							position:'top',
						});
						return false;
				}else if(this.keyCodes.length!=6){
						uni.showToast({
							title: '验证码应为6位数字',
							icon:'none',
							duration: 1500,
							position:'top',
						});
						return false;
				}
				this.$http.get('/api/v1/user_add', {phone: this.userPhone, password:this.keyPwds,bereccode:this.recommendCode,code:this.keyCodes,messageid:this.messageid}).then(res => {
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					if(res.data.resultCode==200){
						//注册成功 
						uni.navigateTo({
							url: '../login/login'
						});						
						
					}else if(res.data.resultCode==400){
						//注册有误
					}
				}).catch(err => {
				
				})
			},
			returnback(){
				uni.redirectTo({
					url: '../login/login'
				});		
			}
			
		}
	}
</script>

<style>
	.huoqucolor{
		color:#131926;
	}
.ljzc{
	height: 150upx;
	line-height: 150upx;
	font-size: 56upx;
	color:#111726;
	font-weight: 700;
	padding-left: 70upx;
}
.iconfixed{
	position: fixed;
    top: 4%;
    left: 2%;
	font-size: 60upx;
	color: #333333;
}
</style>
