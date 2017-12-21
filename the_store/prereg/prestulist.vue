<style lang="less" rel="stylesheet/less" scoped>
	#prestulist {}
</style>
<template>
	<div id="prestulist" class="content_sub">
		<h2 class="tit">
  		登记未报班
  	</h2>
		<p class="search">电话号码：<input type="text" v-model.trim='mobile' @keyup.enter='searchstu' /><span class="common_btn" @click="searchstu">搜索</span></p>
		<table class="table" border="1">
			<thead>
				<tr>
					<td>ID</td>
					<td>申请时间</td>
					<td>家长姓名</td>
					<td>手机号</td>
					<td>学生姓名</td>
					<td>学生年级</td>
					<td>性别</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in stulist'>
					<td>{{item.student_id}}</td>
					<td>{{item.add_time_man}}</td>
					<td>{{item.name}}</td>
					<td>{{item.mobile}}</td>
					<td>{{item.student_name}}</td>
					<td>{{item.student_grade_man}}</td>
					<td>{{item.student_sex_man}}</td>
					<td><i @click = 'goinfo(item)'>详情</i></td>
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
		name: 'prestulist',
		data() {
			return {
				mobile: '',
				stulist: '',
				pageCount: '1',
				nextString: '1',
				total: '0',
			}
		},
		components:{
			trunPage
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				var mobile = reg.test(this.mobile) ? this.mobile : '';
				liSrv.getprestulist({page:nextString,mobile:mobile}, function(res) {
					_self.stulist = res.list;
				})
			},
			goinfo(item){
				var commonData={
					jiazhang_name:item.name,
					username:item.mobile,
					remarks:'',
					realname:item.student_name,
					student_grade:item.student_grade,
					student_sex:item.student_sex,
					prov:item.prov,
					prov_name:item.prov_name,
					city:item.city,
					city_name:item.city_name,
					district:item.district,
					district_name:item.district_name,
					school:item.school,
					school_name:item.school_name,
					relationship:item.relationship,
					address:item.address,
					school_class:item.school_class,
					student_id:item.student_id,
					recommender:item.recommender,
					source:item.source
				};
				common.setS('stuInfo',commonData);
				this.$router.push({path:'/studentfile/stu_file_info/stu_file_raisecuorse',query:{id:item.student_id}});
			},
			searchstu() {
				if(!this.mobile){return ;}
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				if(!reg.test(this.mobile)){
					alert('电话号码输入有误');
					return ;
				}
				var data ={mobile:this.mobile};
				this.getprestulist(data);
			},
			getprestulist(data) {
				var _self = this;
				_self.nextString = '1';
				liSrv.getprestulist(data, function(res) {
					_self.stulist = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				}, function(res) {
					if(res.code == 'E_NOT_DATA') {
						_self.pageCount = '1';
						_self.total = '0';
						_self.stulist = {}
					}
				})
			},
		},
		created() {
			this.getprestulist({})
		},
		watch:{
			'mobile'(a,b){
				if(a == '') {
					this.getprestulist({})
				}
			}
		}
	}
</script>