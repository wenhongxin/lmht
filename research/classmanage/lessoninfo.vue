<style lang="less" rel="stylesheet/less" scoped>
	#lessoninfo {
		.disable{
			background: #EFEFEF;
			color:#999;
			a,i{
				pointer-events:none;
				color: #999;
			}
			.hf{
				 color: #3a5fb5;
				  pointer-events:auto;
			}
		}
		.hf{
			color: #999;
			pointer-events:none;
		}
	}
</style>
<template>
	<div id="lessoninfo" class="content_sub">
		<h2 class="tit">
  		班级ID:{{classid}}　班级名称：{{classname}}　主讲老师：{{teachername}}
  	</h2>
		<table class="table"  border="1">
			<thead>
		    <tr>
		      <td>ID</td>
		      <td>课时名称</td>
		      <td>上课时间</td>
		      <td>上课时长</td>
		      <td>回放</td>
		      <td>快速问答</td>
		    </tr>
  		</thead>
  		<tbody id="tbody" >
  				<tr v-if='!courselist'>
  					<td  colspan="12">暂无课时！！！</td>
  				</tr>
  				<tr v-for = 'item in courselist' :class='{"disable":item.lesson_state==3 || item.lesson_state==2}'>
  					<td>{{item.lesson_id}}</td>
			      <td>{{item.title}}</td>
			      <td><i @click='editime1(item.lesson_id,item.lesson_state)' v-text='item.lesson_state!=3?item.lesson_begin_time:item.lesson_real_begin_time'>{{}}</i></td>
			      <td><i @click='editime(item.lesson_id,item.lesson_state)'  v-text='item.lesson_state!=3?item.lesson_time_length_map:item.lesson_real_time_length_map'></i></td>
			      <td><router-link :to='{path:"seevideo",query:{id:item.lesson_id,name:item.title,class_name:classname}}' class="hf">回放</i></router-link>
			      <td>{{item.quick_question_count_map}}</td>
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
		name: 'lessoninfo',
		data(){
			return {
				courselist:'',
				classid:this.$route.query.id,
				classname:this.$route.query.class_name,
				teachername:this.$route.query.teacher_name,
				pageCount:'1',
				nextString:'1',
				total:'0',
			}
		},
		components:{
			trunPage
		},
		created(){
			var _self = this;
			liSrv.getClassCourseList({class_id:_self.classid},function(res){
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.courselist = res.list;
			},function(res){
				if(res.code == 'E_NOT_DATA'){
					_self.pageCount = '1';
					_self.nextString = '1';
					_self.courselist = '';
				}
			})
		},
		methods:{
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				liSrv.getClassCourseList({class_id:_self.classid,page:nextString},function(res){
					_self.courselist = res.list
				})
			},
			editime(id,state){
				if(state!='0'){
					alert('本课程正在上课，不可编辑')
					return ;
				} 
				$(event.target).tableEditor({
					title:'编辑上课时长',
					type:'select',
					options:[
						{name:'30分钟',value:'1800'},
						{name:'40分钟',value:'2400'},
						{name:'50分钟',value:"3000"},
						{name:'1小时',value:"3600"},
						{name:'70分钟',value:"4200"},
						{name:'80分钟',value:"4800"},
						{name:'90分钟',value:"5400"},
						{name:'100分钟',value:"6000"},
						{name:'110分钟',value:"6600"},
						{name:'2小时',value:"7200"}
					],
					success:function(val,fn){
						liSrv.classCourseEdit({lesson_id:id,time_length :val},function(){
							fn()
						})
					}
				})
			},
			editime1(id,state){
				if(state!='0'){
					alert('本课程正在上课，不可编辑')
					return ;
				} 
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑上课时间',
					type:'date',
					hms:true,
					success:function(val,fn){
						liSrv.classCourseEdit({lesson_id:id,begin_time :val},function(){
							fn()
						})
					}
				})
			}
		}
	}
</script>