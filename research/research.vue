<style lang="less" rel="stylesheet/less" scoped>
#research {

	.router-link-active{
  	background: #FFFFFF;			
  }
   
}
</style>
<template>
  <div id="research"  class="two_router">
   	<ul class="left_nav">
   		<!--<li v-if='!teachplan'><a>教研人员操作</a></li>-->
   		<li v-for='item in teachplan'><router-link :to='"/"+item.url'>{{item.name}}</router-link> </li>
   	</ul>	
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common';
export default {
  name: 'research',
  data(){
  	return {
  		teachplan:common.getS('menuData') ? common.getS('menuData').teachplan : ''
  	}
  },
  beforeCreate(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

