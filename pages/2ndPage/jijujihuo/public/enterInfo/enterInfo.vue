<template>
	<view>
		<view class="mar_bt"></view>
		<view class="form_body">
			 <view class="form_list">
				<view class="list_left">
					商户名称
				</view>
				<view class="list_right" style=" display: flex; ">
					  <input class="list_input" style=" flex: 1; " @input="keyBusinessname" :value="Businessname" maxlength="30" placeholder="请填写商户名称" />
					   <text class="icon_i" @click="cardmsgPhotos" >&#xe653;</text>
				</view>
			</view>
		 <view class="form_list">
				<view class="list_left">
					营业执照号
				</view>
				<view class="list_right">
					 
					  <input class="list_input"  @input="keylicenumBusiness" :value="licenumBusiness" maxlength="30" placeholder="请填写营业执照号" />
				</view>
			</view> 
			
			<view class="form_list">
				<view class="list_left">
					营业执照类型
				</view>
				<view class="list_right">
					   <picker @change="bindPickerChange" :value="LicenTypesindex" :range="LicenTypes">
							 <view class="list_input">{{LicenTypes[LicenTypesindex]}}</view>
						 </picker>
					 <!-- <input class="list_input" @input="KeyLicenTypes"  :value="LicenTypes" maxlength="11" placeholder="请填写营业执照类型" /> -->
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					营业执照有效期
				</view>
				<view class="list_right">
					  <picker mode="date" :value="periodLicence" :start="startDate" :end="endDate" @change="bindDateChange">
						 <view class="list_input">{{periodLicence}}</view>
					 </picker>
					  <!-- <input class="list_input" @input="KeyperiodLicence"  :value="periodLicence" maxlength="11" placeholder="请填写营业执照有效期" /> -->
				</view>
			</view>
			
			<view class="form_list">
				<view class="list_left">
					经营范围
				</view>
				<view class="list_right" style="color:#888;">
					  <input class="list_input" :value="MccData.value" maxlength="20" placeholder="点击选择" disabled="" @click="select()" style="font-size:28upx"/>
				</view>
				<view style=" width: 10%; text-align: center;line-height: 100upx">
					<text class="icon_4">&#xe769;</text>
				</view>
				
			</view>
			
			<view class="form_list">
				<view class="list_left">
					法人姓名
				</view>
				<view class="list_right">
					 
					  <input class="list_input"@input="KeylegalName"  :value="legalName" maxlength="15" placeholder="请填写法人姓名" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					法人电话
				</view>
				<view class="list_right">
					 
					  <input class="list_input" type="number" @input="KeyteleCor"  :value="teleCor" maxlength="15" placeholder="请填写法人电话" />
				</view>
			</view>
			
			<view class="form_list">
				<view class="list_left">
					是否法人结算
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx;color: #A0A0A0; ">
					  <view :class="faPeople? '':'font-color'" style="width: 50%;text-align: right;" @click="faren(0)">是</view>
					  <view :class="faPeople? 'font-color':''" style=" flex: 1;text-align: center;" @click="faren(1)">否</view>
				</view>
			</view>
		</view>
		<view class="mar_bt"></view>
			<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					结算方式
				</view>
				<view class="list_right" style=" display: flex;line-height: 100upx; color: #A0A0A0;  ">
					  <view :class="jszqData=='T1'? 'font-color':''" style="width: 50%;text-align: right;" @click="jszq('T1')" >T1</view>
					  <view :class="jszqData=='D1'?'font-color':''" style=" flex: 1; text-align: center;" @click="jszq('D1')">D1</view>
				</view>
			</view>
			
		<!-- 	<view class="form_list" v-show="jszqData=='D1'">
				<view class="list_left">
					工作日当日结算
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx; ">
					  <view :class="workJS?'':'font-color'" style="width: 50%;text-align: right;" @click="workfunc(0)">关闭</view>
					  <view :class="workJS?'font-color':''"  style=" flex: 1; text-align: center; " @click="workfunc(1)">开启</view>
				</view>
			</view>
			<view class="form_list" v-show="jszqData=='D1'">
				<view class="list_left">
					节假日次日结算
				</view>
				<view class="list_right"style=" display: flex; line-height: 100upx; ">
					  <view class="" :class="sunJS?'':'font-color'" style="width: 50%;text-align: right;" @click="sunfunc(0)">关闭</view>
					  <view class="" :class="sunJS?'font-color':''" style=" flex: 1; text-align: center; " @click="sunfunc(1)">开启</view>
				</view>
			</view> -->
			
		</view>
				<view style="height:100upx;">		
				</view>
		<view class="bottom_add" @click="infor">
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
				faPeople:false,
				jszqData:'T1',
				workJS:false,
				sunJS:false,
				MccData:'',
				Businessname:'',//商户名称
				licenumBusiness:'',//营业执照号
				LicenTypes: ['企业', '个人工商户'],
				LicenTypesindex: 0,
				LicenTypescode:'business',//business 企业 p_business个人工商户
				periodLicence:currentDate,//执照有效期
				legalName:'',//法人姓名
				teleCor:'',//法人电话
				dataFrom:'',
				QYpicturePath:'',//营业照
			};
		},
		 computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		onShow() {
			this.MccData=uni.getStorageSync('MccData')
			console.log(this.MccData)
		},
 		onLoad(option) {
 			this.dataFrom=JSON.parse(option.dataFrom);
 			console.log(JSON.parse(option.dataFrom));
 		},
		methods:{
			  bindDateChange: function(e) {
            this.periodLicence = e.target.value
        },
		  bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            this.LicenTypesindex = e.target.value
					if(e.target.value=='0'){//business 企业 p_business个人工商户
						this.LicenTypescode='business'
					}else{
						this.LicenTypescode='p_business'
					}
		        },
		getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 5;
            } else if (type === 'end') {
                year = year + 60;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        },
			keyBusinessname:function(event){this.Businessname = event.target.value},
 			keylicenumBusiness:function(event){this.licenumBusiness = event.target.value},
			KeyLicenTypes:function(event){this.LicenTypes=event.target.value},
			KeyperiodLicence:function(event){this.periodLicence = event.target.value},
			KeylegalName:function(event){this.legalName = event.target.value},
 			KeyteleCor:function(event){this.teleCor = event.target.value},
			faren(index){
				if(index==0){
					this.faPeople=false;
				}else{
					this.faPeople=true;
				}
			},
			jszq(index){
				this.jszqData=index;
			},
			workfunc(index){
				if(index==0){
					this.workJS=false;
				}else{
					this.workJS=true;
				}
			},
			sunfunc(index){
				if(index==0){
					this.sunJS=false;
				}else{
					this.sunJS=true;
				}
			},
