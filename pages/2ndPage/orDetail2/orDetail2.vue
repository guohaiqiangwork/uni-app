<template>
	<view>
		<view v-if="orinforlist.status==1">
		<view class="one_top">
			<view class="top_flex">
				<view class="flex_one icon_4">&#xe605;</view>
				<view class="nopay">待支付</view>
				<view class="Surplustime">剩余时间：</view>
				<view class="countdown">{{djs}}</view>
			</view>
			<view class="tips">
				<view class="tipmsg">请尽快支付，超时将取消订单</view>
			</view>
			<!-- 无地址 -->
			<view class="white_card" v-show="addrItems==''" @click="newaddr">
				<view class="decard">
					<view class="jifenadd">
						<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
					</view>
					<view class="adadd">
						去添加地址
					</view>
				</view>
			</view>
			<!-- 有地址 -->
			<view class="white_card" v-show="addrItems!=''" @click="selectaddr">
				<view class="decard">
					<view class="haadd">
						<view class="addpix">
							<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
						</view>
						<view>
						<view class="addmsg">
							<view class="jifenname">{{addressPost.name}}</view>
							<view class="jifenphone">{{addressPost.phone}}</view>
						</view>
						<view class="dedizhi">
							{{addressPost.area}}{{addressPost.address}}
						</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
	<!-- 进行中 -->
	<view v-if="orinforlist.status==2">
		<view class="one_top">
			<view class="top_flex">
				<view class="flex_one icon_4">&#xe605;</view>
				<view class="nopay">进行中</view>
				<!-- <view class="Surplustime">剩余时间：</view>
				<view class="countdown">15:00</view> -->
			</view>
			<view class="tips">
				<view class="tipmsg">商家已处理订单，请耐心等待</view>
			</view>
			<!-- 无地址 -->
			<view class="white_card" v-show="addrItems==''">
				<view class="decard">
					<view class="jifenadd">
						<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
					</view>
					<view class="adadd">
						去添加地址
					</view>
				</view>
			</view>
			<!-- 有地址 -->
			<view class="white_card" v-show="addrItems!=''">
				<view class="decard">
					<view class="haadd">
						<view class="addpix">
							<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
						</view>
						<view>
						<view class="addmsg">
							<view class="jifenname">{{userAddress.name}}</view>
							<view class="jifenphone">{{userAddress.phone}}</view>
						</view>
						<view class="dedizhi">
							{{userAddress.area}}{{userAddress.address}}
						</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
	<!-- 已完成 -->
	<view v-if="orinforlist.status==3">
		<view class="one_top">
			<view class="top_flex">
				<view class="flex_one icon_4">&#xe611;</view>
				<view class="nopay">已完成</view>
				<!-- <view class="Surplustime">剩余时间：</view>
				<view class="countdown">15:00</view> -->
			</view>
			<view class="tips">
				<view class="tipmsg">订单已完成，万分感谢</view>
			</view>
			<!-- 无地址 -->
			<view class="white_card" v-show="addrItems==''">
				<view class="decard">
					<view class="jifenadd">
						<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
					</view>
					<view class="adadd">
						去添加地址
					</view>
				</view>
			</view>
			<!-- 有地址 -->
			<view class="white_card" v-show="addrItems!=''">
				<view class="decard">
					<view class="haadd">
						<view class="addpix">
							<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
						</view>
						<view>
						<view class="addmsg">
							<view class="jifenname">{{userAddress.name}}</view>
							<view class="jifenphone">{{userAddress.phone}}</view>
						</view>
						<view class="dedizhi">
							{{userAddress.area}}{{userAddress.address}}
						</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
	<!-- 已取消 -->
	<view v-if="orinforlist.status==9">
		<view class="one_top">
			<view class="top_flex">
				<view class="flex_one icon_4">&#xe65b;</view>
				<view class="nopay">已取消</view>
				<!-- <view class="Surplustime">剩余时间：</view>
				<view class="countdown">{{djs}}</view> -->
			</view>
			<view class="tips">
				<view class="tipmsg">该单已被取消，请重新下单</view>
			</view>
			<!-- 无地址 -->
			<!-- <view class="white_card" v-show="addrItems==''">
				<view class="decard">
					<view class="jifenadd">
						<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
					</view>
					<view class="adadd">
						去添加地址
					</view>
				</view>
			</view> -->
			<!-- 有地址 -->
			<!-- <view class="white_card" v-show="addrItems!=''">
				<view class="decard">
					<view class="haadd">
						<view class="addpix">
							<img src="../../../static/img/jifenadd.png" alt="" style="width:44upx;height:52upx">
						</view>
						<view>
						<view class="addmsg">
							<view class="jifenname">{{addressPost.name}}</view>
							<view class="jifenphone">{{addressPost.phone}}</view>
						</view>
						<view class="dedizhi">
							{{addressPost.area}}{{addressPost.address}}
						</view>
						</view>
					</view>
				</view>
			</view> -->
			
		</view>
		
	</view>
	<!-- 购买信息 -->
	<view class="buymsg">
		<view class="shopmsg">
			<view class="shoppng">
				<image :src="orinforlist2.smallpicture" mode="" style="width:140upx;height:140upx"></image>
			</view>
			<view class="shopname">
				<view class="shopxix">
					{{orinforlist.cname}}
				</view>
				<view class="buyjifen">
					<view class="jifensum">
						{{orinforlist2.price}}积分
					</view>
					<view class="splist_r"><!-- :disabled="true" -->
						<uni-number-box :min="1" :max="100" :value="chanpinNum"@change="bindChange" v-if="orinforlist.status==1"></uni-number-box>
						<text v-if="orinforlist.status!=1">x {{orinforlist.tradenum==''?'1':orinforlist.tradenum}}</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
	
	<view class="population">
	
		<view class="bgse">
		<view class="ong_hang">
			<view class="flex_left_one">商品总价</view>
			<view class="flex_right_one"> {{orinforlist.paymoney*chanpinNum}} 积分 </view>
			
		</view>
		<view class="ong_hang">
			<view class="flex_left_one">订单编号</view>
			<view class="flex_right_one">{{orinforlist.ordernum}}</view>
		</view>
		<view class="ong_hang">
			<view class="flex_left_one">下单时间</view>
			<view class="flex_right_one">{{orinforlist.createTime}}</view>
		</view>
	
	</view>
	</view>
	<view class="bottom_button" v-if="orinforlist.status==1">
		<view class="bottombg">
			<view class="quickbuy">
				<view class="heji">
						<view class="hejisty">合计:  </view>
						<view class="jifensty"> 	{{orinforlist.paymoney*chanpinNum}} 积分</view>
						
				</view>
				<view class="bgjin" @click="ljzf">立即支付</view>
			</view>
		</view>
	</view>
	<view class="bottom_button" v-if="orinforlist.status==2">
		<view class="bottombg">
			<!-- <view class="quickbuy">
				<view class="heji">
						<view class="hejisty">合计:  </view>
						<view class="jifensty"> 	{{orinforlist.paymoney*chanpinNum}} 积分</view>
						
				</view> -->
				<view class="bgjin" @click="fhsy">返回首页</view>
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
				chanpinId:'',
				addrItems:'',//收货地址数据
				chanpinNum:1,
				orinforlist:'',
				orinforlist2:'',
				addressPost:'',//邮寄地址
				sign:'',//传回的标识 收货地址
				signId:'',//传回的标识id 收货地址
				djs:'',//倒计时
				userAddress:'',
			};
		},
			onLoad(option){
				var that=this;
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
				
				this.onGET()
						
				},
			onShow() {
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
						
					}
			
				}).catch(err => {
				
				})
			},
			methods:{
				fhsy(){
					uni.switchTab({
						url: '../../space/space'//向新增地址页传递个标识参数
					});
				},
				selectaddr(){
					uni.navigateTo({
						url: '../shipAddress2/shipAddress2?sign=ljsqSelectaddr'//向新增地址页传递个标识参数
					});
				},
				onGET(){
					var that=this;
					this.$http.get('/api/v1/selectIntegralOrderMessage', {userid: uni.getStorageSync('id'),id:this.chanpinId}).then(res => {
						that.orinforlist = res.data.data.order
						that.orinforlist2 = res.data.data.commodity
						that.chanpinNum=1
						if(that.orinforlist.status==1){
							//待支付
							that.TimeDown(res.data.data.endDate);
						}
						if(that.orinforlist.status!=1){
							that.userAddress=res.data.data.userAddress
						}
					}).catch(err => {
						
					})
				},
				newaddr(){
					uni.navigateTo({
						url: '../addNewAddr2/addNewAddr2?sign=ljsqNewaddr'//向新增地址页传递个标识参数
					});
				},
				bindChange(e){
					console.log(111);
					console.log(e)
					this.chanpinNum=e;
				},
				TimeDown(endDateStr) {
					
								var that=this;
							    //结束时间
							    var endDate = new Date(endDateStr);
							    //当前时间
							    var nowDate = new Date();
								
							    //相差的总秒数
							    var totalSeconds = parseInt((endDate - nowDate) / 1000);
							    //天数
							    var days = Math.floor(totalSeconds / (60 * 60 * 24));
							    //取模（余数）
							    var modulo = totalSeconds % (60 * 60 * 24);
							    //小时数
							    var hours = Math.floor(modulo / (60 * 60));
							    modulo = modulo % (60 * 60);
							    //分钟
							    var minutes = Math.floor(modulo / 60);
							    //秒
							    var seconds = modulo % 60;
							    //输出到页面
							  // console.log("还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒")
							   that.djs=""+minutes+":"+seconds+""
							   if(minutes<0){
									//that.onGET()
							   }
							    //延迟一秒执行自己
							    setTimeout(function () {
									if(minutes==0&&seconds==0){
										that.onGET()
									}else{
										 that.TimeDown(endDateStr);
									}
							       
							    }, 1000)
							},
			}
	}
