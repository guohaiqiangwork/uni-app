<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS 
			// 锁定屏幕方向   123
			plus.screen.lockOrientation('portrait-primary'); //锁定
			console.log(plus.runtime.appid)
			console.log(plus.runtime.version)
			console.log(plus.device.imei)
			// 检测升级
			this.$http.get('/api/v1/isUpdateApp', {appid: plus.runtime.appid,version: plus.runtime.version,imei: plus.device.imei}).then(res => { 
				console.log('success', res);
				if (res.statusCode == 200 && res.data.data.flag=='true') {
				let openUrl = plus.os.name === 'iOS' ? res.data.data.iOS : res.data.data.Android;
				// 提醒用户更新
				uni.showModal({
					title: '更新提示',
					content:  '是否选择更新?',
					success: (showResult) => {
						if (showResult.confirm) {
							plus.runtime.openURL(openUrl);
						}
					}
				})
			}
			}).catch(err => {
			
			})
			// 检测升级
			// uni.request({
			// 	url: 'isUpdateApp', //检查更新的服务器地址
			// 	data: {
			// 		appid: plus.runtime.appid,
			// 		version: plus.runtime.version,
			// 		imei: plus.device.imei
			// 	},
			// 	success: (res) => {
			// 		console.log('success', res);
			// 		if (res.statusCode == 200 && res.data.isUpdate) {
			// 			let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
			// 			// 提醒用户更新
			// 			uni.showModal({
			// 				title: '更新提示',
			// 				content: res.data.note ? res.data.note : '是否选择更新',
			// 				success: (showResult) => {
			// 					if (showResult.confirm) {
			// 						plus.runtime.openURL(openUrl);
			// 					}
			// 				}
			// 			})
			// 		}
			// 	}
			// })
			//获取cid 推送内容
			this.clientid = plus.push.getClientInfo().clientid
					if (!this.clientid) { //如果获取的cid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
						setTimeout(() => {
							this.clientid = plus.push.getClientInfo().clientid
						}, 4000)
					}
			console.log(this.clientid)
					// plus.push.addEventListener('click', (message) => {
					// 	this.pushCallBack()
					// });
			// 
					// plus.push.addEventListener('receive', (message) => {
					// 	this.pushCallBack()
					// });
			// #endif
		

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

		}
	}
</script>

<style> 
	
		@import './common/common.css';
		@import './common/iconfont.css';

</style>
