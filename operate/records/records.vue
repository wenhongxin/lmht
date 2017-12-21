<style lang="less" rel="stylesheet/less" scoped>
#records{
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
  <div id="records" class="content_sub">
  	<h2 class="tit">交易记录</h2>
  	<div class="tab">
  		<router-link to="/operate/records/classrecords">报名交易记录</router-link>
  		<router-link to="/operate/records/ipadrecords">ipad租用交易记录</router-link>
  	</div>
  	<router-view></router-view>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'records',
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

