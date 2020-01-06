<template xlang="wxml" style="">
	
	<!-- <view class="container" style="">
		<view class="imglist">
			<image src="../../../static/img/rcodeBG1.jpg" mode="widthFix" style=" width: 100%;will-change: transform" lazy-load="true"></image>
			<view class="qrimg">
				<view class="qrimg-i">
					<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit"  :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
				</view> 
			</view>
			<button type="primary" @click="saveImg">保存到相册</button>
			<view class="buttonsave" @click="saveImg">
				保存到相册
			</view>
			<view class="tuiguangCode">
				{{tuiguangCode}}
			</view>
		</view>
	</view> -->
	<view style="background: #3d2fdf;" :style="{'height':windowHeight}">
		<!-- padding-bottom: 300upx; -->
		<view class="img_mode" style="position: relative;" >
			<image src="../../../static/img/invite.png" mode="widthFix" style=" width:100%;">
			</image>
			<view style="position: absolute;top: 59%; left: 35%;">
					<view class="tuiguangCode">
						<text style="text-align: center;">{{tuiguangCode}}</text>
					</view>
			</view>
			<view>
				<view style="top: 64%; left: 30%;position: absolute;">
					<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit"  :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
				</view> 
			</view>
			<view class="buttonsave" @click="saveImg">
				保存到相册
			</view>
		</view>
	<!-- 	<view style="background-color: #3f2edf;height:30px">
			sdssdfs
		</view> -->
	</view>
	<!-- <view>
		<view class="bg_png">
			
		</view>
	</view> -->
</template>
<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
export default {
	data() {
		return {
			ifShow: true,
			val: '服务异常', // 要生成的二维码值
			size: 300, // 二维码大小
			unit: 'upx', // 单位
			background: '#b4e9e2', // 背景色
			foreground: '#ccc', // 前景色
			pdground: '#4B56C0', // 角标色
			icon: '../../../static/logo.png', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' ,// 二维码生成后的图片地址或base64
			tuiguangCode:'',
			windowHeight: ''  ,//定义手机屏幕高度值变量
		}
	},
	onReady() {
		 var _me = this;
		 //	plus.webview.create("url","id", {contentAdjust:false});
		     uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
		         success: function(res) { 
		            
		             _me.windowHeight = res.windowHeight+5 + 'px';
					 console.log(11111111111111111)
		             console.log('手机屏幕高度为' + _me.windowHeight);
					 console.log(11)
		         }
		     });
	},
	onLoad(option) {
		console.log(option.code)
		this.tuiguangCode=option.code
		this.val='https://www.nmgyf.com.cn/iallm/index.html?code='+option.code+''
	},
	methods: {
		saveImg(){
			this.$refs.qrcode._saveCode()
		
		},
		sliderchange(e) {
			this.size = e.detail.value
		},
		creatQrcode() {
			this.$refs.qrcode._makeCode()
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode()
		},
		qrR(res) {
			this.src = res
		},
		clearQrcode() {
			this.$refs.qrcode._clearCode()
			this.val = ''
		},
		ifQrcode() {
			this.ifShow = !this.ifShow
		},
		selectIcon() {
			let that = this
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function (res) {
					that.icon = res.tempFilePaths[0]
					setTimeout(() => {
						that.creatQrcode()
					}, 100);
					// console.log(res.tempFilePaths);
				}
			});
		}
	},
	components: {
		tkiQrcode
	},
	
}
</script>

<style>
/* @import "../../../common/icon.css"; */
.bg_png{
	
	background-image: url(/static/img/invite.png);
	    height: 80upx;
	    background-repeat: no-repeat;
	    background-size: 100%;
}
.imglist{
	position: relative;	
}
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.qrimg {
    padding-top: 20upx;
    padding-left: 200upx;
}
.qrimg1{
	padding-top: 20upx;
	padding-left: 200upx;
}
.qrimg-i{
	margin-right: 10px;
}

slider {
	width: 100%;
}

input {
	width: 100%;
	margin-bottom: 20upx;
}

.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}

button {
	width: 100%;
	margin-top: 10upx;
}
.buttonsave{
    width: 42%;
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 88.5%;
	margin-top:40upx;
    z-index: 999;
    left: 29%;
    font-size: 36upx;
    background: linear-gradient(left, #fbe777,#f7cb46);
    border-radius: 70upx;
    line-height: 74upx;
    color: #774019;
	font-weight:700;
}
.tuiguangCode{
    font-size: 40upx;
    color: #4b56c0;
    font-weight: 700;
	 /* padding-left: 216upx; */
}
.img_mode{
	
}
uni-page-wrapper{
	background: #3e2dde !important;
}
</style>
