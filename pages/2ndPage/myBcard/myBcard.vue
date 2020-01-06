<template>
	<view>
		<view class="bcard" v-for="(item,index) in datalist" :key="index">
			<view class="addbcard"  :style="{backgroundImage:'url(../../../static/img/' +(item.bankCode) + '.png)'}">
				<view class="f_center_icon">
					<view class="f_center_icon_left">
					<view class="left_top">
						{{item.bankName}}
					</view>	
					<view class="left_bottom">	
						{{item.cardTypeName}}
					</view>
					</view>
					<view class="f_center_icon_right" >
					**** {{item.cardno.substr(item.cardno.length-4)}}
					</view>
				</view>
			</view>
		</view>
		

		
		<view class="bottom_x">
			<view class="fixed_btm blue_border" @click="addMycard">
				<text class="icon_4">&#xe61f;</text>添加银行卡
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:'',
			}
		},
		onShow() {
			this.$http.get('/api/v1/selectbankcard', {userid: uni.getStorageSync('id')}).then(res => {
				
				if(res.data.resultCode==200){
					this.datalist=res.data.data.bankCards;
				}else if(res.data.resultCode==400){
					//有误
				uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 1500,
					position:'top',
				});
				}
			}).catch(err => {
			})
			
		},
		methods: {
			addMycard(){
				uni.navigateTo({ 
					url: '../addCrad/addCrad'
				});
			},
			
		}
	}
</script>

<style>
	.bcard{
		padding-top: 20upx;
	}
	.addbcard{
		width: 92%;
		margin: 0 4%;
		height: 240upx;	
		/* background-image: url('../../../static/img/工商银行.png'); */
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.f_center_icon{
		display:flex;
	}
	.f_center_icon_left{
		width:40%;
		color:#ffffff;
		margin-left:140upx;
	}
	.left_top{
    font-size: 34upx;
    line-height: 136upx;
    height: 98upx;
}
	.left_bottom {
	line-height: 28upx;
    height: 72upx;

	}
	.f_center_icon_right {
		flex:1;
		color:#ffffff;
		font-size:34upx;
		text-align: right;
		line-height: 144upx;
		margin-right: 50upx;
	}
	.icon_4{
		width:40%;
		font-family: iconfont;
		font-size: 36upx;
		color: #ffffff;
		padding-right: 4upx;
		text-align: right;
		color: #EDB315;
		}
	.bottom_x{
		height: 130upx;
		background: #fafafa;
		width: 100%;
		position: fixed;
		bottom: 0; 
		left: 0%;
		width: 100%;
		z-index: 99;
	}
	.blue_border{
		display:flex;
		color:#EDB315;
		font-size:30upx\;
	}

</style>
