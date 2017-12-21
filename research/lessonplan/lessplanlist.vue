<style lang="less" rel="stylesheet/less" scoped>
	#lessplanlist {
		position: relative;
		.search {
			margin-top: 15px;
			input {
				width: 188px;
				height: 34px;
				border: 1px solid #95989a;
				padding-left: 10px;
				margin-right: 10px;
			}
			span {
				display: inline-block;
				width: 75px;
				cursor: pointer;
			}
		}
		.alert-all {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: -210px;
		}
		.alert {
			width: 300px;
			height: 180px;
			background: #FFFFFF;
			border: 1px solid #CCCCCC;
			position: absolute;
			border-radius: 3px;
			top: 50%;
			left: 50%;
			margin-top: -200px;
			p {
				margin: 15px 0 0 30px;
				input,
				select {
					border: none;
					width: 178px;
					height: 34px;
					border-bottom: 1px solid #CCCCCC;
					box-sizing: border-box;
				}
				input {
					padding-left: 10px;
				}
			}
			.btn {
				color: #CCCCCC;
				float: right;
				margin: 25px 25px 0 0;
				a {
					width: 70px;
					height: 28px;
					line-height: 28px;
					display: inline-block;
					border-radius: 3px;
					&:first-child {
						background: none;
						color: #333333;
						border: 1px solid #CCCCCC;
					}
				}
			}
		}
	}
</style>
<template>
	<div id="lessplanlist" class="content_sub">
		<h2 class="tit">
  		教案管理
  		<a class='common_btn' href="javascript:;;" @click='addplan'>新建教案</a> 
  	</h2>
		<p class="search">教案名称：<input type="text" v-model.trim='planame' @keyup.enter='searchPlan' /><span class="common_btn" @click="searchPlan">搜索</span></p>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="50">ID</td>
					<td width="80">年级</td>
					<td>教案名称</td>
					<td width="80">课时数</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in planList'>
					<td>{{item.id}}</td>
					<td>{{item.grade_name}}</td>
					<td>
						<router-link :to='{name:"planclasslist",query:{id:item.id,planame:item.title}}'>{{item.title}}</router-link>
					</td>
					<td>{{item.course_count}}</td>
				</tr>
			</tbody>
		</table>
		<div class="alert-all" v-if='isAlert'>
			<div class="alert">
				<p><span>年　　级：</span>
					<select name="" id="" v-model='grade'>
						<option value="1">一年级</option>
						<option value="2">二年级</option>
						<option value="3">三年级</option>
						<option value="4">四年级</option>
						<option value="5">五年级</option>
						<option value="6">六年级</option>
					</select>
				</p>
				<p><span>教案名称 ：</span><input type="text" v-model.trim='addplaname' /></p>
				<span class="btn">
				<a href="javascript:;;"class="common_btn" @click='isAlert=false'>取消</a>
				<a href="javascript:;;"class="common_btn" @click='okaddplaname'>确定</a>
			</span>
			</div>
		</div>
		<trun-page :pageCount='pageCount' :nextString='nextString' :total='total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'lessplanlist',
		data() {
			return {
				pageCount: '1',
				nextString: '1',
				total: '0',
				planList: '',
				planame: '',
				isAlert: false,
				addplaname: '',
				grade: '1'
			}
		},
		components: {
			trunPage
		},
		beforeCreate() {
			var _self = this;
			liSrv.teacherPlanList({}, function(res) {
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.planList = res.list;
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.teacherPlanList({
					page: nextString
				}, function(res) {
					_self.planList = res.list
				})
			},
			addplan() {
				this.isAlert = true;
				this.addplaname = '';
				this.grade = '1';
			},
			okaddplaname() {
				if(!this.addplaname || !this.grade) {
					alert('请填写信息');
					return;
				}
				var _self = this;
				var data = {
					title: this.addplaname,
					grade: this.grade
				}
				liSrv.teacherPlanAdd(data, function(res) {
					liSrv.teacherPlanList({}, function(res) {
						_self.total = res.total;
						_self.pageCount = res.pageCount;
						_self.planList = res.list;
						_self.isAlert = false;
					})
				})
			},
			searchPlan() {
				var _self = this;
				if(!_self.planame) return;
				_self.nextString = '1';
				liSrv.teacherPlanList({
					title: _self.planame
				}, function(res) {
					_self.planList = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				}, function(res) {
					if(res.code === 'E_NOT_DATA') {
						_self.planList = {};
						_self.pageCount = '1';
						_self.total = '0';
					}
				})
			}
		},
		watch: {
			'planame' (a, b) {
				if(a == '') {
					var _self = this;
					liSrv.teacherPlanList({}, function(res) {
						_self.total = res.total;
						_self.pageCount = res.pageCount;
						_self.planList = res.list;
					})
				}
			}
		}
	}
</script>