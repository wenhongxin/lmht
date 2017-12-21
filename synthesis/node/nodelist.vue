<style lang="less" rel="stylesheet/less" scoped>
	#nodelist {}
</style>
<template>
	<div id="nodelist" class="content_sub">
		<h2 class="tit">节点管理 <a class='common_btn' href='javascript:;;' @click='addnode'>添加节点</a> </h2>
		<!--<p class="search">管理员名称：<input type="text" v-model='username'/><span class="common_btn" @click="searchnode">搜索</span></p>-->
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="50">ID</td>
					<td width="170">节点名称</td>
					<td width="60">模块名</td>
					<td width="130">控制器名</td>
					<td width="170">方法名</td>
					<td width="90" class="td-center">是否是菜单项</td>
					<td width="60" class="td-center">父节点ID</td>
					<!--<td width="60">菜单样式</td>-->
					<td width="180">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='node in nodeList'>
					<td>{{node.id}}</td>
					<td>{{node.node_name}}</td>
					<td>{{node.module_name}}</td>
					<td>{{node.control_name}}</td>
					<td>{{node.action_name}}</td>
					<td class="td-center" v-text='node.is_menu==1 ? "不是":"是"'></td>
					<td class="td-center">{{node.typeid}}</td>
				<!--	<td>{{node.style_img}}</td>-->
					<td>
						<a href="javascript:;;" @click="updatanode(node)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="javascript:;;" @click="delnode(node.id)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'nodelist',
		data() {
			return {
				username: '',
				nodeList: null,
				pageCount: '1',
				nextString: '1',
				total: '0'
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self = this;
			liSrv.getNodeList('', function(res) {
				_self.pageCount = res.pageCount;
				_self.total = res.total;
				_self.nodeList = res.list
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.getNodeList(nextString, function(res) {
					_self.nodeList = res.list
				})
			},
			addnode() {
				common.setS('updatanode', {})
				this.$router.push({
					path: 'addnode'
				})
			},
			updatanode(data) {
				common.setS('updatanode', data)
				this.$router.push({
					path: 'addnode'
				})
			},
			searchnode() {
				alert('搜索成功')
			},
			delnode(id) {
				var r = confirm('确定删除吗？');
				var _self = this;
				if(r) {
					liSrv.delNode(id, function() {
						liSrv.getNodeList('', function(res) {
							_self.pageCount = res.pageCount;
							_self.total = res.total;
							_self.nodeList = res.list
						})
					})
				}
			}

		}
	}
</script>