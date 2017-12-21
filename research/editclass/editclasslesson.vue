<style lang="less" rel="stylesheet/less" scoped>
	#editclasslesson {
		
	}
</style>
<template>
	<div id="editclasslesson" >
		<editclass-lesson :classid='classid'></editclass-lesson>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import editclassLesson from '../addclassrelated/addclasscourse.vue';
	export default {
		name: 'editclasslesson',
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

