<template>
    <view  class="page">
		<headX></headX>
		
		<view class="pngbanner">
		<view class="index_title">
				<view class="moneys" v-if="showmoney==true">
					{{Tolunt}}
				</view>
				<view class="moneys" v-if="showmoney==false">
					******
				</view>
			<view class="shouyi" @click="showPwd">
				<img :src="showmoney==false?'../../static/img/eye1.png':'../../static/img/eye2.png'" mode="" style="width:40upx;height:24upx">
				<text style="padding-left: 10upx;">总收益(元)</text>
			</view>
			<view class="index_mey">
				<view class="mey_left">
					<view class="mey_top"  v-if="showmoney==true">
						{{ActceMoney}}
					</view>
					<view class="mey_top" v-if="showmoney==false">
						****
					</view>
					<view class="mey_bom">
						激活返现(元) 
					</view>
					
				</view>
				<view class="mey_center">
					
				</view>
				<view class="mey_right">
					<view class="mey_top" v-if="showmoney==true">
						{{Amfit}} 
					</view>
					<view class="mey_top" v-if="showmoney==false">
						****
					</view>
					<view class="mey_bom">
						分润金额(元)
					</view>
				</view>
			</view>
		</view>
		</view>
		<!-- 滚动公告 -->
		<!-- <view class="scroll_msg">
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-icon">
					<image src="../../static/img/tongzhi.png" mode="widthFix" style="width: 15px;height: 12px;"></image>
				</view> 
				<swiper vertical="true" autoplay="true" circular="true" interval="3000"  > 
					<swiper-item v-for="(item, index) in msg" :key="index">
						<navigator>{{item.title}}:{{item.value}}</navigator> 
					</swiper-item>
				</swiper>
			</view>
		</view> -->
		<!-- 滚动广告2.0 -->
		<view>
			<view class="sroll_ads">
				<view style="width:13%;font-size: 32upx;height: 40upx;line-height: 40upx;">
					公告
				</view>
				<view style="width:13%;">
					<view class="hcon_txt">
						通知
					</view>
				</view>
				<view style="flex: 1;">
					<!-- <view class="msg_gonggao">
						{{item.value}}
					</view> -->
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" class="msg_gonggao" >
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator>{{item.value}}</navigator> 
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		
		<!-- swiper -->
		<!-- <view style=" margin-top: 10upx; ">
			<swiper class="imageContainer" @change="handleChange"  next-margin="55rpx" circular  autoplay> -->
				<!-- previous-margin="50rpx" -->
				<!-- <block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem"> -->
						<!-- :class="currentIndex == index ? 'swiperactive': ''" --><!-- 放大class：swiperactive -->
