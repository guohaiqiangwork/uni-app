<template>
	<view>
		<!-- 持卡人信息 -->
		<view class="top_info">
			
			<view class="form_list form_list_one">
				<view class="list_left">
					持卡人
				</view>
				<view class="list_right">
					 <input class="list_input" @input="keynrealname" :value="realname" disabled="" placeholder="持卡人姓名" />
				</view>
			</view>
			
			<view class="form_list form_list_one">
				<view class="list_left">
					卡号
				</view>
				<view class="list_right">
					 <input class="list_input" @input="keyncardno" placeholder="请输入卡号" />
				</view>
			</view>
			
			<!-- <view class="form_list form_list_one">
				<view class="list_left">
					银行
				</view>
				<view class="list_right_one">
					 <input class="list_input" placeholder="请输入银行名称" />
				</view>
			</view> -->
			
			<view class="form_list_one">
				<view class="list_left">
					身份证
				</view>
				<view class="list_right_one">
					 <input class="list_input" @input="keynidcard" :value="idcard" disabled="" placeholder="请输入身份证号码" />
				</view>
			</view>
			
		</view>
		<!-- 添加持卡人手机号码 -->
		<view class="phone_info">
		<view class="form_list form_list_one">
			<view class="list_left">	
				手机号
			</view>
			<view class="list_right">
				 <input class="list_input" @input="keynPhone" placeholder="请输入银行预留手机号" />
			</view>
		</view>
		
		<view class="form_list_one">
			<view class="list_left">	
				验证码
			</view>
			<view class="list_right">
				 <view class="list_right_left">
					 <input class="list_input" placeholder="验证码" @input="keyyzm_code"/>
				 </view>
				 <view class="greyline">
					 
				 </view>
				 
				 <view class="list_right_right" @click="yzm_func" :class="yzm_stuas==0? 'ys_yzm':''">
					 {{yzm}}
				 </view>
			</view>
		</view>
		
		</view>
		<!-- 验证码 -->
		<view class="">
			<view class="bottom_info">
				收不到验证码？
			</view>
		</view>
		<!-- 完成 -->
		<view class="bottom_x">
			<view class="fixed_btm blue_border" @click="bindCrad">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yzm:'获取验证码',
				yzm_stuas:0,
				yzm_code:'',
				timed:59,
				numPhone:'',
				cardno: '',
				idcard: '',
				realname: '',
				ref:'',//验证标识码id
				msgID:'',
			
			}
		},
		onLoad() {
			this.realname=uni.getStorageSync('realname')
			this.idcard=uni.getStorageSync('realidcard')
			console.log(uni.getStorageSync('realname'))
		},
		methods: {
			keynPhone(event){
			 this.numPhone = event.target.value;
			},
			keyncardno(event){
			 this.cardno = event.target.value;
			},
			keynidcard(event){
			 this.idcard = event.target.value;
			},
			keynrealname(event){
			 this.realname = event.target.value;
			},
			keyyzm_code(event){
			 this.yzm_code = event.target.value;
			},
			yzm_func(){
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(this.realname==''){
					uni.showToast({
						title: '请输入持卡人姓名',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(this.cardno==''){
					uni.showToast({
						title: '请输入正确的银行卡号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(reg.test(this.idcard) === false){
					uni.showToast({
						title: '请输入正确的身份证号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.numPhone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}
				var that=this;
				// this.yzm ='重新获取(60s)'
				if(that.yzm_stuas==1){
					uni.showToast({
						title: '请勿重复点击',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					
				}else{
					
					this.$http.get('/api/v1/getmessage', {phone:this.numPhone,status:'2'}).then(res => {
						uni.showToast({
							title: res.data.message,
							icon:'none',
							duration: 1500,
							position:'top',
						});
						if(res.data.resultCode==200){
									that.yzm_stuas=1;
								var clear=setInterval(function(){
									that.yzm ="重新获取("+that.timed+")";
									that.timed = that.timed-1;
									// console.log(that.timed);
									if(that.timed==0){
										that.yzm ="重新获取";
										clearInterval(clear);
										that.timed=59;	
										that.yzm_stuas=0;
									}
									
								}, 1000);
								//that.ref=res.data.data.userBankCard.ref;
								that.msgID=res.data.data.messageid;
								console.log(that.ref)
						}else if(res.data.resultCode==400){
							//有误
							
						}
					}).catch(err => {
					})
				
				}
				
			},
			bindCrad(){
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(this.realname==''){
					uni.showToast({
						title: '请输入持卡人姓名',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(this.cardno==''){
					uni.showToast({
						title: '请输入正确的银行卡号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(reg.test(this.idcard) === false){
					uni.showToast({
						title: '请输入正确的身份证号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.numPhone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}
				var bankType=this.$bankType(this.cardno)
				console.log(bankType)
				this.$http.get('/api/v1/bankcard',{bankCode:bankType.bankCode,cardTypeName:bankType.cardTypeName,bankName:bankType.bankName,messageid:this.msgID,message:this.yzm_code,userid: uni.getStorageSync('id'),cardno: this.cardno,idcard: this.idcard ,realname:  this.realname,mobile:  this.numPhone}).then(res => {
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 1500,
					position:'top',
				});
				if(res.data.resultCode==200){
						uni.navigateBack({
						    delta: 1
						});
				}else if(res.data.resultCode==400){
					//有误
				
				}
			}).catch(err => {
			})
			}
		
		}
	}
</script>

<style>
	.top_info{
		background-color: #ffffff;
	}
.form_list_one{
	width: 90%;
	display: flex;
	margin-left:5%;
}
.form_list{
	border-bottom: 1px solid #eee;
}
.list_left{
	height: 88upx;
	line-height: 88upx;
	width: 24%;
	text-align: left;
	padding-left: 5upx;
	/* font-size:34upx; */
}
.list_right{
	flex: 1;
	display: flex;
}
.list_right_left {
	width:60%;
}
.list_right_right{
	flex:1;
	height:88upx;
	line-height:88upx;
	color:grey;
	text-align: right;
}
.list_right_one{
	flex: 1;
	/* font-size:34upx; */
	height:88upx;
	line-height:88upx;
}
.list_input{
	height: 88upx;
	line-height: 88upx;
	font-size: 28upx; 
	width: 100%;
}

.phone_info {
	background-color: #ffffff;
	margin-top: 22upx;
}
.greyline{
	width:2upx;
	background: #E6E6E6;
	font-size: 34upx;
}
.bottom_info{
    width: 97%;
    text-align: right;
    height: 40px;
    line-height: 40px;
    color: #EDB315;
    font-size: 12px;
    padding-right: 3%;
}
.bottom_x{
		height: 130upx;
		background: #fafafa;
		width: 100%;
		position: fixed;
		bottom: 0; 
		left: 0%;
		width: 100%;
		z-index: 99;
	}
.ys_yzm{
	color: #EDB315;
}
.blue_border{
	color:#EDB315;
}
</style>
