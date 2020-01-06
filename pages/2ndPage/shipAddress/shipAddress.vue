<template>
	<view>
		<!-- <view class="sh_list" >
			<view class="sh_top">
				<view class="top_main">
					<view class="top_name">
						李龙
					</view>
					<view class="top_phone">
						18526547302
					</view> 
					<view class="top_morn"> 
						默认
					</view>
				</view>
				<view class="top_addr">
					地址巴拉巴拉
				</view>
			</view> 
			<view class="sh_bottom">
					<text @click="edit(index)">编辑</text>
			</view>
		</view> -->
		
		<!-- 收货地址list -->
		<view class="">
			<view class="sh_list" v-for="(item, index) in items" :key="item.value" @click="selectadd(index)">
				<view class="sh_top">
					<view class="top_main">
						<view class="top_name">
							{{item.name}}
						</view>
						<view class="top_phone">
							{{item.phone}}
						</view> 
						<view class="top_morn" v-show="item.status==true"> 
							默认
						</view>
					</view>
					<view class="top_addr">
						{{item.area}}-{{item.address}}
					</view>
				</view> 
				<view class="sh_bottom" @click="edit(index)">
					<text style="width: 70%;">编辑</text>
				
				</view>
			</view>
		</view>
		
		<view v-if="items==''">
			<view style="margin: 20% 0 ;display: flex;align-items: center;justify-content: center;" >
				<image src="../../../static/img/nomore2.png" mode="aspectFit" ></image>
			</view>
		</view>
		
		<view style="height: 150upx;">
			
		</view>
		<!-- 底部添加收货地址 -->
			<view class="bottom_add">
				<view class="fixed_btm" @click="addAddr">
					添加新地址
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
			  items:'',
			  current: 0,
			  sign:''//其它页面传来的标识
			}
		},
		onShow() {
			this.onloadList()
		},
		onLoad(option) {
			this.sign=option.sign;//ljsqSelectaddr
		},
		methods: {
			addAddr(){
				if(this.sign=='ljsqSelectaddr'){
					uni.navigateTo({ 
						url: '../addNewAddr/addNewAddr?sign=ljsqNewaddr'
					});
				}else{
					uni.navigateTo({ 
						url: '../addNewAddr/addNewAddr'
					});
				}
				
			},
		selectadd(index){
			if(this.sign=='ljsqSelectaddr'){
				console.log(this.items[index])  
				var data=this.items[index];
				uni.redirectTo({ 
					url: "../selectproduct/ljsq/ljsq?sign=ljsqSelectaddr&id="+data.id+""
				}); 
			}
		},
		 radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
		onloadList(){
			this.$http.get('/api/v1/selectUserAddress', {userid: uni.getStorageSync('id')}).then(res => {
				
				if(res.data.resultCode==200){
					this.items=res.data.data.address;
				}else if(res.data.resultCode==400){
					//有误
					uni.showToast({
					title: res.data.message,
					icon:'none',
					duration: 2000,
					position:'top',
					});
				}
			this.submitSate=false;
			}).catch(err => {
			this.submitSate=false;
			})
		},
		edit(index){//,name,phone,area,address,status
			 console.log(this.items[index])  
			 var data=this.items[index];
			uni.navigateTo({
				url:"../editAddr/editAddr?id="+data.id+"&name="+data.name+"&phone="+data.phone+"&area="+data.area+"&address="+data.address+"&status="+data.status+""
			})
		}
		} 
	}
</script>

<style>
	.icons{
		font-weight: 400;
		margin-left: 0;
	}
.fixed_btm{
	height: 100upx;
	margin-top: 15upx;
	margin-left: 5%;
	background: #121826;
	border-radius: 50upx;
	text-align: center;
	line-height: 100upx;
	color: #EDB315; 
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
.sh_list{
	display: flex;
	width: 94%;
	margin: 30upx 3% 0;
	background: #fff;
	border-radius: 10upx;
	padding-bottom: 20upx;
}
.sh_top{
	height: 140upx;
	margin: 0 3%;
	width: 70%;
}
.sh_bottom{
	height: 52upx;
    margin: 44upx 3%;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    line-height: 44upx;
    border-left: 1px solid #ccc;
    font-size: 28upx;
    color: #888;
}
.top_main{
	height: 75upx;
	line-height: 90upx;
	display: flex;
}
.top_name{
	font-weight: 700;
	font-size: 32upx;
}
.top_phone{
	font-size: 28upx;
	margin: 0 15upx;
	color: #666;
}
.top_morn{
	font-size: 18upx;
	background: #ff6740;
	border-radius: 12upx;
	height: 30upx;
    line-height: 30upx;
    padding: 0 6upx;
    color: #fff;
	margin-top: 28upx;
}
.top_addr{
	font-size: 26upx;
}
</style>
