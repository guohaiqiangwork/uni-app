<template>
	<view >
		<wuc-tab :tab-list="tabList"  textFlex :tabCur.sync="TabCur" tab-class="bg-white text-center text-black" select-class="color_new"></wuc-tab>
		<swiper :style="{height:winheight}":current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="#4B56C0" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		    <div class="bg-white padding margin text-center text-black"  style="margin-top: 90upx;" >
			  <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" :style="{height:winheight}" >
			   <view class="" style="padding: 0 3%;background: #fff;margin-top: 5%;">
                   	<view style="border-bottom: 1px solid #ECEBEC;display: flex;padding: 0 3%;"  v-for="(item, index) in listData" :key="item.value" v-if=" TabCur==0">
                   		<view class=""style="flex: 1;line-height: 60upx;">
                   			<view class="" style="    font-size: 34upx;">
                   				{{item.channel}}赚取积分
                   			</view>
                   			<view class="" style="color: rgba(160,160,160,1);	;">
                   				{{item.createtime}}
                   			</view>
                   		</view>
                   		<view class=""style="width: 20%;text-align: center;line-height: 120upx;font-size: 38upx;color: rgba(227,153,0,1);">
                   			+{{item.integral}}
                   		</view>
                   	</view> 
					<view style="border-bottom: 1px solid #ECEBEC;display: flex;padding: 0 3%;" v-for="(item, index) in listData2" :key="item.value"v-if=" TabCur==1">
						<view class=""style="flex: 1;line-height: 60upx;">
							<view class="" style="    font-size: 34upx;">
								兑换 {{item.cname}}
							</view>
							<view class="" style="color: rgba(160,160,160,1);	;">
								{{item.createTime}}
							</view>
						</view>
						<view class=""style="width: 20%;text-align: center;line-height: 120upx;font-size: 38upx;color: rgba(227,153,0,1);">
							-	{{item.paymoney}}
						</view>
					</view> 
                   </view>
						<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" v-if="listData==''">
							<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
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
				tabList: [{ name: '积分明细' }, { name: '兑换记录' }],
				winheight:'1224upx',
				listData:"",
				listData2:"",
			}
		},
		onLoad(option) {
			var that=this;
			uni.getSystemInfo({
				success: function (res) {
					that.winheight=res.windowHeight-2+'px'
					// console.log(res.model);
					// console.log(res.pixelRatio);
					// console.log(res.windowWidth);
					// console.log(res.windowHeight);
					// console.log(res.language);
					// console.log(res.version); 
					// console.log(res.platform); 
				}
			});
		}, 
		onShow() {
			this.showlistdata()
					
		},
		methods: {
			showlistdata(){
				var that=this;
				var id= uni.getStorageSync('id')
				this.$http.get('/api/v1/integralSource', {userid: id}).then(res => { 
					if(res.data.resultCode==200){
						//成功 
						this.listData=res.data.data.userIntegrals;
						this.listData2=res.data.data.Order;
						
						console.log(this.listData)
						
						for(var j=0;j<this.listData.length;j++){
							var jijuname=this.listData[j].name.split(",");
							var jijuid=this.listData[j].implementid.split(",");
							//var jijuObject=new Array();
							
							that.listData[j]['jijubody']=[];
							for(var i=0;i<jijuid.length;i++){
									var jijuObject={};
								jijuObject.name=jijuname[i];
								jijuObject.id=jijuid[i];
								that.listData[j].jijubody.push(jijuObject)
								console.log(this.listData[j].jijubody)
							}
						}
					}else{
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
			onNavigationBarButtonTap:function(e){
				console.log('1')
			  uni.navigateTo({
				url: '../jijuquestion/jijuquestion'
			  });
			},
			 swiperChange(e) {
			    let { current } = e.target;
			    this.TabCur = current;
				this.showlistdata()
			},
			seemsg(index){
					uni.navigateTo({ 
					url: "../confirmState/confirmState?listData=" + encodeURIComponent(JSON.stringify(this.listData[index]))
				});
			}
		}
	}
</script>

<style>
.color_new{
		color: #2a3451;
	}
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
	width: 70%;
	padding-left: 3%;
}
.top_right{
	flex: 1;
	text-align: right;
	display: flex;
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
	    width: 35%;
}
.cont_right{
	flex: 1;
	color: #a0a0a0;
	font-size: 24upx;
	text-align:right;
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
</style>
