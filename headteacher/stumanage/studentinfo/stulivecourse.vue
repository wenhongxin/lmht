<style lang="less" rel="stylesheet/less" scoped>
	#stulivecourse {
		h2{
			font-size: 16px;
			font-weight: normal;
			padding: 15px 0;
			border-bottom: 1px solid #c6c6c6;
			margin-bottom: 20px;
			a{
				display: inline-block;
				width: 95px;
				user-select:none;
				background: url(/static/img/u1733.png) no-repeat 70px center;
			}
		}
		.h2-active{
			background: url(/static/img/u1731.png) no-repeat 70px center;
		}
		.everycourse{
			margin: 15px 0;
			p {
				padding-left: 3px;
				span{
					margin-right: 30px;
				}
			}
		}
		.table{
			margin: 10px 0 50px 0;
		}
	}
</style>
<template>
	<div id="stulivecourse">
		<h2 v-if='wkkbtn'><a @click='showcourse("wkk")' :class='{"h2-active":wkk}' href="javascript:;;">未开课</a></h2>
		<div class="everycourse" v-show='wkk'  v-for='item in livelist' v-if='item.state==4'>
			<p><span>报名日期：{{item.ctime_map}} </span><span>班级编号：{{item.id}} </span><span>班级名称：{{item.name}} </span><span>年级：{{item.grade_map}}</span><span>授课老师：{{item.teacher_name}}</span></p>
			<table  v-for='item in livelist' v-if='item.state==4' class="table" border="1" id="stuhistory">
				<thead>
					<tr>
						<td width="80">课次</td>
						<td width="180">学习内容</td>
						<td width="135">上课日期</td>
						<td width="135">学生到课时间</td>
						<td width="135">学生下课时间</td>
						<td width="80">回答问题数</td>
						<td width="60">正确率</td>
						<td width="115">回答问题等待时间</td>
						<td>备注</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='v in item.live_record'>
						<td>{{v.index}}</td>
						<td>{{v.title}}</td>
						<td>{{v.begin_time}}</td>
						<td>{{v.start_time}}</td>
						<td>{{v.end_time}}</td>
						<td>{{v.reply_quick_question}}</td>
						<td>{{v.correct_rate}}</td>
						<td>{{v.reply_time}}</td>
						<td><i @click='editremark(v.id)'>{{v.remarks || '暂无'}}</i></td>
					</tr>
				</tbody>
			</table>
		</div>
		<h2><a @click='showcourse("ykk")' :class='{"h2-active":ykk}' href="javascript:;;">已开课</a></h2>
		<div class="everycourse" v-show='ykk'   v-for='item in livelist' v-if='item.state!=4'>
			<p><span>报名日期：{{item.ctime_map}} </span><span>班级编号：{{item.id}} </span><span>班级名称：{{item.name}} </span><span>年级：{{item.grade_map}}</span><span>授课老师：{{item.teacher_name}}</span></p>
			<table class="table" border="1" id="stuhistory">
				<thead>
					<tr>
						<td width="50">课次</td>
						<td width="180">学习内容</td>
						<td width="135">上课日期</td>
						<td width="135">学生到课时间</td>
						<td width="135">学生下课时间</td>
						<td width="80">回答问题数</td>
						<td width="60">正确率</td>
						<td width="115">回答问题等待时间</td>
						<td>备注</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='v in item.live_record'>
						<td>{{v.index}}</td>
						<td>{{v.title}}</td>
						<td>{{v.begin_time}}</td>
						<td>{{v.start_time}}</td>
						<td>{{v.end_time}}</td>
						<td>{{v.reply_quick_question}}</td>
						<td>{{v.correct_rate}}</td>
						<td>{{v.reply_time}}</td>
						<td><i @click='editremark(v.id)'>{{v.remarks || '暂无'}}</i></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'stulivecourse',
		data() {
			return {
				wkk:false,
				wkkbtn:false,
				ykk:true,
				id: this.$route.query.id,
				livelist:null
			}
		},
		created() {
			var _self = this;
			liSrv.directorLiveRecordList({student_id:this.id},function(res){
				_self.livelist = res;
				_self.livelist .forEach(function(v,i){
					if(v.state==4){
						_self.wkkbtn = true;
					}
				})
			})
		},
		
		methods: {
			showcourse(type){
				this[type] = !this[type]
			},
			editremark(id){//修改备注
				var _self = this;
				if(!id)return;
				$(event.target).tableEditor({
					title:'编辑备注',
					type:'text',
					isempty:true,
					success:function(val,fn){
						var data ={
							student_id:_self.id,
							record_id:id,
							remarks :val
						}
						liSrv.directorLiveRecordEdit(data,function(res){
							fn()
						})
						
					}
				})
			}
		}
	}
</script>