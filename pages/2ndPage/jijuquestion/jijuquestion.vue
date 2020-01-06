<template>
	<view style="background: #1c206e;" :style="{'height':windowHeight}">
		<!-- <view style="width:92%;padding:0 4%">
			<view style="margin-top:40upx;text-align: center;font-size: 40upx;">积分商城</view>
			<view style="text-indent:60upx;padding-top:20upx">根据目前了解的情况以此积分商城来作为推广方式，增加用户粘性，此积分商城实际是针对积分的消化，用户除消费级分外，不存在其他消费成本，商城是为了积分而存在。</view>
			<view style="text-indent:60upx;padding-top:20upx">积分的产生类型：</view>
			<view style="text-indent:60upx;padding-top:20upx">推广积分：用户A——B——C，A推广B获得积分100；B推广C获得积分50；A——C 间接推广获得积分10；</view>
			<view style="text-indent:60upx;padding-top:10upx">消费积分：用户进行终端消费，消费额度/1000 = 获得积分；</view>
			<view style="text-indent:60upx;padding-top:10upx">签到积分：周一至周六每次签到1积分，周日获得神秘好礼。</view>
			<view style="text-indent:60upx;padding-top:10upx">周日积分规则：本周签到天数 x 10，如本周全部签到，周日获得70分，一周最高获得76分 ；</view>
			<view style="text-indent:60upx;padding-top:20upx">兑换日期：长期有效</view>
			<view style="text-indent:60upx;padding-top:20upx">兑换方式：在线兑换，快递送货</view>
			<view style="padding-top:20upx">存在问题</view>
			<view style="text-indent:60upx;padding-top:20upx">积分兑换产品品类无法满足用户的个性化需求，物品品类少，造成用户对积分不敏感，调动性较差。</view>
			<view style="text-indent:60upx;padding-top:20upx">积分兑换少，推广积分转化少，成功兑换物品难度高，造成用户失去兴趣，少了就变成了摆设，达不到预期目标。</view>
			<view style="text-indent:60upx;padding-top:20upx">缺少明确的兑换体系，例如线上兑换，线下如何交接，如何用户对接，如何增强用户的体验。</view>

		</view> -->
		<view class="imglist">
			<image src="../../../static/img/jifenrule.png" mode="widthFix" style=" width: 100%;will-change: transform"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight:'',
			}
		},
		onReady() {
			 var _me = this;
			 //	plus.webview.create("url","id", {contentAdjust:false});
			     uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			         success: function(res) { 
			            
			             _me.windowHeight = res.windowHeight+5 + 'px';
						 console.log(11111111111111111)
			             console.log('手机屏幕高度为' + _me.windowHeight);
						 console.log(11)
			         }
			     });
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
