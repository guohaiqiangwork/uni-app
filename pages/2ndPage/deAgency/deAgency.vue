<template>
	<view>
		<!-- head -->
		<view class="head_card">
			<view class="head_bottom">
			<view class="head_one">
				<!-- 上面内容 -->
				<view class="card_top">
					<view class="card_one" >
						<image :src="dataList.user.avatar" style="border-radius: 50%;">
						</image>
					</view>
					<view class="card_two">
						<view class="two_top">
							<view class="two_left">
								{{dataList.user.name}}
							</view>
							<view class="two_right">
								<image :src="'../../../static/img/vip'+dataList.user.level+'.png'"></image>
							</view>
							</view>
						<!-- <view class="two_bottom">
							{{dataList.user.phone}}
						</view> -->
					</view>
					<view class="card_three">
						<view class="three_left" @click="takephone">
							<text class="icon_4">&#xe63c;</text>
						</view>
						<view class="three_right" @click="takeMsg">
							<text class="icon_4">&#xe64d;</text>
						</view>
					</view>
				</view>
				<!-- 下面内容 -->
				<view class="head_second">
					<view class="second_one">
						<view class="t_l_top">
							{{dataList.all.allMoney}}
						</view>
						<view class="t_l_bottom">
							总交易额(万元)
						</view>
					</view>
					<view class="second_two">
						<view class="t_l_top">
							{{dataList.all.allGetMoney}}
						</view>
						<view class="t_l_bottom">
							总收益(元)
						</view>
					</view>
					<view class="second_three">
						<view class="t_l_top">
								{{dataList.all.terminals}}
						</view>
						<view class="t_l_bottom">
							库存
						</view>
					</view>
				</view>
			</view>
			</view>
		</view>
		<!-- body -->
		<view class="de_b_z">
			<view class="b_first">
				<view class="b_first_left">
					当日总交易额（万）
				</view>
				<view class="b_first_right">
					<text class="b_t_one">	{{dataList.money}}</text>
				</view>
			</view>
			<view class="b_first">
				<view class="b_first_left">
					机具库存（台）
				</view>
				<view class="b_first_right">
					<text class="b_t_one">已激活{{dataList.ter.activation}} </text>/<text class="b_t_w"> 未激活{{dataList.ter.notactive}}</text>
				</view>
			</view>
			<view class="b_first">
				<view class="b_first_left">
					团队人数（人）
				</view>
				<view class="b_first_right">
					{{dataList.teamUsers}}
				</view>
			</view>
			<view class="b_first">
				<view class="b_first_left">
					加盟时间
				</view>
				<view class="b_first_right">
					{{dataList.user.createtime.slice(0,10)}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:{"all":{"allMoney":"0.00","allGetMoney":"0.00","terminals":"0"},"ter":{"notactive":"0","activation":"0"},"teamUsers":"2","money":"0.00","user":{"createtime":"2019-06-20 ","level":"1","name":"未知","phone":"15598481942",}},
			}
		},
		onLoad(option) {
			console.log(option.forUserid)
			var that=this;
			this.$http.get('/api/v1/selectTeamMessage', {userid: option.forUserid,id:uni.getStorageSync('id')}).then(res => {

					if(res.data.resultCode==200){
						that.dataList=res.data.data;
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
			takephone(){
				uni.makePhoneCall({
					phoneNumber: this.dataList.user.phone, 
				});
			},
			takeMsg(){
				var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [this.dataList.user.phone];
				msg.body = '';
				plus.messaging.sendMessage(msg);
			}
		}
	}
</script>

<style>
	.head_one{
		width: 91%;
		margin: 4.5% 4.5% 3% 4.5%;
		height: 280upx;
		background-color: #ffffff;
		border-radius: 3%;
	}
	.card_top {
		width:93%;
		display:flex;
		height:140upx;
		line-height: 140upx;
		border-bottom: 1px solid #f0f0f0;
		margin:0 3%;
	}
	.card_one {
		width:17%;
		height:140upx;
		line-height:200upx;
		margin-left:20upx;
	}
	.card_one image{
		width:84upx;
		height:84upx;
	}
	.card_two {
		width:53%;
	}
	.two_top {
		height:70upx;
		display: flex;
	}
	.two_left {
		height:132upx;
		line-height:132upx;
		font-size:30upx;
		white-space:nowrap;     
        word-break:keep-all;     
        overflow:hidden;     
        text-overflow:ellipsis;   
	}
	.two_right {
		padding-left: 10upx;
		height:142upx;
		line-height:142upx;
	}
	.two_right image {
		width:88upx;
		height:30upx;
		
	}
	.two_bottom {
		height:34upx;
		/* line-height: 34upx; */
		font-size:32upx;
	}
	.card_three {
		flex:1;
		display: flex;
	}
	.three_left {
		width:55%;
		/* height:140upx;
		line-height:140upx; */
		padding-left:30upx;
	}
	.three_right {
		flex: 1;
	}
	.head_second{
		display:flex;
		height:140upx;
	}
	.second_one{
		width:33%;
		height:140upx;
		text-align:center;
	}

	.second_two {
		width:35%;
		height:140upx;
		text-align:center;
	}
	.second_three {
		flex: 1;
		height:70px;
		text-align:center;
	}
	.t_l_top{
		font-size:36upx;
	    height: 80upx;
		line-height:80upx;
		color: #121826;
	}
	.t_l_bottom{
		font-size: 26upx;
        height: 60upx;
        line-height: 30upx;
		color:#A5A5A5;
		font-weight: 200;
	}
	.de_b_z {
		background-color: #FFFFFF;
		height:356upx;
	}
	.b_first{
		width:88%;
		margin: 0 6%;
		display:flex;
		height:90upx;
		line-height:90upx;
		border-bottom: 1px solid #f0f0f0;
	}
	.b_first_left{
		width:50%;
		font-size:28upx;
	}
	.b_first_right{
		flex:1;
		text-align:right;
		font-size: 28upx;
	}
	.b_t_one{
		color:#121826;
	}
	.b_t_w {
			color:#FF6740;
	}
	.icon_4{
		font-family: iconfont;
		font-size: 56upx;
		color: #EDB315;
	}
</style>
