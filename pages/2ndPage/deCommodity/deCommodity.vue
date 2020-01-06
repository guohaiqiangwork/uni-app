	<template>
	<view class="bgcolor">
			<view class="detailpage">
				<img :src="pislist.picture" alt="" style="width:690upx;height:690upx">
			</view>
			<view class="sec_text">
				<view class="detailpage">
				<view class="top_text">
					{{pislist.name}}
				</view>
				<view class="flex_bottom">
					<view class="f_b_l">
						{{pislist.price}}
					</view>
					<view class="f_b_r">
						积分
					</view>
				</view>
				</view>
			</view>
			<view class="xqpic" v-if="pislist.introducepicture1!=''">
				<image :src="pislist.introducepicture1" mode="widthFix" style="height:328upx;width:750upx"></image>
			</view>
			<view class="xqpic" v-if="pislist.introducepicture2!=''">
				<image :src="pislist.introducepicture2" mode="widthFix" style="height:328upx;width:750upx"></image>
			</view>
			<view class="xqpic"v-if="pislist.introducepicture3!=''">
				<image :src="pislist.introducepicture3" mode="widthFix" style="height:328upx;width:750upx"></image>
			</view>
			<view class="xqpic"v-if="pislist.introducepicture4!=''">
				<image :src="pislist.introducepicture4" mode="widthFix" style="height:328upx;width:750upx"></image>
			</view>
			<view class="xqpic"v-if="pislist.introducepicture5!=''">
				<image :src="pislist.introducepicture5" mode="widthFix" style="height:328upx;width:750upx"></image>
			</view>
			<view class="zhujie">
				*图片仅以实物为主
			</view>
			<view class="bottom_button" @click="orderXq">
				<view class="bottombg">
					<view class="quickbuy">立即购买</view>
				</view>
			</view>
			
	</view>
</template>

<script>
	export default {
	data(){
				return {
					pislist:'',
					shopname:'',
				};
			},
			onLoad(option){
				var that=this;
				this.id = option.id;
				
					this.$http.get('/api/v1/selectCommodityMessage', {userid: uni.getStorageSync('id'),id:this.id}).then(res => {	
						
						that.pislist = res.data.data.integralCommodities[0]
						
							}).catch(err => {
							})
							
					},
			methods:{	
				orderXq(){
					this.$http.get('/api/v1/createIntegralOrder', {userid: uni.getStorageSync('id'),id:this.id}).then(res => {	
						uni.navigateTo({
							url: '../orDetail/orDetail?chanpinId='+res.data.data.order.id+'',
						});
						}).catch(err => {
						})
					
					
				}
		}
	}
</script>

<style>
.detailpage{
	width:92%;
	padding:0 4%;
	background-color:#FFFFFF;

}
.bgcolor{
	
}
.sec_text{
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 14upx rgba(0,0,0,0.16);
	opacity:1;
	background-color:#FFFFFF;
}
.top_text{
	font-size:30upx;
	line-height:38px;
	color:rgba(58,59,65,1);
	opacity:1;
}
.flex_bottom{
	display:flex;
}
.f_b_l{
	flex:1;
	font-size:36upx;
	height:80upx;
	line-height:70upx;
	color:rgba(219,149,58,1);
}
.f_b_r{
	width:93%;
	height:80upx;
	font-size:22upx;
	line-height:80upx;
	color:rgba(219,149,58,1);
	padding-left:8upx;
}
.xqpic{
	margin-top:20upx;
	background-color:#FFFFFF;
}
.bottom_button{
	height:80upx;
}
.bottombg{
	height: 99upx;
	background: #BB7E00;
	width: 100%;
	position: fixed;
    bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
}
.quickbuy{
	font-size:34upx;
	line-height:99upx;
	color:rgba(255,255,255,1);
	text-align: center;
}
.zhujie{
	height:84upx;
	line-height:60upx;
	width:92%;
	padding:0 4%;
	
}
</style>
