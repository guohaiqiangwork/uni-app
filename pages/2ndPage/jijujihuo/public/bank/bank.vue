<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					账户类型
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx;color:#A0A0A0 ">
					
					  <view :class="Zh?'':'font-color'" style="width: 50%;text-align: right;" @click="zhlx(0)">对公</view>
					  <view :class="Zh?'font-color':''" style=" flex: 1; text-align: center;" @click="zhlx(1)">对私</view>
				
				</view>
			</view>
		</view>
		<view class="mar_bt"></view>
			<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					账户名
				</view>
				<view class="list_right" style=" display: flex; ">
					  <input class="list_input"  style=" width: 85%; " @input="KeycardPeole" :value="cardPeole" maxlength="30" placeholder="填写账户名" />
					 <!--  <text class="icon_i" @click="cardmsgPhotos(1)" v-show="Zh==false">&#xe653;</text> -->
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					开户账号
				</view>
				<view class="list_right"  style=" display: flex; ">
					  <input class="list_input"style=" width: 85%; " @input="KeycardNo" :value="cardNo" maxlength="30" placeholder="填写开户账号" />
					<text class="icon_i" @click="cardmsgPhotos(2)" v-show="Zh==true">&#xe653;</text>
				</view>
			</view>
		<!-- 	<view class="form_list">
				<view class="list_left">
					卡有效期
				</view>
				<view class="list_right">
					<picker mode="date" :value="bankcardIdCardValidityPeroid" :start="startDate" :end="endDate" @change="bindDateChange">
											 <view class="list_input">{{bankcardIdCardValidityPeroid}}</view>
					</picker>
				</view>
			</view> -->
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
	<!-- 		<view class="form_list">
				<view class="list_left">
					开户支行
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeycardBankAddr"  :value="cardBankAddr" maxlength="50" placeholder="填写开户行" />
				</view>
			</view> -->
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
			<view class="form_list">
				<view class="list_left">
					开户区
				</view>
				<view class="list_right">
					 <picker @change="AreaPicker" :value="Areaindex" :range="AreaList" mode="selector">
					 						<view class="list_input">{{AreaList[Areaindex]}}</view>
					 </picker>
				</view>
			</view>
	<!-- 		<view class="form_list">
				<view class="list_left">
					开户行行号
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeycBAnum"  :value="cBAnum" maxlength="20" placeholder="填写开户行行号" />
				</view>
			</view> -->
			
		</view>
		 
		 	<view class="mar_bt"></view>
		<!-- 		<view class="form_body">
		 		<view class="form_list">
		 			<view class="list_left">
		 				账户类型
		 			</view>
		 			<view class="list_right"style=" display: flex; line-height: 100upx; ">
						
		 				  <view :class="Zh?'':'font-color'" style="width: 50%;text-align: right;" @click="zhlx(0)">对公</view>
		 				  <view :class="Zh?'font-color':''" style=" flex: 1; text-align: center;" @click="zhlx(1)">对私</view>
		 			
					</view>
		 		</view>
		 	</view> -->
		
		
		<view class="bottom_add" @click="infoEnter">
			<view class="fixed_btm">
				下一步 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				//bankcardIdCardValidityPeroid:currentDate,卡有效期
				Zh:false,
				dataFrom:'',//需要提交next页数据
				cardPeole:'',//持卡人
				cardNo:'',//卡号
				cardPhone:'',//手机号
				cardBank:'',//所在银行
				cardBankAddr:'未知',//开户zhi行
				BANKpicturePath:'',//银行卡img路径
				//cBAnum:'',//开户行行号
				// cardCity:'',//开户城市
				ProvList:[],
				ProvListid:[],
				Proindex:4,//默认内蒙古包头
				
				CityList:[],
				CityListid:[],
				Cityindex:1,//默认内蒙古包头
				
				AreaList:[],
				AreaListid:[],
				Areaindex:1,//默认内蒙古包头
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
							this.$http.get('/api/v1/selectCityCode',{code:this.CityListid[this.Cityindex]}).then(res => {
								if(res.data.resultCode==200){
									for (var i=0;i<res.data.data.city.length;i++) {
										this.AreaList.push(res.data.data.city[i].label);
										this.AreaListid.push(res.data.data.city[i].value);
									}
									
									}else{}
									}).catch(err => {})
							}else{}
					}).catch(err => {})
				}else{}
				
			}).catch(err => {
			
			})
		},
		computed: {
		       startDate() {
		           return this.getDate('start');
		       },
		       endDate() {
		           return this.getDate('end');
		       }
		   },
		methods:{
			// bindDateChange: function(e) {
			//     this.bankcardIdCardValidityPeroid = e.target.value
			// },
			cardmsgPhotos(e){
				var that=this;
				console.log(e)
			if(e==2){//对私 拍银行卡
			uni.showModal({
			    title: '提示',
			    content: '请准备拍摄银行卡',
			    success: function (res) {
			        if (res.confirm) {
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
			          						that.BANKpicturePath=DATAall.data.picturePath;
			          						
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
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
				
			}else{//对公拍许可证
			uni.showModal({
			    title: '提示',
			    content: '请准备拍摄开户许可证',
			    success: function (res) {
			        if (res.confirm) {
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
			          				url: "https://www.nmgyf.com.cn/primary/api/v1/uploadPublicBankCard",
			          				filePath: res.tempFilePaths[0],
			          				name: 'file',
			          				success: (uploadFileRes) => {  
			          				    uni.hideLoading();
			          					console.log(uploadFileRes);
			          					console.log(JSON.parse(uploadFileRes.data));
			          					var DATAall=JSON.parse(uploadFileRes.data)
			          					//that.uploadFileimg1=uploadFileRes.data;
			          					if(DATAall.resultCode==200){
			          						that.cardNo=DATAall.data.bankid;
			          						that.cardBank=DATAall.data.bankname;
			          						that.cardBankAddr=DATAall.data.branchname;
			          						that.BANKpicturePath=DATAall.data.picturePath;
											that.cardPeole=DATAall.data.name;
											
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
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
				
			}
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			},
			KeycardPeole:function(event){this.cardPeole = event.target.value},
			KeycardNo:function(event){this.cardNo = event.target.value},
			KeycardPhone:function(event){this.cardPhone = event.target.value},
			KeycardBank:function(event){this.cardBank = event.target.value},
			KeycardBankAddr:function(event){this.cardBankAddr = event.target.value},
			//KeycBAnum:function(event){this.cBAnum = event.target.value},
			KeycardCity:function(event){this.cardCity = event.target.value},
			infoEnter(){
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
								//this.dataFrom.bankcardIdCardValidityPeroid=this.bankcardIdCardValidityPeroid;
								
									this.dataFrom.BANKpicturePath=this.BANKpicturePath;
									this.dataFrom.accType=this.Zh;
									this.dataFrom.accName=this.cardPeole;
									this.dataFrom.accNum=this.cardNo;
									this.dataFrom.bankcardPhone=this.cardPhone;
									this.dataFrom.cardBank=this.cardBank;
									this.dataFrom.bankNameBranch=this.cardBankAddr;
									//this.dataFrom.bankCode=this.cBAnum;
									this.dataFrom.cardCity=this.cardCity;
									this.dataFrom.bankProvCode=this.ProvListid[this.Proindex];
									this.dataFrom.bankCityCode=this.CityListid[this.Cityindex];
									this.dataFrom.bankAreaCode=this.AreaListid[this.Areaindex];
									this.dataFrom.bankName=""+res.data.data.bank[0].bankNo+","+res.data.data.bank[0].bankName+","+res.data.data.bank[0].bankLinkNo+""
									console.log(this.dataFrom)
									uni.navigateTo({
										url: "../enterInfo/enterInfo?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
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
			zhlx(index){
				this.cardPeole='';
				this.cardNo='';
				this.cardPhone='';
				this.cardBank='';
				this.cardBankAddr='未知';
				this.BANKpicturePath='';
			
				if(index==0){
					this.Zh=false;
				}else{
					this.Zh=true;
					this.cardPeole=uni.getStorageSync('realname');//持卡人
				}
			},
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
				  this.AreaList.length=0
				  this.AreaListid.length=0
				  this.$http.get('/api/v1/selectCityCode',{code:this.CityListid[this.Cityindex]}).then(res => {
				  	if(res.data.resultCode==200){
				  		for (var i=0;i<res.data.data.city.length;i++) {
				  			this.AreaList.push(res.data.data.city[i].label);
				  			this.AreaListid.push(res.data.data.city[i].value);
				  		}
				  	}else{}
				  }).catch(err => {})
			},
			AreaPicker(e){
				this.Areaindex = e.target.value;
			}
// 			infoEnter(){
// 				uni.navigateTo({
// 					url: '../enterInfo/enterInfo'
// 				});
// 			},
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
	width: 92%;
	display: flex;
	margin: 0 4%;
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
	color: #353535;
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
