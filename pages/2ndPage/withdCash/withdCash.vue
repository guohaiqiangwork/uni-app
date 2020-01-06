<template>
	<view>
		<view class="top_cash">
			<view class="top_first top_first_underline" v-if="!selectlist.cardno">
				<view style="line-height: 132upx;height: 132upx;color:#FF6740;width: 100%;text-align: center;">
						暂无银行卡信息，请先绑定银行卡
				</view>
				<view class="top_four">
					<text class="icon_4 icon_ys" style="color:#FF6740;">&#xe769;</text>
				</view>
			</view>
			
			<view class="top_first top_first_underline"  @click="togglePopup('middle-list')" v-if="selectlist.cardno">
				<view class="top_one">
					到账银行卡
				</view>
				
				<view class="top_two">
					<text class="icon_4 " :class="'icon-'+bankCodetype"></text>
				</view>
				<view class="top_three" >
					<view class="top_three_top">{{selectlist.bankName}}({{selectlist.cardno?selectlist.cardno.substr(selectlist.cardno.length-4):'暂无银行卡'}})</view>
					<view class="top_three_bottom">2小时内到账</view>
					<!-- 2小时内到账 -->
				</view>
				<view class="top_four">
					<text class="icon_4 icon_ys">&#xe769;</text>
				</view>
			</view>
			
			<view class="top_first">
				<view class="top_second">
					提现金额
				</view>
			</view>
			<view class="top_first font_underline">
				<view class="top_third">
				<view class="top_third_left">
					￥
				</view>
				<view class="top_third_right">
					<input class="right_input" type="number" :value="cashMoney" @input="cashmony"/>
					
				</view>
				</view>
			</view>
			
			<view class="top_first" v-show="cashStuas==1"> 
				<view class="top_forth">
				<text>余额￥</text> <text>{{yuE}}</text>    <text class="fouth_right" v-if="yuE!=0.00" @click="outSum"> 全部提现</text>
				</view>
			</view>
			<view class="top_first" v-show="cashStuas==2">
				<view class="top_forth">
				<text>需扣除手续费(￥3.00)及税费(￥{{shuifei}})</text>   <!-- <text class="fouth_right" @click="123">	提现须知</text> -->
				</view>
			</view>
			<view class="top_first" v-show="cashStuas==3">
				<view class="top_forth font-color2">
				输入金额超过余额 
				</view>
			</view>
			
		<uni-popup :show="type === 'middle-list'" position="bottom" @hidePopup="togglePopup('')">
			<view style="display: block;width: 100%;">
				<view class="bottom-title" style="border-bottom: 1px solid #eee;">选择到账银行卡</view>
				<view class="bottom-content">
					<view v-for="(item, index) in datalist" :key="index" class="uni-list-item" style="width: 96%;margin-left: 2%; border-bottom: 1px solid #eee; ">
						<view class="" style="height: 90upx;line-height: 90upx;text-align: left; display: flex;" @click="selectClick(index)">
							<view style="flex : 1">
							<text class="icon_4 " :class="'icon-'+item.bankCode"></text>
							<text style="padding-left: 8upx;">{{item.bankName}}{{item.cardTypeName}}({{item.cardno.substr(item.cardno.length-4)}})</text>
							</view>
							<view style="width: 14%;">
							<text class="icon_4" style="color:#EDB315ss" v-if="statusSelection==index">&#xe76b;</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn" @click="togglePopup('')" style="height: 100upx;"></view>
			</view>
		</uni-popup>
		
			<view class="top_forth" >
				<view class="fixed_btm ziti" @click="tixian">
					提现
				</view>
			</view>
			   <best-payment-password :show="paypwdflag" :money='cashMoney' :msg="true" :value="paypwd"  digits="6" @submit="checkPwd" @cancel="togglePayment"></best-payment-password>
				
			
		</view>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue'
	export default {
		components: {
			uniPopup,bestPaymentPassword
		},
		data() {
			return {
				type: '',
				yuE:'',
				cashMoney:'',
				cashStuas:'1',
				datalist:[
					//{"bankCode":"CCB","bankName":"\u4E2D\u56FD\u5EFA\u8BBE\u94F6\u884C","cardTypeName":"\u50A8\u84C4\u5361", "cardno":"6217000410002381213","realname":"\u66F9\u5EFA\u519B"},
					//{"bankCode":"BSB","bankName":"\u4E2D\u56FD\u5EFA\u8BBE\u94F6\u884C","cardTypeName":"\u50A8\u84C4\u5361", "cardno":"6217000410002381213","realname":"\u66F9\u5EFA\u519B"},
					//{"bankCode":"otherbank","bankName":"\u4E2D\u56FD\u5EFA\u8BBE\u94F6\u884C","cardTypeName":"\u50A8\u84C4\u5361", "cardno":"6217000410002381213","realname":"\u66F9\u5EFA\u519B"},
					//{"bankCode":"ICBC","bankName":"\u4E2D\u56FD\u5EFA\u8BBE\u94F6\u884C","cardTypeName":"\u50A8\u84C4\u5361", "cardno":"6217000410002381213","realname":"\u66F9\u5EFA\u519B"},
				],
				selectlist:'',
				realname:'',
				cardno:'',
				phoneno:'',
				idcard:'',
				paypwd:'',
				paypwdflag:false,
				shuifei:'0.00',
				bankCodetype:'otherbank',
				statusSelection:'0',
			}
		},
		onLoad(option) {
			this.yuE=option.allmoney
			this.$http.get('/api/v1/selectbankcard', {userid: uni.getStorageSync('id')}).then(res => {
				if(res.data.resultCode==200){
					this.datalist=res.data.data.bankCards;
					this.selectlist=res.data.data.bankCards[0];
					
					this.realname=res.data.data.bankCards[0].realname;
					this.cardno=res.data.data.bankCards[0].cardno;
					this.phoneno=res.data.data.bankCards[0].mobile;
					this.idcard=res.data.data.bankCards[0].idcard;
					this.bankCodetype=res.data.data.bankCards[0].bankCode;
				}else if(res.data.resultCode==400){
					//有误
					uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 1500,
						position:'top',
					});
				
				}
			}).catch(err => {
			})
		},
		methods: {
			togglePopup(type) {
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				console.log(type)
				this.type = type;
			},
			cashmony(event){
			  this.cashMoney = event.target.value;
			  this.shuifei = event.target.value*0.07;
			  this.shuifei=this.shuifei.toFixed(2);
			 if(this.cashMoney==''){
				 this.cashStuas='1';
				
			 }else if(parseFloat(this.cashMoney)>parseFloat(this.yuE)){
				 this.cashStuas='3';
			 } else{
				  this.cashStuas='2';
			 }
			},
			outSum(){
				if(this.yuE!='0.00'){
					this.cashMoney=this.yuE;
					this.cashStuas='2';
					 this.shuifei =this.cashMoney*0.07;
					this.shuifei=this.shuifei.toFixed(2)
				}else if(this.yuE =='0'){
				 
			 }	
			},
			tixian(){
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				if(parseFloat(this.cashMoney)=='0'|| this.cashMoney==''){
					uni.showToast({
						title: '请输入正确金额',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false
				}
				this.paypwdflag=true;//显示密码框
			},
			checkPwd(e){
				this.paypwd=e;
				this.$http.get('/api/v1/getCash', {userid: uni.getStorageSync('id'),realname:this.realname,cardno:this.cardno,phoneno:this.phoneno,idcard:this.idcard,pay:this.cashMoney,paypwd:this.paypwd}).then(res => {
						uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 1500,
						position:'top',
					});
					this.paypwdflag=false;//显示密码框
					if(res.data.resultCode==200){
						setTimeout(function(){
							uni.redirectTo({ 
								url: "../expenditureDiscount/expenditureDiscount"
							});
						}, 2000)
						
						
					}else if(res.data.resultCode==400){
						//有误
					
					}
				}).catch(err => {
				})
			},
			togglePayment(){
				this.paypwdflag=false;//显示密码框
			},
			selectClick(index){
				this.statusSelection=index;
				this.selectlist=this.datalist[index];
				this.realname=this.datalist[index].realname;
				this.cardno=this.datalist[index].cardno;
				this.phoneno=this.datalist[index].mobile;
				this.idcard=this.datalist[index].idcard;
				this.bankCodetype=this.datalist[index].bankCode;
				this.togglePopup('')
			}
		}
	}
