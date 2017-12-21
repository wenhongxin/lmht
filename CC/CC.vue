<style lang="less" rel="stylesheet/less" scoped>
#CC {
	.router-link-active{
  	background: #FFFFFF;			
  }
}
</style>
<template>
  <div id="CC"  class="two_router">
   	<ul class="left_nav">
   		<li  v-for='item in CC'><router-link :to='"/"+item.url'>{{item.name}}</router-link></li>
   		<!--<li><router-link to='/CC/ccremind'>CC提醒</router-link></li>-->
   		<!--<li><router-link to='/CC/ccadmin'>CC管理</router-link></li>-->
   		<!--<li><router-link to='/CC/ccclassmanage'>试听班管理</router-link></li>-->
   	</ul>	
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'CC',
  data(){
  	return {
  		CC:common.getS('menuData') ? common.getS('menuData').ccsystem : {}
  	}
  },
  created(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

