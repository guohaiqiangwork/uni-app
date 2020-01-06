<template>
				<view class="e_x">
					<view class="e_b" v-for="(item,index) in dataList" :key="index" >
						<view class="e_l">
							<view class="e_t">
							运营收益 -	{{item.platform}}
							</view>
							<view class="e_d">
								{{item.paytime}}
							</view>
						</view>
						<view class="e_r">
							+{{item.money.toFixed(3)}}
						</view>
					</view>
					
				
				</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[
					{"day": "31"},
					{"day": "30"},
					{"day": "29"},
					{"day": "28"},
					{"day": "27"},
					{"day": "26"},
					{"day": "25"},
					{"day": "24"},
					{"day": "23"},
					{"day": "22"},
				],  
			}
		},
		onLoad() {
			this.$http.get('/api/v1/selectOperate', {userid: uni.getStorageSync('id')}).then(res => {
			
				if(res.data.resultCode==200){
					this.dataList=res.data.data.shareProfits
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
			
		},
		
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
	width: 75%;
	height:140upx;
}
.e_t {
	padding-left:40upx;
	font-size:30upx;
	line-height:104upx;
}
.e_t {
	padding-left:40upx;
	font-size:30upx;
	line-height:100upx;
	height:70upx;
}
.e_d {
	padding-left: 40upx;
	font-size:30upx;
	color:#a6a6a6;
	line-height: 74upx;
	height: 70upx;
}
.e_r {
	flex: 1;
	line-height:146upx;
	font-size: 20px;
    font-weight: 700;
}
</style>