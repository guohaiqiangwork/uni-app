<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					商户类别
				</view>
				<view class="list_right">
					<radio-group @change="radioChange" style=" display: flex; line-height: 92upx; ">
						<label v-for="(item, index) in items" :key="item.value" style=" width: 49%; ">
								<radio :value="item.value" :checked="index === current" color='#121826' />{{item.name}}
						</label>
					</radio-group>
				</view>
			</view>
			</view>
			<view class="mar_bt"></view>
			<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					所属区域
				</view>
				<view class="list_right">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multicodde" :range="multiArray">
						<view class="list_input">{{areaName}}</view>
					</picker>
				</view>
			</view>
			<!-- <view class="form_list">
				<view class="list_left">
					所在地区	
				</view>
				<view class="list_right">
					 <input class="list_input" placeholder="省,市,区" disabled="disabled"  @click="keyArea" :value="area" />
					  <w-picker mode="region":defaultVal="[4,1,1]" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker>
				</view>
			</view> -->
			<view class="form_list">
				<view class="list_left">
					详细地址
				</view>
				<view class="list_right">
					 
					  <input class="list_input"  @input="keyAddr" :value="addr" maxlength="15" placeholder="街道,楼牌号等" />
				</view>
			</view>
			
			<view class="form_list">
				<view class="list_left">
					手机号码
				</view>
				<view class="list_right">
					 
					  <input class="list_input"  @input="keyPhone" :value="phone" maxlength="11" placeholder="请输入手机号码" />
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
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		 components: {uniList,uniListItem,wPicker},
		 data() {
			return {
				dataFrom:'',
				area:'',
				addr:'',
				phone:'',
			    items: [{value: '0',name: '小微商户',checked: 'true'},{value: 'businessMerc',name: '企业商户'},{value: 'specialMerc',name: '特约商户'}],//,{value: 'specialMerc',name: '特约商户'}
				current:0,
				multiArray: [[],[],[]],
				multiArraycode: [[],[],[]],
				areaName:'请点击选择',
				multicodde: [0, 0, 0],//最后定位
				multiIndex: [0, 0, 0],//最后地址选择的获取code
				multiIndexName: ['', '',''],//最后地址选择的获取code
			}
		},
		onLoad() {
			this.$http.get('/api/v1/selectCityCode',{code:''}).then(res => {
				console.log(this.multiArray)
				if(res.data.resultCode==200){
					for (var i=0;i<res.data.data.city.length;i++) {
						this.multiArray[0].push(res.data.data.city[i].label);
						this.multiArraycode[0].push(res.data.data.city[i].value);
					}
				}else{
					
				}
			}).catch(err => {
			
			})
		},
		methods: {
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
			keyPhone:function(event) {
				this.phone = event.target.value
			},
			defAddr(e){
				console.log(e) 
				this.defAddrstaus=e.target.value;
			},
			defPhone(e){
				console.log(e) 
				this.defPhonestaus=e.target.value;
			},
			 radioChange: function(evt) {
			            for (let i = 0; i < this.items.length; i++) {
			                if (this.items[i].value === evt.target.value) {
			                    this.current = i;
			                    break;
			                }
			            }
						console.log(this.current)
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				
				
				this.multicodde[e.detail.column] =e.detail.value
				this.multiIndex[e.detail.column] =this.multiArraycode[e.detail.column][e.detail.value]
				this.multiIndexName[e.detail.column] =this.multiArray[e.detail.column][e.detail.value]
				console.log(this.multiIndex)
				console.log(this.multicodde) 
				switch (e.detail.column) {
					case 0: //拖动第1列
						
						this.multiArray[1].splice(0)
						this.multiArraycode[1].splice(0)
						this.$http.get('/api/v1/selectCityCode',{code:this.multiArraycode[e.detail.column][e.detail.value]}).then(res => {
							console.log(this.multiArray)
							if(res.data.resultCode==200){
								
								for (var i=0;i<res.data.data.city.length;i++) {
									this.multiArray[1].push(res.data.data.city[i].label);
									this.multiArraycode[1].push(res.data.data.city[i].value);
								}
								
							}else{
								
							}
						}).catch(err => {
						
						})
						break
					case 1: //拖动第2列
						this.multiArray[2].splice(0)
						this.multiArraycode[2].splice(0)
						this.$http.get('/api/v1/selectCityCode',{code:this.multiArraycode[e.detail.column][e.detail.value]}).then(res => {
							console.log(this.multiArray)
							if(res.data.resultCode==200){
								for (var i=0;i<res.data.data.city.length;i++) {
									this.multiArray[2].push(res.data.data.city[i].label);
									this.multiArraycode[2].push(res.data.data.city[i].value);
								}
								this.multiIndex[2] =this.multiArraycode[2][0]
								this.multiIndexName[2] =this.multiArray[2][0]
								this.areaName=""+this.multiIndexName[0]+"-"+this.multiIndexName[1]+"-"+this.multiIndexName[2]+""
								
							}else{
								
							}
						}).catch(err => {
						
						})
						break
				}
				this.areaName=""+this.multiIndexName[0]+"-"+this.multiIndexName[1]+"-"+this.multiIndexName[2]+""
				this.$forceUpdate()
			},
			next(){
				//this.items[this.current].value 商户类别
				//this.multiIndex 所属区域
				//this.addr 详细地址
				this.dataFrom={
					mercFlag:this.items[this.current].value,
					//belongArea:this.multiIndex,
					provCode:this.multiIndex[0],
					cityCode:this.multiIndex[1],
					areaCode:this.multiIndex[2],
					addrDetail:this.addr,
					phone:this.phone
				}
				if(this.multiIndex[0]=='0'||this.multiIndex[1]=='0'||this.multiIndex[2]=='0'){
					uni.showToast({
					    title: '请正确选择区域',
					    duration: 2000,
						icon:'none',
					});
				}else if(this.addr==''){
					uni.showToast({
					    title: '请输入地址',
					    duration: 2000,
						icon:'none',
					});
				}else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
					    title: '请输入正确的11位手机号码',
					    duration: 2000,
						icon:'none',
						position:'top',
					});
					return false;
				}else{
					if(this.current=='0'){
						uni.navigateTo({
							url: "../person/bank/bank?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
						});
					}else{
						uni.navigateTo({
							url: "../public/bank/bank?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
						});
					}
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
