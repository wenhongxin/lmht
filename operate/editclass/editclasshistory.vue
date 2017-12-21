<style lang="less" rel="stylesheet/less" scoped>
	#oeditclasshistory {
		
	}
</style>
<template>
	<div id="oeditclasshistory">
			<editclasshistory></editclasshistory>
	</div>
</template>

<script>
	import editclasshistory from '../../research/editclass/editclasshistory.vue';
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'oeditclasshistory',
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
			editclasshistory
		}
	}
</script>