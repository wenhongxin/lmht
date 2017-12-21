<style lang="less" rel="stylesheet/less" scoped>
	#seditclasslesson {
		
	}
</style>
<template>
	<div id="seditclasslesson" >
		<editclass-lesson :classid='classid'></editclass-lesson>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import editclassLesson from '../../research/addclassrelated/addclasscourse.vue';
	export default {
		name: 'seditclasslesson',
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

