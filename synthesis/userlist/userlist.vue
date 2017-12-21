<style lang="less" rel="stylesheet/less" scoped>
	#uderlist {}
</style>
<template>
	<div id="uderlist" class="content_sub">
		<h2 class="tit">用户列表 <a class='common_btn' href='javascript:;;' @click='addUser'>添加用户</a> </h2>
		<p class="search">电话号码：<input type="text" v-model.trim='username' @keyup.enter='searchUser' /><span class="common_btn" @click="searchUser">搜索</span></p>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="150">UID</td>
					<td width="200">真实姓名</td>
					<td width="200">电话</td>
					<td width="200">微信号</td>
					<td width="200">所在门店</td>
					<td width="200">管理员角色</td>
					<!--<td width="200">是否是讲师</td>-->
					<td width="180">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in userList'>
					<td>{{item.teacher_id}}</td>
					<td>{{item.realname}}</td>
					<td>{{item.username}}</td>
					<td>{{item.wechat_number}}</td>
					<td>{{item.store_name}}</td>
					<td>{{item.role_name}}</td>
					<!--<td>不是</td>-->
					<td>
						<a href="javascript:;;" @click="updatauser(item)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="javascript:;;" @click="deluser(item.teacher_id)">删除</a>
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
		name: 'userlist',
		data() {
			return {
				username: '',
				userList: {},
				isSearch: true,
				pageCount: '1',
				nextString: '1',
				total: '0',
			}
		},
		components:{
			trunPage
		},
		created() {
			this.getUserList({})
		},
		methods: {
			getUserList(data){
				var _self = this;
				_self.nextString = '1';
				liSrv.getUserList(data, function(res) {
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.userList = res.list;
				},function(){
					_self.userList = '';
					_self.pageCount = "1";
					_self.total ='0';
				})
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.getUserList({page:nextString}, function(res) {
					_self.userList = res.list;
				})
			},
			addUser() {
				common.setS('updatauser', {})
				this.$router.push({
					path: 'adduser'
				})
			},
			updatauser(data) {
				//console.log(data)
				common.setS('updatauser', data)
				this.$router.push({
					path: 'adduser'
				})
			},
			searchUser() {
				if(this.username == '') {
					return;
				};
				this.getUserList({username:this.username})
			},
			deluser(id) {
				var r = confirm('确定删除吗？');
				var _self = this;
				if(r) {
					liSrv.delUser(id, function() {
						liSrv.getUserList({}, function(res) {
							_self.total = res.total;
							_self.pageCount = res.pageCount;
							_self.userList = res.list
						})
					})
				}
			}
		},
		watch: {
			'username' (a, b) {
				if(a == '') {
					this.getUserList({})
				}
			}
		}
	}
</script>