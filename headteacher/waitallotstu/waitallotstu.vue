<style lang="less" rel="stylesheet/less" scoped>
	#waitallotstu {
		.search {
			margin: 0;
			padding: 30px 0;
			border-bottom: 1px solid #c6c6c6;
			select {
				height: 36px;
				border-right: none;
			}
		}
	}
</style>
<template>
	<div id="waitallotstu" class="content_sub">
		<h2 class="tit">
  		待分配学生
  	</h2>
		<p class="search">
			<select v-model='searchkey'>
				<option value="jiazhang_name">家长姓名</option>
				<option value="realname">学生姓名</option>
				<option value="phone">手机号</option>
			</select><input type="text" v-model.trim='searchval' @keyup.enter = "searchstu" />
			<span class="common_btn" @click="searchstu">搜索</span>
		</p>
		<table class="table" border="1">
			<thead>
				<tr>
					<td>序号</td>
					<td>学生姓名</td>
					<td>手机号</td>
					<td>学生性别</td>
					<td>家长姓名</td>
					<td>共报过几个班（个）</td>
					<td>最近一个班，报班时间</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in stuList'>
					<td>{{item.id}}</td>
					<td>{{item.realname}}</td>
					<td>{{item.phone}}</td>
					<td>{{item.student_sex==1?'男':item.student_sex==2?'女':''}}</td>
					<td>{{item.jiazhang_name}}</td>
					<td>{{item.order_sum}}</td>
					<td>{{item.recently_time}}</td>
					<td><router-link :to='{name:"sturaisecuorse",query:{id:item.student_id}}'>查看</router-link></td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
		
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	
	export default {
		name: 'waitallotstu',
		data() {
			return {
				searchkey:'jiazhang_name',
				searchval:'',
				stuList:'',
				pageCount: '1',
				nextString: '1',
				total: '0'
			}
		},
		components:{
			trunPage
		},
		created() {
			this.getstulist({pageSize:'20'})
		},
		methods: {
			getstulist(data){
				var _self = this;
				liSrv.directorSmallStudentList(data,function(res){
					_self.stuList = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
							_self.stuList =null;
							_self.total = '0';
							_self.nextString= '1';
							_self.pageCount = '1';
					}
				})
			},
			searchstu() {
				var data = {
					[this.searchkey] : this.searchval,
				}
				this.getstulist(data)
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data =  {
					student_id:this.id,
					page:nextString
				}
				liSrv.directorSmallStudentList(data, function(res) {
					_self.stuList = res.list
				})
			},
		},
		watch:{
			'searchval'(a,b){
				if(a == '') {
					this.getstulist({pageSize:'20'})
				}
			}
		}
	}
</script>