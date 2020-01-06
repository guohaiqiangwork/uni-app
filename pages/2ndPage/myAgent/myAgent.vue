<template>
	<view class="bgc">
		<!-- head -->
	
		<view class="m_h_top">
			<view class="h_left">
				<view class="left_top">
					{{monTot}}
				</view>
				<view class="left_bottom">
					当月总额(万元)
				</view>
			</view>
			<view class="h_right">
				<view class="left_top">
					{{agenMy}}
				</view>
				<view class="left_bottom">
					新增人数(人)
				</view>
			</view>
	</view>

	<!-- body -->
	<view class="b_l">
	<view class="b_one" v-for="(item,index) in dataList" :key="index"  @click="angentDy(index)">
		<view class="one">
			<image :src="item.avatar" mode="" style="border-radius: 50%;"></image>
		</view>
		<view class="two">
			<view class="two_top">
				{{item.name}}
			</view>
			<view class="two_bottom">
				团队总计<text class="t_s">{{item.users}}</text>人
			</view>
		</view>
		<view class="three">
			|
		</view>
		<view class="four">
			月总额<text class="t_s">{{item.teamMoney.toFixed(2)}}</text>万元
			
		</view>
		
		<view class="five">
			<view class="new_z" v-if="item.isnew==1">
				<view class="hot_r">
					新
				</view>
			</view> 
			<image :src="'../../../static/img/vip'+item.level+'.png'"></image>
		</view>
		
	</view>
	</view>
	
	<view v-if="dataList==''">
		<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
			<image src="../../../static/img/zanwuzhiying.png" mode="aspectFit" ></image>
		</view>
	</view>
	
	<!-- 页尾 -->
	<view class="p_c_g" v-if="dataList!=''">
			{{talNum}}位直营
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:'',
				monTot:'0.00',
				agenMy:'0',
				talNum:'0',
			}
		},
		onLoad(){
			var that=this;
			this.$http.get('/api/v1/selectTeam', {userid: uni.getStorageSync('id')}).then(res => {
					
					if(res.data.resultCode==200){
						 this.monTot =res.data.data.money.toFixed(2);
						 this.talNum =res.data.data.junior;
						 this.agenMy =res.data.data.newUser;
						 this.dataList =res.data.data.juniors;
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
			angentDy(e){
				var data=this.dataList[e];
				console.log(data)
				uni.navigateTo({ 
					url: '../deAgency/deAgency?forUserid='+data.id
				});
			}
		}
	}
</script>

<style>
.m_h_top {
	height: 210upx;
	display: flex;
	background-color: #fafafa;
}
.h_left {
	width: 50%;
	/* padding-left: 20upx; */
	background-image: url('../../../static/img/2.png');
	height: 220upx;
	line-height: 140upx;
	background-repeat: no-repeat;
	background-size: 89%;
	background-position: 32upx 22upx;
}
.h_right {
	flex: 1;
	background-image: url('../../../static/img/1.png');
	height: 220upx;
	line-height: 140upx;
	background-repeat: no-repeat;
	background-size: 89%;
	background-position: 10upx 22upx;
}
.left_top {
	color:#FFFFFF;
	height: 100upx;
	line-height: 174upx;
	text-align: center;
	font-size: 30upx;
}
.left_bottom {
	color:#FFFFFF;
	height: 100upx;
	line-height: 60upx;
	text-align: center;
	font-size: 26upx;
	}
.b_l {
	background-color: #FFFFFF;
	/* height:400upx; */
}
.b_one {
	display: flex;
	color:#000000;
	height: 124upx;
	border-bottom: 1px solid #f0f0f0;
	width:90%;
	margin:0 5%;
}
.one {
	width: 14%;
	height: 100upx;
	line-height: 188upx;
}
.one image {
	width: 85upx;
	height: 85upx;
	line-height:80upx;
}
.two {
	width: 32%;
}
.two_top {
	height:50upx;
	line-height: 76upx;
	font-size: 26upx;
}
.two_bottom {
	height:50upx;
	line-height: 66upx;
	font-size: 24upx;
}
.t_s {
	color:#121826;
	padding-left: 12upx;
	padding-right: 12upx;
	font-size: 30upx;
}
.three {
	width: 6%;
	height: 100upx;
	line-height: 160upx;
	color:#121826;
}
.four {
	width:35%;
	height: 100upx;
	line-height: 160upx;
	font-size:24upx;
}
.new_z{
    width: 17px;
    background-color: #ff7f5f;
    height: 17px;
    position: absolute;
    top: 8px;
    left: -27px;
    line-height: 17px;
    font-size: 12px;
}
.hot_r {
	color:#F0F0F0;
	text-align: center;
}
.five {
	flex:1;
	height: 100upx;
	line-height: 78upx;
	position: relative;
}
.five image {
	width: 86upx;
	height: 30upx;
}
.p_c_g {
	height:70upx;
	line-height:70upx;
	width:100%;
	bottom:44upx;
	position:absolute;
	text-align: center;
	font-size: 15px;
	color: #C6C6C6;
}

</style>
