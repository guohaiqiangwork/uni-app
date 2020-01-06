<template>
	<view >
		<wuc-tab :tab-list="tabList"  textFlex :tabCur.sync="TabCur" tab-class="bg-white text-center text-black" select-class="color_new"></wuc-tab>
		<swiper :style="{height:winheight}" :current="TabCur" class="swiper" duration="0" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#4B56C0" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		    <div class="bg-white padding margin text-center text-black"  style="margin-top: 90upx;" >
			  <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" :style="{height:winheight}">
                    <view class="rece_card" v-for="(item, index) in orderlist" :key="item.value"  v-if="orderlist!=''"  @click="Order(index)">
                    	<view class="card_top">
                    		<view class="top_left" >
								<view class="">
									<image src="../../../static/img/Hj.png" mode="" style="width: 40upx;height: 40upx;padding-top:16upx;padding-right: 16upx;"></image>
								</view>
                    			<view class="">
                    				{{item.createTime}} 
                    			</view>
                    		</view>
							<view class="top_right">
								<text class="tr_text" :class="item.status=='1'?'color_x':''">{{item.status=='1'?"待支付":item.status=='2'?"进行中":item.status=='9'?"已取消":"已完成"}} 	</text>	
								<!-- <view class="tr_icon">
									<text class="icon_re">&#xe6cb;</text>
								</view> -->
							</view>
                    	</view>
                    	<view class="card_bom">
                    		<!-- <view class="card_cont" @click="Order(index)">
                    			<view class="cont_left">
                    				{{item.cname}}
                    			</view>
								<view class="cont_right">
									X {{item.tradeNum}}
								</view>
                    		</view> -->
							<!-- <view class="card_cont">
								<view class="cont_left">
									海科融通 Q刷
								</view>
								<view class="cont_right">
									X 10
								</view>
							</view>
							 -->
						<view style="width: 640upx;height: 180upx;border-radius:22upx;display: flex; ">
							<view style="width: 30%;">
								<image :src="item.terminalnum" mode="scaleToFill"style="width: 155upx; height: 155upx;margin-left: 20upx;margin-top: 12upx;"></image>
							</view>
							<view class=""style=" flex: 1; padding: 0 3%; ">
								<view class="" style=" height: 60px; line-height: 30px; ">
									{{item.cname}}
								</view>
								<view class="" style="display: flex;font-size:30upx;">
									<view class="" style="flex: 1;">
										{{item.payMethod}} 积分
									</view>
									<view class="" style="width: 10%;">
										x{{item.tradenum==''?'1':item.tradenum}}
									</view>
								</view>
							</view>
						</view>
						
							<!-- bottom -->
							<view class="botom_card">
								<view class="botom_left">
									合计：<text style="color: #B77C01FF;">{{item.paymoney}}积分</text>
								</view>
								<!-- <view class="botom_right" @click="Orderquxiao(index)" style="background: rgb(255, 255, 255);color: rgb(136, 136, 136);border: 1px solid rgb(136, 136, 136);margin-right: 10upx;height: 57upx;line-height: 57upx;" v-show="item.status=='1'">
									取消支付
								</view> -->
								<view class="botom_right" @click="Order(index)" v-show="item.status!='9'">
									{{item.status=='1'?"立即支付":item.status=='2'?"处理中":item.status=='9'?"已取消":"已完成"}}
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
				tabList: [{ name: '全部' }, { name: '待支付' },{ name: '进行中' },{ name: '已完成' }, { name: '已取消' }],
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
 					url: '../orDetail/orDetail?chanpinId='+orderPlace.id+'&userid='+orderPlace.userid+''
 				});
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
				var status=this.TabCur=='0'?'':this.TabCur=='4'?'9':this.TabCur;
					//status=this.TabCur=='4'?'9':this.TabCur;
				this.$http.get('/api/v1/selectIntegralOrder', {userid: id,status:status}).then(res => {
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
					
			}
		}
	}
</script>

<style>
	.color_x{
		color: rgb(183, 124, 1);
	}
	.color_new{
		color: #2b3550;
	}
.icon_re{
	font-family: iconfont;
    font-size: 36upx;
    font-weight: 700;
	margin-top: 52upx;
}
.rece_card{
	width: 100%;
	margin: 30upx 0;
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
	width: 92%;
	margin: 0 4%;
	border-bottom: 1px solid #f8f8f8;
	display: flex;
	line-height: 75upx;
	font-size: 28upx;
}
.top_left{
	width: 72%;
	padding-left: 2%;
	display: flex;
}
.top_right{
	flex: 1;
	display: flex;
}
.tr_text{
	text-align: right;
	width: 85%;
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
.botom_card{
	display: flex;
    height:60upx;
    line-height: 90upx;
    width: 94%;
    margin: 0 3%;
    color: #888;
	font-size: 28upx;
	border-top: 1px solid #f8f8f8;
}
.botom_left{
flex: 1;
}
.botom_left text{
	color: #666;
	font-weight: 700;
}
.botom_right{
	width: 200upx; color: rgba(183,124,1,1); height: 30px; text-align: center; line-height: 30px; margin-top: 5px; border: 1px solid rgba(183,124,1,1); opacity: 1; border-radius: 17px;
}
</style>
