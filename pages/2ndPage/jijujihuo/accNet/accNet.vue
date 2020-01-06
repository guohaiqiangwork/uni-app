<template>
	<view>
			<view class="form_body">
				<view class="form_list" v-if="items[0].checked">
					<view class="list_left">
						终端序列号
					</view>
					<view class="list_right" style=" display: flex; ">
						  <input class="list_input"  @input="KEYpos" style=" width: 85%; ":value="posTerminalNo" maxlength="30" placeholder="请输入终端序列号" />
						  <text class="icon_i" @click="scanCode(1)">&#xe76d;</text>
					</view>
				</view>
				
			</view>
		<!-- <view class="mar_bt"></view> -->
		<!-- <view class=""> -->
		<view class="bottom_add">
			<button class="fixed_btm" @click="activeJi()" :disabled="isDisable">
				激活 
			</button>
		</view>
		
			<!-- button @click="activeJi()" :disabled="isDisable" >
				激活
			</button> -->
		<!-- </view> -->
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				items: '',
				posTerminalNo:'',
				dataFrom:'',
				name: 'TestButton',
				isDisable: false,
				computeTime:false,
				// name: 'TestButton',
				items: [{value: 'POS',name: 'POS', checked: 'true'}, { value: 'QPOS', name: 'QPOS',checked: 'true' }, { value: 'QPAY', name: 'QPAY', checked: 'true' }],				flag:'0',
			}
		},
// 		onLoad(option) {
// 			this.dataFrom=JSON.parse(option.dataFrom)
// 			console.log(JSON.parse(option.dataFrom))
// 		},
		
		methods: {
			KEYpos: function(event) {this.posTerminalNo = event.target.value},
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
			activeJi(){
				var that=this;
				if(this.posTerminalNo == ''){
					uni.showToast({
						title: '请输入终端序列号',
						icon:'none',
						duration: 1500,
						position:'top',
					});
				}else{
				if(this.flag=='0'){
					this.flag='1';
					uni.showLoading({
							title: '提交中'
					});  
					this.$http.get('/api/v1/bindingTerminal', {userid: uni.getStorageSync('id'),termSerialNos:this.posTerminalNo}).then(res =>{
							//有误
							this.flag='0';
							uni.hideLoading();
							uni.showToast({
								title: res.data.message,
								icon:'none',
								duration: 2000,
								position:'top',
							});
							// this.isDisable = true
							// setTimeout(() => {
							// 	this.isDisable = false
							// }, 1500)
							 if(res.data.resultCode==200){
								 setTimeout(() => {
									 uni.navigateBack({
										 delta: 1,
									 });
								 }, 1500)
							 }
					}).catch(err =>{
					
					})
				}else{
					
					uni.showLoading({
							title: '请勿重复点击，提交中'
					}); 
				}
				
						
				
		}
		
		        }
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
	    color: blue;
	    font-size: 30upx;
}
.fixed_btm{
	bottom:20upx;
	position:fixed;
	/* background-color: red; */
}
button[disabled]{
	color:red;
	background-color: #007E3E;
}
</style>
