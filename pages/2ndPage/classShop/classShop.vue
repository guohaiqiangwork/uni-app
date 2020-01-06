<template>
	<view>
		
		<view class="shopbox">
				<view class="shopShow" v-for="(item, index) in integrallist" @click="deCom(index)">
				<view class="inline_one">
					<view class="inline_left">
						<image :src="item.smallpicture" mode="widthFix" style="width:336upx;height: 320upx;" lazy-load="true"></image>
					</view>
				</view>
				<view class="haolishow" >
					<view class="text_flex">
						<view class="t_f_l">
							{{item.name}} 
							
						</view>
					</view>
				</view>
				<view class="jifen">
					<view class="text_flex">
							<view class="bottom_shuzi_left">{{item.price}}</view>
							
							<view class="bottom_shuzi_right">积分</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integrallist:'',
			};
		},
		onLoad(option){
			this.type=option.type;
			this.$http.get('/api/v1/classification', {userid: uni.getStorageSync('id'),type:this.type}).then(res => {	
					this.integrallist = res.data.data.integralCommodities;
					
				}).catch(err => {
				})
		},
		methods:{
			deCom(e){
				var that = this;
// 				console.log(this.integrallist[e])
// 				console.log(this.integrallist[e].userid)
				uni.navigateTo({
					url: '../deCommodity/deCommodity?id='+this.integrallist[e].id+''
				});
			}
			
			
			
			}
	}
</script>

<style>
.shopbox{
		margin: 0 4%;
		width: 92%;
		padding-top:30upx;
	}
.shopShow{
		width: 49%;
		display: inline-block;
		background: #fff;
		border: 1px solid #fafafa;
	}
.inline_one{
		display:flex;
		height:340upx;
	}
.inline_left{
		width:50%;
	}
.text_flex{
		display:flex;
		height: 60upx;
	}
.t_f_l{
		height:86upx;
		color:#3A3B41;
		padding: 2px 6px 0 0;
		overflow: hidden;  
		text-overflow: ellipsis;  
		white-space: nowrap;/**不换行**/
		font-size: 12px;
	}
.jifen{
		height:40upx;
		margin-bottom:20upx;
	}
.bottom_flex_left{
		display:flex;
		height:40upx;
	}
.bottom_shuzi_left{
	color:#DB953A;
	font-size:40upx;
	height:40upx;
	line-height: 40upx;
		
	}
.bottom_shuzi_right{
		height: 20px;
		line-height: 25px;
		color: #DB953A;
		margin-left: 2px;
		}
</style>
