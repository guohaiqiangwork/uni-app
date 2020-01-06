<template>
	<view class="page population">
		<!-- head -->
	<view class="header">
		<view class="h_top"></view>
		<view class="h_main" >
			<text>{{title}}</text>
			<!-- <text class="icons icons_h_right" @click="msg">
			<image src="../../static/img/msg.png" mode="" style="height:36upx;width:36upx"></image>
			</text> -->
			<text class="icons icons_h_left"style="font-size: 36upx;" @click="integralDD">&#xe621;</text>
		</view>
		
	</view>	
	<!-- 搜索框 -->
	<view class="top_flex">
	<view class="top_left icon_4">&#xe679;</view>
	<view class="top-right">
	 <input class="findShop" maxlength="10" placeholder="按关键字搜索商品" @blur='Search' @chgfhfghonfirm='Search'/>
	 </view>
	</view>
	<!-- 轮播图 -->
	<view style=" margin-top: 10upx;">
		<swiper class="imageContainer" @change="handleChange" circular  autoplay>
			<block v-for="(item,index) in imgList" :key="index" >
				<swiper-item class="swiperitem" >
					<image class="itemImg" @click="swiperClick(item.url)" :src="item.picture" lazy-load mode="scaleToFill"></image>
				</swiper-item>
			</block>
		</swiper>
	</view>
	<!-- 展示分类 -->
<view class="fenleibox ">
	<view class="showpic"  v-for="(item,index) in piclist" @click="displayClass(index)">
		<view class="showlist_top">
			<view class="showlist">
				<img :src="item.picture" mode="widthFix" lazy-load="true" class="picsize">
			</view>
		</view>
		<view class="">
			 <view class="showlist_top">
				<view class="shoptext">
				{{item.name}}
				</view>
			</view> 
		</view>
		</view>
</view>	

