<template>
	<view >
		<wuc-tab :tab-list="tabList"  textFlex :tabCur.sync="TabCur" tab-class="bg-white text-center text-black" select-class="font-color"></wuc-tab>
		<swiper :style="{height:winheight}" :current="TabCur" class="swiper" duration="0" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#4B56C0" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		    <div class="bg-white padding margin text-center text-black"  style="margin-top: 90upx;" >
			  <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" :style="{height:winheight}">
                    <view class="rece_card" v-for="(item, index) in orderlist" :key="item.value"  v-if="orderlist!=''">
						<!-- 小样式 -->
						<view class="rece_card_before"></view>
						<view class="rece_card_after"></view> 
						<!-- end -->
                    	<view class="card_top" @click="Order(index)">
                    		<view class="top_left">
                    			{{item.ordernum}} 
                    		</view>
							<view class="top_right">
								<text class="tr_text">{{item.status=='1'?"待支付":item.status=='2'?"待收货":"已完成"}} 	</text>	
								<!-- <view class="tr_icon">
									<text class="icon_re">&#xe6cb;</text>
								</view> -->
							</view>
                    	</view>
                    	<view class="card_bom">
                    		<view class="card_cont" @click="Order(index)">
                    			<view class="cont_left">
                    				{{item.cname}}
                    			</view>
								<view class="cont_right">
									X {{item.tradeNum}}
								</view>
                    		</view>
							<!-- <view class="card_cont">
								<view class="cont_left">
									海科融通 Q刷
								</view>
								<view class="cont_right">
									X 10
								</view>
							</view>
							 -->
						
						
							<!-- bottom -->
							<view class="botom_card">
								<view class="botom_left">
									合计：<text>￥{{item.payMoney}}</text>
								</view>
								<view class="botom_center">
								<view class="quxiaopay" @click="Orderquxiao(index)"  v-show="item.status=='1'">
									取消支付
								</view>
								</view>
								<view class="botom_right" @click="Order(index)" v-show="item.status!='3'">
									{{item.status=='1'?"立即支付":item.status=='2'?"确认收货":"已完成"}}
								</view>
							</view>
                    	</view>
                    </view> 
					
					<!-- 内容为空 -->
						<view v-if="orderlist==''">
						<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
							<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
						</view>
						</view>
				
					<view style="height: 100upx;"></view>
                </scroll-view>
			
			{{item.name}}</div>
		  </swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		components: { WucTab},
		data() {
			return {
				TabCur:0,
				tabList: [{ name: '全部' }, { name: '待支付' },{ name: '待收货' }, { name: '已完成' },],
				winheight:'1224upx',
				orderlist:'',
			}
		},
		onLoad(option) {
			this.TabCur=parseInt(option.id);
			//this.winheight=1-90+'upx';//获取屏幕高度 解决WucTab组件遗留bug window.screen.height
			var that=this;
			uni.getSystemInfo({
				success: function (res) {
					that.winheight=res.windowHeight-2+'px'
					console.log(res.model);
					console.log(res.pixelRatio);
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					console.log(res.language);
					console.log(res.version); 
					console.log(res.platform); 
				}
			});
		},
		onShow() {
			this.changeorderlist()
		},
		methods: {
			Order(e){
				var orderPlace=this.orderlist[e];
				console.log(this.orderlist[e].id);			//此处的id值可以取到
				//debugger
 				uni.navigateTo({ 
 					url: '../dePayment/dePayment?id='+orderPlace.id+'&userid='+orderPlace.userid+''
 				});
			},
			Orderquxiao(e){
				var orderPlace=this.orderlist[e];
				console.log(orderPlace.id);	//此处的id值也可以取到
				var that=this;
				
				this.$http.get('/api/v1/deleteOrder', {userid: uni.getStorageSync('id'),id:orderPlace.id}).then(res => {	
					this.changeorderlist();
					
				}).catch(err => {
				})
			
			},
			// ljzf(index){
			// 	 var data=this.orderlist[index];
			// 	 var id= uni.getStorageSync('id')
			// 	 var that=this;
			// 	 this.$http.get('/api/v1/payOrder', {userid: id,id:data.id,cid:data.cid}).then(res => {
			// 	 	uni.showToast({
			// 	 	title: res.data.message,
			// 	 	icon:'none',
			// 	 	duration: 2000,
			// 	 	position:'top',
			// 	 	});
			// 	 	if(res.data.resultCode=='200'){
			// 			this.changeorderlist()
			// 	 		console.log(that.orderlist)
			// 	 	}else{
			// 	 		
			// 	 	}
			// 	 }).catch(err => {
			// 	 
			// 	 })
			// },
			 swiperChange(e) {
			    let { current } = e.target;
			    this.TabCur = current;
				this.changeorderlist()
			},
			changeorderlist(){
				var id= uni.getStorageSync('id')
				var that=this;
				var status=this.TabCur=='0'?'':this.TabCur;
				this.$http.get('/api/v1/selectOrder', {userid: id,status:status}).then(res => {
					if(res.data.resultCode=='200'){
						that.orderlist=res.data.data.order;
						console.log(that.orderlist)
					}else{
						uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 2000,
						position:'top',
						});
					}
				}).catch(err => {
				
				})
					Orderquxiao(e);
			}
		}
	}
