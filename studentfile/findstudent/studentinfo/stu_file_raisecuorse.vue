<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_raisecuorse {
		.pline{
			padding-top: 20px;
			line-height: 30px;
		}
		.addplan {
			margin-bottom: 20px;
			height: 36px;
			a {
				float: right;
			}
		}
		.table span {
			width: 100%;
			display: block;
			height: 100%;
			min-height: 24px;
			position: relative;
		}
		table i{
			cursor: default;
		}
		.everyplan {
			padding-top: 30px;
			margin-bottom: 30px;
			p a {
				height: 36px;
				line-height: 36px;
				margin-left: 20px;
			}
			.table {
				margin-top: 10px;
				.td-yellow {
					background: #ebd838;
				}
				.span-cj {
					width: 250px !important;
					white-space: nowrap;
					width: auto;
					padding: 0;
					span {
						display: inline-block;
						width: 20%;
						height: 100%;
						padding: 5px 0;
						box-sizing: border-box;
						border-right: 1px solid #EFEFEF;
						text-align: center;
						&:last-child {
							border-right: none;
						}
					}
				}
				.span-cj1 {
						width: 300px !important;
						span{
							width: 10%;
						}
					}
				.tr-disabled:hover {
					background: #EFEFEF !important;
				}
				.tr-disabled {
					background: #EFEFEF;
					color: #CCCCCC;
					pointer-events: none;
					td {
						background: #EFEFEF;
						pointer-events: none;
						span,
						i {
							background: #EFEFEF;
							color: #CCCCCC;
							pointer-events: none;
							cursor: default;
						}
						&:last-child {
							i {
								color: #3a5fb5;
							}
						}
					}
				}
			}
			.vertable {
				width: 100%;
				border-collapse: collapse;
				border: 1px solid #E0E0E0;
				margin: 10px 0 20px 0;
				tr {
					height: 72px;
					line-height: 24px;
					td {
						padding-left: 10px;
						i {
							color: #3a5fb5;
						}
					}
					.bgef {
						background: #EFEFEF;
					}
				}
			}
		}
	}
</style>
<template>
	<div id="stu_file_raisecuorse">
		<div v-show="!tasklist" class="pline">该学生暂时没有综合提高课……</div>
		<div class="everyplan" v-for='item in tasklist'>
			<p>计划发布日期：{{item.ctime_man}}
			</p>
			<table class='vertable' border="1" id="stuhistory">
				<tbody>
					<tr>
						<td width="80" class="bgef">学习内容</td>
						<td width="400">{{item.content || '暂无'}}</td>
						<td width="60" class="bgef">周评</td>
						<td>{{item.week_commnet || '暂无'}}</td>
					</tr>
				</tbody>
			</table>
			<table class="table" border="1" id="stuhistory">
				<thead>
					<tr>
						<td width="90">日期</td>
						<td width="45">星期</td>
						<td width="100">编号</td>
						<td width="auto">成绩</td>
						<td width="60">用时</td>
						<td width="60">分数</td>
						<td width="60">评级</td>
						<td width="70">学习进度</td>
						<td>备注</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='v in item.relationInfo' :data-id="v.relation_id" :class="{'tr-disabled':v.status==2}">
						<td>{{v.task_date}}</td>
						<td>{{v.week}}</td>
						<td>{{v.material_start}}-{{v.material_end}}</td>
						<td class="span-cj"  :class='{"span-cj1":item.question_num==10}'>
							<span v-for='i in parseInt(item.question_num)' :class='{"td-yellow":parseInt(v["score_"+i])}' class="span-type span-type1" v-text='v["score_"+i]'></span>
						</td>
						<td><span>{{v.consume_time}}</span></td>
						<td><span>{{v.total_score}}</span></td>
						<td :class='{"td-yellow":v.rating!=null && v.rating!="A"&&v.rating!="A+"&&v.rating!="A-"}'><span class="span-type span-type2">{{v.rating}}</span></td>
						<td  :class='{"td-yellow":v.progress_id=="2"}'><span class="span-type span-type3">{{v.progress_name}}</span></td>
						<td>{{v.remark || '暂无'}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'stu_file_raisecuorse',
		data() {
			return {
				id: this.$route.query.id,
				tasklist: null,
				pageCount: '1',
				nextString: '1',
				total: '0'
			}
		},
		components:{
			trunPage
		},
		created() {
			var _self = this;
			this.gettasklist();
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data =  {
					student_id: this.id,
					page:nextString
				}
				liSrv.directorGetTaskList(data, function(res) {
					_self.tasklist = res.list
				})
			},	
			gettasklist() {
				var data = {
						student_id: this.id
					},
					_self = this;
				liSrv.directorGetTaskList(data, function(res) {
					_self.tasklist = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				}, function(res) {
					if(res.code == "E_NOT_DATA") {
						_self.tasklist = null;
					}
				})
			}
		}
	}
</script>