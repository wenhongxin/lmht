<style lang="less" rel="stylesheet/less" scoped>
	#uderlist {
		.disable {
			color: #999999 !important;
			pointer-events: none;
			cursor: default;
		}
	}
</style>
<template>
	<div id="uderlist" class="content_sub">
		<h2 class="tit">角色列表 <a class='common_btn' href='javascript:;;' @click='addrole'>添加角色</a> </h2>
		<!--<p class="search">管理员名称：<input type="text" v-model='username' /><span class="common_btn" @click="searchRole">搜索</span></p>-->
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="80">角色ID</td>
					<td>角色名称</td>
					<td width="200">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='role in roleList'>
					<td>{{role.id}}</td>
					<td>{{role.rolename}}</td>
					<td>
						<a href="javascript:;;" @click="updatarole(role)">修改</a>
						<!--<a href="javascript:;;" @click="delrole(role.id)">删除</a>-->&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="javascript:;;" @click="fbpermissions(role)" :class="{'disable':role.id==1}">分配权限</a>
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
		name: 'uderlist',
		data() {
			return {
				username: '',
				roleList: '',
				total: '',
				pageCount: '0',
				nextString: '1'
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self = this;
			liSrv.getRoleList('', function(res) {
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.roleList = res.list
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.getRoleList(nextString, function(res) {
					_self.roleList = res.list
				})
			},
			addrole() {
				common.setS('updatarole', {})
				this.$router.push({
					path: 'addrole'
				})
			},
			updatarole(data) {
				common.setS('updatarole', data)
				this.$router.push({
					path: 'addrole'
				})
			},
			searchRole() {

			},
			delrole(id) {
				var r = confirm('确定删除吗？');
				var ev = event.target;
				if(r) {
					liSrv.delRole(id, function() {
						$(ev).parents('li').remove();
					})
				}
			},
			fbpermissions(data) {
				common.setS('updataroletree', data)
				this.$router.push({
					'name': 'role'
				})
			}
		},
		mounted() {

		}
	}
</script>