<template>
    <view class="content"  :style="{'height':windowHeight}">
        <swiper  indicator-color='rgb(226, 221, 221)' indicator-active-color='#4b56c0' :indicator-dots='indicdots' :autoplay="false" :interval="5000" :duration="500" style="height: 100%;" class="swiper" 
         @animationfinish="animationfinish">
            <swiper-item>
			   <view class="" style="padding-top: 30%;">
			   	 <image  mode="widthFix" src="../../static/img/qzPic1.png" style="width: 100%;"></image>
				 <view style=" font-size: 44upx; height: 130upx; line-height: 160upx;text-align: center; ">容易操作</view>
				  <view style=" font-size: 28upx; height:50upx; line-height: 50upx; color: #666;text-align: center;">给你清晰体验</view>
			   </view>
            </swiper-item>
          <swiper-item>
             <view class=""  style="padding-top: 30%;">
             	 <image  mode="widthFix" src="../../static/img/qzPic2.png" style="width: 100%;"></image>
          	 <view style=" font-size: 44upx; height: 130upx; line-height: 160upx;text-align: center; ">邀请有礼</view>
          	  <view style=" font-size: 28upx; height:50upx; line-height: 50upx; color: #666;text-align: center;">获得更多分润</view>
             </view>
          </swiper-item>
		  <swiper-item>
		     <view class=""  style="padding-top: 30%;">
		     	 <image  mode="widthFix" src="../../static/img/qzPic3.png" style="width: 100%;"></image>
		  	 <view style=" font-size: 44upx; height: 130upx; line-height: 160upx; text-align: center;">邀请有礼</view>
		  	  <view style=" font-size: 28upx; height:50upx; line-height: 50upx; color: #666;text-align: center;">获得更多分润</view>
			  <view style=" margin-top: 25upx; ">
					<view style=" width: 200upx; text-align: center; margin: 0 auto; height: 60upx; line-height: 60upx; border: 1px solid #4b56c0; border-radius: 40upx; color: #4b56c0; " @click="toIndex">
						开始体验
					</view>
			  </view>
		     </view>
		  </swiper-item>
        
        </swiper>
      <!--  <text :style="{color:'red','font-weight':200}">这是一个sssH1</text> -->
    </view>
</template>
<script>
    export default {
        data() {
            return {
                windowHeight: '731px'  ,//定义手机屏幕高度值变量
				indicdots:true,
            }
        },
        onReady() { 
			uni.getStorageSync('guideStus')=='GO'? uni.switchTab({url: '../index/index'}):''//判断初始引导页
            var _me = this;
		//	plus.webview.create("url","id", {contentAdjust:false});
            uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
                success: function(res) { 
                   
                    _me.windowHeight = res.windowHeight-30 + 'px';
                    //console.log('手机屏幕高度为' + _me.windowHeight);
                }
            });
        },
        methods: {
            animationfinish(e) {
                //console.log(JSON.stringify(e.detail.current));

                //判断到最后一张后，自动转向进入首页
                if (e.detail.current == 2) {
					this.indicdots=false;
                   // console.log('动画已经播放结束');
				 uni.setStorageSync('guideStus', 'GO');
                    // setTimeout(function() {
                    //     uni.navigateTo({
                    //         url: '../login/login'
                    //     });
                    // }, 4000)
                }else{
					this.indicdots=true;
				}
            },
			toIndex(){
				 uni.setStorageSync('guideStus', 'GO');
				uni.navigateTo({
				    url: '../login/login'
				});
			}
        }
    }
</script>
<style>
    .swiper {
        width: 100%;
        /*     height: 100vw; */
        /* background: red; */
    }
	uni-image{
		width: 100% !important;
		/* height: 682upx; */
	}
</style>