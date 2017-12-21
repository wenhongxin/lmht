<style lang="less" rel="stylesheet/less" scoped>
#oclassmanage {
	
 
}
</style>
<template>
  <div id="oclassmanage">
   	<classmanage department = 'operate'></classmanage>
  </div>
</template>

<script>
import common from 'common';
import classmanage from '../../research/classmanage/classmanage'
export default {
  name: 'oclassmanage',
  data(){
  	return {
  	}
  },
  components:{
		classmanage
	},
  created(){
  }
}
</script>

