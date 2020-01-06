<template>
	<view  class="page">
		<headX></headX>
		
		<view class="imglist" v-for="(item, index) in datalist" :key="item.value" @click="selectproduct(index)" >
			<image :src="item.introducepicture" mode="widthFix" style=" width: 100%;" lazy-load="true"></image>
		</view>
		<!-- <view class="imglist">
			<image src="../../static/img/1035.png" mode="widthFix" @click="selectproduct" style=" width: 100%;"></image>
		</view> 
		<view class="imglist">
			<image src="../../static/img/1036.png" mode="widthFix" style=" width: 100%;"></image>
		</view> -->
		
	</view>
</template>

<script>
	import headX from '@/components/header/header';
	export default {
		data() {
			return {
				datalist:''
			}
		},
		components: {headX },
		onShow() {
			this.$store.commit('TITLE','产品中心')
			var that=this;
			this.$http.get('/api/v1/getCommodity', {id: uni.getStorageSync('id')}).then(res => {
				
				if(res.data.resultCode==200){
					that.datalist=res.data.data.commodity
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
			 selectproduct(index){
				 var data=this.datalist[index]
				 console.log(data)
				 uni.navigateTo({
				 	url: '../2ndPage/selectproduct/selectproduct?id='+data.id+'&pic='+data.detailspicture+''
				 });
			 },
		}
	}
</script>

<style>
.imglist{
	margin: 36upx 7%;
    width: 86%;
}
</style>
