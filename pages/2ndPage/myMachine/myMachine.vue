<template>
	<view style="position: relative;">
		<view class="machseach" :class="select!='0'?'machseachselect':''">
			<view class="machbody">
				<view class="seach_l" :class="select=='1'?'font-color':''" @click="selected(1)">
					{{jijuName}}   <!-- 初始值味机具平台 -->
					<text class="iconseach">&#xe6b0;</text>
				</view>
				<view class="seach_r" :class="select=='2'?'font-color':''" @click="selected(2)">
					{{jijustaus}}    <!-- 初始值味机具状态 -->
					<text class="iconseach">&#xe6b0;</text>
				</view>
			</view>
			<view class="bg1" v-show="select=='1'"  v-for="(item, index) in pintailist" :key="item.value"  @click="pintaiselected(index)">
				<view :class="item.checked==true?'bgselect':''">
					{{item.name}}
				</view>
			</view>
			<view class="bg1" v-show="select=='2'" v-for="(item, index) in zhuangtailist" :key="item.value"  @click="zhuangtaiselected(index)">
				<view :class="item.checked==true?'bgselect':''">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" style="padding-top: 100upx;" v-show="terminalslist!='none'">
			 <view class="rece_card" v-for="(item,index) in terminalslist" :key="index" >
				<!-- 小样式 -->
				<view class="rece_card_before"></view>
				<view class="rece_card_after"></view>
				<!-- end -->
				<view class="card_top">
					<view class="top_left">
						{{item.platform}}
					</view>
					<view class="top_right">
						<!-- 未激活 加class=font-color2 -->
						<text class="tr_text" :class="item.status=='1'?'':'font-color2'">{{item.status=='1'?"已激活":"未激活"}}</text>	
					</view>
				</view>
				<view class="card_bom">
					<view class="card_cont">
						<view class="cont_left">
							机具型号
						</view>
						<view class="cont_right">
							{{item.name}}
						</view>
					</view>
					<view class="card_cont">
						<view class="cont_left">
							机具编号
						</view>
						<view class="cont_right">
							{{item.terminalnum}}
						</view>
					</view>
					
				</view>
			</view> 
		
		</scroll-view>
		<scroll-view  v-show="terminalslist=='none'">
			<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
				<image src="../../../static/img/nomore1.png" mode="aspectFit" ></image>
			</view>
		</scroll-view>
			
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				terminalslist:'none',
				status:'',
				platform:'',
				name:'',
				select:'0',
				jijuName:'机具平台',
				pintailist:[{name:'机具平台',checked:true,val:''},{name:'海科融通',checked:false,val:''}],//,{name:'海科融通',checked:false,val:''}
				jijustaus:'机具状态',
				zhuangtailist:[{name:'机具状态',checked:true,val:''},{name:'已激活',checked:false,val:'1'},{name:'未激活',checked:false,val:'0'}],
			} 
		},
		onShow() {
			this.showlist();
		},
		methods: {
			selected(index){
				this.select=index;
			},
			pintaiselected(index){
				console.log(index)
				for (var i = 0; i < this.pintailist.length; i++) {
					if(index==i){
						this.pintailist[i].checked=true;
						this.jijuName=this.pintailist[i].name;
						this.platform=this.pintailist[i].val;
						this.showlist();
					}else{
						this.pintailist[i].checked=false;
					}
				}
				this.select='0';
			
			},
			zhuangtaiselected(index){
				//var that=this;
				for (var i = 0; i < this.zhuangtailist.length; i++) {
					if(index==i){
						this.zhuangtailist[i].checked=true;
						this.jijustaus=this.zhuangtailist[i].name;
						this.status=this.zhuangtailist[i].val;
						this.showlist();
					}else{
						this.zhuangtailist[i].checked=false;
					}
				}
				this.select='0';
				
			},
			showlist(){
				this.$http.get('/api/v1/getTerminal', {userid: uni.getStorageSync('id'),status:this.status,platform:this.platform,name:this.name}).then(res => {
					if(res.data.resultCode=='200'){
						if(res.data.data.terminals.length!=0){
							this.terminalslist=res.data.data.terminals;
						}else{
							this.terminalslist='none'
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
			}
		}
	}
</script>

<style>
.iconseach{
	font-family: iconfont !important;
	margin-left: 10upx;
}
.machseach{
	position: fixed;
    width: 100%;
	z-index: 999;
}
.machseachselect{
	top: 0;
	bottom: 0;
	background:rgba(0,0,0,.6)
}
.machbody{
	display: flex;
	text-align: center;
	height: 90upx;
	line-height:90upx;
	background: #fff;
	font-size: 30upx;
	
}
.seach_l{
	width: 50%;
}
.seach_r{
	flex: 1;
}
.bg1{
	background: #fff;
    border-top: 1px solid #fafafa;
	color: #666;
	z-index: 9999999;
	
}
.bgselect{
	background: #4b56c012;
    color: #4b56c0;
}
.bg1 view{
	height: 88upx;
    line-height: 88upx;
    padding-left: 34upx;
    border-bottom: 1px solid #fafafa;
	font-size: 28upx;
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
	color: #4b54ce;
}
.top_left{
	width: 72%;
	padding-left: 3%;
	color: #000000;
}
.top_right{
	flex: 1;
	text-align: right;
	display: flex;
}
.top_right text{
	width: 100%;
	padding-right: 15upx;
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
	width: 30%;
	
}
.cont_right{
	flex: 1;
	color: #000;
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
</style>
