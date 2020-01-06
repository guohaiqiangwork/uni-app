<template>
	<view class="">
		<!-- 支付状态 -->
		<view class="first_top">
			<view class="zhaungtai">
				<text class="dingdan">订单状态：{{orderlist.status=='1'?"待支付":orderlist.status=='2'?"待收货":"已完成"}}</text>
			</view>
		</view>
		<!-- 邮寄地址 -->
		<view class="youjiAddress" v-if="orderlist.method==0">
			<view class="Location">
				<view class="tubiao_left">
					<text class="icon_4">&#xe64f;</text>
				</view>
				<view class="wenzi_center">
					{{orderlist.username}}
				</view>
				<view class="num_right">
				{{orderlist.phone}}
				</view>
			</view>
			<view class="posi_s">
				<view class="d_bottom">
					{{userAddresslist.area}}{{userAddresslist.address}}
				</view>
			</view>
		</view>
		<!-- 自提地址 -->
		<view class="youjiAddress" v-if="orderlist.method==1">
			<view class="Location">
				<view class="tubiao_left">
					<text class="icon_4" style="color:#303030">&#xe64f;</text>
				</view>
				<view class="wenzi_center" style="color:#303030">
					自提地址
				</view>
			</view>
			<view class="posi_s">
				<view class="d_bottom" >
					内蒙古自治区包头市昆都仑区时代广场C座709
				</view>
			</view>
		</view>
		
		
		
		
		<!-- 中间部分 -->
		<view class="center_t">
			<view class="one-top">
				<view class="one-pic">
					<image :src="commoditylist.smallpicture"></image>
				</view>
				<view class="two_n">
					<view class="center_right_top">
						{{orderlist.cname}}
					</view>
					<view class="center_right_bottom">
						<view class="center_right_left">
							{{commoditylist.price}}
						</view>
						<view class="center_right_right">
							x 	{{orderlist.tradenum}}
						</view>
						
					</view>
				</view>
			</view>
		
			<view class="y_f" v-if="orderlist.method==0">
				<view class="y_f_one">
					运费
				</view>
				<view class="y_f_two">
					￥{{commoditylist.postage}}
				</view>
			</view>
			<view class="f_k">
				<view class="f_k_one">
					实付款  	(含运费)
				</view>
				<view class="f_k_two">
					￥{{paymoney}}
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="d_info">
			<view class="info_one">
				订单信息
			</view>
			<view class="info_two">
				<view class="info_left">
					订单编号 :
				</view>
				<view class="info_right">
					{{orderlist.ordernum}}
				</view>
			</view>
			
			<view class="info_two">
				<view class="info_left">
					创建时间 :
				</view>
				<view class="info_right">
					{{orderlist.createTime}}
				</view>
			</view>
			<view v-if="orderlist.payMethod!=''">
				<view class="info_two">
					<view class="info_left">
						交易类型 :
					</view>
					<view class="info_right">
						{{orderlist.payMethod}}
					</view>
				</view>
				<view class="info_two">
					<view class="info_left">
						交易时间 :
					</view>
					<view class="info_right">
					{{orderlist.payTime}}
					</view>
				</view>
				<view class="info_two">
					<view class="info_left">
						交易编号 :
					</view>
					<view class="info_right">
						{{orderlist.payid}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<!-- 待支付 -->
		<!-- <view class="bottom_only" v-if="orderlist.status==1">
			<view class="bottom_z">
				<view class="botton_one">
					合计 :
				</view>
				<view class="bottom_two">
					￥{{paymoney}}<text> (含运费)</text>
				</view>
				
				<view class="bottom_four" @click="ljzf('1')">
					<view class="border_blue">
							立即支付
					</view>
				</view>
			</view>
		</view> -->
		<!-- 待收货 -->
<!-- 		<view class="bottom_only" v-if="orderlist.status==2">
			<view class="bottom_z">
				<view class="bottom_four" style="padding-left:480upx">
					<view class="border_blue" @click="ljzf()">
							确认收货
					</view>
				</view>
			</view>
		</view> -->
			<!-- <view style="height: 200upx;" ></view> -->
			 <view class="bottom_add" >
				<view class="fixed_btm" @click="fhsy()">
					返回产品中心
				</view>
			</view>
		<!-- 已完成 -->
	<!-- 	<view class="bottom_only" v-if="orderlist.status==3">
			<view class="bottom_z">
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderlist:'',
				commoditylist:'',
				paymoney:'',
				userAddresslist:'',
				}
		},
		onLoad(option){
			var that=this;
			this.$http.get('/api/v1/selectOrderMessage', {userid: uni.getStorageSync('id'),id:option.id}).then(res => {	
					if(res.data.resultCode==200){
						 that.orderlist =res.data.data.order;
						 that.commoditylist=res.data.data.commodity;
						 that.paymoney=res.data.data.order.paymoney.toFixed(2);
						 that.userAddresslist=res.data.data.userAddress;
						 
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
		
		methods: {
			fhsy(){
				uni.switchTab({
				    url: '/pages/ProductCenter/ProductCenter'
				});
			}
		}
	}
</script>

<style>
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
.zhaungtai {
	background-color: #111726;
	height:80upx;
	line-height: 80upx;
	color:#FFFFFF;
	font-size: 28upx;
	padding-left: 40upx;
}
.icon_4{
		font-family: iconfont;
		font-size: 42upx;
		color: #000000;
	}
.youjiAddress{
	background-color: #FFFFFF;
	/* height:150upx; */
}
.Location{
	padding-left:40upx;
	display: flex;
}
.tubiao_left {
	width:8%;
	height:84upx;
	line-height: 84upx;
}
.wenzi_center{
	width:18%;
	height:84upx;
	line-height: 84upx;
	font-size: 30upx;
}
.num_right {
	flex: 1;
	height:84upx;
	line-height: 84upx;
	font-size: 30upx;
}
.posi_s{
	/* height:56upx; */
	line-height: 46upx;
}
.d_bottom {
	padding-left:100upx;
	font-size: 30upx;
	line-height:50upx;
}
.center_t{
	background-color: #FFFFFF;
	/* height:400upx; */
	margin-top:12upx;
	
}
.one-top {
display:flex;
height:210upx
}
.one-pic {
	width:30%;
	height: 210upx;
    line-height: 400upx;
	padding-left: 50upx;
}
.one-pic image {
	width:168upx;
	height:168upx;
}
.two_n{
	flex:1;
	height: 210upx;
}
.center_right_top {
	height:104upx;
	line-height: 168upx;
	font-size: 28upx;
}
.center_right_bottom {
	height:104upx;
	line-height: 88upx;
	font-size: 28upx;
	display:flex;
}
.center_right_left{
	width:65%;
}
.center_right_right{
	flex:1;
	color: #a0a0a0;
	font-size:28upx;
	text-align: center;
}
.y_f {
	display: flex;
	height:100upx;
	line-height:100upx ;
	padding-left:50upx;
}
.y_f_one {
	width:50%;
	font-size:28upx;
	
}
.y_f_two {
	flex:1;
	color:#a0a0a0;
	font-size: 28upx;
	text-align: right;
	padding-right: 8%;
}
.f_k{
	display: flex;
	height:70upx;
	line-height:70upx ;
	padding-left:50upx;
}
.f_k_one {
	width:50%;
	font-size:28upx;
}
.f_k_two {
	flex:1;
	color:#FF6740;
	font-size:32upx;
	text-align: right;
    padding-right: 8%;
}
.d_info{
	background-color: #FFFFFF;
	margin-top:20upx;
	padding-bottom: 20upx;
	}
.info_one {
	padding-left: 40upx;
	height:80upx;
	line-height:80upx;
	display: flex;
	font-size:30upx;
	}
.info_two {
	padding-left: 40upx;
	height:50upx;
	line-height:50upx;
	display: flex;	
	}
.info_left {
	width:24%;
}
.info_right {
	flex:1;
	color:#A0A0A0;
}
.bottom_only {
	bottom: 0;
	background-color: #FFFFFF;
	height:110upx;
    width: 100%;
    position: fixed;
    z-index: 99;
}
.bottom_z {
	height:110upx;
/* 	margin-top:40upx; */
	display: flex;
}
.botton_one {
	width:20%;
	text-align: center;
	height:110upx;
	line-height:110upx;
	font-size: 30upx;
}
.bottom_two {
	flex:0;
	height:110upx;
	line-height:110upx;
	font-size: 34upx;
	color:#FF6740;
	flex:1;
}					
.bottom_two text {
	font-size:28upx;
	color:#C7C7C7;
	padding-left: 20upx;
}		

.bottom_four{
	width:36%;
	height:110upx;
	line-height:110upx;
	margin-top: 12upx;
	
}
.border_blue{
	width: 230upx;
	height: 86upx;
	background-color: #121826;
	border-radius: 85px 85px;
	color:#EDB315;
	text-align: center;	
	font-size: 30upx;
	line-height:86upx;
}

</style>
