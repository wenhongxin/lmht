<style lang="less" rel="stylesheet/less" scoped>
	#commstuinfo {
		
	}
</style>
<template>
	<div id="commstuinfo" class="jbinfo">
		<h4 v-if='!istit'>基本信息</h4>
		<p>
			<span>学生姓名：</span><span>{{stuInfo.realname}} - {{stuInfo.username}}</span><br />
			<span>学生学校：</span><span>{{stuInfo.school_name}}</span>
		</p>
		<p  v-if='!isparent'>
			<span>家长：</span><span>{{stuInfo.relationship}} {{stuInfo.jiazhang_name}}</span><br />
			<span>家庭收件地址：</span><span>{{stuInfo.address}}</span>
		</p>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'commstuinfo',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
			}
		},
		props: ['istit','isparent'],
		beforeCreate() {
			
		},
		methods: {
			
			
		}
	}
</script>