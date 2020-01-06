<template>
	<view>
		<!-- 兑换好礼 -->
			<view class="shopHot">
				<view style="width:7%;height:40upx;line-height:40upx">
				<view class="yellow_line">
				</view>
				</view>
				<view class="exchange">
					搜索	“{{namevalue}}”结果
				</view>
			</view>
			<!-- 商品展示 -->
				<view class="shopbox">
				<view class="shopShow" v-for="(item, index) in shoplist" @click="todec(item.id)">
				<view class="inline_one">
					<view class="inline_left">
						<image :src="item.smallpicture" mode="widthFix" style="width:336upx;height: 320upx;" ></image>
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
				shoplist:'',
				namevalue:'',
			}
		},
		onLoad(option) {
			this.namevalue=option.name;
			this.$http.get('/api/v1/selectCommodityByName', {userid: uni.getStorageSync('id'),name:option.name}).then(res => {
			 this.shoplist = res.data.data.integralCommodities;		
			}).catch(err => {
				
			})
		},
		methods: {
			todec(e){
				uni.navigateTo({
					url: '../../2ndPage/deCommodity/deCommodity?id='+e
				});	
			},
		}
	}
</script>

<style>
.shopHot{
		width: 98%;
		margin: 6px 1%;
		padding-top:40upx;
		display:flex;
	}
	.yellow_line{
	    width: 6upx;
		font-size: 34upx;
		background: rgba(219,160,0,1);
		height: 30upx;
		margin-left: 32upx;
	}
	.exchange{
		flex:1;
		height:40upx;
		line-height:30upx;
		color:rgba(23,29,38,1);
		font-weight:700;
		font-size: 30upx;
	}
	.seeMore{
		flex:1;
		color:#3A3B41;
		height:40upx;
		line-height:28upx;
		text-align: right;
		padding-right: 32upx;
	}
	.integralChange{
	width:90%;
	padding:0 5%;
	}
	.jifenex{
		height:162upx;
		width:670upx;
		background: #161C26;
		opacity:1;
		border-radius:30upx;
		display:flex;
	}
	.flex_left{
		width:28%;
		padding:16upx 0 0 18upx;
	}
	.jifen_flex_right{
		flex:1;
	}
	.right_top{
		color:white;
		height:92upx;
		line-height:76upx;
		font-size:30upx;
	}
	.f_r_bottom{
		width:264upx;
		height:52upx;
		background:rgba(123,68,5,1);
		border-radius:22px;
		color:#FFFFFF;
		display:flex;
	}
	.right_bottom{
		height:68upx;
		line-height:54upx;
	}
	.f_r_b_left{
		width:17%;
		padding-left:6upx;
		color: rgba(255,219,145,1);
		height:68upx;
		line-height:72upx;
	}
	.f_r_b_center {
		flex:1;
		font-size:36upx;
		padding-left:8upx;
	}
	.f_r_b_right{
		width:60%;
		color:#FFFFFF;
		font-size:20upx;
		padding-top:2upx;
		padding-left: 2px;
	}
	.shopbox{
		margin: 0 4%;
		width: 92%;
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
	.inline_right{
		flex:1;
		text-align: right;
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
	.t_f_r{
		flex:1;
		height:100upx;
		color:#3A3B41;
		text-align: left;

	}
	.bottom_flex_left{
		display:flex;
		height:40upx;
	}
	.bottom_flex_right{
		flex:1;
		display:flex;
		height:40upx;
		line-height: 40upx;
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
	.jifen{
		height:40upx;
		margin-bottom:20upx;
	}
</style>
