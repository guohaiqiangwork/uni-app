import Request from './request'

const http = new Request();
let token=uni.getStorageSync('token')
http.setConfig((config) => { /* 设置全局配置 */
	if(process.env.VUE_APP_PLATFORM === 'h5')　　　　　　　　　　
	{　　　　　
		config.baseUrl = '/dep';　　　　　　　　　　　　　　　　　　　　　　　　　
		//console.log('开发环境H5')　　　　　　　　　　　　　　　　
	}else{　
		//config.baseUrl = 'http://47.105.108.144:8080/primary';　
		config.baseUrl = 'https://www.nmgyf.com.cn/primary';　　　　　　　　　　　　　　　　　　　　　
		//console.log('生产环境APP')　　 　　　　　　　　　　　　　　
	}　　　　　　
	config.header = {
		//token: token,
	}
	
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		token: uni.getStorageSync('token'),
		...config.header 
	}
	 // uni.showLoading({
	 //     title: '加载中'
	 // });
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response);
	 // uni.hideLoading();
	if(response.statusCode=='200'){
		
		if(response.data.resultCode=='401'){
			 uni.setStorageSync('token', '');
			 uni.switchTab({
				url: '/pages/my/my'
			 });
			// 	uni.showModal({
			// 	title: '提示',
			// 	content: response.data.message,
			// 	showCancel:false,
			// 	success: function (res) {
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 			uni.navigateTo({
			// 				url: '../login/login'
			// 			});
			// 		} 
			// 	}
			// });
		}
		return response;
	}else{
			uni.showToast({
			title: '系统错误，请稍后再试！',
			icon:'none',
			duration: 1500,
			position:'top',
		}); 
		uni.stopPullDownRefresh();  //停止下拉刷新动画
	}
	
})
export {
	http
};