<!-- 商城热卖-->
	<view class="shopHot">
		<view style="width:7%;height:40upx;line-height:40upx">
		<view class="yellow_line">
			
		</view>
		</view>
		<view class="exchange">
			热门兑换
		</view>
	</view>
	<!-- 积分兑换展示 -->
	<view class="integralChange" v-for="(item,index) in datalist" @click="todec(item.id)">
		<view class="jifenex">
			<view class="flex_left">
				<image :src="item.smallpicture" mode="widthFix" style="width:130upx;height: 130upx;border-radius: 5px" lazy-load="true"></image>
			</view>
			<view class="jifen_flex_right">
				<view class="right_top">
					{{item.name}}
				</view>
				<view class="right_bottom">
					<view class="f_r_bottom">
						<view class="f_r_b_left">
							<img src="../../static/img/star.png" alt="" style="width:40upx;height:40upx">
						</view>
						<view class="f_r_b_center">{{item.price}}</view>
						<view class="f_r_b_right">积分兑换</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	
	<!-- 兑换好礼 -->
	<view class="shopHot">
		<view style="width:7%;height:40upx;line-height:40upx">
		<view class="yellow_line">
		</view>
		</view>
		<view class="exchange">
			兑换好礼
		</view>
	</view>
	<!-- 商品展示 -->
		<view class="shopbox">
		<view class="shopShow" v-for="(item, index) in shoplist" @click="todec(item.id)">
		<view class="inline_one">
			<view class="inline_left">
				<image :src="item.smallpicture" mode="widthFix" style="width:336upx;height: 320upx;" lazy-load="true"></image>
			</view>
		</view>
		<view class="haolishow" >
			<view class="text_flex">
				<view class="t_f_l">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="jifen">
			<view class="text_flex">
					<view class="bottom_shuzi_left">{{item.price}}</view>
					<view class="bottom_shuzi_right">积分</view>
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
				imgList:[],
				datalist:'',
				shoplist:'',
				piclist:'',
				title:'积分商城',
			}
		},
		
		onShow(){
			this.$store.commit('TITLE','积分商城')
			this.$http.get('/api/v1/integralMall', {userid: uni.getStorageSync('id')}).then(res => {
					
					if(res.data.resultCode==200){ 
						  this.imgList = res.data.data.radio;
						  this.datalist = res.data.data.hotCommodity;
						  this.shoplist = res.data.data.commodities;
						  this.piclist = res.data.data.productTypes;
// 						  console.log(111);
// 						  console.log(piclist[1].type);
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
		methods: {
			Search(e){
				console.log(e.detail.value)
				uni.navigateTo({
					url: '../2ndPage/SearchSP/SearchSP?name='+e.detail.value
				});	
			},
			todec(e){
				uni.navigateTo({
					url: '../2ndPage/deCommodity/deCommodity?id='+e
				});	
			},
			handleChange(e){
				this.currentIndex=e.detail.current;
			},
			displayClass(e){
				var that=this;
// 				console.log(1111111);
// 				console.log(e);
// 				console.log(this.piclist[e].type);
				uni.navigateTo({
					url: '../2ndPage/classShop/classShop?type='+this.piclist[e].type+''
				});
			},
			msg(e){
				uni.navigateTo({
					url:"../../pages/msg/msg"
				})
				
			},
			integralDD(){
				uni.navigateTo({ 
					url: '../2ndPage/integralDD/integralDD?id=0'
				});
			},
		}
	}
</script>

<style lang="scss">
.top_flex{
	display:flex;
	width: 92%;
	margin: 30upx 4% 0 4%;
	padding-top: 2px;
	}
.top_left{
	width:8%;
	background-color: rgba(245,245,245,1);
	height:80upx;
	border-radius: 11px 0 0 11px;
	height: 40px;
    line-height: 40px;
    padding-left: 7px;
}
.top-right{
	flex:1;
}
.findShop{
    background-color: rgba(245,245,245,1);
    opacity: 1;
    border-radius: 0 11px 11px 0;
	height:80upx;
}
.icon_4{
	font-family: iconfont;
	font-size: 40upx;
	color:#A0A0A0;
    
}
/* 轮播样式 */
.uni-swiper-msg{width:100%; padding:12rpx 0; flex-wrap:nowrap; display:flex;}
	.uni-swiper-msg-icon{width:50upx;padding-top: 6px;} 
	.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
	.uni-swiper-msg swiper{width:100%; height:50upx;}
	.uni-swiper-msg swiper-item{line-height:50upx;}
	
/* 	// 3D轮播样式 */
	.imageContainer {
		width: 96%;
		padding-left: 4%;
		background-color: #fafafa;
	}
	
	.swiperitem {
		height:500upx;
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
	.showlist_top{
		display:flex;
		padding-left: 12upx;
	}
	.picsize{
		width:110upx;
		height:110upx;
	}
	.showpic{
		width: 20%;
		display: inline-block;
// 		background: #fff;
// 		border: 1px solid #fafafa;
	}
	.fenleibox{
		margin: 0 4%;
		width: 92%;
		padding-top:20upx;
	}
	.showlist{
		width:19%; 
	}
	.shoptext{
		width:85%; 
		text-align: center;
		color:#3A3B41;
		font-size:24upx;
	}
	.flex_right_top_bottom{
		flex:1; 
		text-align: center;
		color:#3A3B41;
		font-size:24upx;
	}
	.shopHot{
		width: 98%;
		margin: 6px 1%;
		padding-top:40upx;
		display:flex;
	}
	.yellow_line{
	    width: 6upx;
		font-size: 34upx;
		background: rgba(219,160,0,1);
		height: 30upx;
		margin-left: 32upx;
	}
	.exchange{
		flex:1;
		height:40upx;
		line-height:30upx;
		color:rgba(23,29,38,1);
		font-weight:700;
		font-size: 30upx;
	}
	.seeMore{
		flex:1;
		color:#3A3B41;
		height:40upx;
		line-height:28upx;
		text-align: right;
		padding-right: 32upx;
	}
	.integralChange{
	width:90%;
	padding:0 5%;
	}
	.jifenex{
		height:162upx;
		width:670upx;
		background: #161C26;
// 		background-image: url('../../static/img/bg.png');
// 		background-repeat: no-repeat;
		opacity:1;
		border-radius:30upx;
		display:flex;
	}
	.flex_left{
		width:28%;
		padding:16upx 0 0 18upx;
	}
	.jifen_flex_right{
		width: 72%;
	}
	.right_top{
		color:white;
		height:92upx;
		line-height:76upx;
		font-size:30upx;
		overflow: hidden;  
		text-overflow: ellipsis;  
		white-space: nowrap;/**不换行**/
	}
	.f_r_bottom{
		width:244upx;
		height:52upx;
		background:rgba(123,68,5,1);
		border-radius:22px;
		color:#FFFFFF;
		display:flex;
	}
	.right_bottom{
		height:68upx;
		line-height:54upx;
	}
	.f_r_b_left{
		width:17%;
		padding-left:6upx;
		color: rgba(255,219,145,1);
		height:68upx;
		line-height:78upx;
	}
	.f_r_b_center {
		flex:1;
		font-size:36upx;
		padding-left:8upx;
	}
	.f_r_b_right{
		width:60%;
		color:#FFFFFF;
		font-size:20upx;
		padding-top:2upx;
		text-align: center;
	}
	.shopbox{
		margin: 0 4%;
		width: 92%;
	}
	.shopShow{
		width: 49%;
		display: inline-block;
		background: #fff;
		border: 1px solid #fafafa;
	}
	.inline_one{
		display:flex;
		height:340upx;
	}
	.inline_left{
		width:50%;
	}
	.inline_right{
		flex:1;
		text-align: right;
	}

	.text_flex{
		display:flex;
		height: 60upx;
	}
	.t_f_l{
		height:86upx;
		color:#3A3B41;
		padding: 2px 6px 0 0;
		overflow: hidden;  
		text-overflow: ellipsis;  
		white-space: nowrap;/**不换行**/
		font-size: 12px;
	}
	.t_f_r{
		flex:1;
		height:100upx;
		color:#3A3B41;
		text-align: left;

	}
	.bottom_flex_left{
		display:flex;
		height:40upx;
	}
	.bottom_flex_right{
		flex:1;
		display:flex;
		height:40upx;
		line-height: 40upx;
	}
	.bottom_shuzi_left{
		color:#DB953A;
		font-size:40upx;
		height:40upx;
		line-height: 40upx;
		// padding-left: 16upx;
	}
	.bottom_shuzi_right{
		
		height: 20px;
		line-height: 25px;
		color: #DB953A;
		margin-left: 2px;
		}
	.jifen{
		height:40upx;
		margin-bottom:20upx;
	}
</style>
