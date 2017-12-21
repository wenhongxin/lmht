<style lang="less" rel="stylesheet/less" scoped>
	#classmanage {
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
		.navbox{
			width: 100%;
			padding: 15px 0;
			display: inline-block;
			.navcheck{
				color: #FFFFFF;
				width: auto;
				height: 30px;
				line-height: 30px;
				float: left;
				padding: 0 20px;
				margin-right: 10px;
				background-color: #c1c1c1;
				cursor: pointer;
			}
			.router-link-exact-active{
				background-color: #FF8900;
			}
		}
		
	}
</style>
<template>
	<div id="classmanage" class="content_sub">
		<h2 class="tit">
  		班级管理
  		<a v-if='department=="synthesis"' class='common_btn' href="javascript:;;" @click='addclass'>新建班级</a> 
  	</h2>
  	<div class="navbox">
  		<a class="navcheck router-link-exact-active" @click="navclick">正式班</a>
  		<a class="navcheck" @click="navclick">试听班</a>
  		<a class="navcheck" @click="navclick">测试班</a>
  		<a class="navcheck" @click="navclick">内测班 （产品部）</a>
  	</div>
  	<div class="search">
			班级名称：<input type="text" id='start_time' v-model='classname' /> 
			班级类型：<select v-model='classtype'>
				<option value="">全部</option>
				<option value="1">正式班</option>
  			<option value="2">试听班</option>
  			<option value="4">测试班</option>
  			<option value="3">内测班 （产品部）</option>
			</select>
			授课状态：<select v-model='classtate'>
				<option value="">全部</option>
				<option value="4">待开课</option>
				<option value="1">已开课</option>
				<option value="2">已结课</option>
			</select>
			展示开关：<select v-model='show_state'>
				<option value="">全部</option>
				<option value="1">搜索隐藏</option>
				<option value="2">搜索展示</option>
			</select>
			<a href="javascript:;;" class="common_btn" @click='searchclass'>搜索</a>
		</div>
		<table class="table" border="1">
			<thead>
		    <tr>
		      <td width="50">ID</td>
		      <td width="180">班级名称</td>
		      <td width="180">营销班级名称</td>
		      <td width="190">首课时间</td>
		    	<!--<td width="180">所用教程</td>-->
		      <td width="80"  class="td-center">年级</td>
		      <td width="80"  class="td-center">主讲老师</td>
		      <td width="80" class="td-center">授课状态</td>
		      <td width="80"  class="td-center">班级类型</td>
		      <td width="77" class="td-center">学生数</td>
		      <!--<td width="77" class="td-center">到课率</td>
		      <td width="77" class="td-center">完课率</td>
		      <td width="77" class="td-center">续课率</td>-->
		      <td  width="100">操作</td>
		    </tr>
  		</thead>
  		<tbody id="tbody">
  				<tr v-if='!classlist'>
  					<td  colspan="12">暂无课时！！！</td>
  				</tr>
  				<tr v-for = 'item in classlist'>
  					<td>{{item.id}}</td><!--v-if='department!="operate" && department!="synthesis"'--> <!--<em v-if='department=="operate" ||  department=="synthesis"'>{{item.name}}</em>-->
			      <td><router-link :to='{path:"lessoninfo",query:{id:item.id,teacher_name:item.teacher_name,class_name:item.name}}'>{{item.name}}</router-link></td>
		      	<td width="180">{{item.market_name}}</td>
			      <td>{{item.first_class_time}}</td>
			      <!--<td>{{item.teach_plan_name}}</td>-->
			      <td  class="td-center">{{item.grade_man}}	</td>
			      <td  class="td-center">{{item.teacher_name}}	</td>
			      <td class="td-center">{{item.state_man}}</td>
			      <td  class="td-center">{{item.class_type_map}}</td>
			      <td class="td-center">{{item.student_count}}</td>
			      <!--<td class="td-center">{{item.begin_rate}}</td>
			      <td class="td-center">{{item.end_rate}}</td>
			      <td class="td-center">{{item.continued_rate}}</td>-->
			      <td><router-link :to='{path:"/"+tzurl+"/classstu",query:{id:item.id,type:item.class_type,teacher_name:item.teacher_name,class_name:item.name}}'>学生</router-link>&nbsp;&nbsp;&nbsp;<i @click='editclass(item.id)'>编辑</i>&nbsp;&nbsp;&nbsp;<i v-if='department=="synthesis" && mmby == 911' @click='delclass(item.id)'>删除</i></td>
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
		name: 'classmanage',
		data(){
			return {
				classlist:'',
				classname:'',
//				classtype:this.$route.query.class_type,
				classtype:'1',
				show_state:'',
				classtate:'1',
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
		props:['department'],
		created(){
			if(!this.classtype){
				this.classtype='1';
			}
			this.getclasslist({class_type:this.classtype,state:1});
			if(!this.department){
				this.tzurl = 'research';
			}else{
				this.tzurl = this.department;
			}
		},
		methods:{
			navclick(){
				$(event.target).addClass("router-link-exact-active").siblings().removeClass('router-link-exact-active');
				this.$router.push({
					path: 'classmanage',
				})
				if(event.target.innerText=="正式班"){
					this.getclasslist({class_type:"1",state:1});
					this.classtype=1;
					this.classtate=1;
				}
				if(event.target.innerText=="试听班"){
					this.getclasslist({class_type:"2",state:1});
					this.classtype=2;
					this.classtate=1;
				}
				if(event.target.innerText=="测试班"){
					this.getclasslist({class_type:"4",state:1});
					this.classtype=4;
					this.classtate=1;
				}
				if(event.target.innerText=="内测班 （产品部）"){
					this.getclasslist({class_type:"3",state:1});
					this.classtype=3;
					this.classtate=1;
				}
			},
			delclass(id){//删除班级
				var c = confirm('确定删除吗');
				if(c){
					var data = {
						class_id :id,
						state:3
					},_self = this;
					liSrv.editClassBasis(data,function(res){
						_self.getclasslist({});
					})
				}
			},
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
			addclass(){//添加班级  点击需要先判断有无权限
				var _self = this;
				liSrv.addClassParamsCheck({},function(res){
					
				},function(res){
					if(res.code === 'E_NOPRIV'){
						alert('无操作权限');
						return ;
					}
					if(res.code === 'E_REF_INVAL'){
						_self.$router.push('/synthesis/addclass');
					}
				})
				
			},
			searchclass(){//搜索
				let data = {
					name:this.classname,
					class_type:this.classtype,
					state:this.classtate,
					show_state:this.show_state
				}
				this.getclasslist(data)
			},
			editclass(id){//是否判断有编辑权限
				this.$router.push({
					path:'/'+this.tzurl+'/editclass/editclassbasis',
					query:{
						id:id
					}
				})
			}
		}
	}
</script>