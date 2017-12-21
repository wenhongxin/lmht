<style lang="less" rel="stylesheet/less" scoped>
#oclasstu {
	
 
}
</style>
<template>
  <div id="oclasstu">
   	<classtu department = 'operate'></classtu>
  </div>
</template>

<script>
import common from 'common';
import classtu from '../../research/classmanage/classstu'
export default {
  name: 'oclasstu',
  data(){
  	return {
  	}
  },
  components:{
		classtu
	},
  created(){
  }
}
</script>

