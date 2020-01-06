<template>
	<view>
		<view class="bgtop">
			<view class="topBOX">
				<image :src="avatar" mode="scaleToFill" style="width: 120upx; height: 120upx;border-radius: 50%;"></image>
		
				<view class="" style="flex: 1; padding-top: 3upx; padding-left: 30upx;">
					<view class=""style=" text-align: center; border: 1px solid rgba(76,84,106,1); height: 56upx; line-height: 56upx; color: #f28f35; border-radius: 22upx; box-shadow:0px 2px 2px rgba(0,0,0,0.16);width: 66%;display: flex; ">
						<view class=""style=" width: 24%; padding-top: 2.5%; ">
							<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 40upx; height: 40upx;border-radius: 50%;"></image>
						</view>
						<view class=""style=" flex: 1; text-align: left; "@click="toJFshop">
							可用积分：<text style="margin-left: 6upx;">{{dataList.integral}}</text>
						</view>
					</view>
					<view class=""style=" font-size: 25upx; color: rgba(142,146,160,1); line-height: 80upx; padding-left: 5upx;" @click="jfhistory">
						累计积分：{{dataList.allIntegral}} <text class="icon_4">&#xe678;</text>  
					</view>
				</view>
			</view>
			<view class=""style=" padding-bottom: 20upx; margin: 0 auto; width: 90%; background: #fff; border-radius: 30upx; margin-top: 40upx; ">
				<view class=""style="height: 30px;line-height: 30px;padding: 10px 15px;font-size: 16px;font-weight: 700;">
					本周已签到<text style=" color: #f29c03; padding: 0 12upx; ">{{dataList.report.workday}}</text>天
				</view>
				<view class="">
					<view class=""style=" padding: 0 4%; display: flex; ">
						<view class="blockCard" :class="dataList.report.monday==1?'bg1':''">
							<view class="card_1":class="dataList.report.monday==1?'bg1':''">
								第1天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						<view class="blockCard" :class="dataList.report.tuesday==1?'bg1':''">
							<view class="card_1":class="dataList.report.tuesday==1?'bg1':''">
								第2天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						<view class="blockCard" :class="dataList.report.wednesday==1?'bg1':''">
							<view class="card_1":class="dataList.report.wednesday==1?'bg1':''">
								第3天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						<view class="blockCard" :class="dataList.report.thursday==1?'bg1':''">
							<view class="card_1":class="dataList.report.thursday==1?'bg1':''">
								第4天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						
					</view>
					<view class=""style=" padding: 20upx 4%; display: flex; ">
						<view class="blockCard" :class="dataList.report.friday==1?'bg1':''">
							<view class="card_1":class="dataList.report.friday==1?'bg1':''">
								第5天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						<view class="blockCard" :class="dataList.report.saturday==1?'bg1':''">
							<view class="card_1":class="dataList.report.saturday==1?'bg1':''">
								第6天
							</view>
							<view class="card_2">
								<image src="../../../static/img/star.png" mode="scaleToFill" style="width: 76upx; height: 76upx;border-radius: 50%;"></image>
							</view>
							<view class="card_3">
								1积分
							</view>
						</view>
						<view class="blockCard" :class="dataList.report.sunday==1?'bg1':''"style=" width: 48%; ">
							<view class="card_1":class="dataList.report.sunday==1?'bg1':''" style=" text-align: left; padding-left: 40upx; ">
								第7天
							</view>
							<view class="" style="display: flex;">
								<view class="card_3"style=" width: 50%; text-align: left; padding-left: 20px; line-height: 39px; ">
									神秘好礼
								</view>
								<view class="card_2">
									<image src="../../../static/img/gift.png" mode="scaleToFill" style="width: 90upx; height: 90upx"></image>
								</view>
							</view>
							
						</view>
					
						
					</view>
				</view>
			</view>
		</view>
		<view class=""style=" padding-bottom: 20upx; margin: 0 auto; width: 90%; background: #fff; border-radius: 30upx; margin-top: 40upx; ">
			<view class=""style="height: 30px;line-height: 30px;padding: 10px 15px;font-size: 16px;font-weight: 700;">
				赚·积分
			</view>
			<view class="" @click="yqqrcode">
				<image src="../../../static/img/yq.png" mode="scaleToFill"style="width: 677upx;height: 241upx; "></image>
			</view>
		</view>
		<view class=""style=" padding-bottom: 20upx; margin: 0 auto; width: 90%; background: #fff; border-radius: 30upx; margin-top: 40upx; ">
			<view class="" style="display: flex;">
				<view class=""style="height: 30px;line-height: 30px;padding: 10px 15px;font-size: 16px;font-weight: 700;flex: 1;">
					花·积分
				</view>
				<view @click="toJFshop" style="height: 30px;line-height: 30px;padding: 10px 15px;font-size: 13px;color: #C0C0C0; width: 10%;">
					更多
				</view>
			</view>
			<view @click="todec(dataList.hotCommodity[0].id)" style="width: 640upx;height: 180upx;background: rgba(22,28,38,1);border-radius:22upx;margin: 20upx auto;display: flex; color: #fff;">
				<view style="width: 30%;">
					<image :src="dataList.hotCommodity[0].smallpicture" mode="scaleToFill"style="width: 155upx; height: 155upx;margin-left: 20upx;margin-top: 12upx;border-radius: 10upx;"></image>
				</view>
				<view class=""style=" flex: 1; padding: 0 3%; ">
					<view class=""style=" line-height: 80upx; height: 100upx;">
						{{dataList.hotCommodity[0].name}}
					</view>
					<view class=""style=" display: flex; width: 71%;  height:50upx; background:rgba(123,68,5,1); box-shadow:0px 2px 3px rgba(69,38,0,1); opacity:1; border-radius:24upx; line-height: 50upx; ">
						<view class="">
							<image src="../../../static/img/star.png" mode="scaleToFill"style="width: 40upx; height: 40upx;border-radius: 50%;padding-left: 10upx; padding-right: 10upx; padding-top: 6upx;"></image>
						</view>
						<view class="">
							<text style="font-size: 38upx;">{{dataList.hotCommodity[0].price}} </text> <text style="font-size: 24upx;padding: 0 10upx;color:rgba(255,255,255,1);">积分兑换</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 50upx;">
			
		</view>
	<uni-popup :show="type === 'middle'" position="middle" mode="fixed" >
		<view >
			<view class=""style=" position: relative; ">
				<view class=""style=" display: inline-block; position: absolute; top: -30%; left: 34%; ">
					<image src="../../../static/img/success.png" mode="scaleToFill"style="width: 100upx; height: 100upx"></image>
				</view>
				<view class="" style=" font-size: 34upx; font-family:PingFang SC; color:rgba(56,56,56,1);text-align: center;line-height: 110upx; ">
					今日签到成功
				</view>
				<view class="" style="color:rgba(56,56,56,1);font-size: 34upx;text-align: center;line-height: 80upx">
					获得<text style="color: #f29b00;padding: 0 10upx;">{{dataList.addIntegral}}</text>积分
				</view>
				<view class="" @click="togglePopup('')" style=" width: 300upx; height:70upx; background:rgba(40,50,83,1); opacity:1; border-radius:40upx; margin: 18upx 0;">
					<view class="" style="font-size: 34upx;text-align: center;line-height: 66upx;color: #fff;">
						确定
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
	  components: {uniPopup},
		data() {
			return {
				avatar:uni.getStorageSync('avatarIMG'),
				dataList:'',
				type:''
			}
		},
		onShow() {
			var that=this
			this.$http.get('/api/v1/signIn', {userid: uni.getStorageSync('id')}).then(res => {
					if(res.data.resultCode==200){ 
						if(res.data.data.flag=='1'){
							this.togglePopup('middle')
						}
						this.dataList= res.data.data
					}else if(res.data.resultCode==400){
					
					}
			}).catch(err => {
			})
		},
		methods: {
			todec(e){
				uni.navigateTo({
					url: '../deCommodity/deCommodity?id='+e
				});	
			},
			togglePopup(type) {
				this.type = type;
			},
		yqqrcode(){
			uni.navigateTo({
				url: '../qrcode/qrcode?code='+this.dataList.recommendcode+''
			});
		},
		toJFshop(){
			uni.switchTab({
				url: '../../space/space'
			});
		},
		jfhistory(){
			uni.navigateTo({
				url: '../jfhistory/jfhistory'
			});
			
		},	
			onNavigationBarButtonTap:function(e){
				console.log('1')
			  uni.navigateTo({
				url: '../jijuquestion/jijuquestion'
			  });
			},	
		},
	
	}
</script>

<style>
	
	.uni-btn-icon{
		color: #00367A !important;
	}
	.icon_4{
		font-family: iconfont;
		margin-left:10upx;
		font-size: 22upx;
	}
.bgtop{
	height: 300upx;
	background: #2a3451;
	margin-bottom: 500upx;
}
.topBOX{
	    padding: 3% 7%;
	    display: flex;
}
.blockCard{
	width: 23%;
	height: 195upx;
	background:rgba(243,247,251,1);
	margin-right: 2%;
	border-radius: 15upx;
}
.bg1{
	background:#2a3451;
	color: #fff;
}
.card_1{
	text-align: center;
	font-size:13px;
	font-family:PingFang SC;
	font-weight:500;
	
	line-height: 52upx;
}
.card_2{
	text-align: center;
}
.card_3{
	text-align: center;
	font-size:13px;
	font-family:PingFang SC;
	font-weight:500;
	color:#A5A5A5FF;
	line-height: 52upx;
}
</style>
