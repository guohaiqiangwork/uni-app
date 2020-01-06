<template>
	<view>
		<view>
			<!-- 提现状态 -->
			<view v-if="imgList.status==1">
			<view class="top_one">
				<text class="icon_4">&#xe611;</text>
			</view>
			<view class="top_two">提现成功</view>
			</view>
			
			<view v-if="imgList.status==2 || imgList.status==9">
			<view class="top_one">
				<text class="icon_4 ">&#xe65b;</text>
			</view>
			<view class="top_two">提现失败</view>
			</view>
			
			<view v-if="imgList.status==0 || imgList.status==4">
			<view class="top_one">
				<text class="icon_4">&#xe62a;</text>
			</view>
			<view class="top_two">受理中</view>
			</view> 
			
			<view class="top_three">
				<view class="three_left">提现金额</view>
				<view class="three_right">￥{{imgList.pay.toFixed(2)}}
				<text class="tixianshouxu">(手续费{{imgList.fee.toFixed(2)}}税费{{imgList.taxation.toFixed(2)}})</text>
				</view>
			</view>
			
			<view class="top_four">
				<view class="three_left">到账金额</view>
				<view class="three_right">￥{{imgList.actualpay.toFixed(2)}}
				
				</view>
			</view>
			
			<view class="top_four under_line">
				<view class="three_left ">到账银行卡</view>
				<view class="three_right">
					<text>{{imgList.bankName}}</text>
			
				<text>
				({{imgList.cardno.substr(imgList.cardno.length-4)}}）
				</text>
				</view>
			</view>
			<view class="top_four">
				<view class="three_left">订单编号</view>
				<view class="three_right">{{imgList.orderid}}</view>
			</view>
			<view class="top_four">
				<view class="three_left">创建时间</view>
				<view class="three_right">{{imgList.createtime}}</view>
			</view>
		</view>
		<view class="bottom_add nexe_ju" @click="returntop">
			<view class="fixed_btm" style="color:#EDB315;">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:'',
			}
		},
		onLoad(option) {
				console.log(option.resultList);
				// this.deatildata=JSON.parse(option.resultList)
				this.imgList=JSON.parse(option.resultList);
				console.log('000000');
				console.log(this.imgList);
			},
		methods: {
			returntop(){
				uni.navigateBack({
				delta: 1
				});	
			
		}
	},
	}
</script>

<style>
	.top_one{
		/* line-height:360upx; */
		margin-top: 90upx;
		text-align: center;
	}
.icon_4{
		font-family: iconfont;
		font-size: 160upx;
		color: #EDB315;
		padding-left: 4upx;
	}
.top_two{
		text-align: center;
		font-size:32upx;
		color:#303030;
	}
.top_three{
		padding-top: 100upx;
		display: flex;
		width:88%;
		margin:0 6%;
		line-height:70upx;
		color:#5A5A5A;
}
.three_left{
		width:30%;
}
.three_right{
	 flex: 1;
}
.top_four{
	display: flex;
	width:88%;
	margin:0 6%;
	line-height:80upx;
	color:#5A5A5A;

}
.nexe_ju{
	padding-top: 132upx;
}
.under_line{
	border-bottom: 1px solid #EEEEEE;
}
.tixianshouxu{
	font-size: 24upx;
	color:rgba(160,160,160,1);
	padding-left: 8upx;
}
</style>
