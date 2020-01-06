<template>
	<view >
		<wuc-tab :tab-list="tabList"  textFlex :tabCur.sync="TabCur" tab-class="bg-white text-center text-black" select-class="font-color"></wuc-tab>
		<swiper :style="{height:winheight}":current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#4B56C0" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		    <div class="bg-white padding margin text-center text-black"  style="margin-top: 90upx;" >
			  <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" :style="{height:winheight}">
				  
				  <view class="" v-show="TabCur=='0'">
					<view class="mac_tit">
						<view class="tit_left">
							元付网络科技有限公司
						</view>
						<view class="tit_right" @click="findOut">
							调拨
						</view>
					</view>
					<view class="xjdl">
						我的下级代理
					</view>
					<!-- 有下级代理 -->
					<view class="mac_cont"  v-for="(item,index) in lowerUsers" :key="index" v-if="lowerUsers!=''">
						<view class="cont_l">	
							{{item.name}}
						</view>
						<view class="cont_c">
							{{item.phone}}
						</view>
						<view class="cont_r" @click="sendOut(index)">
							划拨
						</view>
					</view>
					<!--无下级代理 -->
					<view v-if="lowerUsers==''">
					<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
						<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
					</view>
					</view>
					<!-- <view class="mac_cont">
						<view class="cont_l">
							毛胖胖
						</view>
						<view class="cont_c">
							12356874692
						</view>
						<view class="cont_r">
							划拨
						</view>
					</view> -->
					
				  </view>
				  <!-- 接受调拔内容为空 -->
					   <view class="" v-show="TabCur=='1'">
					   	  <view class="rece_card" v-for="(item, index) in listData" :key="item.value" v-if="listData!=''">			
					   		<!-- 小样式 -->
					   		<view class="rece_card_before"></view>
					   		<view class="rece_card_after"></view>
					   		<!-- end -->
					   		<view class="card_top">
					   			<view class="top_left">
					   				{{item.createtime}}
					   			</view>
					   			<view class="top_right">
					   				<!-- <text class="tr_text">申请成功  | </text>	
					   				<view class="tr_icon">
					   					<text class="icon_re">&#xe6cb;</text>
					   				</view> -->
					   				{{item.oldusername}}
					   			</view>
					   		</view>
					   		<view class="card_bom" >
					   			<view class="card_cont" v-for="(ite,inde) in item.jijubody" :key="ite.value">
					   				<view class="cont_left">
					   					{{ite.name}}
					   				</view>
					   				<view class="cont_right">
					   						{{ite.id}}
					   				</view>
					   			</view>
					   			<!-- <view class="card_cont">
					   				<view class="cont_left">
					   					海科融通 Q刷
					   				</view>
					   				<view class="cont_right">
					   					X 10
					   				</view>
					   			</view> -->
					   			
					   		
					   		
					   			<!-- bottom -->
					   			<view class="botom_card">
					   				<view class="botom_left">
					   					<!-- 合计：<text>￥109958.00</text> -->
					   				</view>
					   				<view class="botom_right" @click="seemsg(index)">
					   					查看详情
					   				</view>
					   			</view>
					   		</view>
					   	</view> 
								<view v-if="listData==''">
								<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
									<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
								</view>
								</view>
					   </view>
					   
					   <!-- <view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
							<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
						</view> -->
		
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
				tabList: [{ name: '调拨人选' }, { name: '接受调拨' }],
				winheight:'1224upx',
				lowerUsers:'',
				listData:'',
			}
		},
		onLoad(option) {
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
			this.$http.get('/api/v1/getLowerUser', {id: uni.getStorageSync('id')}).then(res => {
				if(res.data.resultCode=='200'){
				this.lowerUsers=res.data.data.lowerUsers;
				}else{
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
				}
			}).catch(err => {
			
			}),
			this.$http.get('/api/v1/getReviewTransfer', {userid: uni.getStorageSync('id'),status:'0'}).then(res => {
				var that=this;
				if(res.data.resultCode=='200'){
					//成功 
					this.listData=res.data.data.transfer;
					console.log(this.listData)
					
					for(var j=0;j<this.listData.length;j++){
						var jijuname=this.listData[j].name.split(",");
						var jijuid=this.listData[j].implementid.split(",");
						 
						console.log(jijuid)
						that.listData[j]['jijubody']=[];
						for(var i=0;i<jijuid.length;i++){
							var jijuObject={};
							jijuObject.name=jijuname[i];
							jijuObject.id=jijuid[i];
							that.listData[j].jijubody.push(jijuObject)
							console.log(that.listData)
						}
					}
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
		},
		methods: {
			 swiperChange(e) {
			    let { current } = e.target;
			    this.TabCur = current;
			},
			findOut(){
				uni.navigateTo({ 
					url: "../confirmationAllocation/confirmationAllocation?id=1&name=元付网络" 
				});
			},
			sendOut(index){
				var lowerUserID=this.lowerUsers[index].id
				var lowerUserName=this.lowerUsers[index].name
				uni.navigateTo({ 
					url: "../confirmationAllocation/confirmationAllocation?id="+lowerUserID+"&name="+lowerUserName+""
				});
			},
			seemsg(index){
				uni.navigateTo({ 
					url: "../offNoconfir/offNoconfir?listData="+ encodeURIComponent(JSON.stringify(this.listData[index]))
				});
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
	width: 88%;
	margin: 30upx 6%;
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
	border-bottom: 1px dashed #ECEBEC;
	display: flex;
	line-height: 75upx;
	font-size: 28upx;
	color: #888;
}
.top_left{
	width: 70%;
	padding-left: 3%;
}
.top_right{
	flex: 1;
	text-align: right;
	display: inline-block;
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
	width: 70%;
}
.botom_left text{
	color: #666;
	font-weight: 700;
}
.botom_right{
	flex: 1;
    background: linear-gradient(left,#6671e2,#4b56c0);
    color: #fff;
    height: 60upx;
    text-align: center;
    line-height: 60upx;
    border-radius: 38upx;
	margin-top: 10upx;
}
.mac_tit{
	height: 120upx;
    background: #fff;
    margin: 10px 0;
    display: flex;
    line-height: 120upx;
}
.tit_left{
	padding-left: 15px;
    font-size: 14px;
    width: 70%;
}
.tit_right{
	flex: 1;
    text-align: center;
    margin: 30upx 0;
    margin-right: 30upx;
    background:  linear-gradient(left,#ffb75a,#ff6a41);
    font-size: 28upx;
    line-height: 60upx;
    border-radius:30upx;
    color: #fff;
}
.xjdl{
	height: 100upx;
    background: #fff;
    line-height: 100upx;
    padding: 0 30upx;
    font-weight: 700;
    font-size: 30upx;
}
.mac_cont{
	width: 100%;
    height: 59px;
    background: #fff;
    line-height: 59px;
    border-top: 1px solid #eee;
    display: flex;
    font-size: 14px;
}
.cont_l{
	width: 30%;
    padding-left: 15px;
}
.cont_c{
	width: 40%;
}
.cont_r{
	flex: 1;
	text-align: center;
	margin: 30upx 0;
	margin-right: 30upx;
	background:  linear-gradient(left,#6671e2,#4b56c0);
	font-size: 28upx;
	height: 60upx;
	line-height: 60upx;
	border-radius:40upx;
	color: #fff;
}
</style>
