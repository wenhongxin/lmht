<style lang="less" rel="stylesheet/less" scoped>
#studentfile {
	.router-link-active{
	  	background: #FFFFFF;			
	}
}
</style>
<template>
  <div id="studentfile"  class="two_router">
   	<ul class="left_nav">
   		<li  v-for='item in studentfile'><router-link :to='"/"+item.url'>{{item.name}}</router-link></li>
   	</ul>	
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'studentfile',
  data(){
  	return {
		studentfile:common.getS('menuData') ? common.getS('menuData').studentfile : {}
  	}
  },
  created(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

