<style lang="less" rel="stylesheet/less" scoped>
#headteacher {
	.router-link-active{
  	background: #FFFFFF;			
  }
}
</style>
<template>
  <div id="headteacher"  class="two_router">
   	<ul class="left_nav">
   		<li v-for='item in classdirector'><router-link :to='"/"+item.url'>{{item.name}}</router-link> </li>
   	</ul>	
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'headteacher',
  data(){
  	return {
  		classdirector:common.getS('menuData') ? common.getS('menuData').classdirector : {}
  	}
  },
  created(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

