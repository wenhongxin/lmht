<style lang="less" rel="stylesheet/less" scoped>
	#ccclassstu {
		.addstu {
			width: 400px;
			height: 230px;
			background: #FFFFFF;
			border: 1px solid #CCCCCC;
			position: absolute;
			border-radius: 3px;
			top: 50%;
			left: 50%;
			margin-top: -200px;
			margin-left: -100px;
			p {
				margin: 15px 0 0 30px;
				em {
					color: red;
				}
				input {
					width: 200px;
					height: 24px;
					padding-left: 10px;
				}
				select {
					width: 210px;
					height: 24px;
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
		.stu_head {
			margin: 10px 0;
			display: block;
			input {
				padding-left: 5px;
				width: 160px;
				height: 26px;
			}
			.wid100 {
				display: inline-block;
				width: 80px;
				height: 30px;
				line-height: 30px;
				margin-left: 5px;
			}
		}
		.table {
			margin-top: 20px;
		}
	}
</style>
<template>
	<div id="ccclassstu" class="content_sub">
		<h2 class="tit">
  		班级ID:{{classid}}　班级名称：{{classname}}　主讲老师：{{teachername}}
  	</h2>
		<p class="stu_head">
			学生姓名：<input type="text" class="putnum" v-model.trim='stuname' /> &nbsp; 学生手机号： <input type="text" class="putnum" v-model.trim="stuiphone" />
			<a href="javascript:;;" class="common_btn wid100" @click="stusearch">搜索</a>
		</p>
		<table class="table" border="1">
			<thead>
				<tr>
					<td>UID</td>
					<td>孩子姓名</td>
					<td>手机号</td>
					<td v-if="class_type==2">CC</td>
					<td>末次登录</td>
					<td>续费</td>
					<td>金币</td>
					<td>上课次数</td>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr v-if='!stulist'>
					<td colspan="8">暂无学生！！！</td>
				</tr>
				<tr v-for='item in stulist'>
					<td>{{item.student_id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.mobile}}</td>
					<!-- | telchange-->
					<td v-if="class_type==2">
						{{item.cc_name}}
					</td>
					<td>{{item.last_modify_time_map}}</td>
					<td>{{item.is_renewal_man}}</td>
					<td>{{item.student_coin_count}}</td>
					<td>{{item.lesson_count}}</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount='pageCount' :nextString='nextString' :total='total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'ccclassstu',
		data() {
			return {
				classid: this.$route.query.id,
				teachername: this.$route.query.teacher_name,
				classname: this.$route.query.class_name,
				classid: this.$route.query.id,
				stulist: '',
				pageCount: '1',
				nextString: '1',
				total: '0',
				isaddstu: false,
				class_type: this.$route.query.type,
				pageSize: this.$route.query.pageSize,
				username: '',
				realname: '',
				student_sex: '',
				jiazhang_name: '',
				stuname: '',
				stuiphone: '',
//				adminname:common.getS('username')

			}
		},
		components: {
			trunPage
		},
		created() {
			var _self = this;
			liSrv.classStudentList({
				class_id: this.classid
			}, function(res) {
				_self.stulist =res.list.sort(_self.sortArr("cc_name"));
				_self.total = res.total;
				_self.pageCount = res.pageCount;
			}, function(res) {
				if(res.code == 'E_NOT_DATA') {
					_self.pageCount = '1';
					_self.nextString = '1';
					_self.stulist = '';
				}
			})
		},
		methods: {
			sortArr(property){
	         return function(obj1,obj2){
	             var value1 = obj1[property] || '';
	             var value2 = obj2[property] || '';
	             return value2.localeCompare(value1);     // 升序
	    		}
			},
//			sortArr(property){
//	         return function(obj1,obj2){
//	             var value1 = obj1[property][0] || '';
//	             var value2 = obj2[property][0] || '';
//	             return value2.localeCompare(value1) //value1 - value2;     // 升序
//	    		}
//			},
			stusearch() {
				var _self = this;
				var data = {
					class_id: this.classid,
					realname: this.stuname,
					username: this.stuiphone,
				};
				_self.nextString = '1';
				liSrv.classStudentList(data, function(res) {
					_self.stulist =res.list.sort(_self.sortArr("cc_name"));;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				}, function(err) {
					if(err.code == 'E_NOT_DATA') {
						_self.pageCount = '1';
						_self.total = '0';
						_self.stulist = '';
					}
				})
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.classStudentList({
					class_id: this.classid,
					page: nextString
				}, function(res) {
					_self.stulist = res.list.sort(_self.sortArr("cc_name"));
				}, function(res) {
					if(res.code == 'E_NOT_DATA') {
						_self.pageCount = '1';
						_self.nextString = '1';
						_self.stulist = '';
					}
				})
			},
			checkcclist(){
				
			}
		}
	}
</script>