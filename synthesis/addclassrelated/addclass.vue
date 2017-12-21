<style lang="less" rel="stylesheet/less" scoped>
	#saddclass {
		
	}
</style>
<template>
	<div id="saddclass">
			<addclass department = 'synthesis'></addclass>
	</div>
</template>

<script>
	import addclass from '../../research/addclassrelated/addclass.vue';
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'saddclass',
		data(){
			return {
			}
		},
		created(){
			
		},
		methods:{
				
		},
		components:{
			addclass
		}
	}
</script>