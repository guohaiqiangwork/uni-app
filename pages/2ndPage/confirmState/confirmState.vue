<template>
	<view>
		<view class="step_view">
			<uni-steps :data="steplist" 
				:active="stepindex">
			</uni-steps>
		</view>
		
		<view class="sendTo">
			<view class="send_l">
				{{deatildata.oldusername}}
			</view>
			<view class="send_">
				<text class="icon_4" style="width: 60upx; height: 26upx;line-height: 88upx;">&#xe603;</text>
				<!-- <image src="../../../static/img/jiantou.png" mode="scaleToFill" style="width: 60upx; height: 26upx;line-height: 100upx;"></image> -->
			</view>
			<view class="send_r">
				{{deatildata.username}}
			</view>
		</view>
		
		<view class="db_body">
			<view class="db_cont">
				<view class="cont_l">
					调拨原因
				</view>
				<view class="cont_">
					{{deatildata.reason==''?'无':deatildata.reason}}
				</view>
			</view>
			<view class="db_cont">
				<view class="cont_l">
					审核原因
				</view>
				<view class="cont_">
					{{deatildata.reviewedreason==''?'无':deatildata.reviewedreason}}
				</view>
			</view>
			<view class="db_cont">
				<view class="cont_l1">
					调拨数量
				</view>
				<view class="cont_r">
					{{dataindex}}件
				</view>
			</view>
		</view>
		
		<view class="xjdl">
			机具详情
		</view>
		<view class="jiju">
			
			<view class="jiju_body" v-for="(item,index) in jijubody" :key="index">
				<view class="cjiju_c">
					<text class="cjiju_t1">机具名称</text>
					<text class="cjiju_t2">{{item.name}}</text>
				</view>
				<view class="cjiju_c">
					<text class="cjiju_t1">机具编号</text>
					<text class="cjiju_t2">{{item.id}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps-1/uni-steps.vue"
	export default {
		 components: {uniSteps},
		data() {
			return {
				steplist:[
						{title: '提交成功',desc:''}, 
						{title: '审核中',desc:''},  
						{title: '申请通过',desc:'暂无'},],
				stepindex:'1',
				deatildata:'',
				dataindex:'0',
				jijubody:[],
			}
		},
		onLoad(option) {
			this.deatildata=JSON.parse(option.listData)
			console.log(JSON.parse(option.listData))
			this.steplist[0].desc=this.deatildata.createtime.substring(5);
			
			
			var jijuname=this.deatildata.name.split(",");
			var jijuid=this.deatildata.implementid.split(",");
			//var jijuObject=new Array();
			this.dataindex=jijuid.length
			for(var i=0;i<jijuid.length;i++){
				var jijuObject={};
				jijuObject.name=jijuname[i];
				jijuObject.id=jijuid[i];
				this.jijubody.push(jijuObject)
				console.log(this.jijubody)
			}
			
			if(this.deatildata.status=='0'){//审核中
				
			}else if(this.deatildata.status=='1'){//成功
				this.steplist[2].title='申请通过';
				this.stepindex='2'
				this.steplist[2].desc=this.deatildata.endtime.substring(5);
			}else{
				this.steplist[2].title='申请失败';
				this.stepindex='2'
				this.steplist[2].desc=this.deatildata.endtime.substring(5);
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.step_view{
	padding: 7%;
	width: 86%;
	background: #fff;
	margin-bottom: 12px;
}
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
    padding-right: 60upx;
}
.send_r{
	flex: 1;
    padding-left: 60upx;
}
.db_body{
	background: #fff;
    margin-top: 24upx;
}
.db_cont{
	display: flex;
    padding: 4%;
	font-size: 28upx;
	width: 92%;
}
.cont_l{
	width: 25%;
	font-weight: 700;
}
.cont_l1{
	width: 25%;
	font-weight: 700;
}
.cont_r{
	flex: 1;
}
.xjdl{
	height: 80upx;
    background: #fff;
    line-height: 80upx;
    padding: 0 30upx;
    font-weight: 700;
    font-size: 30upx;
	margin-top: 24upx;
}
.jiju{
	width: 100%;
    background: #fff;
}
.jiju_body{
	width: 92%;
    margin: 0 4%;
    border-top: 1px solid #eee;
	padding: 10px 0px;
}
.cjiju_c{
	display: flex;
	height: 60upx;
	line-height: 60upx;
	font-size: 28upx;
}
.cjiju_t1{
	width: 25%;
}
.cjiju_t2{
	flex: 1;
	color: #C8C7CC;
}
.icon_4{
		font-family: iconfont;
		font-size: 68upx;
		color: #4B56C0;
		font-weight: 400;
	}
</style>
