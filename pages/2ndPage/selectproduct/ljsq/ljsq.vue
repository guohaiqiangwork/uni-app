<template>
	<view>
		<!-- 邮寄地址 有  -->
		<view class="dd_body" v-show="addrItems!='' && chanPost=='0'"  @click="selectaddr">
			<view class="dd_left">
				<!-- <image src="../../../../static/img/addricon.png" mode="scaleToFill" style="width: 72upx; height: 72upx;border-radius: 50%; vertical-align: middle;text-align: center;"></image> -->
				<text class="icon_41">&#xe64f;</text>  
			</view>
			<view class="dd_c">
				<view class="cent_top">
					{{addressPost.name}}  			<text style="margin-left: 40upx;font-size: :;;"> {{addressPost.phone}}</text>
				</view>
				<view class="cent_bom">
					{{addressPost.area}}{{addressPost.address}}
				</view>
			</view>
			<view class="dd_r">
							<text class="icon_4">&#xe678;</text>  
			</view>
		</view>
		<!-- 邮寄地址 无 -->
		<view class="dd_body" v-show="addrItems=='' && chanPost=='0'" @click="newaddr" style=" line-height: 70px; color: #FF6740; padding: 0;">
			<view class="dd_left">
				<!-- <image src="../../../../static/img/addricon2.png" mode="scaleToFill" style="width: 72upx; height: 72upx;border-radius: 50%; vertical-align: middle;text-align: center;"></image> -->
			<text class="icon_411">&#xe64f;</text>  
			</view>
			<view class="dd_c">
				<view class="cent_center" >
					暂无收货地址，请添加收货地址
				</view>
			
			</view>
			<view class="dd_r">
								<text class="icon_4">&#xe678;</text>  
			</view>
		</view>
		<!-- 自提地址 -->
		<view class="dd_body" v-show="chanPost=='1'">
			<view class="dd_left">
				<!-- <image src="../../../../static/img/addricon1.png" mode="scaleToFill" style="width: 72upx; height: 72upx;border-radius: 50%; vertical-align: middle;text-align: center;"></image> -->
				<text class="icon_41"  style="color: #161C26;">&#xe64f;</text>  
			</view>
			<view class="dd_c">
				<view class="cent_top" style="color: #161C26;">
					自提地址
				</view>
				<view class="cent_bom">
					{{mentionSelfAddr}}
				</view>
			</view>
			<view class="dd_r">
				<!-- <text class="icon_4">&#xe678;</text>  -->
			</view>
		</view>
		<!-- 商品信息 -->
	<view class="dd_body1">
		<view class="sptop">
			<view class="sp_l">
					<image :src="chanpinList.smallpicture" mode="scaleToFill" style="width: 160upx; height: 160upx; vertical-align: middle;text-align: center;"></image>
			</view>
			<view class="sp_r">
				<view class="spr1">
					{{chanpinList.name}}
				</view>
				<view class="spr2">
					￥{{chanpinList.price}}
				</view>
			</view> 
		</view>
		<view class="sp_tom">
		<view class="splist">
			<view class="splist_l">
				购买数量
			</view>
			<view class="splist_r"><!-- :disabled="true" -->
				<uni-number-box :min="1" :max="100"  :value="chanpinNum" @change="bindChange"></uni-number-box>
			</view>
		</view>
		<view class="splist">
		<view class="splist_l">
				配送方式
			</view>
			<view class="splist_r">
			  <picker @change="bindPickerChange" :value="chanPost" :range="array" >
					<view class="uni-input">{{array[chanPost]}}</view>
					<!-- 	<text class="icon_4">&#xe6b0;</text> -->
					
				</picker> 
			</view>
		</view>
			<view class="splist" v-show="chanPost=='0'">
				<view class="splist_l">
					运费
				</view>
				<view class="splist_r">
					{{chanpinList.postage}}
				</view>
			</view>
			<view class="splist">
				<view class="splist_l">
					商品金额
				</view>
				<view class="splist_r">
					{{chanpinList.price*chanpinNum}}
				</view>
			</view>
			<view class="splist" style=" height: 140upx; ">
				<view class="splist_l" style="width: 25%;">
					订单备注
				</view>
				<view class="splist_r">
					<textarea :value="remake" @input="bindTextAreaBlur" placeholder="选填" style="text-align: left; height: 100upx;line-height: 38upx;margin-top: 36upx;width: 100%; "/>
				</view>
			</view>
		</view>
	</view>
		<!-- bom -->
		<view class="lsbom">
			<view class="lsbom_l">
				<text style="font-size: 28upx;">合计：</text><text style="color: #FF6740;font-size: 32upx;">￥{{chanPost=='0'?chanpinList.postage-0+chanpinList.price*chanpinNum :chanpinList.price*chanpinNum}}</text> <text style="color: #d1d1d1;font-size:28upx ;">（含运费）</text>
			</view>
			<view class="lsbom_r">
				<view class="lsbomr_btn" @click="submit">
					提交申请
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {uniNumberBox},
		data() {
			return {
				addrItems:'',//收货地址数据
				modeDistribution:'0',//配送方式 0邮寄 1自提
				mentionSelfAddr:'包头市昆都仑区时代广场C座7楼',//自提地址
				addressPost:'',//邮寄地址
				sign:'',//传回的标识 收货地址
				signId:'',//传回的标识id 收货地址
				chanpinId:'',//页面传值 产品id
				chanPost:0,//默认快递邮寄
				chanpinList:'',
				chanpinNum:1,
				array: ['快递邮寄', '自提取货'],
				remake:''
				
			} 
		},
		onShow() {
			//获取收获地址数据
			var that=this;
			this.$http.get('/api/v1/selectUserAddress', {userid: uni.getStorageSync('id')}).then(res => {
				if(res.data.resultCode==200){
					that.addrItems=res.data.data.address
					for (var i=0;i<that.addrItems.length;i++) {
						console.log(that.signId)
						if(that.signId!=''){//传回id值
							if(that.addrItems[i].id==that.signId){
								that.addressPost=that.addrItems[i]
								return false;
							}else{
								that.addressPost=that.addrItems[0]
							}
						}else{//未传回id
							if(that.addrItems[i].status==true){
								that.addressPost=that.addrItems[i]
								return false;
							}else{
								that.addressPost=that.addrItems[0]
							}
						}
					}
				}else if(res.data.resultCode==400){
					//有误
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
				}
			this.submitSate=false;
			}).catch(err => {
			this.submitSate=false;
			})
			//获取产品数据
			this.$http.get('/api/v1/getCommodity', {id: uni.getStorageSync('id'),cid:that.chanpinId}).then(res => {
				if(res.data.resultCode==200){
					that.chanpinList=res.data.data.commodity[0]
				}else if(res.data.resultCode==400){
					//有误
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
				}
			}).catch(err => {
				
			})
		},
		onLoad(option) {
			console.log(option)
			if(option.id){
				this.sign=option.sign//传回的标识(收货地址)
				this.signId=option.id
				
			}
			if(option.chanpinId){
				this.chanpinId=option.chanpinId
				uni.setStorageSync('chanpinId', option.chanpinId);
			}else{
				this.chanpinId=uni.getStorageSync('chanpinId')
			}
			
			
		},
		methods: {
			 bindTextAreaBlur: function (e) {
				this.remake=e.detail.value;
				},
			newaddr(){
				uni.navigateTo({
			
					url: '../../addNewAddr/addNewAddr?sign=ljsqNewaddr'//向新增地址页传递个标识参数
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.chanPost = e.target.value
				console.log(this.chanpinNum)
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
			},
			selectaddr(){
				uni.navigateTo({ 
					url: '../../shipAddress/shipAddress?sign=ljsqSelectaddr'//向新增地址页传递个标识参数
				});
			},
			bindChange(e){
				console.log(111);
				console.log(e)
				this.chanpinNum=e;
			},
			submit(){
				if(this.chanpinNum==0 || this.chanpinNum>100 || !this.chanpinNum){
					uni.showToast({
						title: '请填写机具数量(1-100)',
						icon:'none',
						duration: 2000,
						position:'top',
					});
					return false
				}
				uni.showLoading({
					title: '提交数据中',
					mask:true,
				});
				var addressPost=this.addressPost.id;
				if(this.addressPost.id==undefined){
					addressPost=''
				}
				this.$http.get('/api/v1/createOrder',{userid:uni.getStorageSync('id'),cid:this.chanpinId,addressid:addressPost,tradenum:this.chanpinNum,method:this.chanPost,remake:this.remake}).then(res => {
						uni.hideLoading();
						uni.showToast({
							title: res.data.message,
							icon:'none',
							duration: 2000,
							position:'top',
						});
					if(res.data.resultCode==200){
						uni.redirectTo({ 
							url: "../../payCashi/payCashi?id="+res.data.data.order.id+"&paymoney="+res.data.data.order.paymoney+""
						});
					}else if(res.data.resultCode==400){
						//有误
					}
				}).catch(err => {
					uni.hideLoading();
				}) 
			},
		
		}
	}
</script>

<style>
	div{
		display: flex !important;
	}
.icon_4{
	font-family: iconfont;
	margin-left:10upx;
	font-size: 28upx;
}
.icon_41{
	font-family: iconfont;
	margin-left:30upx;
	font-size: 40upx;
	line-height: 136upx;
}
.icon_411{
	font-family: iconfont;
	margin-left:30upx;
	font-size: 40upx;
	line-height: 144upx;
}
.uni-input{
	color:#161C26;
}
.dd_body{
	width: 92%;
	margin: 30upx 4%;
	background: #fff;
	border-radius: 15upx;
	padding-bottom: 18upx;
	display: flex;
	line-height: 170upx;
}
.dd_body1{
	width: 92%; 
	margin: 30upx 4%;
	background: #fff;
	border-radius: 15upx;
	padding-bottom: 30upx;
	line-height: 200upx;
}
.dd_left{
	/* padding-left: 20px; */
    width: 13%;
	font-size: 30upx;
	line-height: 130upx;
}
.dd_c{
	flex: 1;
	
}
.dd_r{
	width: 7%;
}
.cent_top{
	line-height: 130upx;
    height: 100upx;
	/* font-weight: 700; */
	font-size: 16px;
	color: #303030;
}
.cent_bom{
	line-height: 32upx;
	font-size: 28upx;
	color: #666;
	padding-right: 30upx;
}
.bottom-title {
	line-height: 60upx;
	font-size: 24upx;
	padding: 15upx 0;
}

.bottom-content {
	display: flex;
	flex-wrap: wrap;
	padding: 0 35upx;
}

.bottom-btn {
	height: 90upx;
	line-height: 90upx;
	border-top: 1px #f5f5f5 solid;
}
.sptop{
	width: 100%;
    display: flex;
}
.sp_l{
	padding: 0 30upx;
}
.sp_r{
	font-size: 28upx;
}
.spr1{
	line-height: 160upx;
    height: 92upx;
}
.spr2{
	height: 100upx;
    line-height: 100upx;
}
.splist{
	height: 100upx;
    line-height: 100upx;
    display: flex;
    padding: 0 5%;
	font-size: 28upx;
	/* background: red; */
}
.splist_l{
	width: 70%;
}
.splist_r{
	width: 70%;
	text-align: right;
}
.lsbom{
	position: fixed;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    display: flex;
    font-size: 14px;
    background: #fff;
    width: 100%;
}
.lsbom_l{
	width: 60%;
    padding: 0 4%;
}
.lsbom_r{
	flex: 1;
    padding: 0 4%;
}
.lsbomr_btn{
	height: 35px;
    background: #121826;
    text-align: center;
    line-height: 35px;
    margin-top: 20upx;
    color: #fff;
    border-radius: 50px;
    font-size: 12px;
}
</style>
