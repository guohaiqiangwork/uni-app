<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					机具类型
				</view>
				<view class="list_right">
					<!-- <radio-group @change="radioChange" style=" display: flex; line-height: 92upx; ">
						<label v-for="(item, index) in items" :key="item.value" style=" width: 49%; ">
								<radio :value="item.value" :checked="index === current" color='rgb(75, 86, 192);' />{{item.name}}
						</label>
					</radio-group> -->
					 <checkbox-group @change="checkboxChange"  style=" display: flex; line-height: 92upx; ">
						<label style=" width: 30%; " v-for="item in items" :key="item.value">
								<checkbox :value="item.value" :checked="item.checked" color='#121826' />
						{{item.name}}
						</label>
					</checkbox-group>
				</view>
			</view>
			</view>
			<view class="mar_bt"></view>
			<view class="form_body" v-if="items[1].checked || items[2].checked">
				<view class="form_list" >
					<view class="list_left">
						信用卡号
					</view>
					<view class="list_right" style=" display: flex; ">
						  <input class="list_input" :value="verifyDebitCardNum" @input="KEYverifyDebitCardNum"  style=" width: 85%; " maxlength="30" placeholder="填写信用卡号" />
						  <text class="icon_i" @click="cardmsgPhotos" style="font-size: 42upx;margin-left: 15upx;">&#xe653;</text>
					</view>
				</view>
				<view class="form_list" >
					<view class="list_left">
						手机号码
					</view>
					<view class="list_right" >
						  <input class="list_input" :value="verifyDebitPhoneYL" @input="KEYverifyDebitPhoneYL"  maxlength="30" placeholder="请输入银行预留手机号" />
						
					</view>
				</view>
				
			</view>
				<view class="mar_bt"></view>
			<view class="form_body">
				<view class="form_list" v-if="items[0].checked">
					<view class="list_left">
						POS序列号
					</view>
					<view class="list_right" style=" display: flex; ">
						  <input class="list_input"  @input="KEYpos" style=" width: 85%; ":value="posTerminalNo" maxlength="30" placeholder="请输入POS序列号" />
						  <text class="icon_i" @click="scanCode(1)">&#xe76d;</text>
					</view>
				</view>
				<view class="form_list" v-if="items[1].checked">
					<view class="list_left">
						QPOS序列号
					</view>
					<view class="list_right"style=" display: flex; ">
						  <input class="list_input"  @input="KEYqpos" style=" width: 85%; " :value="qposTerminalNo" maxlength="30" placeholder="请输入QPOS序列号" />
						  <text class="icon_i" @click="scanCode(2)">&#xe76d;</text>
					</view>
				</view>
				<view class="form_list" v-if="items[2].checked">
					<view class="list_left">
						Q刷序列号
					</view>
					<view class="list_right"style=" display: flex; ">
						  <input class="list_input"  @input="KEYps" style=" width: 85%; " :value="qsTerminalNo" maxlength="30" placeholder="请输入Q刷序列号" />
						  <text class="icon_i" @click="scanCode(3)">&#xe76d;</text>
					</view>
				</view>
			</view>
		<!-- <view class="mar_bt"></view> -->
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
				posTerminalNo:'',
				qposTerminalNo:'',
				qsTerminalNo:'',
				dataFrom:'',
				verifyDebitPhoneYL:'',
				verifyDebitCardNum:'',
				items: [{value: 'POS',name: 'POS', checked: 'true'}, { value: 'QPOS', name: 'QPOS',checked: 'true' }, { value: 'QPAY', name: 'QPAY', checked: 'true' }]
			}
		},
		onLoad(option) {
			this.dataFrom=JSON.parse(option.dataFrom)
			console.log(JSON.parse(option.dataFrom))
		},
		methods: {
			KEYverifyDebitPhoneYL: function(event) {this.verifyDebitPhoneYL = event.target.value},
			KEYverifyDebitCardNum: function(event) {this.verifyDebitCardNum = event.target.value},
			KEYpos: function(event) {this.posTerminalNo = event.target.value},
			KEYqpos: function(event) {this.qposTerminalNo = event.target.value},
			KEYps: function(event) {this.qsTerminalNo = event.target.value},
		  checkboxChange: function (e) {
		                var items = this.items,
		                    values = e.detail.value;
		                for (var i = 0, lenI = items.length; i < lenI; ++i) {
		                    const item = items[i]
		                    if(values.includes(item.value)){
		                        this.$set(item,'checked',true)
		                    }else{
		                        this.$set(item,'checked',false)
		                    }
		                }
		            },
			next(){
				if(this.posTerminalNo==''&&this.qposTerminalNo==''&&this.qsTerminalNo==''){
					uni.showToast({
					    title: '请填写完整信息',
					    duration: 2000,
						icon:'none',
					});
				}else{
						var products='';
						if(this.posTerminalNo!=''){
							products=""+products+",POS"
							this.dataFrom.posTerminalNo=this.posTerminalNo;
						}if(this.qposTerminalNo!=''){
							products=""+products+",QPOS"
							this.dataFrom.qposTerminalNo=this.qposTerminalNo;
						}if(this.qsTerminalNo!=''){
							products=""+products+",QPAY"
							this.dataFrom.qsTerminalNo=this.qsTerminalNo;
						}
						//products.slice(1)
						this.dataFrom.products=products.slice(1);
						this.dataFrom.verifyDebitCardNum=this.verifyDebitCardNum;
						this.dataFrom.verifyDebitPhoneYL=this.verifyDebitPhoneYL;
					uni.navigateTo({
						url: "../uploadpic/uploadpic?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
					});
				}
			},
			scanCode(e){
				// 调起条码扫描
				var that=this;
				uni.scanCode({
					scanType: 'barCode',
					success: function (res) {
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
						// uni.showToast({
						//     title: ""+res.scanType+","+res.result+"",
						//     duration: 2000,
						// 	icon:'none',
						// });
						if(e==1){
							that.posTerminalNo=res.result
						}else if(e==2){
							that.qposTerminalNo=res.result
						}else if(e==3){
							that.qsTerminalNo=res.result
						}
					}
				});
			},
			cardmsgPhotos(){
				var that=this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    //sourceType: ['album'], //从相册选择
				    success: function (res) {
						//that.uploadimg1=res.tempFilePaths[0]
						uni.showLoading({
								title: '上传中'
						});  
							uni.uploadFile({
								url: "https://www.nmgyf.com.cn/primary/api/v1/uploadBase",
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {  
								    uni.hideLoading();
									console.log(uploadFileRes);
									console.log(JSON.parse(uploadFileRes.data));
									var DATAall=JSON.parse(uploadFileRes.data)
									//that.uploadFileimg1=uploadFileRes.data;
									if(DATAall.resultCode==200){
										that.verifyDebitCardNum=DATAall.data.bankCard;
									}else{
										uni.showToast({
										    title: DATAall.message,
										    duration: 2000,
											icon:'none',
										});
									}
										
								},  
							}) 
				    }
				});
			}
		        },
				

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
		width: 23%;
		text-align: left;
		padding-left: 5upx;
	}
	.list_right{
		
		flex: 1;
		
	}
	.list_input{
		height: 100upx;
		line-height: 100upx;
		color: #353535;
	}
.img_head{
	    height: 100upx;
	    line-height: 100upx;
	    padding-left: 30upx;
	    color: #666;
	    font-size: 30upx;
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
</style>
