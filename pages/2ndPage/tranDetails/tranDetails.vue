<template>
	
		<view>
			<view class="e_b" v-for="(item,index) in dateList" :key="index" style="background-color: #FFFFFF;" v-if="dateList!=''" @click="resultsFinout(index)">
				<view class="e_l">
					<view class="e_t">
						{{item.source}}
					</view>
					<view class="e_d">
					 {{item.time}}
					</view>
				</view>
				<view class="e_r">
					￥{{item.amount}}
				</view>
			</view>
			
		<view v-if="dateList==''">
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
				startTime:'',
				endTime:'',
				payType:'',
				cardType:'',
				dateList:'',
			}
		},
		onLoad(option) {
			this.startTime=option.startTime
			this.endTime=option.endTime
			this.payType=option.payType
			this.cardType=option.cardType
			var that=this;
			this.$http.get('/api/v1/getTradeDetailRecord', {userId: uni.getStorageSync('id'),startTime:this.startTime,endTime:this.endTime,payType:this.payType,cardType:this.cardType}).then(res => {
				if(res.data.resultCode==200){
					this.dateList=res.data.data;
					console.log(this.dateList)
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
		},
		methods: {
			
		}
	}
</script>

<style>
.e_b {
	background-color: #fff;
	display: flex;
	padding-left: 6upx;
	border-bottom: 1px solid #eee;
}
.e_l {
	width: 50%;
	height:140upx;
}
.e_t {
	padding-left:70upx;
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
	font-size: 17px;
	text-align: right;
    padding-right: 60upx;
}
</style>
