<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					借记卡费率
				</view>
				<view class="list_right">
					  <input class="list_input" :value="rateDebitCard" maxlength="20" placeholder="填写费率" disabled=""/>
					  <view style=" flex: 1; line-height: 104upx; ">
					  	%
					  </view>
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					借记卡封顶
				</view>
				<view class="list_right">
					  <input class="list_input" :value="DDebitCard" maxlength="20" placeholder="填写金额"  disabled=""/>
					   <view style=" flex: 1; line-height: 104upx; ">
					  	元
					  </view>
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					信用卡费率
				</view>
				<view class="list_right">
					 
					  <input class="list_input" :value="rateCreditCard" maxlength="20" placeholder="填写费率"  disabled=""/>
					    <view style=" flex: 1; line-height: 104upx; ">
					  	%
					  </view>
				</view>
			</view>
			</view>
			<view class="mar_bt"></view>
			<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					TS单笔提现费率
				</view>
				<view class="list_right">
					  <input class="list_input" :value="TSrateOne" maxlength="20" placeholder="填写金额" disabled="" />
					    <view style=" flex: 1; line-height: 104upx; ">
					  	元
					  </view>
				</view>
			</view>
		
		</view>
		<view class="bottom_add">
			<view class="fixed_btm" @click="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataFrom:'',
				rateDebitCard:'0.5',//借记卡费率
				DDebitCard:'20',//借记卡封顶
				rateCreditCard:'0.6',//信用卡费率
				TSrateOne:'0',//TS单笔提现费率
			};
		},
		onLoad(option) {
			this.dataFrom=JSON.parse(option.dataFrom)
			console.log(JSON.parse(option.dataFrom))
		},
		methods:{
			next(){
				if(this.rateDebitCard=='' ||this.DDebitCard=='' ||this.rateCreditCard=='' ||this.TSrateOne==''){
					uni.showToast({
					    title: '请先填写信息',
					    duration: 2000,
						icon:'none',
					});
				}else{
					uni.navigateTo({
						url: "../bindTerminal/bindTerminal?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
					});
					// uni.navigateTo({
					// 	url: "../uploadpic/uploadpic?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
					// });
				}
				
			},
		}
	}
</script>

<style>

.form_body{
	background: #fff;
}
.form_list{
	width: 97%;
	display: flex;
	margin-left: 3%;
	border-bottom: 1px solid #fafafa;
}
.list_left{
	height: 100upx;
	line-height: 100upx;
	width: 30%;
	text-align: left;
	padding-left: 5upx;
	display: flex;
}
.list_right{
	display: flex;
	flex: 1;
	
}
.list_input{
	height: 100upx;
	line-height: 100upx;
	width: 85%;
    text-align: right;
    padding-right: 15upx;
	color: #888;
}
.fixed_btm{
	height: 100upx;
	margin-top: 15upx;
	margin-left: 5%;
	background: #4B56C0;
	border-radius: 50upx;
	text-align: center;
	line-height: 100upx;
	color: #fff; 
	width: 90%;
}
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
.uni-list::before{
	background-color: #fafafa;
}
.uni-list::after{
	background-color: #fafafa;
}
</style>
