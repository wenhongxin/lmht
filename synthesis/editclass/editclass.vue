<style lang="less" rel="stylesheet/less" scoped>
	#seditclass {
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
	<div id="seditclass" class="content_sub">
		<h2 class="tit">
  		班级管理
  	</h2>
  	<p>
  		<router-link :to='{name:"seditclassbasis",query:{id:classid}}'>基础信息</router-link>
  		<router-link :to='{name:"seditclassintroduce",query:{id:classid}}'>班级介绍</router-link>
  		<router-link :to='{name:"seditclasslesson",query:{id:classid}}'>课程信息</router-link>
  		<router-link :to='{name:"seditclasshistory",query:{id:classid}}'>历史记录</router-link>
  		
  	</p>
  	<router-view></router-view>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'seditclass',
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