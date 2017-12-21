<style lang="less" rel="stylesheet/less" scoped>
	#oeditclasslesson {
		
	}
</style>
<template>
	<div id="oeditclasslesson" >
		<editclass-lesson :classid='classid'></editclass-lesson>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import editclassLesson from '../../research/addclassrelated/addclasscourse.vue';
	export default {
		name: 'oeditclasslesson',
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
			editclassLesson
		}
	}
</script>