</script>

<style>
.icon_re{
	font-family: iconfont;
    font-size: 36upx;
    font-weight: 700;
	margin-top: 52upx;
}
.rece_card{
	width: 90%;
	margin: 30upx 5%;
	background: #fff;
	border: 1px solid #ECEBEC; 
	position: relative;
}
.rece_card_before{
	width: 22upx;
    height: 36upx;
    background: #fafafa;
    position: absolute;
    z-index: 3;
    top: 56upx;
	/* top: 45%; */
    left: -2upx;
    border-radius: 0 26upx 26upx 0;
    border: 1px solid #ECEBEC;
    border-left: 0px;
}
.rece_card_after{
	width: 22upx;
    height: 36upx;
    background: #fafafa;
    position: absolute;
    z-index: 3;
    top: 56upx;
	/* top: 45%; */
    right: -2upx;
    border-radius: 26upx 0 0 26upx;
    border: 1px solid #ECEBEC;
    border-right: 0px;
}
.card_top{
	height: 75upx;
	width: 88%;
	margin: 0 6%;
	border-bottom: 1px dashed #ECEBEC;
	display: flex;
	line-height: 75upx;
	font-size: 28upx;
	color: #888;
}
.top_left{
	width: 72%;
	padding-left: 2%;
}
.top_right{
	flex: 1;
	display: flex;
}
.tr_text{
	text-align: right;
	width: 85%;
	/* color: #FF6740; */
}
.card_bom{
	width: 90%;
    margin: 34upx 5%;
}
.card_cont{
	display: flex;
    width: 94%;
    margin: 10px 3%;
    font-size: 28upx;
}
.cont_left{
	    width: 85%;
}
.cont_right{
	flex: 1;
	color: #a0a0a0;
	font-size: 24upx;
	text-align: right;
	padding-right: 6upx;
}
.zhifu{
	flex:1;
}
.botom_card{
	display: flex;
    height:60upx;
    line-height: 90upx;
    width: 94%;
    margin: 0 3%;
    color: #888;
	font-size: 28upx;
}
.botom_left{
	width: 40%;
}
.botom_left text{
	color: #666;
	font-weight: 700;
}
.botom_center{
	width:31%;
	border-radius: 38upx;
	text-align: center;
	
}
.botom_right{
	flex: 1;
    background: #121826;
    color: #EDB315;
    height: 60upx;
    text-align: center;
    line-height: 60upx;
    border-radius: 38upx;
	margin-top: 10upx;
}

.quxiaopay{
	background: rgb(255, 255, 255);
	color: rgb(136, 136, 136);
	border: 1px solid rgb(136, 136, 136);
	margin-right: 10upx;
	height: 57upx;
	line-height: 57upx;
	margin-top: 10upx;
	border-radius: 38upx;
}
</style>
