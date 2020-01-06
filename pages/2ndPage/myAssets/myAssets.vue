<template>
	<view>
			<view class="masset_headr">
				<view class="header_mon">
					账户余额(元)
				</view>
				<view class="header_con">
					<view class="hcon_mony">
						{{allmoney}}
					</view>
					<view class="hcon_tx" @click="tixian">
						<view class="hcon_txt">
							提现
						</view>
					</view>
				</view>
			</view>
			<view style="padding-top: 205upx">
				<wuc-tab :tab-list="tabList"  textFlex :tabCur.sync="TabCur" tab-class="bg-white text-center text-black" select-class="font-color"></wuc-tab>
				<swiper :style="{height:winheight}":current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#4B56C0" @change="swiperChange">
				  <swiper-item v-for="(item,index) in tabList" :key="index">
				    <div class="bg-white padding margin text-center text-black"  style="margin-top: 90upx;" >
					  <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" :style="{height:winheight}" >
							<view class="card_body">
								<view class="" v-if="TabCur==2 && startTime!=''" @click="selectTime" style="height: 70rpx;line-height: 70rpx;display: flex;border-bottom: 7px solid rgb(250, 250, 250);position: fixed;width: 100%;z-index: 999;background: #fff;">
									<view class="" style=" width: 48%; text-align: center; ">
										{{startTime}}
									</view>
									<view class="" style=" flex: 1; ">
										至 
									</view>
									<view class="" style=" width: 48%; text-align: center; ">
										{{endTime}}
									</view>
								</view>
								<view  v-show="TabCur==2 && startTime!=''" style="height: 100rpx;">
									
								</view>
								<view class="card_top">
									<view class="t_left">
										收入
									</view>
									<view class="t_right">
										+ {{profit}}
									</view>
								</view>
								<view class="card_cont" v-for="(item,index) in dataList" :key="index">
									<view v-if="index<3 || showother" >
										<view class="cont_t">
											{{item.platform}}{{item.name}} {{item.type=='0'?'分润收益':item.type=='1'?'激活收益':'其他收益'}} 
										</view>
										<view class="cont_b">
											<view class="b_le">
												<view class="le_bg">
													<view class="le_bgcont " :class="item.type=='0'?'line_bg1':item.type=='1'?'line_bg2':'line_bg3'" :style="{width:[parseFloat(item.remake)<10?'10%':item.remake]}">
													</view>
												</view>
											</view>
											<view class="b_ri">
												￥{{item.money.toFixed(2)}}
											</view>
										</view>
									</view>
								</view>
								<view class="seeother" @click="seeother" v-if="dataList.length>3">
								{{showothertext}}
								</view>
							</view>
							<!-- <view class="k_hang">
								
							</view> -->
							<!-- 支出部分 -->
							
							<view class="b_t">
								<!-- 支出头 -->
								<view class="card_top">
									<view class="t_left">
										账单
									</view>
									<!-- <view class="t_right">
										-3012.85
									</view> -->
								</view>
								<!-- 支出头结束 -->
								<view>
									<view class="b_w" @click="expend">
										<view class="t_z">提现明细</view>
										<view class="s_z">
										￥{{tiXianZhiChu}}
										<text class="icon_4">&#xe769;</text>
										</view>
									</view>
									<view class="b_w" @click="deConsumption">
										<view class="t_z" >消费支出</view>
										<view class="s_z">￥{{xiaofeiZhiChu}}
										<text class="icon_4">&#xe769;</text>
										</view>
									</view>
								</view>
							</view>
						
						
						
						
							
								<!-- <view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;">
									<image src="../../../static/img/nomore.png" mode="aspectFit" ></image>
								</view> -->
							<view style="height: 100upx;"></view>
				        </scroll-view>
				
					
					{{item.name}}</div>
				  </swiper-item>
				</swiper>
			</view>
		<w-picker 
			mode="range" 
			startYear="2019" 
			:endYear="new Date().getFullYear().toString()"
			:defaultVal="defaultVal" 
			:current="false" 
			@confirm="onConfirm" 
			ref="range" 
			themeColor="#f00"
		></w-picker>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: { WucTab,wPicker},
		data() {
			return {
				TabCur:0,
				tabList: [{ name: '全部' }, { name: '今日' },{ name: '其他' }],
				defaultVal:[0,1,2,0,0,0,0],
				winheight:'1224upx',
				startTime:'',
				endTime:'',
				dataList:'',
				allmoney:'0.00',
				profit:'0.00',
				baifs:'10%',
				showother:false,
				showothertext:'查看更多',
				phone:'',
				tiXianZhiChu:'',
				xiaofeiZhiChu:'',
			}
		},
		onLoad(option) { 
			this.phone=option.phone
		  // uni.setStorageSync('token', 'gN2HG/aZ4/tQDyiXXQVf6Q==');
			var that=this;
			uni.getSystemInfo({
				success: function (res) {
					that.winheight=res.windowHeight-100+'px'
				}
			});
			this.onloadmsg();
			// 选择时间框初始赋值
			var day1 = new Date();
			this.defaultVal=[0,day1.getMonth(),day1.getDate()-1,0,0,day1.getMonth(),day1.getDate()-1]
			
		},
		onShow() {
			uni.hideKeyboard()
		},
		computed:{
		 
		},
		methods: {
			seeother(){
				this.showother=!this.showother;
				 if(this.showother){
					  this.showothertext='收起'
				 }else{
					  this.showothertext='查看更多'
				 }
			},
			zcxq(){
				uni.navigateTo({
					url: '../myAssets/assetsLists/assetsLists'
				});
			},
			
			selectTime(){
				this.$refs['range'].show();
			},
			
			onloadmsg(){
				this.$http.get('/api/v1/selectAssets', {userid: uni.getStorageSync('id'),starttime:this.startTime,endtime:this.endTime}).then(res => {
						if(res.data.resultCode==200){
						this.dataList=res.data.data.shareProfits;
						this.allmoney=res.data.data.money.toFixed(2);
						this.profit=res.data.data.profit.toFixed(2);
						this.tiXianZhiChu=res.data.data.cashMoney.toFixed(2);
						this.xiaofeiZhiChu=res.data.data.payMoney.toFixed(2);
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
			swiperChange(e) { 
			    let { current } = e.target;
			    this.TabCur = current;
				if(current=='2'){
					this.$refs['range'].show();
				}if(current=='1'){
					//今天的时间
					var day2 = new Date();
					day2.setTime(day2.getTime());
					this.startTime= day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
					this.endTime= day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
					this.onloadmsg()
				}else if(current=='0'){
					this.startTime= '';
					this.endTime= '';
					this.onloadmsg()
				}
			},
			onConfirm(val){
				console.log(val)
				this.startTime= val.from;
				this.endTime=val.to;
				this.onloadmsg()
			},
			expend() {
				uni.navigateTo({
					url: '../expenditureDiscount/expenditureDiscount?startTime='+this.startTime+'&endTime='+this.endTime+''
				});
			
			},
			tixian() {
				var that=this
				var id= uni.getStorageSync('id')
				this.$http.get('/api/v1/getuserinfo', {id: id}).then(res => { 
					if(res.data.resultCode==200){
						//成功 
						if(res.data.data.user.isrealname=='0'){
							uni.showModal({
								title: '提示',
								content: '还未实名认证，是否前往？',
								success: function (res) {
									if (res.confirm) {
										uni.navigateTo({ 
											url: '../../2ndPage/authReal/authReal'
										});
									} else if (res.cancel) {
									}
								}
							});
						}else if(res.data.data.user.paypwd==''){
							uni.showModal({
								title: '提示',
								content: '还未设置支付密码，是否前往？',
								success: function (res) {
									if (res.confirm) {
										uni.navigateTo({ 
											url: '../../2ndPage/changePwdzf/changePwdzf?phone='+that.phone
										});
									} else if (res.cancel) {
									}
								}
							});
						}else if(res.data.data.userBankCard==''){
							uni.showToast({
							title: '还未添加银行卡，请先添加银行卡',
							icon:'none',
							duration: 2000,
							position:'top',
							});
							 // uni.showModal({
							 // 	title: '提示',
							 // 	content: '还未添加银行卡，请先添加银行卡',
							 // 	success: function (res) {
							//   	if (res.confirm) {
							// 		uni.navigateTo({ 
							// 			url: '../../2ndPage/changePwdzf/changePwdzf?phone='+that.phone
							// 		});
							// 	} else if (res.cancel) {
							// 	}
							 // 	}
							 // });
						}else{
							uni.navigateTo({
								url: '../withdCash/withdCash?allmoney='+this.allmoney
							});
						}
					}else{
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
			deConsumption() {
				uni.navigateTo({
					url: '../detailsConsumption/detailsConsumption?startTime='+this.startTime+'&endTime='+this.endTime+''
				});
			},
		}
	}
</script>

<style>
.masset_headr{
	height:205upx;
    background: #121826;
	z-index: 500;
    position: fixed;
    width: 100%;   
	color: #fff;
}
.header_mon{
	font-size: 13px;
    padding-left: 12%;
	padding-top:20upx;
    line-height: 65upx;
	color: #E9E9E9;
}
.header_con{
	display: flex;
    height: 50px;
}
.hcon_mony{
	width: 62%;
    line-height: 42px;
    padding-left: 12%;
    font-size: 31px;
	color:#EDB315;
}
.hcon_tx{
	flex: 1;
    padding-top: 7px;
}
.hcon_txt{
	height: 28px;
    width: 73px;
    font-size: 14px;
    line-height: 28px; 
    border: 1px solid #fff;
    text-align: center;
    border-radius: 15px;
    color: #fff;
}
.card_body{
	width: 100%;
    background: #fff;
}
.card_top{
	height: 50px;
    line-height: 50px;
    display: flex;
    margin: 0 3%;
    width: 94%;
    border-bottom: 1px solid #f0f0f0;
}
.t_left{
	width: 30%;
    padding-left: 2%;
	font-size: 32upx;
}
.t_right{
    flex: 1;
    text-align: right;
    padding-right: 3%;
    color: #EDB315;
    font-weight: 700;	
}
.card_cont{
	width: 90%;
    margin: 0 5%;
}
.cont_t{
	height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.cont_b{
	height: 30px;
    line-height: 30px;
    display: flex;
}
.b_le{
	width: 75%;
    margin-right: 5%;
}
.le_bg{
	height: 15px;
    background: #e8edf1;
    border-radius: 10px;
    margin-top: 8px;
}
.b_ri{
	flex: 1;
	color: #ccc;
    text-align: right;
}
.le_bgcont{
	height: 14px;
    width: 25%;
    border-radius: 10px;
}
.line_bg1{
	background: linear-gradient(left,#4d56c1,#9068ff);
}
.line_bg2{
	background: linear-gradient(left,#ff6b41,#ffb55a);
}
.line_bg3{
	background: linear-gradient(left,#36D1DC,#5B86E5);
}
.b_t{
	background-color: #ffffff;
	margin-top: 20upx;

}
.b_w{
	display: flex;
	margin: 0 3%;
    width: 94%;
}
.t_z {
	width: 50%;
	padding-left: 2%;
	line-height:84upx;
	font-weight: 400;
	font-size:30upx;
}
.s_z {
	flex: 1;
	line-height: 84upx;
	font-size: 32upx;
	color: #A0A0A0;
	text-align:right;
	padding-right: 2%;
}
.seeother{
	text-align: center;
	color: #4b56c0;
	font-size: 26rpx; 
	height: 80rpx;
	line-height: 80rpx; 
}
.icon_4{
		font-family: iconfont;
		font-size: 24upx;
		color: #A0A0A0;
		padding-left: 4upx;
	}
</style>
