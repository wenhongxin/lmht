<style lang="less" rel="stylesheet/less" scoped>
	#editclass {
		p{
			margin:30px 0;
			height: 36px;
			line-height: 36px;
			a{
				background:#EFEFEF;
				float: left;
				display: inline-block;
				padding: 0 15px;
			}
			.router-link-active{
				background: #FF8900;
				color: #FFFFFF;
			}
		}
	}
</style>
<template>
	<div id="editclass" class="content_sub">
		<h2 class="tit">
  		班级管理
  	</h2>
  	<p>
  		<router-link :to='{name:"editclassbasis",query:{id:classid}}'>基础信息</router-link>
  		<router-link :to='{name:"editclassintroduce",query:{id:classid}}'>班级介绍</router-link>
  		<router-link :to='{name:"editclasslesson",query:{id:classid}}'>课程信息</router-link>
  		<router-link :to='{name:"editclasshistory",query:{id:classid}}'>历史记录</router-link>
  	</p>
  	<router-view></router-view>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'editclass',
		data(){
			return {
				classid:this.$route.query.id
			}
		},
		created(){

		},
		methods:{
			
				
		}
	}
</script>