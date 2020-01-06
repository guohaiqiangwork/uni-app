<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left" style="width: 20%;">
					经营范围
				</view>
				<view class="list_right">
					  <input class="list_input" :value="MccData.value" maxlength="20" placeholder="点击选择" disabled="" @click="select()"/>
				</view>
				<view style=" width: 10%; text-align: center;line-height: 100upx">
					<text class="icon_4">&#xe769;</text>
				</view>
			</view>
			</view>
			<view class="mar_bt"></view>
<!-- 			<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					结算周期
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx; ">
					  <view class="" style="width: 50%;text-align: right;" @click="jszq(0)" :class="jszqData=='0'?'font-color':''">T+S</view>
					  <view class="" style=" flex: 1; text-align: center; "@click="jszq(1)" :class="jszqData=='1'?'font-color':''">日结</view>
				</view>
			</view>
			<view class="form_list" v-show="jszqData=='1'">
				<view class="list_left">
					工作日当日结算
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx; ">
					  <view :class="workJS?'':'font-color'" style="width: 50%;text-align: right;" @click="workfunc(0)">关闭</view>
					  <view :class="workJS?'font-color':''"  style=" flex: 1; text-align: center; " @click="workfunc(1)">开通</view>
				</view>
			</view>
			<view class="form_list" v-show="jszqData=='1'">
				<view class="list_left">
					节假日次日结算
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx; ">
					  <view :class="sunJS?'':'font-color'" style="width: 50%;text-align: right;" @click="sunfunc(0)">关闭</view>
					  <view :class="sunJS?'font-color':''" style=" flex: 1; text-align: center; " @click="sunfunc(1)">开通</view>
				</view>
			</view>
		</view> -->
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
				jszqData:'0',//结算周期
				workJS:false,//工作日结算
				sunJS:false,//节假日结算
				MccData:'',
			};
		},
		onShow() {
			this.MccData=uni.getStorageSync('MccData')
			console.log(this.MccData)
		},
		onLoad(option) {
			this.dataFrom=JSON.parse(option.dataFrom)
			console.log(JSON.parse(option.dataFrom))
		},
		methods:{
			jszq(index){
				this.jszqData=index;
				
			},
			workfunc(index){
				if(index==0){
					this.workJS=false;
				}else{
					this.workJS=true;
				}
			},
			sunfunc(index){
				if(index==0){
					this.sunJS=false;
				}else{
					this.sunJS=true;
				}
			},
			next(){
				if(this.MccData==''){
					uni.showToast({
					    title: '请先选择经营范围',
					    duration: 2000,
						icon:'none',
					});
				}else{
					this.dataFrom.jszqData=this.jszqData;
					this.dataFrom.workJS=this.workJS;
					this.dataFrom.sunJS=this.sunJS;
					this.dataFrom.customMccType=this.MccData.customCode;//行业类别 "C00001"
					this.dataFrom.mcc=this.MccData.num;//商户mcc 5094
					this.dataFrom.bizScope=this.MccData.value;//营业范围 "就餐场所和餐馆"
					this.dataFrom.mccType=this.MccData.mccType;//Mcc类型 "BZ"
					
					uni.navigateTo({
						//url: "../rateMsg/rateMsg?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
						url: "../bindTerminal/bindTerminal?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
					});
				}
				
			},
			select(){
				uni.navigateTo({
					url: '../../selectJINY/selectJINY'
				});
			},
			
		}
	}
</script>

<style>
.icon_4{
		font-family: iconfont;
		font-size: 24upx;
		color: #A0A0A0;
		padding-left: 4upx;
	}
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
}
.list_right{
	color: #888;
	flex: 1;
	
}
.list_input{
	height: 100upx;
	line-height: 100upx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #888;
	font-size: 28upx;
}
.fixed_btm{
	height: 100upx;
	margin-top: 15upx;
	margin-left: 5%;
	background: #121826;
	border-radius: 50upx;
	text-align: center;
	line-height: 100upx;
	color: #EDB315; 
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
