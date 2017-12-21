<style lang="less" rel="stylesheet/less" scoped>
	#yhmanage {
		h3 {
			margin: 14px 0;
			font-size: 16px;
		}
		.search_nav {
			width: 100%;
			border-bottom:1px solid #c6c6c6;
			height: 36px;
			line-height: 36px;
			margin-top: 30px;
			li {
				float: left;
				width: 100px;
				height: 36px;
				text-align: center;
				border-right: 1px solid #FFFFFF;
				a{
					display: block;
					background: #EFEFEF;
				}
				.router-link-active{
					background: #FF8900;
					color: #FFFFFF;
				}
			}
			
		}
		
	}
</style>
<template>
	<div id="yhmanage" class="content_sub">
		<h2 class="tit">
  		优惠管理
  	</h2>
		<ul class="search_nav">
			<li><router-link :to='{name:"yhmanage"}'>优惠管理</router-link></li>
		<!--	<li><router-link to=''>抵扣卷管理</router-link></li>-->
			<li><router-link :to='{name:"yhistory"}'>历史纪录</router-link></li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'yhmanage',
		data() {
			return {
				
			}
		},
		created() {
		},
		methods: {
			
		
		}
	}
</script>