<!-- 						<image class="itemImg" @click="swiperClick(item.url)" :src="item.picture" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view> -->
		<!-- banner -->
		<view style=" margin-top: 20upx; ">
			<view class="imageContainer">
				<image src="../../static/img/banner.png" mode="" style="width: 730upx;height: 190upx;"></image>
			</view>
		</view>
		<!-- 快捷方式 -->
		<!-- <view class="quickzuo">
			<view>快捷操作</view>
		</view>
		<view class="quickzuo">
			<view style="background-color: #ffffff;height:232upx;border-radius: 20upx;margin-top:20upx">
			<view style="display: flex;height:164upx"> 
			<view style="height:164upx;line-height: 260upx; width: 25%;text-align: center;">
				<image src="../../static/img/qiandao.png" mode=""style="width:104upx;height:104upx"></image>
			</view>
			<view style="height:164upx;line-height: 260upx; width: 25%;text-align: center;">
				<image src="../../static/img/myjiju.png" mode=""style="width:102upx;height:106upx"></image>
			</view>
			<view style="height:164upx;line-height: 260upx; width: 25%;text-align: center;">
				<image src="../../static/img/mydaili.png" mode=""style="width:104upx;height:104upx"></image>
			</view>
			<view style="height:164upx;line-height: 260upx; width: 25%;text-align: center;">
				<image src="../../static/img/zeceruw.png" mode=""style="width:104upx;height:104upx"></image>
			</view>
			</view>
			<view style="display: flex;font-size:28upx">
				<view style="width: 25%;text-align: center;">
					签到
				</view>
				<view style="width: 25%;text-align: center;">
					我的机具
				</view>
				<view style="width: 25%;text-align: center;">
					我的代理
				</view>
				<view style=" width: 25%;text-align: center;">
					注册入网
				</view>
			</view>
				</view>
				</view> -->
		
		
		<view class="content-card">
			<view class="cCard_title">
				<text style="height:90upx;line-height: 90upx;font-size: 30upx;">快捷操作</text>
			</view>
			<view class="cCard_body">
				<!-- cols_4 -->
				<view class="cols_4" style="width: 25%;" @click="integral()">
					<view class="cols_icon" >
						<image src="../../static/img/qiandao.png" mode="" style="width:104upx;height:104upx;"></image>
					</view>
					<view class="cols_text">
						<text>签到</text>
					</view>
				</view>
				<!-- cols_4 -->
				<view class="cols_4" style="width: 25%;" @click="myMachine()">
					<view class="cols_icon">
						<image src="../../static/img/myjiju.png" mode="" style="width:104upx;height:104upx;"></image>
					</view>
					<view class="cols_text">
						<text>我的机具</text>
					</view>
				</view>
				<!-- cols_4 -->
				<view class="cols_4" style="width: 25%;" @click="myAgent()">
					<view class="cols_icon" >
						<image src="../../static/img/mydaili.png" mode="" style="width:104upx;height:104upx;"></image>
					</view>
					<view class="cols_text">
						<text>我的代理</text>
					</view>
				</view>
				<!-- cols_4 -->
				<view class="cols_4" style="flex: 1;" @click="jijujihuo()">
					<view class="cols_icon" >
					<image src="../../static/img/zeceruw.png" mode="" style="width:104upx;height:104upx;"></image>
					</view> 
					<view class="cols_text">
						<text>注册入网</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
	
		<view class="quickzuo" style="height:70upx;line-height: 70upx;">
			<view style="color:#171D26">
				产品总收益<text style="color:#7f8084;font-size:24upx;padding-left: 10upx;">(元)</text>
			</view>
		</view>
		<!-- 产品收益 -->
		<!-- 产品收益有数据 -->
		<view class="inproduct" v-for="(item,index) in chanPlist" :key="index"  @click="seeMore(index)">
			<view class="inbanner"  :style="{backgroundImage:(chanPlist.length>4?'../../static/img/index1.png':'url(../../static/img/index' + (index+1) + '.png)')}">
				<view class="inbanner_top">
					<view class="blue_line">
						
					</view>
					<view class="right_text">
						{{item.platform}} {{item.name}}
					</view>
				</view>
				<view class="inbanner_center">
					<view class="big_sum">
						{{item.money.toFixed(2)}}<!-- <text class="small_text">元</text> -->
					</view>
					
				</view>
				<view class="inbanner_bottom">
					<view class="hang_bottom" >
						<view class="border_blue">
								查看详情
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 产品收益无数据 -->
		<view v-if="chanPlist==''" class="inproduct" v-for="(item,index) in datalist" :key="index"  @click="selectproduct(index)">
			<view class="inbanner"  :style="{backgroundImage:(datalist.length>4?'../../static/img/index1.png':'url(../../static/img/index' + (index+1) + '.png)')}">
				<view class="inbanner_top">
					<view class="blue_line">
						
					</view>
					<view class="right_text">
						{{item.platform}} {{item.name}}
					</view>
				</view>
				<view class="inbanner_center">
					<view class="big_sum small_font">
						{{item.describe}}
					</view>
					
				</view>
				<view class="inbanner_bottom">
					<view class="hang_bottom" >
						<view class="border_blue">
								查看详情
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
    </view> 
