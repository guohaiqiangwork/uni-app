import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {//data数据
	   APPNAME:'惠客+',
	   guideStus:'',
       userName:'未知宝宝',
	   orangeD:0,//消息通知
	   title:'',
	   token:'',
	   typeCustomer:'0',//客户类型 0用户 1代理
	   realname:'',//实名姓名
	   realidcard:'',//实名身份信息
	   MccData:'',//经营范围
	   avatarIMG:'',//头像
    },
	getters:{ //添加getters计算属性
				// 	saleProducts: (state) => {
				// 		  let saleProducts = state.products.map( product => {
				// 			return {
				// 			  name: product.name,
				// 			  price: product.price / 2
				// 			}
				// 		  })
				// 		  return saleProducts;
				// 		}
	},
    mutations: {//函数方法func
        LOGIN(state,userName) {
            state.userName=userName||'新用户';
			console.log(state.userName) 
        },
		TITLE(state,title) {
            state.title=title||state.APPNAME;
        },
    }
})

export default store
