<style lang="less" rel="stylesheet/less" scoped>
#sclassmanage {
	
 
}
</style>
<template>
  <div id="sclassmanage">
   	<classmanage department = 'synthesis'></classmanage>
  </div>
</template>

<script>
import common from 'common';
import classmanage from '../../research/classmanage/classmanage';
export default {
  name: 'sclassmanage',
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

