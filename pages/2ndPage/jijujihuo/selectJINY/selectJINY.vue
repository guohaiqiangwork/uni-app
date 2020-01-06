<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list" v-for="(item,index) in dataList" :key="index" @click="returnPage(index)">
				<view class="list_left">
					{{item.value}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:'',
			};
		},
		onLoad() {
			this.$http.get('/api/v1/selectMcc').then(res => {
				if(res.data.resultCode==200){
					this.dataList=res.data.data.mcc;
				}else{
					
				}
			}).catch(err => {
			
			})
		},
		methods:{
		returnPage(index){
			var data=this.dataList[index];
			uni.setStorageSync('MccData', data);
			uni.navigateBack({
				delta: 1,
				animationType: 'pop-out',
				animationDuration: 200
			});
		},
			
		}
	}
</script>

<style>
.icon_4{
		font-family: iconfont;
		font-size: 24upx;
		color: #A0A0A0;
		padding-left: 4upx;
	}
.form_body{
	background: #fff;
}
.form_list{
	width: 97%;
	display: flex;
	margin-left: 3%;
	border-bottom: 1px solid #eee;
}
.list_left{
	height: 100upx;
	line-height: 100upx;
	width: 90%;
	text-align: left;
	padding-left: 5upx;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
}
.list_right{
	
	flex: 1;
	
}
.list_input{
	height: 100upx;
	line-height: 100upx;
}
.fixed_btm{
	height: 100upx;
	margin-top: 15upx;
	margin-left: 5%;
	background: #4B56C0;
	border-radius: 50upx;
	text-align: center;
	line-height: 100upx;
	color: #fff; 
	width: 90%;
}
.bottom_add{
	height: 130upx;
	background: #fafafa;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
}
.uni-list::before{
	background-color: #fafafa;
}
.uni-list::after{
	background-color: #fafafa;
}
</style>
