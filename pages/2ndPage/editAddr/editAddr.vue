<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					收货人
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyName" :value="name" placeholder="请填写收货人姓名" /> 
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					手机号码
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="keyPhone" :value="phone" placeholder="请填写收货人手机号码" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					所在地区	
				</view>
				<view class="list_right">
					 <!-- <input class="list_input" placeholder="省,市,区" :value="area"  @input="keyArea"/> -->
					 <input class="list_input" placeholder="省,市,区" disabled="disabled"  @click="keyArea" :value="area" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					详细地址
				</view>
				<view class="list_right">
					 
					  <input class="list_input"  @input="keyAddr" :value="addr" maxlength="20" placeholder="街道,楼牌号等" />
				</view>
			</view>
		</view>
		<view class="mar_bt"></view>
		<!-- <uni-list>
			<uni-list-item title="设置默认地址" show-switch="false" show-arrow="false"  @switchChange='defAddr'></uni-list-item> 
		</uni-list> -->
		 <view class="uni-list">
            <view class="uni-list-cell uni-list-cell-pd">
                <view class="uni-list-cell-db">设置默认地址</view>
                <switch  :checked="defAddrstaus" @change="defAddr" color="#121826"/>
            </view>
        </view>
		 <view class="bottom_add">
		 	<view class="fixed_btm" @click="editaddr">
		 		保存修改 
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
				id:'',
				name:'',
				phone:'',
				area:'',
				addr:'',
				defAddrstaus:false, 
			}
		},
		onLoad(option) {
			//id,name,phone,area,address,status
			console.log(option)
			this.id=option.id;
			this.name=option.name;
			this.phone=option.phone;
			this.area=option.area;
			this.addr=option.address;
			if(option.status=='true'){
				this.defAddrstaus=true;
			}
			console.log(typeof(this.defAddrstaus)) 
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
				console.log('1')
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
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
				console.log(e) 
				this.defAddrstaus=e.target.value;
			},
			editaddr(){
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
				this.$http.get('/api/v1/modifyUserAddress', {phone: this.phone,userid: uni.getStorageSync('id'), id: this.id,name:this.name,status:this.defAddrstaus,address:this.addr,area:this.area}).then(res => {
					uni.hideLoading() 
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
					
					if(res.data.resultCode==200){
						
						 // uni.redirectTo({ 
							// url: '../shipAddress/shipAddress'
						 // }); 
						 uni.navigateBack();
						
						
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
