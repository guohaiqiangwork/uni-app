import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import store from './store'
Vue.prototype.$store = store

import {http} from './js_sdk/luch-request/index.js' 
Vue.prototype.$http = http;


import {bankType} from './js_sdk/bankType.js' 
Vue.prototype.$bankType = bankType;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	  store,
    ...App
})
app.$mount()
