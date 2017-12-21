<style lang="less" rel="stylesheet/less" scoped>
#synthesis {
	.router-link-active{
  	background: #FFFFFF;			
  }
  
  
}
</style>
<template>
  <div id="synthesis"  class="two_router">
   	<ul class="left_nav">
   		<!--<li v-if='!role'><a>总部人员操作</a></li>-->
   		<li v-for='item in role'><router-link :to='"/"+item.url'>{{item.name}}</router-link> </li>
   	</ul>
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'permissions',
  data(){
  	return {
  		role:common.getS('menuData')?common.getS('menuData').role : {}
  	}
  },
  beforeCreate(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

