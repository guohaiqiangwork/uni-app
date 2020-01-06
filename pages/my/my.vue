<template>
	<view class="page">
		<headX></headX>
	
		<!-- <text class="icons icons_h_left">&#xe632;</text> -->
		 <view>
			<view class="my_card">
				<view class="mcard_main">
					<view class="mcard_top_flex">
						<view class="flex_left">
							<view class="left_top_hi">
							<text>HI~,</text><text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							</view>
							<view class="left_bottom_pic">
								<!-- 等级1 -->
								<view class="title_msg" v-show="dataList.level==='1'&& dataList.type!='1'">
									<!-- <text>{{dataList.name?dataList.name:'未知宝宝'}}</text> -->
								<!-- <view > -->
										<image src="../../static/img/vip1.png" mode="aspectFit" class="imglevel" ></image>
								<!-- </view> -->
								</view>
								<!-- 等级2 -->
								<view class="title_msg" v-show="dataList.level==='2'&& dataList.type!='1'">
									<!-- <text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
								<view > -->
										<image src="../../static/img/vip2.png" mode="aspectFit" class="imglevel" ></image>
								<!-- </view> -->
								</view>
								<!-- 等级3 -->
								<view class="title_msg" v-show="dataList.level==='3'&& dataList.type!='1'">
									<!-- <text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
								<view > -->
										<image src="../../static/img/vip3.png" mode="aspectFit" class="imglevel" ></image>
								<!-- </view> -->
								</view>
								<!-- 等级4 -->
								<view class="title_msg" v-show="dataList.level==='4'&& dataList.type!='1'">
									<!-- <text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
								<view > -->
										<image src="../../static/img/vip4.png" mode="aspectFit" class="imglevel" ></image>
								</view>
								<!-- </view> -->
								<!-- 等级5 -->
								<view class="title_msg" v-show="dataList.level==='5' && dataList.type!='1'">
									<!-- <text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
								<view > -->
										<image src="../../static/img/vip5.png" mode="aspectFit" class="imglevel" ></image>
								<!-- </view> -->
								</view>
								<view class="title_msg" v-show="dataList.type==='1'">
									<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
								<view >
										<image src="../../static/img/svip.png" mode="aspectFit" class="imglevel" ></image>
								</view>
								</view>
							</view>
						</view>
						<view class="flex_right">
							<image :src="dataList.avatar" mode="scaleToFill" style="width: 120upx; height: 120upx;border-radius: 50%;"></image>
						</view>
						
						</view>
					<!-- <view class="mcard_top_flex">
						<view class="flex_left">
							<image :src="dataList.avatar" mode="scaleToFill" style="width: 90upx; height: 90upx;border-radius: 50%;margin-left: 30upx;margin-top: 30upx;"></image>
						</view>
						<view class="flex_right">
							<view class="title_msg" v-show="dataList.level==='1'&& dataList.type!='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/vip1.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							<view class="title_msg" v-show="dataList.level==='2'&& dataList.type!='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/vip2.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							<view class="title_msg" v-show="dataList.level==='3'&& dataList.type!='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/vip3.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							<view class="title_msg" v-show="dataList.level==='4'&& dataList.type!='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/vip4.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							<view class="title_msg" v-show="dataList.level==='5' && dataList.type!='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/vip5.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							<view class="title_msg" v-show="dataList.type==='1'">
								<text>{{dataList.name?dataList.name:'未知宝宝'}}</text>
							<view >
									<image src="../../static/img/svip.png" mode="aspectFit" class="imglevel" ></image>
							</view>
							</view>
							
							
						</view>
					</view> -->
					<!-- card -->
					<view class="index_mey">
						<view class="mey_left" @click="myAssets">
							<view class="mey_top">
								{{allmoney}}
							</view>
							<view class="mey_bom">
								余额(元)
							</view>
						</view>
						<view class="mey_center">
							
						</view>
						<view class="mey_right" @click="integral">
							<view class="mey_top">
								{{dataList.integral}}
							</view>
							<view class="mey_bom">
								积分
							</view>
						</view>
					</view>
					<!-- <view class="mcard_bom_flex">
						<view class="boml">
							<view class="boml_top">
								账户余额（元）
							</view>
							<view class="boml_bom">
								{{allmoney}}
							</view>
						</view>
						<view class="bomr"  @click="myAssets">
							<view class="bomr_btn">
								查看
							</view>
						</view>
					</view> -->
				</view>
			</view>
			
			<view class="content-card content-card_one">
				<view class="cCard_title">
					<text>我的订单</text>
				</view>
				<view class="cCard_body">
					<!-- cols_4 -->
					<view class="cols_4" @click="Receiving('0')">
						<view class="cols_icon">
							<text class="icon_4">&#xe623;</text>
						</view>
						<view class="cols_text">
							<text>全部订单</text>
						</view>
					</view>
					<!-- cols_4 -->
					<view class="cols_4"  @click="Receiving('1')">
						<view class="cols_icon">
							<text class="icon_4">&#xe622;</text>
						</view>
						<view class="cols_text">
							<text>待支付</text>
						</view>
					</view>
					<!-- cols_4 -->
					<view class="cols_4"  @click="Receiving('2')">
						<view class="cols_icon">
							<text class="icon_4 ">&#xe62d;</text>
						</view>
						<view class="cols_text">
							<text>待收货</text>
						</view>
					</view>
					<!-- cols_4 -->
					<view class="cols_4"  @click="Receiving('3')">
						<view class="cols_icon">
							<text class="icon_4">&#xe62c;</text>
						</view> 
						<view class="cols_text">
							<text>已完成</text>
						</view>
					</view>
				</view>
			</view>
			
						<view class="content-card">
				<view class="cCard_title">
					<text>我的服务</text>
				</view>
				<view class="cCard_body">
					
					
					<view class="cols_4" @click="cardBank">
						<view class="cols_icon">
							<text class="icon_4" style="color:#389df8">&#xe637;</text>
						</view>
						<view class="cols_text">
							<text>银行卡</text>
						</view>
					</view>
				
					<!-- cols_4 -->
					
					<!-- <view class="cols_4" @click="realName">
						<view class="cols_icon">
							<text class="icon_4 " style="color:#25d8bb">&#xe624;</text>
						</view>
						<view class="cols_text" >
							<text>实名认证</text>
						</view>
					</view> -->
					<view class="cols_4" @click="rulePro">
						<view class="cols_icon">
							<text class="icon_4 " style="color:#fd9c3c">&#xe635;</text>
						</view>
						<view class="cols_text">
							<text>盈利规则</text>
						</view>
					</view>
				<view class="cols_4" @click="shujutongji">
					<view class="cols_icon">
						<text class="icon_4" style="color:#e76bfd">&#xe636;</text>
					</view>
					<view class="cols_text cc_color">
						<text>数据统计</text>
					</view>
				</view>
					<view class="cols_4" @click="qrcode">
						<view class="cols_icon">
							<text class="icon_4" style="color:#b061f4">&#xe63a;</text>
						</view>
						<view class="cols_text">
							<text>邀请二维码</text>
						</view>
					</view>
					
					</view>
						<view class="cCard_body">
						<!-- cols_4 -->
						<view class="cols_4" @click="myMachine()">
							<view class="cols_icon">
								<text class="icon_4" style="color:#f75a5a">&#xe624;</text>
							</view>
							<view class="cols_text">
								<text>我的机具</text>
							</view>
						</view>
						<view class="cols_4" @click="myAgent()">
							<view class="cols_icon" >
								<text class="icon_4" style="color:#6cbdf8">&#xe627;</text>
							</view>
							<view class="cols_text">
								<text>我的代理</text>
							</view>
						</view>
						<view class="cols_4" @click="jijujihuo()">
							<view class="cols_icon" >
							<text class="icon_4" style="color:#54d6a8">&#xe639;</text>
							</view> 
							<view class="cols_text">
								<text>注册入网</text>
							</view>
						</view>
						<view class="cols_4" @click="setting">
							<view class="cols_icon">
								<text class="icon_4" style="color:#fdc93c">&#xe638;</text>
							</view>
							<view class="cols_text">
								<text>设置</text>
							</view>
						</view>
					
					
					</view>
					</view>
					
			<!-- <view class="content-card">
				<view class="cCard_title">
					<text>我的服务</text>
				</view>
				<view class="cCard_body">
				
					<view class="cols_4" @click="allocationMachinery">
						<view class="cols_icon">
							<text class="icon_4">&#xe736;</text>
						</view>
						<view class="cols_text">
							<text>机具调拨</text>
						</view>
					</view> 
					 <view class="cols_4" @click="recordTransfer">
						<view class="cols_icon">
							<text class="icon_4 font-color3">&#xe74d;</text>
						</view>
						<view class="cols_text">
							<text>调拨记录</text>
						</view>
					</view>
					<view class="cols_4" @click="shujutongji">
						<view class="cols_icon">
							<text class="icon_4 font-color2 cc_color">&#xe739;</text>
						</view>
						<view class="cols_text cc_color">
							<text>数据统计</text>
						</view>
					</view>
				</view>
				<view class="cCard_body">
					
					<view class="cols_4" v-show="yunyinStus">
						<view class="cols_icon">
							<text class="icon_4 ">&#xe746;</text>
						</view>
						<view class="cols_text" @click="operarevent">
							<text>运营收益</text>
						</view>
					</view>
					
				
				</view>
			</view> -->
			
			<!-- <view style="height: 200upx;">
				
			</view> -->
			<!-- <button type="primary" plain="true" @click="request">退出登录</button>
			<button type="primary" plain="true" @click="changePwd">修改密码</button>
			<button type="primary" plain="true" @click="myAssets">我的</button> -->
				
            </view>
	
	</view>
