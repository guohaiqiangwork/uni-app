<template>
	<view>
				<view class="form_body">
			<!-- <view class="form_list">
				<view class="list_left">
					旧手机号
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyjPhone" placeholder="请填写收货人姓名" />
				</view>
			</view> -->
			<view class="form_list">
				<view class="list_left">
					新手机号
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keynPhone" :disabled="disablePhone" placeholder="请填写手机号码" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					验证码
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyYzm" placeholder="请输入验证码" />
				</view>
				<view style="width: 23%;line-height: 110upx;">
					<text  class="forgetpwd" @click="yzm" >{{countdown}}<text v-show="timestatus"  class="forgetpwd2"> 秒重获</text></text>
				</view>
			</view>
			
		</view>
		 <view class="bottom_add">
			<view class="fixed_btm" @click="changephone">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown:'获取验证码',
				disabled:false,
				timestatus:false,
				keyjPhoneS:'',
				keynPhoneS:'',
				keyYzmS:'',
				messageid:'',
				disablePhone:false
			}
		},
		methods: {
			keyjPhone(event){
			 this.keyjPhoneS = event.target.value
			},
			keynPhone(event){
			 this.keynPhoneS = event.target.value
			},
			keyYzm(event){
			 this.keyYzmS= event.target.value 
			},
			yzm(){
				var that = this;
				if(!(/^1[3456789]\d{9}$/.test(this.keynPhoneS))){
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
			this.$http.get('/api/v1/getmessage', {phone: this.keynPhoneS,status:'3'}).then(res => {
					uni.showToast({ 
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					if(res.data.resultCode==200){
						 that.disablePhone=true;
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
			changephone(){
				if(!(/^1[3456789]\d{9}$/.test(this.keynPhoneS))){
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon:'none',
					duration: 1500,
					position:'top',
				});
				return false;
				}else if(this.messageid==''||this.keyYzmS==''){
					uni.showToast({
					title: '请获取验证码并填写',
					icon:'none',
					duration: 2000,
					position:'top',
					});
					return false;
				}
			this.$http.get('/api/v1/modifyPhone', {phone: this.keynPhoneS,code:this.keyYzmS,messageid:this.messageid,id: uni.getStorageSync('id'),}).then(res => {
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					if(res.data.resultCode==200){
						//成功 
						// uni.navigateTo({
						// 	url: '../setting/setting'
						// });	
						 uni.navigateBack();
						
					}else if(res.data.resultCode==400){
						//有误
					}
				}).catch(err => {
				
				})
			},
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
		}
	}
</script>

<style>
.form_body{
	background: #fff;
}
.form_list{
	width: 97%;
	display: flex;
	margin-left: 3%;
	border-bottom: 1px solid #eee;
}
.list_left{
	height: 100upx;
	line-height: 100upx;
	width: 23%;
	text-align: left;
	padding-left: 5upx;
}
.list_right{
	
	flex: 1;
	
}
.list_input{
	height: 100upx;
	line-height: 100upx;
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
