<template>
				<view class="e_x">
					<view class="e_b" v-for="(item,index) in imgList" :key="index" >
						<view class="e_l">
							<view class="e_t">
								{{item.platform}}{{item.name}} {{item.type=='0'?'分润收益':item.type=='1'?'激活收益':'其他收益'}} 
							</view>
							<view class="e_d">
								{{item.paytime}}
							</view>
						</view>
						<view class="e_r">
							+{{item.money.toFixed(2)}}
						</view>
					</view>
					
				
				</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[
				
				],  
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.$http.get('/api/v1/selectProductByDay', {userid: uni.getStorageSync('id'),platform:option.platform,name:option.name,starttime:option.time}).then(res => {
					if(res.data.resultCode==200){
					this.imgList=res.data.data.shareProfits;
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
			
		}
	}
</script>

<style>
.e_x {
	background-color: #fff;
}
.e_b {
	background-color: #fff;
	display: flex;
	padding-left: 6upx;
	border-bottom: 1px solid #eee;
}
.e_l {
	width: 70%;
	height:140upx;
}
.e_t {
	padding-left:30upx;
	font-size:30upx;
	line-height:104upx;
}
.e_t {
	padding-left:60upx;
	font-size:30upx;
	line-height:100upx;
	height:70upx;
}
.e_d {
	padding-left: 60upx;
	font-size:30upx;
	color:#a6a6a6;
	line-height: 74upx;
	height: 70upx;
}
.e_r {
	flex: 1;
	line-height:146upx;
	font-size: 34upx;
    /* font-weight: 700; */
	text-align: right;
	padding-right: 60upx;
}
</style>