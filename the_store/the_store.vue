<style lang="less" rel="stylesheet/less" scoped>
#the_store {
	.router-link-active{
  	background: #FFFFFF;			
  }
}
</style>
<template>
  <div id="the_store" class="two_router">
   	<ul class="left_nav">
   		<!--<li v-if='!store'><a>门店人员操作</a></li>-->
   		<li v-for='item in store'><router-link :to='"/"+item.url'>{{item.name}}</router-link> </li>
   	</ul>
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'the_store',
  data(){
  	return {
  		store:common.getS('menuData') ? common.getS('menuData').store : {}
  	}
  },
  beforeCreate(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