</script>

<style>
.one_top{
	width:100%;
	height:358upx;	
	background-color: #151B26;
}
.top_flex{
	display:flex;
	width: 86%;
    padding:0 7%;
	height:130upx;
}
.icon_4{
	font-family: iconfont;
}
.flex_one{
	width:8%;
	color:white;
	font-size:40upx;
	line-height:208upx
}
.nopay{
	width:50%;
	color:#ffffff;
	font-size:34upx;
	line-height:204upx;
}
.Surplustime{
	width:29%;
	color:#ffffff;
	font-size:32upx;
	line-height:204upx;
}
.countdown{
	flex:1;
	color:#ffffff;
	font-size:32upx;
	line-height:204upx;
}
.tips{
	margin-top:24upx;
	width: 86%;
	padding:0 7%;
}
.tipmsg{
	padding-left: 8upx;
	font-size:30upx;
	color:rgba(255,255,255,1);
	opacity:0.52;
}
.white_card{
	width: 92%;
    padding: 0 4%;
    margin-top:78upx;
}
.decard{
	background-color: #FFFFFF;
	border-radius: 18upx;
	height:182upx;
}
.jifenadd{
	text-align: center;
	padding-top:40upx;
}
.adadd{
	text-align: center;
	color:#3A3B41;
	font-size: 26upx;
}
.haadd{
	display:flex;
}
.addpix{
	width:20%;
	height:178upx;
	line-height: 160upx;
	text-align: center;
}
.addmsg{
	flex:1;
	display:flex;
	height:88upx;
}
.jifenname{
	width:21%;
	color:#3A3B41;
	font-size:30upx;
	line-height:88upx;
	font-weight:600;
}
.jifenphone{
	flex:1;
	color:#3A3B41;
	font-size:30upx;
	line-height:88upx;
	font-weight:600;

}
.dedizhi{
	color:#3A3B41;
	font-size:30upx;
}
.buymsg{
	width: 92%;
	padding: 0 4%;
	position:relative;
	margin-top: 108upx;
}
.shopmsg{
	background-color: #ffffff;
	display: flex;
	border-radius: 10upx;
	height:200upx;

}
.shoppng{
	width:27%;
	text-align: center;
	padding-top:30upx;
}
.shopname{
	flex:1;
	padding-right: 12upx;
}
.shopxix{
	font-size:28upx;
	color:rgba(58,59,65,1);
	height:94upx;
	padding-top:28upx;
	opacity:1;
}
.buyjifen{
	display:flex;
}
.jifensum{
	width:50%;
	font-size:28upx;
	line-height:48upx;
	color:rgba(58,59,65,1);
	opacity:1;
}
.splist_r{
	flex:1;
	text-align: right;
	padding-right:12upx;
	line-height:52upx;
}
.population{
	width: 92%;
	padding: 0 4%;
	margin-top:36upx;
}
.bgse{
	background-color: #FFFFFF;
	border-radius: 5px;
	width: 92%;
	padding: 2% 4%;
}
.ong_hang{
	display: flex;
	/* height:100upx; */
}
.flex_left_one{
	width:26%;
	height:76upx;
	line-height:70upx;
	font-size:30upx;
}
.flex_right_one{
	flex:1;
	text-align: right;
	height:70upx;
	line-height:70upx;
	font-size:30upx;
}
.bottom_button{
	height:80upx;
}
.bottombg{
	height: 99upx;
	width: 100%;
	position: fixed;
    bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
	background:rgba(255,255,255,1);
	box-shadow:0px -1px 6px rgba(0,0,0,0.16);
	opacity:1;
}
.quickbuy{	
	display: flex;
}
.heji{
	line-height:99upx;
	width:60%;
	padding-left: 50upx;
	display: flex;
}
.bgjin{
	background: #B97D00;
	flex:1;
	color:#FFFFFF;
	line-height:99upx;
	font-size:34upx;
	text-align: center;
}
.hejisty{
	font-size:30upx;
}
.jifensty{
	font-size: 34upx;
	color:#B77C01;
	font-weight:600;
}
</style>
