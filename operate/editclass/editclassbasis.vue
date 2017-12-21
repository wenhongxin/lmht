<style lang="less" rel="stylesheet/less" scoped>
	#oeditclassbasis {
		
	}
</style>
<template>
	<div id="oeditclassbasis">
			<editclass-basis :classid='classid' department = 'operate'></editclass-basis>
	</div>
</template>

<script>
	import editclassBasis from '../../research/addclassrelated/addclass.vue';
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'oeditclassbasis',
		data(){
			return {
				classid:this.$route.query.id
			}
		},
		created(){
			
		},
		methods:{
				
		},
		components:{
			editclassBasis
		}
	}
</script>