<style lang="less" rel="stylesheet/less" scoped>
#operate {
	
	.router-link-active{
  	background: #FFFFFF;			
  }
 
}
</style>
<template>
  <div id="operate"  class="two_router">
   	<ul class="left_nav">
   		<!--<li v-if='!operate'><a>运营人员操作</a></li>-->
   		<li v-for='item in operate'><router-link :to='"/"+item.url'>{{item.name}}</router-link> </li>
   	</ul>	
   	<div class="three_router">
   		<router-view></router-view>
   	</div>
  </div>
</template>

<script>
import common from 'common'
export default {
  name: 'opreate',
  data(){
  	return {
  		operate:common.getS('menuData') ? common.getS('menuData').operate : {}
  	}
  },
  created(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