// 			infor(){
// 				uni.navigateTo({
// 					url: '../informationRate/informationRate'
// 				});
// 			},
			select(){
				uni.navigateTo({
					url: '../../selectJINY/selectJINY'
				});
			},
			infor(){
				if(this.Businessname==''||this.licenumBusiness==''||this.LicenTypescode==''||this.periodLicence==''||this.legalName==''||this.teleCor==''||this.MccData==""){
					var that=this;
					uni.showToast({
					    title: '请填写完整后再提交',
					    duration: 2000,
						icon:'none',
					});
					
				}else{
					
					this.dataFrom.QYpicturePath=this.QYpicturePath;
					this.dataFrom.isLegalSettle=this.faPeople;
					this.dataFrom.mercName=this.Businessname;
					this.dataFrom.busLicenseNo=this.licenumBusiness;
					this.dataFrom.mercType=this.LicenTypescode;
					this.dataFrom.busLicenseValidityPeroid=this.periodLicence;
					this.dataFrom.legalPerson=this.legalName;
					this.dataFrom.legalPhone=this.teleCor;
					this.dataFrom.customMccType=this.MccData.customCode;//行业类别 "C00001"
					this.dataFrom.mcc=this.MccData.num;//商户mcc 5094
					//this.dataFrom.bizScope=this.MccData.value;//营业范围 "就餐场所和餐馆"
					this.dataFrom.bizScope=this.MccData.mccType;//Mcc类型 "BZ"
					this.dataFrom.settleWay=this.jszqData;//结算周期
					this.dataFrom.workJS=this.workJS;//工作当日结算
					this.dataFrom.sunJS=this.sunJS;//节假日次日结算
					console.log(this.dataFrom)
					uni.navigateTo({
						 url: "../informationRate/informationRate?dataFrom="+ encodeURIComponent(JSON.stringify(this.dataFrom))
						// url: "../informationRate/informationRate"
					});
				}
				
			},
			cardmsgPhotos(){
				var that=this;
				uni.showModal({
				    title: '提示',
				    content: '请准备拍摄营业执照',
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
				            				url: "https://www.nmgyf.com.cn/primary/api/v1/uploadlicense",
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
				            						that.QYpicturePath=DATAall.data.picturePath;
				            						that.licenumBusiness=DATAall.data.busLicenseNo;
				            						that.legalName=DATAall.data.legalPerson;
				            						that.Businessname=DATAall.data.mercName;
													that.periodLicence=DATAall.data.busLicenseValidityPeroid;
													
				            						
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
			
			},
			
		}
	}
</script>

<style>
		.icon_i{
				font-family: iconfont;
				color: #EDB315;
				font-size: 48upx;
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
	width: 31%;
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
.icon_4{
			font-family: iconfont;
			font-size: 24upx;
			color: #A0A0A0;
			padding-left: 4upx;
}
</style>
