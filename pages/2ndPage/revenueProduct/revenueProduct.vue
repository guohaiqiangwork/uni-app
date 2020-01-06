<template>
	<view class="page">
		<view class="header">
			<view class="h_top"></view>
			<view class="h_main" style=" display: flex; ">
				<view class=""style=" width: 10%; " @click="returntab">
					<text class="icons"style="margin-left: 10upx;">&#xe768;</text>
				</view>
				<view class=""style=" flex: 1;">
					<text  @click="toggleTab">{{starttimetext}}<text class="icons"style="margin-left: 10upx;">&#xe76a;</text></text>
				</view>
				<view class=""style=" width: 10%; ">
					
				</view>
			</view>
		</view>	
	<!-- 头部 -->
	<view class="masset_headr">
		<view class="header_mon">
			当月总收益(元)
		</view>
		<view class="header_con">
			<view class="hcon_mony">
				{{allProfit}} 
			</view>
		
		</view>
	</view>
	<!-- body -->
		<!-- 有数据内容 -->
		<view class="b_top" v-if="imgList!=''">
			<!-- card -->
			<view class="" v-for="(item,index) in imgList" :key="index" @click="details(index)">
				<view class="r_t">
					{{item.time}}
				</view>
				<view class="r_middle" style="border-bottom: 1px solid #F8F8F8;">
					<view class="r_left">
						当日总交易金额(元)
					</view>
					<view class="r_right">
						{{item.money.toFixed(2)}}
					</view>
					</view>
					<view class="f_bottom">
						<view class="f_left">
							<view class="f_t">
								激活返现(元)
							</view>
							<view class="f_b">
								{{item.jhmoney.toFixed(2)}}
							</view>
						</view>
						<view class="blue_line">
							
						</view>
						<view class="f_right">
							<view class="f_t">
								分润(元)
							</view>
							<view class="f_b">
									{{item.frmoney.toFixed(2)}}
							</view>
						</view>
					</view>
			</view>
		</view>
		
		<!-- 无数据内容 -->
		<scroll-view  v-if="imgList==''">
			<view class="no_content" >
				<image src="../../../static/img/nomore2.png" mode="aspectFit" ></image>
			</view>
		</scroll-view>
		
		
		
		
	<w-picker 
		mode="yearMonth" 
		startYear="2019" 
		:endYear="endYear"
		:defaultVal="[0,1]" 
		:current="true" 
		@confirm="onConfirm" 
		ref="yearMonth" 
		themeColor="#f00"
	></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
		import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		components:{
			wPicker,WucTab
		},
		data() {
			return {
				imgList:[
				
				],  
				platform:'',
				name:'',
				starttime:'',
				starttimetext:'',
				allProfit:'0.00',
				endYear:new Date().getFullYear().toString()
			}
		},
		methods: {
			returntab(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			
			toggleTab(){
				this.$refs['yearMonth'].show();
			},
			onConfirm(val){
				console.log(val)
				this.starttime=""+val.result+"-01";
				this.starttimetext=""+val.checkArr[0]+"年"+val.checkArr[1]+"月"
				this.showlist()
			},
			showlist(){
				this.$http.get('/api/v1/selectProduct', {userid: uni.getStorageSync('id'),platform:this.platform,name:this.name,starttime:this.starttime}).then(res => {
						if(res.data.resultCode==200){
							  this.allProfit=res.data.data.money.toFixed(2);
							  this.imgList=res.data.data.shareProfits;
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
			CurentTime()
				{ //获取当前月 月初 eg：2019-07-01
					var now = new Date();
					var year = now.getFullYear();       //年
					var month = now.getMonth() + 1;     //月
					var clock = year + "-";
					if(month < 10)
						clock += "0";
					clock += month + "-";
					clock +='01';
					this.starttimetext=""+year+"年"+month+"月"
					return(clock); 
				} ,
				details(e){
					var listdata=this.imgList[e];
					uni.navigateTo({
						url: '../detailsIncome/detailsIncome?platform='+listdata.platform+'&name='+listdata.name+'&time='+listdata.time+''
					});
				},
		},
		onLoad(option) {
			this.platform=option.platform;
			this.name=option.name;
			this.starttime=this.CurentTime()
			console.log(this.starttime)
			this.showlist();
		},
	}
</script>

<style>
	.h_main{
		height:90upx;
		line-height: 90upx;
		width: 100%;
		background: #131926;
		text-align: center;
		color: #ffffff;
		font-size: 34upx;
		position: relative;
		
	}
	
.b_top {
	padding-top: 205upx; 
}
.masset_headr{
	height:205upx;
    background: #131926;
	z-index: 999;
    position: fixed;
    width: 100%;   
	color: #fff;
	
}
.header_mon{
	width:100%;
	height:120upx;
	line-height: 120upx;
	font-size: 26upx;
    text-align: center;
	color:#A0A0A0;
}
.header_con{
	display: flex;
    height: 100upx;
}
.hcon_mony{
	width: 100%;
    line-height: 46upx;
    font-size: 56upx;
	text-align: center;
	color:#EDB315;
}
.r_t {
	height: 60upx;
	line-height: 60upx;
	font-size: 26upx;
	color: #a8a8a8;
	font-weight: 200;
	padding-left: 20upx;
}
.r_middle {
	height:72upx;
	 background-color: #FFFFFF;
	 display: flex;
	 padding-top: 10upx;
}
.r_left {
	color:#000000;
	font-size: 28upx;
	line-height: 66upx;
	padding-left:20upx;
}
.r_right{
	flex: 1;
	line-height: 66upx;
	text-align: right;
	padding-right: 3%;
	color: #EDB315;
	font-weight: 400;
}
.f_bottom {
	/* height:100upx; */
	display: flex;
	/* padding-top: 60upx; */
	background-color: #fff;
}
.f_left {
	line-height: 40upx;
	width:50%;
	color:#000000;
}
.f_right {
	line-height: 40upx;
	flex: 1;
	color:#000000;
}
.f_t {
	text-align: center;
	font-size: 26upx;
	font-weight: 400;
	height: 74upx;
    line-height: 94upx;
}
.f_b {
	text-align: center;
	font-size: 30upx;
	font-weight: 400;
	color: #4b56c0;
	line-height:60upx;
}
.no_content{
		margin: 38% 0 ;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height:60upx;
	}
.no_content image{
	}
.blue_line{
	    width: 1px;
		background: #F8F8F8;
		height: 100upx;
		/* margin-top: 14px;
		margin-left: 16px; */
	}
</style>
