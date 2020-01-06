<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					持卡人
				</view>
				<view class="list_right">
					 
					  <input class="list_input" @input="KeycardPeole" disabled="" :value="cardPeole" maxlength="15" placeholder="持卡人姓名" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					卡号
				</view>
				<view class="list_right" style=" display: flex; ">
					  <input class="list_input" @input="KeycardNo" style=" width: 85%; " :value="cardNo" maxlength="30" placeholder="填写卡号" />
					  <text class="icon_i" @click="cardmsgPhotos">&#xe653;</text>
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					手机号
				</view>
				<view class="list_right">
					 
					  <input class="list_input" type="number" @input="KeycardPhone"  :value="cardPhone" maxlength="11" placeholder="银行预留手机号" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					所在银行
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeycardBank"  :value="cardBank" maxlength="15" placeholder="填写所在银行" />
				</view>
			</view>

			<view class="form_list">
				<view class="list_left">
					开户省份
				</view>
				<view class="list_right">
					 <picker @change="ProvPicker" :value="Proindex" :range="ProvList" mode="selector">
						<view class="list_input">{{ProvList[Proindex]}}</view>
					 </picker>
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					开户城市
				</view>
				<view class="list_right">
					 <picker @change="CityPicker" :value="Cityindex" :range="CityList" mode="selector">
					 						<view class="list_input">{{CityList[Cityindex]}}</view>
					 </picker>
				</view>
			</view>
	<!-- 		<view class="form_list">
				<view class="list_left">
					开户支行
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeycardBankAddr"  :value="cardBankAddr" maxlength="15" placeholder="填写开户行" />
				</view>
			</view> -->
			<!-- <view class="form_list">
				<view class="list_left">
					开户行行号
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeycBAnum"  :value="cBAnum" maxlength="20" placeholder="填写开户行行号" />
				</view>
			</view> -->

		</view>
		<view class="bottom_add">
			<view class="fixed_btm" @click="next">
				下一步 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataFrom:'',//需要提交next页数据
				cardPeole:uni.getStorageSync('realname'),//持卡人
				cardNo:'',//卡号
				cardPhone:'',//手机号
				cardBank:'',//所在银行
				cardBankAddr:'未知',//开户行
				//cBAnum:'',//开户行行号
				//cardCity:'',//开户城市
				ProvList:[],
				ProvListid:[],
				Proindex:4,//默认内蒙古包头
				CityList:[],
				CityListid:[],
				Cityindex:1,//默认内蒙古包头
			};
		},
		onLoad(option) {
			this.dataFrom=JSON.parse(option.dataFrom)
			console.log(JSON.parse(option.dataFrom))
			this.$http.get('/api/v1/selectCityCode',{code:''}).then(res => {
				if(res.data.resultCode==200){
					//this.ProvList=res.data.data.city;
					for (var i=0;i<res.data.data.city.length;i++) {
						this.ProvList.push(res.data.data.city[i].label);
						this.ProvListid.push(res.data.data.city[i].value);
					}
					this.$http.get('/api/v1/selectCityCode',{code:this.ProvListid[this.Proindex]}).then(res => {
						if(res.data.resultCode==200){
							for (var i=0;i<res.data.data.city.length;i++) {
								this.CityList.push(res.data.data.city[i].label);
								this.CityListid.push(res.data.data.city[i].value);
							}
						}else{}
					}).catch(err => {})
				
				}else{
					
				}
			}).catch(err => {
			
			})
		},
		methods:{
			KeycardPeole:function(event){this.cardPeole = event.target.value},
			KeycardNo:function(event){this.cardNo = event.target.value},
			KeycardPhone:function(event){this.cardPhone = event.target.value},
			KeycardBank:function(event){this.cardBank = event.target.value},
			KeycardBankAddr:function(event){this.cardBankAddr = event.target.value},
			//KeycBAnum:function(event){this.cBAnum = event.target.value},
			//KeycardCity:function(event){this.cardCity = event.target.value},
			ProvPicker(e){
				  this.Proindex = e.target.value;
				  this.CityList.length=0
				  this.CityListid.length=0
				  this.$http.get('/api/v1/selectCityCode',{code:this.ProvListid[this.Proindex]}).then(res => {
				  	if(res.data.resultCode==200){
				  		for (var i=0;i<res.data.data.city.length;i++) {
				  			this.CityList.push(res.data.data.city[i].label);
				  			this.CityListid.push(res.data.data.city[i].value);
				  		}
				  	}else{}
				  }).catch(err => {})
			},
			CityPicker(e){
				  this.Cityindex = e.target.value;
				 
			},
			next(){
				if(this.cardPeole==''||this.cardNo==''||this.cardPhone==''||this.cardBank==''||this.cardBankAddr==''||this.cBAnum==''||this.cardCity==''){
					uni.showToast({
					    title: '请填写完整后再提交',
					    duration: 2000,
						icon:'none',
					});
				}else{
					this.$http.get('/api/v1/selectBankCode',{name:this.cardBank}).then(res => {
						if(res.data.resultCode==200){
							if(res.data.data.bank.length==1){
								this.dataFrom.cardPeole=this.cardPeole;
								this.dataFrom.accNum=this.cardNo;
								this.dataFrom.phoneShow=this.cardPhone;
								this.dataFrom.bankNameBranch=this.cardBankAddr;
								//this.dataFrom.cBAnum=this.cBAnum;
								this.dataFrom.bankCardProvCode=this.ProvListid[this.Proindex];
								this.dataFrom.bankCardCityCode=this.CityListid[this.Cityindex];
								
								this.dataFrom.bankName=""+res.data.data.bank[0].bankNo+","+res.data.data.bank[0].bankName+","+res.data.data.bank[0].bankLinkNo+""
								console.log(this.dataFrom)
								uni.navigateTo({
									url: "../businessMsg/businessMsg?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
								});
							}else{
								uni.showToast({
								    title: '请填写正确的银行名称',
								    duration: 2000,
									icon:'none',
								});
							}
						}else{}
					}).catch(err => {})
					
					
				}
				
			},
			cardmsgPhotos(){
				var that=this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    //sourceType: ['album'], //从相册选择
				    success: function (res) {
						//that.uploadimg1=res.tempFilePaths[0]
						uni.showLoading({
								title: '上传中'
						});  
							uni.uploadFile({
								url: "https://www.nmgyf.com.cn/primary/api/v1/uploadBase",
								//url:"http://192.168.1.110/upload",
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {  
								    uni.hideLoading();
									console.log(uploadFileRes);
									console.log(JSON.parse(uploadFileRes.data));
									var DATAall=JSON.parse(uploadFileRes.data)
									//that.uploadFileimg1=uploadFileRes.data;
									if(DATAall.resultCode==200){
										that.cardNo=DATAall.data.bankCard;
										that.cardBank=DATAall.data.bankName;
										that.cardBankAddr=DATAall.data.bankName;
										
									}else{
										uni.showToast({
										    title: DATAall.message,
										    duration: 2000,
											icon:'none',
										});
									}
										
								},  
							}) 
				    }
				});
			},
		}
	}
</script>

<style>
.icon_i{
		font-family: iconfont;
		color: #EDB315;
		font-size: 42upx;
		margin-left: 10upx;
		height: 100upx;
		line-height: 100upx;
	}
.form_body{
	background: #fff;
}
.form_list{
	width: 97%;
	display: flex;
	margin-left: 3%;
	border-bottom: 1px solid #fafafa;
}
.list_left{
	height: 100upx;
	line-height: 100upx;
	width: 23%;
	text-align: left;
	padding-left: 5upx;
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
.uni-list::before{
	background-color: #fafafa;
}
.uni-list::after{
	background-color: #fafafa;
}
</style>