</template>
<script>
	import headX from '@/components/header/header';
	export default {
		components: {  
			headX
		},
	    data() { 
	        return {
	            text: '惠客+',
				msg : [
					'通知公告：惠客+APP上线啦',
					'通知公告：惠客+APP点击优惠等你拿',
					'通知公告：今晚吃鸡！'
				],
				imgList:[
					// {"picture": "http://39.104.27.78:8080/img/zx2.jpg"},
					// {"picture": "http://39.104.27.78:8080/img/zx1.jpg"},
					// {"picture": "http://39.104.27.78:8080/img/zx.jpg"},
				],  
				currentIndex:'0' ,
				ActceMoney:'0.00',
				Amfit:'0.00',
				Tolunt:'0.00',
				chanPlist:'',
				datalist:'',
				showmoney:false,
				
	        }
	    },
		onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.requestLIST();
			this.showMsg();
		},
		onLoad() {
			//uni.getStorageSync('token')==''?this.notoken()                                                                                                                                                                                                                                                                                                                                                                                             :''//判断登录状态
			var that=this;
			 //这里表示当进入页面的时候就开始执行下拉刷新动画
		
		},  
		computed: {
			userNames: function () {//状态管理中state数据实时展示在本页面
				return this.$store.state.userName;
			},
			
     	},
		onShow() { 
			this.showMsg();
		},
	
		onTabItemTap(){
			this.showMsg();
		},
		onReady(){
		},
	    methods: {
			requestLIST(){
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			},
			showPwd(){
				this.showmoney=!this.showmoney;
			},
			integral(){
				uni.navigateTo({ 
					url: '../2ndPage/integral/integral'
				});
			},
			myMachine(){
				uni.navigateTo({ 
					url: '../2ndPage/myMachine/myMachine'
				});
			},
			myAgent(){
				uni.navigateTo({ 
					url: '../2ndPage/myAgent/myAgent'
				});
			},
			jijujihuo(){
				uni.navigateTo({
					url: '../2ndPage/jijujihuo/jijujihuo'
				});
			},
			swiperClick(url){
				uni.navigateTo({
					url: url,
				});
			},
			selectproduct(index){
				 var data=this.datalist[index]
				 console.log(data)
				 uni.navigateTo({
					url: '../2ndPage/selectproduct/selectproduct?id='+data.id+'&pic='+data.detailspicture+''
				 });
			},
			seeMore(e) {
				var listdata=this.chanPlist[e];
				uni.navigateTo({
					url: '../2ndPage/revenueProduct/revenueProduct?platform='+listdata.platform+'&name='+listdata.name+''
				});
			},
			seeXiangqing(){
				uni.navigateTo({
					url: '../2ndPage/selectproduct/selectproduct'
				});
			},
	    handleChange(e){
			this.currentIndex=e.detail.current;
		},
		showMsg(){
			this.$store.commit('TITLE','惠客+');
			uni.getStorageSync('token')==''?this.notoken():''//初始首页判断登录状态
			this.$http.get('/api/v1/getRadio', {id: uni.getStorageSync('id')}).then(res => {
					
					if(res.data.resultCode==200){
						  this.msg = res.data.data.radio;
					}else if(res.data.resultCode==400){
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
			this.$http.get('/api/v1/getRadioPicture', {id: uni.getStorageSync('id')}).then(res => {
					
					if(res.data.resultCode==200){ 
						  this.imgList = res.data.data.radio;
					}else if(res.data.resultCode==400){
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
			var that = this;
			/* 页面初始加载产品收益值 */
			this.$http.get('/api/v1/selectProfit', {userid: uni.getStorageSync('id')}).then(res => {
					if(res.data.resultCode==200){ 
						that.ActceMoney=0.00;
						that.Amfit=0.00;
						that.Tolunt=0.00;
						 for(var i=0;i<res.data.data.shareProfits.length;i++){
							 if(res.data.data.shareProfits[i].type==1){
								 that.ActceMoney=res.data.data.shareProfits[i].money.toFixed(2);;
							 }
							 if(res.data.data.shareProfits[i].type==0){
								 that.Amfit=res.data.data.shareProfits[i].money.toFixed(2);;
							 }
							 if(res.data.data.shareProfits[i].type==4){
							 	 that.Tolunt=res.data.data.shareProfits[i].money.toFixed(2);;
							 }
						 }
						  that.chanPlist=res.data.data.product;
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
			var that=this;
			this.$http.get('/api/v1/getCommodity', {id: uni.getStorageSync('id')}).then(res => {
				if(res.data.resultCode==200){
					that.datalist=res.data.data.commodity
				}else if(res.data.resultCode==400){
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
		notoken(){
			uni.redirectTo({
				url: "../login/login"
			});
		}
	    }
	}
</script>
<style lang="scss">
	.content-card{
		background: #fff;
		margin-bottom: 40upx;
		padding-bottom: 40upx;
		
	}
	.cCard_title{
		width: 95%;
		margin-left: 5%;
		// border-bottom: 1px solid #f8f8f8;
	}
	.cCard_body{
		margin: 0 3%;
		display: flex;
		text-align: center;
	}
	.quickzuo{
		width:90%;
		padding: 0 5%;
		color:#171D26;
		font-size: 30upx;
		font-weight:500;
	}
	.msg_gonggao{
		font-size:24upx;
		color:rgba(58,59,65,1);
		opacity:0.64;
		height: 40upx;
		line-height: 40upx;
	}
	.hcon_txt{
		    height: 28upx;
		    width: 60upx;
		    font-size: 24upx;
		    line-height: 28upx;
		    border: 1px solid #FF5851;
		    text-align: center;
		    border-radius: 12upx;
		    color: #FF5851;
			margin-top:6upx;
	}
	.sroll_ads{
		display: flex;
		width:84%;
		padding:0 8%;
		padding-top:10upx;
		height:20upx;
	}
	.pngbanner{
		width:96%;
		padding:0 2%;
		
	}
	.index_title{
		height: 350upx; 
		width: 100%;
		background: linear-gradient(top,#4B56C0,#e38869);
		background-image: url('../../static/img/bg10.png');
		background-repeat: no-repeat;
		text-align: center;
		color: #FFFFFF; 
		background-size: 100%;
		border-radius: 20upx;
	}
	.icon_i{
		font-family: iconfont;
		margin-right: 8upx;
		color: #4B56C0;
		font-size: 42upx;
	}
	.shouyi{
		font-size: 30upx;
		line-height: 75upx; 
		height: 62upx;
	}
	.moneys{
		font-size: 66upx;
		/* font-weight: 700; */
		padding-top:40upx;
	}
	.index_mey{
		width: 93.2%;
		margin: 0 3.4%;
		// box-shadow: 0px 1px 4px rgba(0,0,0,0.16);
		height: 150upx;
		// border-radius: 8upx;
		display: flex;
		// background: #fff;
		// margin-top: 46upx;
	}
	.mey_center{
		width: 1px;
		height: 60upx;
		margin-top: 50upx;
		border-left: 1px solid #D9DBEC;
	}
	.mey_left{
		width: 50%;
		text-align: center;
		color: #FFFFFF;
	}
	.mey_right{  
		flex: 1; 
		text-align: center;
		color: #FFFFFF;
		
	}
	.mey_top{
		font-size: 40upx; 
		height: 66upx;
		line-height: 72upx;
		padding-top: 20upx;
	}
	.mey_bom{
		font-size: 24upx;
	} 
	.scroll_msg{
		width: 88%; 
		margin: 0 3.5%; 
		margin-top: 18upx; 
		background: #ffff;
		padding: 0 2.5%;
		box-shadow: 0px 1px 4px #ccc;
		border-radius: 6upx; 
		font-size: 24upx;
		color: #666;
	}
	
	/* swiper msg */
	.uni-swiper-msg{width:100%; padding:12rpx 0; flex-wrap:nowrap; display:flex;}
	.uni-swiper-msg-icon{width:50upx;padding-top: 6px;} 
	.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
	.uni-swiper-msg swiper{width:100%; height:50upx;}
	.uni-swiper-msg swiper-item{line-height:50upx;}
	
/* 	// 3D轮播样式 */
	.imageContainer {
		width: 96%;
		padding: 0 2%;
		// background-color: #fafafa;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height:500upx;
		padding: 0upx 26upx;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56upx;
			left: 51upx;
			z-index: 998;
			width:162upx;
			height:163upx;
			//background:rgba(255,255,255,1);
			border-radius:8upx;
			padding:10upx;
			.name {
				font-size:26upx;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37upx;
				margin-bottom: 10upx;
			}
			.zq,.cz {
				font-size:20upx;
				color:rgba(253,57,91,1);
				line-height:35upx;
			}
			.addNl {
				width:120upx;
				height:26upx;
				background:rgba(253,57,91,1);
				border-radius:13upx;
				font-size:20upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26upx;
				margin-top: 10upx;
			}
			
		}
	}
	
	.itemImg {
		position: absolute;
		width: 95%;
		/* height: 380rpx; */
		height: 95%;
		border-radius: 15rpx;
		z-index: 5;
		// opacity: 0.7;
		top: 5%;
		box-shadow:0px 4upx 15upx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 95%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx;  287upx*/
		height: 300upx;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 10upx;
		}
	}
	.inproduct {
		margin-bottom:20upx;
	}
	.inbanner {
		background-color: #ffffff;
		width: 93.2%;
		margin: 0 3.4%;
		height: 240upx;
		background-image: url('../../static/img/index1.png');
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.inbanner_top {
		display: flex;
		height: 70upx;
		line-height: 70upx;
	}
	.blue_line{
	    width: 3px;
		font-size: 17px;
		background: #161C26;
		height: 15px;
		margin-top: 14px;
		margin-left: 16px;
	}
	.right_text {
		flex: 1;
		font-size: 28upx;
		height: 80upx;
		line-height: 84upx;
		// font-weight: 700;
		padding-left: 10upx;
		color:rgba(39,39,39,1);
	}
	.inbanner_center{
		display: flex;
	}
	.big_sum{
		color:#EDB315;
		font-size: 42upx;
		// width: 50%;
		padding-left: 52upx;
		height: 70upx;
		line-height: 65upx;
		// text-align: center;
	}
	.big-font{
		font-size: 32upx;
	}
	.small_text{	
		flex: 1;
		color:#ccc;
		font-size: 28upx;
		height: 72upx;
		line-height: 72upx;
		padding-left: 10upx;
		}
		.hang_bottom {
			height:80upx;
			line-height: 80upx
		}
	.border_blue {
		width: 23%;
		height: 44upx;
		background-color: #161C26;
		margin-left: 50upx;
		border-radius: 15px 15px;
		line-height: 44upx;
		text-align: center;
		font-size: 12px;
		color: #fff;
	}
	
	.bottom_text {
		color: #ffffff;
		height: 52upx;
		line-height: 46upx;
		text-align: center;
		font-size: 24upx;
	}
.small_font {
		font-size:30upx;
}
</style>