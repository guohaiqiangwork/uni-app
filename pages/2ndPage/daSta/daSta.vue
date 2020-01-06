<template>
	<view>
			
			<view>
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
								<view class="card_top" style="margin-top:20upx">
									<view class="t_left">
										收入
									</view>
									<view class="t_right">
										+ {{profit}}
									</view>
								</view>
							</view>
							<view class="b_t">
								<view>
									<view class="b_w" @click="expend(index)" v-for="(item,index) in datelist" :key="index">
										<view class="t_z"><text></text>{{item.name}}</text></view>
										<view class="s_z">
										￥{{item.data.toFixed(2)}}
										<text class="icon_4">&#xe769;</text>
										</view>
									</view>
									
								</view>
							</view>
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
				profit:'0.00',
				phone:'',
				datelist:',',
				
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
		methods: {
			
			
			selectTime(){
				this.$refs['range'].show();
			},
			
			onloadmsg(){
				this.$http.get('/api/v1/getTradeInfoCountAmt', {userId: uni.getStorageSync('id'),startTime:this.startTime,endTime:this.endTime}).then(res => {
						if(res.data.resultCode==200){
						this.datelist=res.data.data.payTypeData
						this.profit=res.data.data.totalAmount[0];
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
			expend(i) {
				console.log(11111111)
				console.log(this.datelist[i].data)
				uni.navigateTo({
					url: '../tranDetails/tranDetails?startTime='+this.startTime+'&endTime='+this.endTime+'&payType='+this.datelist[i].payType+'&cardType='+this.datelist[i].cardType+''
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
    /* border-bottom: 1px solid #f0f0f0; */
}
.t_left{
	width: 30%;
    padding-left: 2%;
	font-size: 34upx;
	color:#131926;
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
	color:#32333A;
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
