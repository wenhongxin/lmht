<style lang="less" rel="stylesheet/less" scoped>
	#ccclassmanage {
		.search {
			height: 36px;
			margin: 15px 0 30px 0;
			line-height: 36px;
			input {
				height: 26px;
				width: 100px;
				margin: -2px 10px 0 10px;
				padding-left: 5px;
			}
			select {
				width: 120px;
				height: 28px;
				margin: -3px 20px 0 10px;
			}
			a {
				height: 26px;
				line-height: 26px;
				margin-top: 5px;
				width: 80px;
				display: inline-block;
			}
		}
	}
</style>
<template>
	<div id="ccclassmanage" class="content_sub">
		<h2 class="tit">
  			试听班管理
  		</h2>
		<table class="table" border="1">
			<thead>
		    <tr>
		      <td width="50">ID</td>
		      <td width="180">班级名称</td>
		      <td width="180">营销班级名称</td>
		      <td width="190">首课时间</td>
		      <td width="80"  class="td-center">年级</td>
		      <td width="80"  class="td-center">主讲老师</td>
		      <td width="80" class="td-center">授课状态</td>
		      <td width="80"  class="td-center">班级类型</td>
		      <td width="77" class="td-center">学生数</td>
		    </tr>
  		</thead>
  		<tbody id="tbody">
  				<tr v-if='!classlist'>
  					<td  colspan="12">暂无课时！！！</td>
  				</tr>
  				<tr v-for = 'item in classlist'>
  					<td>{{item.id}}</td>
			      <td><router-link :to='{path:"ccclassstu",query:{id:item.id,type:item.class_type,teacher_name:item.teacher_name,class_name:item.name}}'>{{item.name}}</router-link></td>
		      	<td width="180">{{item.market_name}}</td>
			      <td>{{item.first_class_time}}</td>
			      <td  class="td-center">{{item.grade_man}}	</td>
			      <td  class="td-center">{{item.teacher_name}}	</td>
			      <td class="td-center">{{item.state_man}}</td>
			      <td  class="td-center">{{item.class_type_map}}</td>
			      <td class="td-center">{{item.student_count}}</td>
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
		name: 'ccclassmanage',
		data(){
			return {
				classlist:'',
				classname:'',
				classtype:'1',
				show_state:'',
				classtate:'',
				pageCount:'1',
				nextString:'1',
				total:'0',
				tzurl:'',
				mmby:this.$route.query.mmby
			}
		},
		components:{
			trunPage
		},
		created(){
			this.getclasslist({class_type:'2'});
		},
		methods:{
			getclasslist(data){//获取列表
				var _self = this;
				_self.nextString = '1';
				liSrv.getAdminClassList(data,function(res){
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.classlist = res.list;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
						_self.classlist = '';
						_self.pageCount = '1';
						_self.total = '0';
					}
				})
			},
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				var data = {
					name:this.classname,
					class_type:this.classtype,
					state:this.classtate,
					show_state:this.show_state,
					page:nextString
				}
				liSrv.getAdminClassList(data,function(res){
					_self.classlist = res.list
				})
			},
		}
	}
</script>