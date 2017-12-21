<style lang="less" rel="stylesheet/less" scoped>
	#addclass {
		h3 {
			padding: 14px 0 17px 0;
			font-size: 16px;
		}
		ul li,.right p{
			cursor: pointer;
		}
		.container_book {
			width: 100%;
			display: flex;
			flex-direction: column;
			background: #f0f1f2;
		}
		.container_book section {
			overflow: hidden;
			width: 95%;
			margin: 40px auto;
			height: 96%;
		}
		.container_book .left {
			position: relative;
			width: 50%;
			height: 700px;
			float: left;
		}
		.container_book .left ul,
		.container_book .right {
			float: left;
			height: 100%;
			overflow: hidden;
			overflow-y: auto;
			box-sizing: border-box;
		}
		.container_book .lesson_plan {
			border: 1px solid #CCCCCC;
			width: 50%;
			background: #FFFFFF;
			text-align: center;
		}
		.container_book .lesson_plan li:nth-child(odd){
			background: #f3f1ee;
		}
		.container_book .class_less {
			border: 1px solid #CCCCCC;
			border-left:none;
			height: 670px !important;	
			margin-top: 15px;
			width: 50%;
			background: #fff;
			li{
				border-top: 1px solid #FFFFFF;
				padding:10px 0 9px 20px ;
			}
		}
		.container_book .lesson_plan li,
		.container_book .right p ,
		table tr td{
			width: 100%;
			padding: 10px 0;
		}
		table{
			width: 100%;
			tr{
				width: 100%;
				td{
					padding-left: 20px;
				}
			}
		}
		.container_book .left .lesson_plan li a {
			line-height: 22px;
			display: block;
			width: 100%;
		}
		.container_book .active {
			background: #FF8900 !important;
			color: #FFFFFF;
		}
		.container_book .center {
			width: 60px;
			position: relative;
			float: left;
			height: 700px;
		}
		.container_book .center:after{
			display: block;
			content: '';
			border-width: 8px 8px 8px 8px;
			border-style: solid;
			border-color: transparent transparent transparent  #999;
			position: absolute;
			top: 30px;
			left: 50%;
			margin-left: -4px;
		}
		.container_book .right {
			width: 30%;
			height: 700px;
			background: #fff;
			border: 1px solid #FF8900;
			float: left;
			box-sizing: border-box;
		}
		.container_book table td span,.container_book table td span i{
			float: right;
			display: inline-block;
			width: 14px;
			height: 14px;
			cursor: pointer;
			transform: translateY(2px);
			margin-right: 15px;
		}
		.container_book table td .yd{
			pointer-events: none;
		}
		.container_book table td .yd {
			cursor: default;
			background: url(../../../../assets/yd.jpg) no-repeat;
			background-size:100% 100%;
		}
		.container_book table td:hover .yd{
			background: url(../../../../assets/yd-a.jpg) no-repeat;
			background-size:100% 100%;
		}
		.container_book table td .del:hover{
			background: url(../../../../assets/del-a.jpg) no-repeat;
			background-size:100% 100%;
		}
		.container_book table td .del{
			background: url(../../../../assets/del.jpg) no-repeat;
			background-size:100% 100%;
		}
		.next {
			margin-bottom:30px;
			width: 80px;
		}
		.not{
			padding-left: 22px;
			color:#ccc;
		}
	}
