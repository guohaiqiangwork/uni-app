<template>
	<view>
		<view class="touxiang">
			<!-- <image src="../../../static/logo.png" mode="scaleToFill" style="width: 150upx; height: 150upx;border-radius: 50%;" @click="changaAvatar"></image> -->
			 <avatar selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url" avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;"></avatar>
			<!-- <text>更换头像</text> -->
			
		</view>
		<view class="mar_bt"></view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					用户昵称
				</view>
				<view class="list_right">
					 <input class="list_input" @input="userName" maxlength="7" :value="userNames"  placeholder="用户昵称" />
				</view>
			</view>
			<!-- <view class="form_list">
				<view class="list_left">
					性别
				</view>
				<view class="list_right">
					 <input class="list_input"  @input="sex"  placeholder="性别" />
				</view>
			</view> -->
		</view>
		
		 <view class="bottom_add">
			<view class="fixed_btm" @click="changepersonMsg">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import avatar from "../../../components/yq-avatar/yq-avatar.vue";
	export default {
		 components: {
           avatar
        },
		data() {
			return {
				 url:'../../../static/logo.png',//展示图
				 urls:'',//存储图
				 userNames:'',
				 sexs:''
			}
		},
		onLoad(option) {
			this.url=option.avatar;
			this.userNames=option.name;
			if(option.avatar.indexOf("http")!= -1){
				//console.log(option.avatar.split("img/"))
				this.urls=option.avatar.split("img/")[1];
				//console.log(option.avatar.split("img/")[1])
			}
			
		},
		methods: {
			userName(event){
			 this.userNames= event.target.value 
			},
			// sexs(event){
			//  this.sex= event.target.value 
			// },
			changepersonMsg(){
				 if(this.urls==''||this.userNames==''){
					uni.showToast({ 
					title: '请先填写完整信息',
					icon:'none',
					duration: 2000,
					position:'top',
					})
					return false;
				}
				var that=this;
				//console.log(this.url)
				this.$http.get('/api/v1/updateUserMessage', {name: this.userNames,avatar: this.urls,id: uni.getStorageSync('id')}).then(res => {
						uni.showToast({ 
						title: res.data.message,
						icon:'none',
						duration: 2000,
						position:'top',
						});
						if(res.data.resultCode==200){
							uni.navigateBack({
							    delta: 1
							});
						}else{
							 
							
						}
					}).catch(err => {
					 
					})
			},
			 myUpload(rsp) {
                this.url = rsp.path; //更新头像方式一
				console.log(rsp)
				uni.showLoading({ 
					title: '上传中'
				});  
                //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
				 uni.uploadFile({ 
					url: "https://www.nmgyf.com.cn/primary/api/v1/upload",
					filePath: rsp.path,
					name: 'file',
					success: (uploadFileRes) => {  
					    uni.hideLoading();
						console.log(uploadFileRes);
						console.log(uploadFileRes.data);
						this.urls=uploadFileRes.data;
							
					},  
				}) 
            }
		}
	}
</script>

<style>
.touxiang{
	width: 1000upx;
	height: 260upx;
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}
.form_body{
	background: #fff;
}
.form_list{
	width: 97%;
	display: flex;
	margin-left: 3%;
	border-bottom: 1px solid #eee;
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
</style>
