<template>
	<view>
		<view class="top-white">
			<view class="shouyin">￥{{price}}</view>
		</view>
		<view>
			<view class="top_two">支付方式</view>
		</view>
		<view class="top_three" style="border-bottom: 1px solid rgba(238,248,238,1);" v-for="(item,index) in providerList"  :key="index" @click="selectindex(index)">
			<view class="icon_4 top_three_right" :class="item.id=='alipay'?'icon_color1':'icon_color2'">{{item.id=='alipay'?'&#xe60d;':'&#xe607;'}}</view>
			<view class="top_three_left">{{item.name}}支付</view>
			<view class="icon_4 top-right">{{index==forindex?'&#xe611;':''}}</view>
		</view>
		 
		 <template v-if="providerList.length > 0">
		    <button  class="fixed_btm"  type="primary" @click="requestPayment()"
		        :loading="loading">{{Payname}}支付￥{{price}}</button>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				channel:null,
				providerList: [],
				price:'0.00',
				dataid:'',
				Payname:'',
				loading:false,
				forindex:'0'
			}
		},
		onLoad(option) {
			this.dataid=option.id;
			this.price=option.paymoney;
			
			
			 // #ifdef APP-PLUS
			uni.getProvider({
			    service: "payment",
			    success: (e) => {
			        console.log("payment success:" + JSON.stringify(e));
			        let providerList = [];
			        e.provider.map((value) => {
			            switch (value) {
			                case 'alipay':
			                    providerList.push({
			                        name: '支付宝',
			                        id: value,
			                        loading: false
			                    });
			                    break;
			                case 'wxpay':
			                    providerList.push({
			                        name: '微信',
			                        id: value,
			                        loading: false
			                    });
			                    break;
			                default:
			                    break;
			            }
			        })
			        this.providerList = providerList;
					console.log(this.providerList)
					// 初始化
					this.Payname=this.providerList[0].name;
			    },
			    fail: (e) => {
			        console.log("获取支付通道失败：", e);
			    }
			});
			// #endif
		

		},
		methods: {
			selectindex(index){
				this.forindex=index;
				this.Payname=this.providerList[index].name;
			},
			async requestPayment() {
				var that=this;
			    this.loading = true;
			    let orderInfo = await this.getOrderInfo(that.providerList[that.forindex].id);
			    console.log("得到订单信息", orderInfo);
			    // if (orderInfo.statusCode !== 200) {
			    //     console.log("获得订单信息失败", orderInfo);
			    //     uni.showModal({
			    //         content: "获得订单信息失败",
			    //         showCancel: false
			    //     })
			    //     return;
			    // }
			    uni.requestPayment({
			        provider:that.providerList[that.forindex].id,
			        orderInfo: orderInfo,
			        success: (e) => {
			            console.log("success", e);
			            uni.showToast({
			                title: "支付成功!"
			            })
						uni.reLaunch({
							url: '../finishDD/finishDD?id='+that.dataid
						});
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            uni.showModal({
			                content: "支付失败!" ,
			                showCancel: false
			            })
			        },
			        complete: () => {
			            this.loading = false;
			        }
			    })
			},
			 getOrderInfo(e) {
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
				var  userid=uni.getStorageSync('id');
				//let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
			    return new Promise((res) => {
			        // uni.request({
			        //     url: url,
			        //     success: (result) => {
			        //         res(result);
			        //     },
			        //     fail: (e) => {
			        //         res(e);
			        //     }
			        // })
					if(e=='alipay'){
						this.$http.get('/api/v1/alipay', {userid: userid,id:this.dataid}).then(result => {
							
							if(result.data.resultCode=='200'){
								res(result.data.message)
							}else{
								uni.showToast({
								title: result.data.message,
								icon:'none',
								duration: 2000,
								position:'top',
								});
							}
						}).catch(err => {
						
						})
					}else if(e=='wxpay'){
						this.$http.get('/api/v1/wxpay', {userid: userid,id:this.dataid}).then(result => {
							console.log(result)
							if(result.data.resultCode=='200'){
								res(result.data.data)
							}else{
								uni.showToast({
								title: result.data.message,
								icon:'none',
								duration: 2000,
								position:'top',
								});
							}
						}).catch(err => {
						
						})
					}
					
			    })
			},
		}
	}
</script>

<style>
.fixed_btm{
	font-size: 28upx;
}
.top-white {
	background-color: #ffffff;
}
.shouyin{
	color:#4B56C0;
	text-align:center;
	font-size:44upx;
	line-height:120upx
}
.top_two{
	padding-left:40upx;
	font-size:32upx;
	line-height:86upx;
}
.top_three{
	display:flex;
	background-color: #ffffff;
}
.icon_4{
	font-family: iconfont;
    font-size: 40upx;
    
    padding-left: 2px;
	}
.icon_color1{
	color: #00a1e9;
}
.icon_color2{
	color: #6bcc03;
}
.top_three_right{
	padding-left:60upx;
	width:9%;	
	line-height:90upx;
}
.top_three_left{
	width: 70%;
	font-size:26upx;
	line-height:90upx;
}
.top-right {
	color:#4B56C0;
	line-height:90upx;
	
}
</style>
