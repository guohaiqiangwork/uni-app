<template>
	<view>
		<view class="sendTo">
			<view class="send_l">
				{{username}}
			</view>
			<view style="width:20%;text-align: center;">
				<text class="icon_4" style="width: 60upx; height: 26upx;line-height: 100upx;">&#xe603;</text>
				<!-- <image src="../../../static/img/jiantou.png" mode="scaleToFill" style="width: 60upx; height: 26upx;line-height: 100upx;"></image> -->
			</view>
			<view class="send_r">
				{{lowerUserName}}
			</view>
		</view>
		 
		<!-- 调拨原因 -->
		<view class="db_body">
			<view class="db_reason">
				调拨原因
			</view>
			 <view class="uni-textarea">
                <textarea placeholder-style="color:#d6d4d4;font-size:14px" placeholder="请填写调拨原因" @blur="bindTextAreaBlur"/>
            </view>
		</view>
		
		<!-- 机具列表 -->
		<view class="xjdl">
			机具列表 <text style="font-size: 24upx;color: #007AFF;padding-left: 30upx;font-weight: 400;">*只可调拨未激活机具</text>
		</view>
		<view class="mac_cont" >
			<view >
				  <checkbox-group @change="checkboxChange">
				    <label  v-for="item in items" :key="item.id" style=" display: flex; border-top: 1px solid #eeee; " >
						<view  class="check_y">
						     <checkbox :value="item.id"  :checked="item.checked" />
						 </view>
						<view class="check_text">
							 <view>机具名称<text>{{item.platform}} {{item.name}}</text></view>
							 <view>机具编号<text>{{item.terminalnum}}</text></view>
						</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view style="height: 200upx;">
		</view>
		<view class="bottom_add">
			<view class="fixed_btm" @click="confirSoon">
				立即调拨 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 items: '',
				lowerUserID:'',
				lowerUserName:'',
				username:'',
				checkboxedlist:'',
				reason:'',
            }
		},
		onLoad(option) {
			this.lowerUserID=option.id;
			this.lowerUserName=option.name;
			this.username=uni.getStorageSync('userName')
		},
		onShow() {
			this.$http.get('/api/v1/getTerminal', {userid: uni.getStorageSync('id'),status:'0',platform:'',name:'',times:'0'}).then(res => {
				if(res.data.resultCode=='200'){
				this.items=res.data.data.terminals;
				}else{
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
		 bindTextAreaBlur: function (e) {
            this.reason=e.detail.value
			},
			  checkboxChange: function (e) {
				  console.log(e)
				  this.checkboxedlist=e.detail
    //             var items = this.items,
    //                 values = e.detail.value;
				// 	
    //             for (var i = 0, lenI = items.length; i < lenI; ++i) {
    //                 const item = items[i]
    //                 if(values.includes(item.value)){
    //                     this.$set(item,'checked',true)
    //                 }else{
    //                     this.$set(item,'checked',false)
    //                 }
				// 	console.log(item.checked)
    //             }
				// console.log(items)
            },
			confirSoon(){
				console.log(this.items)
				if(this.checkboxedlist==''){
					uni.showToast({
						title: '请选择需要调拨的机具',
						icon:'none',
						duration: 1500,
						position:'top',
					});
					return false;
				}
				var implementid=JSON.stringify(this.checkboxedlist.value).replace(/"/g,"");
				//console.log(implementid)
				implementid=implementid.replace(/]/g,"")
				implementid=implementid.replace(/[&\|\\\*^%[#@\-]/g,"")
				//console.log(typeof(implementid))
				console.log(implementid)
				//return false
				this.$http.get('/api/v1/reviewTransfer', {olduserid: uni.getStorageSync('id'),userid:this.lowerUserID,status:'0',reason:this.reason,userterminalid:implementid}).then(res => {
					if(res.data.resultCode=='200'){
						uni.redirectTo({ 
							//url: '../confirmState/confirmState'
							url:"../confirmState/confirmState?listData=" + encodeURIComponent(JSON.stringify(res.data.data.transfer))
						});
					}else{
						uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 2000,
						position:'top',
						});
					}
				}).catch(err => {
				
				})
				
			}
		}
	}
</script>

<style>
.sendTo{
	height: 100upx;
    font-weight: 700;
    line-height: 100upx;
    display: flex;
    background: #fff;
}
.send_l{
    width: 40%;
    text-align: right;
    line-height: 55px;
   /* padding-right: 38upx; */
}
.send_r{
	flex: 1;
	line-height: 55px;
    /* padding-left: 60upx; */
}
.db_body{
	padding-bottom: 15px;
    background: #fff;
    margin-top: 12px;
}
.db_reason{
	height:80upx;
    line-height: 80upx;
    width: 100%;
    padding-left: 5%;
    font-size: 28upx;
	font-weight:700;
}
.uni-textarea{
	height: 100px;
    border: 1px solid #ccc;
    width: 86%;
    margin: 0 5%;
    padding: 2%;
    border-radius: 9px;
}
.xjdl{
	height: 100upx;
    background: #fff;
    line-height: 100upx;
    padding: 0 30upx;
    font-weight: 700;
    font-size: 30upx;
	margin-top: 24upx;
}
.mac_cont{
	width: 100%;
    background: #fff;
    font-size: 14px;
}
.check_y{
    
    width: 5%;
    margin-top: 5%;
    margin-left: 5%;
}
uni-checkbox-group{
	display: inline-block;
	width: 100%;
}
.check_text{
	line-height: 35px;
    padding: 0 15px;
}
.check_text text{
	padding-left: 40upx;
	color: #888;
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
.icon_4{
		font-family: iconfont;
		font-size: 68upx;
		color: #4B56C0;
		font-weight: 400;
	}
</style>
