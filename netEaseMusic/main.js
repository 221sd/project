import App from './App'
import Vue from 'vue'
import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('formatCount',function(value){
	if(value >=10000 && value <= 100000000){
		value /=10000
		return value.toFixed(1)+'万'
	}else if(value > 100000000){
		value /=100000000
		return value.toFixed(1)+'亿'
	}else{
		return value
	}
})

const app = new Vue({
    ...App,
	store
})
app.$mount()


