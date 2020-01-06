<template>
	<view>
		<view class="e_b e_x" v-for="(item,index) in dataList" :key="index">
			<view class="e_l">
				<view class="e_t">
					{{item.cname}}-{{item.payMethod}}
				</view>
				<view class="e_d">
					{{item.createTime}}
				</view>
			</view>
			<view class="e_r">
				{{item.paymoney.toFixed(2)}}
			</view>
		</view>
		
		<view v-if="dataList==''" >
			<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
				<image src="../../../static/img/nomore2.png" mode="aspectFit" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				starttime:'',
				endtime:'',
				dataList:'',
			}
		},
		onLoad(option){
			if(this.starttime!='undefined'){
				this.starttime=option.startTime
				this.endtime=option.endTime
			}
			
			this.$http.get('/api/v1/selectPayList', {userid: uni.getStorageSync('id'),starttime:this.starttime,endtime:this.endtime}).then(res => {
			
					if(res.data.resultCode==200){
						this.dataList=res.data.data.Order;
						this.paymoney=res.data.data.Order.paymoney;
					}else if(res.data.resultCode==400){
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
	text-align: right;
    padding-right: 60upx;
}

</style>
