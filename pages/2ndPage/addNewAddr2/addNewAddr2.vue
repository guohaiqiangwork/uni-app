<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					收货人
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyName" placeholder="请填写收货人姓名" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					手机号码
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyPhone" maxlength="11" placeholder="请填写收货人手机号码" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					所在地区	
				</view>
				<view class="list_right">
					<input class="list_input" placeholder="省,市,区" disabled="disabled"  @click="keyArea" :value="area" />
				
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					详细地址
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyAddr" maxlength="20" placeholder="街道,楼牌号等" />
				</view>
			</view>
		</view>
		<view class="mar_bt"></view>
		<uni-list>
			<uni-list-item title="设置默认地址" show-switch="true"  show-arrow="false" @switchChange='defAddr'></uni-list-item>
		</uni-list>
		 <view class="bottom_add">
		 	<view class="fixed_btm" @click="addAddr">
		 		添加地址
		 	</view>
		 </view>
		 	<w-picker mode="region":defaultVal="[4,1,1]" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		 components: {uniList,uniListItem,wPicker},
		data() {
			return {
				name:'',
				phone:'',
				area:'',
				addr:'', 
				defAddrstaus:false,
				sign:'',//其他页面传来的标识
			}
		},
		onLoad(option) {
			console.log(option)
			this.sign=option.sign;
		},
		methods: {
			keyName: function(event) {
				this.name = event.target.value
			},
			keyPhone: function(event) {
				this.phone = event.target.value
			},
			keyArea: function(event) {
				//this.area = event.target.value;
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				console.log('1')
				this.$refs['region'].show();
			},
			onConfirm(val){
				console.log(val);
				this.area=val.result;
			},
			keyAddr: function(event) {
				this.addr = event.target.value
			},
			defAddr(e){
				this.defAddrstaus=e.value;
			},
			addAddr(){
				var that=this;
				if(this.name==''||this.phone==''||this.area==''||this.addr==''){
					uni.showToast({
					title: '请填写完整信息',
					icon:'none',
					duration: 2000,
					position:'top',
					});
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				} else if(this.addr.length>20){
					uni.showToast({
						title: '地址请输入小于20个字符',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				} 
				uni.showLoading({
					title: '加载中'
				});
				this.$http.get('/api/v1/addUserAddress', {phone: this.phone, userid: uni.getStorageSync('id'),name:this.name,status:this.defAddrstaus,address:this.addr,area:this.area}).then(res => {
					uni.hideLoading() 
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top', 
					});
					
					if(res.data.resultCode==200){
						console.log(that.sign)
						if(that.sign=='ljsqNewaddr'){
							uni.redirectTo({ 
								url: "../orDetail/orDetail?sign=ljsqNewaddr&id="+res.data.data.userAddress.id+""
							}); 
						}else{
							uni.redirectTo({ 
								url: '../shipAddress/shipAddress'
							}); 
						}
						 
						
						
					}else if(res.data.resultCode==400){
						//登录有误
					}
				this.submitSate=false;
				}).catch(err => {
				this.submitSate=false;
				})
			}
			
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
	border-bottom: 1px solid #eee;
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
	height: 50upx;
	margin-top: 26upx;
	font-size: 28upx;
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

</style>
