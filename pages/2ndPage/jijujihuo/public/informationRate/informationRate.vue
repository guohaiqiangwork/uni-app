<template>
			<view>
				<view class="mar_bt"></view>
				<!-- <view class="form_body">
					<view class="form_list">
					<view class="list_left">
						选择费率
					</view>
					<view style="height: 10upx;line-height:100upx;flex:1;text-align:right;font-size: 30upx;padding-right: 16upx;color:#A0A0A0">
						  请选择
						  <text class="icon_4">&#xe769;</text>
					</view>
					</view>
				</view> -->
				
				<view class="form_body">
					<view class="form_list" >
						<view class="list_left">
							终端序列号
						</view>
						<view class="list_right" style=" display: flex; ">
							<input class="list_input" style=" flex: 1; "  @input="KEYpos" :value="posTerminalNo" maxlength="30" placeholder="请输入pos序列号" />
							  <text class="icon_i" @click="scanCode(1)">&#xe76d;</text>
						</view>
					</view>
					<view class="form_list">
						<view class="list_left">
							借记卡费率
						</view>
						<!-- <view class="list_right">
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							  <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						
						<view class="list_input" style="flex:1">
							5%
						</view>
					</view>
					<view class="form_list">
						<view class="list_left">
							借记卡封顶
						</view>
						<!-- <view class="list_right">
							  <input class="list_input" value="" maxlength="20" placeholder="填写金额" />
							   <view style=" flex: 1; line-height: 50px; ">
							  	元
							  </view>
						</view> -->
						<view class="list_input" style="flex:1">
							20元
						</view>
					</view>
					<view class="form_list">
						<view class="list_left">
							信用卡费率
						</view>
						<!-- <view class="list_right">
							 
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							    <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						<view class="list_input" style="flex:1">
							0.6%
						</view>
					</view>
					
						<view class="form_list">
						<view class="list_left">
						T+S增收
						</view>
						<!-- <view class="list_right">
							 
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							    <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						<view class="list_input" style="flex:1">
							0元/笔
						</view>
					</view>
						<view class="form_list">
						<view class="list_left">
						支付宝
						</view>
						<!-- <view class="list_right">
							 
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							    <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						<view class="list_input" style="flex:1">
							0.38%
						</view>
					</view>
						<view class="form_list">
						<view class="list_left">
							微信
						</view>
						<!-- <view class="list_right">
							 
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							    <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						<view class="list_input" style="flex:1">
							0.38%
						</view>
					</view>
					
						<view class="form_list">
						<view class="list_left">
							银联二维码
						</view>
						<!-- <view class="list_right">
							 
							  <input class="list_input" value="" maxlength="20" placeholder="填写费率" />
							    <view style=" flex: 1; line-height: 50px; ">
							  	%
							  </view>
						</view> -->
						<view class="list_input_one" style="flex:1">
							<view style="height:38upx;line-height: 60upx;">(借):0.6%封顶20元</view>
							<view style="height:50upx;line-height: 72upx;">(贷):0.65%</view>
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
						posTerminalNo:'',
					};
				},
				onLoad(option) {
					this.dataFrom=JSON.parse(option.dataFrom)
					console.log(JSON.parse(option.dataFrom))
				},
				methods:{
					KEYpos: function(event) {this.posTerminalNo = event.target.value},
					next(){
						this.dataFrom.terminalSeqNum=this.posTerminalNo;
						if(this.posTerminalNo==''){
							uni.showToast({
							    title: '请填写机具序列号后再提交',
							    duration: 2000,
								icon:'none',
							});
						}else{
							uni.navigateTo({
								url: "../appUpload/appUpload?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
							});
						}
						
					},
					scanCode(e){
						// 调起条码扫描
						var that=this;
						uni.scanCode({
							scanType: 'barCode',
							success: function (res) {
								that.posTerminalNo=res.result
							}
						});
					},
				}
			}
		</script>
		
		<style>
		.icon_i{
				font-family: iconfont;
				color: #EDB315;
				font-size: 60upx;
				margin-left: 10upx;
				height: 100upx;
				line-height: 100upx;
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
			display: flex;
		}
		.list_left_one{
			
			width: 30%;
			text-align: right;
			/* padding-left: 5upx; */
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
		    padding-right: 15px;
			color: #353535;
		}
		.list_input_one{
			
			width: 85%;
		    text-align: right;
		    padding-right: 15px; 
		}
		.fixed_btm{
			height: 100upx;
			margin-top: 15upx;
			margin-left: 5%;
			background: #121826;
			border-radius: 50upx;
			text-align: center;
			line-height: 100upx;
			color:#EDB315; 
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
	
		
			.icon_4{
					font-family: iconfont;
					font-size: 24upx;
					color: #A0A0A0;
					padding-left: 4upx;
				}
		
		</style>
		