</style>
<template>
	<div id="addclass" :class="{'content_sub':!classid}">
		<h2 class="tit"  v-if='!classid'>
  		班级管理
  	</h2>
		<h3  v-if='!classid'>第二步：选择课程</h3>
		<div class="container_book">
			<section>
				<div class="left">
					<ul class="lesson_plan" id="lesson_plan">
						<li  v-for = '(item,i) in planlist' :class='{"active":i==isactive}' @click='chooseplan(i,item.id)'>{{item.name}}</li>
					</ul>
					<ul id="class_less" class="class_less list">
						<li v-for = 'le in lessonlist' :class='{"active":yeshtmlArr.indexOf(le.course_id+"、"+le.title)!=-1 || nothtmlArr.indexOf(le.course_id+"、"+le.title)!=-1}' @click='chooselesson(le.course_id,le.title,le.lesson_type)' :data-id='le.course_id'>{{le.id}}、{{le.title}}</li>
					</ul>
				</div>
				<div class="center"></div>
				<div class="right" id="cont">
						<div class="not">
							<p  v-for = 'v in nothtmlArr' :data-id = 'v.split("、")[0]'>{{v}}</p>
						</div>
						<table class="yes" v-tableDn = 'tableDnFn'>
							<tr v-for = '(v,i) in yeshtmlArr' :data-index='i' :data-id = 'v.split("、")[0]'>
								<td>{{v}}<span @click='dellesson(i)' class="del"></span><span class="yd"></span></td>
							</tr>
						</table>
				</div>
				
			</section>
		</div>
		<a href="javascript:;;" class="common_btn next" @click='addok'>提交</a>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'addclass',
		data() {
			return {
				classlist: '',
				classname: '',
				classtype: '',
				classtate: '',
				addclassdata:common.getS('addclassdata'),
				coursenum:'',
				planlist:'',
				lessonlist:'',
				isactive:0,
				isactive1:'',
				yeshtmlArr:[],
				nothtmlArr:[],
				lessonidArr:[]//存lesson_type为1的id
			}
		},
		created() {
			var _self = this;
			liSrv.adminTeacherPlanList(function(res){
				_self.planlist = res;
				_self.getlesson(res[0].id)
			})
			if(_self.classid){
				_self.getclassinfo();
			}else{
				this.coursenum = this.addclassdata.course_count;
			}
		},
		props:['classid'],
		methods: {
			getclassinfo(){//获取班级信息
				var _self = this;
				liSrv.getClassInfo(this.classid,function(res){
					var data = res.data.lesson_list;
					_self.coursenum = res.data.course_count;
					$.each(data,function(i,v){
						if(v.lesson_type=='1'){
							_self.lessonidArr.push(v.course_id)
						}
						var txt = v.course_id+'、'+v.title;
						if(v.state == 3 || v.state == 2){
							_self.nothtmlArr.push(txt)
						}else{
							if(_self.yeshtmlArr.indexOf(txt)==-1){
								_self.yeshtmlArr.push(txt)
							}
						}
					})
				})
			},
			getlesson(id){//获取课时
				var _self = this;
				var data = {
					pageSize:'1000',
					teach_plan_id:id
				}
				liSrv.teacherPlanCourseList(data,function(res){
					_self.lessonlist = res.list;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
						_self.lessonlist = '';
					}
				})
			},
			chooseplan(idx,id){//选择教案
				this.isactive = idx;
				this.getlesson(id)
			},
			chooselesson(id,tit,type){//选择课时
				this.isactive1 = id;
				var txt = id+'、'+tit;
				var len = this.lessonidArr.length;
				if(this.yeshtmlArr.indexOf(txt)==-1 && this.nothtmlArr.indexOf(txt)==-1){
					if(type==1){
						if(len>=this.coursenum){
							alert("最多添加"+this.coursenum+'个正式课');
							return;
						}
						this.lessonidArr.push(id);
					}
					this.yeshtmlArr.push(txt);
				}
			},
			dellesson(index){//删除课时
				var id = this.yeshtmlArr[index].split("、")[0];
				var idx = this.lessonidArr.indexOf(id);
				if(idx>-1){
					this.lessonidArr.splice(idx,1);
				}
				this.yeshtmlArr.splice(index,1);
			},
			tableDnFn(table,row){
				
			},
			addok() {
				var arr = [],_self = this;
				var len = this.lessonidArr.length;
				if(len!=this.coursenum){
					alert("请添加"+this.coursenum+'个正式课');
					return;
				}
				if(!this.classid){//添加的时候
					$(".yes tr").each(function(){
						arr.push($(this).data('id'))
					})
					this.addclassdata['course_id'] = arr.join(',');
					liSrv.addClass(this.addclassdata,function(res){
							alert('添加成功');
							common.setS('addclassdata',''),
							_self.addclassdata = '';
							_self.$router.push('classmanage')
					})
				}else{//修改的时候
					$(".not p").each(function(){
						arr.push($(this).data('id'))
					})
					$(".yes tr").each(function(){
						arr.push($(this).data('id'))
					})
					var str = arr.join(',');
					liSrv.editClassLesson({class_id:_self.classid,course_id:str},function(res){
						alert('修改成功');
					})
				}
			}
		}
	}
</script>