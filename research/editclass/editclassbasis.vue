<style lang="less" rel="stylesheet/less" scoped>
	#editclassbasis {
		
	}
</style>
<template>
	<div id="editclassbasis">
			<editclass-basis addoredit = 'true' :classid='classid' ></editclass-basis>
	</div>
</template>

<script>
	import editclassBasis from '../addclassrelated/addclass.vue';
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'editclassbasis',
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