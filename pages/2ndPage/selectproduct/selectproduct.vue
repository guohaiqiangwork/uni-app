<template>
	<view>
		<view class="imglist">
			<image :src="pic" mode="widthFix" style=" width: 100%;will-change: transform"></image>
		</view>
		<view style="100upx"></view>
		
		<view class="bottom_add">
			<view class="fixed_btm" @click="ljsq">
				立即申请 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				pic:'../../../static/img/112.png'
			}
		},
		onLoad(option) {
			 console.log(option)
			this.id=option.id
			this.pic=option.pic
		},
		methods: {
			ljsq(){
				 uni.navigateTo({
					url: '../../2ndPage/selectproduct/ljsq/ljsq?chanpinId='+this.id+''
				});
			}
		}
	}
</script>

<style>

.bottom_add{
	height: 130upx;
	background: #f2f2f205;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
}
</style>
