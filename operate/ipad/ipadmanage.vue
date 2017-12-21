<style lang="less" rel="stylesheet/less" scoped>
#ipadmanage{
	.tab{
		margin-top:20px;
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
	.search{
		margin:20px 0;
		input{
			width: 188px;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
		}
		span{
			display: inline-block;
			width: 75px;
			cursor: pointer;
		}
	}
	.rizujin{
		width: 80px;
	}
	ol{
		a{
			color: cornflowerblue;
		}
	}
}
</style>
<template>
  <div id="ipadmanage" class="content_sub">
  	<h2 class="tit">ipad库存管理</h2>
  	<div class="tab">
  		<router-link to="/operate/ipadmanage/all">全部</router-link>
  		<router-link to="/operate/ipadmanage/notall">待签收</router-link>
  	</div>
  	<router-view></router-view>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'ipadmanage',
  data(){
			return {
			}
		},
		beforeCreate(){
		},
		methods:{
		},
		watch:{
		}
}
</script>