</template>
<script>
	import headX from '@/components/header/header';
	export default {
		components: {
			headX
		},
		data() {
			return {
				dataList:'',
				datal:'',
				allmoney:'0.00',
				yunyinStus:false,
			}
		},
		onShow() {
			this.$store.commit('TITLE','  ')
			// this.$store.commit('TITLE','&#xe632;)

			uni.getStorageSync('token')==''?this.notoken():''//判断登录状态
			uni.getStorageSync('typeCustomer')=='1'?this.yunyinStus=true:''//判断登录客户类型
			this.requestLIST();
		},
		methods: {
			allocationMachinery(){
				uni.navigateTo({ 
					url: '../2ndPage/allocationMachinery/allocationMachinery'
				});
			},
			msg(e){
				uni.navigateTo({
					url:"../../pages/msg/msg"
				})
				
			},
			integral(){
				uni.navigateTo({ 
					url: '../2ndPage/integral/integral'
				});
			},
			jijujihuo(){
				if(this.dataList.isrealname=='0'){//未实名认证
					uni.showModal({
						title: '提示',
						content: '还未实名认证，是否前往？',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({ 
									url: '../2ndPage/authReal/authReal'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else if(this.datal.userBankCard.length==0){
					uni.showToast({
					title: '请先绑定银行卡，在进行机具激活',
					icon:'none',
					duration: 2000,
					position:'top',
					});
				}else{
					uni.navigateTo({ 
						url: '../2ndPage/jijujihuo/jijujihuo'
					});
				}
			},
			shujutongji(){
					uni.navigateTo({
						url: '../2ndPage/daSta/daSta'
					});
			},
			rulePro(){
				uni.navigateTo({
					url: '../2ndPage/rulePro/rulePro'
				});
			},
			realName(){
					uni.navigateTo({
						url: '../2ndPage/authReal/authReal'
					});
			},
			qrcode(){
				console.log(this.dataList.recommendcode)
				uni.navigateTo({ 
					url: '../2ndPage/qrcode/qrcode?code='+this.dataList.recommendcode+''
				});
			},
			recordTransfer(){
				uni.navigateTo({ 
					url: '../2ndPage/recordTransfer/recordTransfer'
				});
			},
			myAgent(){
				uni.navigateTo({ 
					url: '../2ndPage/myAgent/myAgent'
				});
			},
			myMachine(){
				uni.navigateTo({ 
					url: '../2ndPage/myMachine/myMachine'
				});
			},
			operarevent() {
				uni.navigateTo({ 
					url: '../2ndPage/revenOpera/revenOpera'
				});
			},
			cardBank(){
				if(this.dataList.isrealname=='0'){//未实名认证
					uni.showModal({
						title: '提示',
						content: '还未实名认证，是否前往？',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({ 
									url: '../2ndPage/authReal/authReal'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					uni.navigateTo({ 
						url: '../2ndPage/myBcard/myBcard'
					});
				}
				
			},
			requestLIST(){
				var id= uni.getStorageSync('id')
				this.$http.get('/api/v1/getuserinfo', {id: id}).then(res => { 
					if(res.data.resultCode==200){
						//成功 
						this.datal=res.data.data;
						this.dataList=res.data.data.user;
						this.allmoney=res.data.data.user.money.toFixed(2)
						 uni.setStorageSync('userName', res.data.data.user.name);
						 uni.setStorageSync('avatarIMG', res.data.data.user.avatar);
						//添加实名信息
						if(this.dataList.isrealname=='1'){
							uni.setStorageSync('realname', res.data.data.certifications[0].name);
							uni.setStorageSync('realidcard', res.data.data.certifications[0].idcard);
								
						}
					}else{
						//有误
						// uni.showToast({
						// title: res.data.message,
						// icon:'none',
						// duration: 2000,
						// position:'top',
						// });
					}
				}).catch(err => {
				
				})
		
			},
			Receiving(e){
				uni.navigateTo({ 
					url: '../2ndPage/Receiving/Receiving?id='+e
				});
			},
			myAssets(){
				uni.navigateTo({ 
					url: '../2ndPage/myAssets/myAssets?phone='+this.dataList.phone
				});
			},
			notoken(){
				uni.showModal({
				title: '提示',
				content: '别着急，请先登录~',
				showCancel:false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url: '../login/login'
						});
					} 
				}
			});
			},
			changePwd:function(){
				console.log(uni.getStorageSync('token'))
				this.$http.get('/api/v1/user_modify', {phone: '18526547302', password: '111111',bereccode: '321211'}).then(res => {
					uni.showModal({
						title: '返回数据',
						content: '成功',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						} 
					});
				}).catch(err => {

				})
			},
			setting(){
				uni.navigateTo({
					url: "../2ndPage/setting/setting?name="+this.dataList.name+"&account="+this.dataList.account+"&avatar="+this.dataList.avatar+"&phone="+this.dataList.phone+""
				});
			}, 
			
			
		}
	}
</script>

<style>

.my_card{
	height: 360upx; 
	width: 100%; 
}
.mcard_main{
	width: 100%;
	height: 100%;
	/* background: #4B56C0; */
	/* background-image: url('../../static/img/banner3.png'); */
	/* margin:4% 0 0 4% ; */
	/* border-radius: 10upx; */
	background-size: 100%;
	background-repeat: no-repeat;
}
.mcard_top_flex{
	height: 35%;
	display: flex;
	padding-top: 4%;
}
.imglevel{
	width: 102upx;
    height: 38upx;
    /* margin-bottom: 8rpx; */
    /* margin-left: 8rpx; */
	border-radius: 10upx;
}
.flex_left{
	width: 68%;
    padding-left: 5%;
    color: #101D33;
    font-size: 52upx;
	height: 140upx;
}
.left_top_hi{
	height:80upx;
	line-height:80upx;
}
.left_bottom_pic{
	height:60upx;
	line-height: 50upx;
}
.flex_right{
	flex: 1;
	text-align:right;
	padding-right:5%;
	height:140upx;
	line-height:140upx;
	padding-top:16upx;
}
itle_msg view{
	display: inline-block;
	
}
.title_msg image{
	/* width: 20%; */
	display: inline-block;
	vertical-align:bottom; /* 居中对齐， */
}
.content-card{
	background: #fff;
	margin-bottom: 40upx;
	padding-bottom: 40upx;
	
}
.content-card_one{
	margin-top:40upx;
}
.cCard_title{	
	width: 95%;
	margin-left: 5%;
	border-bottom: 1px solid #f8f8f8;
}
.cCard_title text{
	line-height: 80upx;
	font-weight: 700;
	font-size: 30upx;
}
.cCard_body{
	margin: 0 3%;
	display: flex;
}
.cCard_body .cols_4{
	/* height: 150upx; */
	width: 25%;
	/* background: red; */
}
.cols_icon{
	color: #FFC448;
	font-size:62upx;
	line-height: 120upx;
	height: 100upx;
	font-weight: 400;
}
.cols_text{
	text-align: center;
	font-size:24upx;
	padding-left: 4upx;
	
}
.icon_4{
	font-family: iconfont;
    margin-left:64upx;
	font-size: 58upx;
}
.mcard_bom_flex{
	height: 35%;
    padding: 3%;
    font-size: 28upx;
    display: flex;
}
.boml{
	width: 50%;
    padding-left: 9%;
}
.boml_bom{
	line-height: 88upx;
    font-size: 56upx;
}
.bomr{
	flex: 1;
    text-align: center;
}
.bomr_btn{
	margin: 10% 35%;
    border: 1px solid #fff;
    height: 60upx;
    line-height: 60upx;
    color: #fff;
    border-radius: 36upx;
    width: 164upx;
}
/* card样式*/
.index_mey{
		width: 93.2%;
		margin: 0 3.4%;
		box-shadow: 0px 1px 4px rgba(0,0,0,0.16);
		height: 150upx;
		/* border-radius: 8upx; */
		display: flex;
		/* background:#131926; */
		margin-top: 46upx;
		
		
		background:rgba(19,25,38,1);
		border:1px solid rgba(112,112,112,1);
		border-radius:36upx
		
	}
	.mey_center{
		width: 1px;
		height: 60upx;
		margin-top: 50upx;	
		border-left: 1px solid #D9DBEC;
	}
	.mey_left{
		width: 50%;
		text-align: center;
		/* color:#000000; */
	}
	.mey_right{  
		flex: 1; 
		text-align: center;
		/* color:#000000; */
		
	}
	.mey_top{
		font-size: 40upx; 
		height: 66upx;
		line-height: 72upx;
		padding-top: 20upx;
		color:#FFC448;
	}
	.mey_bom{
		font-size: 26upx;
		color:#BFBFBF;
	} 
</style>