</script>

<style>

.top_cash {
	background-color: #ffffff;
	width:92%;	
	margin: 0 4%;
	padding-top:30upx;
	
}
.top_first{
	display: flex;
	width: 84%;
    margin: 0 8%;
    line-height: 44px;
	
}
.top_first_underline {
	border-bottom: 1px solid rgba(238,238,238,1);
}
.font_underline {
	border-bottom: 1px solid #dbdbdb;;
}
.top_one{
	width:25%;
	font-size: 28upx;
	line-height:88upx;
}
.top_two {
	width:12%;
	line-height:88upx;
	color:#303030;
	text-align: right;
}
.icon_4{
		font-family: iconfont;
		font-size: 42upx;
		/* color: #ff0000; */
		padding-left: 4upx;
		width: 8%;
		text-align: center;
	}
.top_three {
	width:55%;
	font-size: 24upx;
	}
.top_three_top{
	color:#303030;
	font-size: 28upx;
	line-height:88upx
}
.top_three_bottom{
	color:#A0A0A0;
	height:20upx;
	line-height: 20upx;
}
.icon_ys {
	color:#A0A0A0;
	font-size:34upx;
}
.top_four{
	flex:1;
	text-align: right;
	line-height: 130upx;
}
.top_second {
	font-size:28upx;
	colro: #A0A0A0;
}
.top_third {
	display: flex;
}
.top_third_left{
	width: 12%;
    font-size: 60upx;
    /* font-weight: bold; */
    height: 98upx;
    line-height: 98upx;
    color: rgba(48,48,48,1);
}
.top_third_right {
	flex:1;
	height:100upx;
	line-height:66upx;
}
.right_input {
	height:98upx;
	line-height:98upx;
	font-size:60upx;
	/* font-weight: bold; */
}
.top_forth{
	font-size: 24upx;
	color:rgba(160,160,160,1);
	padding-bottom: 10px;
}
.top_forth{
	width: 96%;
    margin: 0 2%;
    line-height: 44px;
}
.fouth_right {
	color:#121826;
	padding-left: 12upx;
}
.ziti {
	font-size: 28upx;
	color:#EDB315;
}

</style>