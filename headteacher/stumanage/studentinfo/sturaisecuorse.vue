<style lang="less" rel="stylesheet/less" scoped>
	#sturaisecuorse {
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
			cursor: pointer;
			position: relative;
		}
		.everyplan {
			margin-bottom: 50px;
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
						float:left;
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
								pointer-events: auto;
								cursor: pointer;
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
							cursor: pointer;
							color: #3a5fb5;
						}
					}
					.bgef {
						background: #EFEFEF;
					}
				}
			}
		}
		.addplanalert {
			width: 430px;
			height: auto;
			max-height: 600px;
			overflow-y: auto;
			background: #FFFFFF;
			border: 1px solid #CCCCCC;
			position: absolute;
			border-radius: 3px;
			top: 50%;
			margin-top: -300px;
			left: 50%;
			margin-left: -100px;
			z-index: 5;
			.addplantable {
				width: 245px;
				margin: 15px 0 0 100px;
			}
			p {
				margin: 15px 0 0 30px;
				input {
					width: 100px;
					height: 24px;
					padding-left: 10px;
				}
				select {
					width: 245px;
					height: 24px;
				}
				textarea {
					width: 245px;
					height: 70px;
				}
			}
			.btn {
				color: #CCCCCC;
				float: right;
				margin: 25px 25px 20px 0;
				a {
					width: 70px;
					height: 28px;
					line-height: 28px;
					display: inline-block;
					border-radius: 3px;
					margin-left: 5px;
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
	<div id="sturaisecuorse">
		<div class="addplan">
			<a href="javascript:;;" class="common-btn" @click='isaddplan = true'>添加计划</a>
		</div>
		<div class="everyplan" v-for='item in tasklist' v-clickedit='collbackfn' v-if='tasklistFlag'>
			<p>计划发布日期：{{item.ctime_man}}
				<router-link :to="{path:'/sendplan',query:{type:1,stuid:id,taskid:item.id}}" target='_blank' class="common-btn">发送计划</router-link>
				<router-link :to="{path:'/sendplan',query:{type:2,stuid:id,taskid:item.id}}" target='_blank' class="common-btn">回顾计划</router-link>
			</p>
			<table class='vertable' border="1" id="stuhistory">
				<tbody>
					<tr>
						<td width="80" class="bgef">学习内容</td>
						<td width="400"><i @click='editlearncont(item.id)'>{{item.content || '暂无'}}</i></td>
						<td width="60" class="bgef">周评</td>
						<td><i @click='editappraise(item.id)'>{{item.week_commnet || '暂无'}}</i></td>
					</tr>
				</tbody>
			</table>
			<table class="table" border="1" id="stuhistory">
				<thead>
					<tr>
						<td width="90">日期</td>
						<td width="45">星期</td>
						<td width="210">编号</td>
						<td width="auto">成绩</td>
						<td width="60">用时</td>
						<td width="60">分数</td>
						<td width="60">评级</td>
						<td width="70">学习进度</td>
						<td>备注</td>
						<td width="50">操作</td>
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
						<td><span @click='editime(v.relation_id)'>{{v.consume_time}}</span></td>
						<td><span @click='editscore(v.relation_id)'>{{v.total_score}}</span></td>
						<td  :class='{"td-yellow":v.rating!=null && v.rating!="A"&&v.rating!="A+"&&v.rating!="A-"}'><span class="span-type span-type2">{{v.rating}}</span></td>
						<td  :class='{"td-yellow":v.progress_id=="2"}'><span class="span-type span-type3">{{v.progress_name}}</span></td>
						<td><i @click='editremark(v.relation_id)'>{{v.remark || '暂无'}}</i></td>
						<td><i @click='collbackfn(v.status,4,v.relation_id)'>{{v.status_name}}</i></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="addplan addplanalert" v-if='isaddplan'>
			<p>　　时间：　<input type="text" class="Wdate start-time" onclick="WdatePicker()" @blur='timeinputblur' /> 至 <input type="text" class="Wdate end-time" onclick="WdatePicker()" @blur='timeinputblur' /></p>
			<p>每天出题数：
				<select v-model='questionnum'>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
			</p>
			<table class="table addplantable" border="1" v-show='totalDays'>
				<thead>
					<tr>
						<td width="85">日期</td>
						<td colspan="2" class="td-center">教材编号</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(v,i) in totalDays'>
						<td>{{v}}</td>
						<td width="77"><span @click='editaddplanbh(1,i)'>{{planbh1[i]}}</span></td>
						<td width="77"><span @click='editaddplanbh(2,i)'>{{planbh2[i]}}</span></td>
					</tr>
				</tbody>
			</table>
			<p>　学习内容：<textarea v-model.trim='learncontent'></textarea></p>
			<span class="btn">
				<a href="javascript:;;"class="common_btn"  @click='qxaddplan'>取消</a>
				<a href="javascript:;;"class="common_btn" @click='okaddplan'>确定</a>
			</span>
		</div>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'sturaisecuorse',
		data() {
			return {
				start_time: '',
				end_time: '',
				isaddplan: false,
				totalDays: null,
				planbh1: [],
				planbh2: [],
				id: this.$route.query.id,
				tasklist: null,
				tasklistFlag:true,
				questionnum:'5',
				learncontent:'',
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
			this.gettasklist(true);
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data =  {
					student_id: this.id,
					page:nextString
				}
				_self.tasklistFlag = false;
				liSrv.directorGetTaskList(data, function(res) {
					_self.tasklistFlag = true;
					_self.tasklist = res.list
				})
			},	
			gettasklist(flag) {
				var data = {
						student_id: this.id,
						page:	this.nextString
					},
					_self = this;
				liSrv.directorGetTaskList(data, function(res) {
					_self.tasklist = res.list;
					if(flag){
						_self.total = res.total;
						_self.pageCount = res.pageCount;
						_self.nextString = '1';
					}
				}, function(res) {
					if(res.code == "E_NOT_DATA") {
						_self.tasklist = null;
					}
				})
			},
			okaddplan() { //确定添加计划
				var len = this.totalDays ? this.totalDays.length : null;
				if(!len ||  this.planbh1.length!=this.planbh2.length || this.planbh2.length!=len || !this.learncontent){
					alert('请将信息填写完整')
					return ;
				}
				var _self = this;
				var data  = {
					start_time:this.totalDays[0],
					end_time:this.totalDays[this.totalDays.length-1],
					question_num:this.questionnum,
					content:this.learncontent,
					student_id:this.id,
					task_date:this.totalDays,
					material_start:this.planbh1,
					material_end:this.planbh2,
					week_commnet:'暂无'
				}
				_self.tasklistFlag = false;
				liSrv.directorAddTask(data,function(res){
					_self.totalDays=null;
					_self.start_time = '';
					_self.end_time = '';
					_self.questionnum='5';
					_self.learncontent='';
					_self.planbh1 = [];
					_self.planbh2 = [];
					_self.isaddplan = false;
					_self.tasklistFlag = true;
					_self.gettasklist(true);
					//_self.$router.go(0);
				})
//				console.log(this.totalDays)
//				console.log(this.planbh1)
//				console.log(this.planbh2)
			},
			editaddplanbh(type, idx) { //编辑教材编号
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑教材编号',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						type == 1 ? _self.planbh1[idx] = val : _self.planbh2[idx] = val;
						fn();
					}
				})
			},
			qxaddplan() { //取消添加教案
				this.isaddplan = false;
				this.start_time = '';
				this.end_time = '';
				this.totalDays = null;
			},
			TodoTime(begin, end) { //获取两个时间中间的所有时间
				var ab = begin.split("-");
				var ae = end.split("-");
				var db = new Date();
				db.setFullYear(ab[0], ab[1] - 1, ab[2]);
				var de = new Date();
				de.setFullYear(ae[0], ae[1] - 1, ae[2]);
				var a = [];
				for(var i = 0, temp = db; temp < de; i++) {
					a[i] = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate();;
					temp.setTime(temp.getTime() + 24 * 60 * 60 * 1000);
				}
				a[i] = de.getFullYear() + "-" + (de.getMonth() + 1) + "-" + de.getDate();
				return a;
			},
			//返回1900-01-01格式的字符串
			timeinputblur() { //选择开始结束时间
				var _self = this;
				setTimeout(function() {
					var start_time = $('.start-time').val();
					var end_time = $('.end-time').val();
					if(start_time && end_time) {
						if(_self.start_time == start_time && _self.end_time == end_time) return;
						_self.start_time = start_time;
						_self.end_time = end_time;
						if(start_time > end_time) {
							alert('时间有误');
							_self.totalDays = null;
							return;
						}
						_self.totalDays = _self.TodoTime(start_time, end_time);
					}
				}, 500)
			},
			collbackfn(val, type, id, idx,data1) { //指令回掉函数
				if(!type)return ;
				var data = {
						relation_id: id,
						student_id: this.id
					},
					_self = this;
				switch(type) {
					case 1:
						data['score_' + idx] = val;
						break;
					case 2:
						data.rating = val;
						break;
					case 3:
						data.progress_id = val;
						break;
					case 4:
						if(val==1){
							val=2;
						}else{
							val=1;
						}
						data.status = val;
					break;
					case '911':
						data = data1;
						break;
				}
				//console.log(data)
				liSrv.directorEditTask(data, function(res) {
					_self.gettasklist();
					//console.log(data)
					//console.log(val, type, id, idx)
				})
			},
			editlearncont(id) { //修改学习内容
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑学习内容',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						var data={
							task_id : id,
							student_id: _self.id,
							content:val
						};
						_self.collbackfn('','911','','',data);
						fn()
					}
				})
			},
			editappraise(id) { //修改周评
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑周评',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						var data={
							task_id : id,
							student_id: _self.id,
							week_commnet:val
						};
						_self.collbackfn('','911','','',data);
						fn()
					}
				})
			},
			editremark(id) { //修改备注
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑备注',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						var data={
							relation_id: id,
							student_id: _self.id,
							remark:val
						};
						_self.collbackfn('','911','','',data);
						fn()
					}
				})
			},
			editime(id) { //修改用时
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑用时',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						var data={
							relation_id: id,
							student_id: _self.id,
							consume_time:val
						};
						_self.collbackfn('','911','','',data);
						fn()
					}
				})
			},
			editscore(id) { //修改分数
				var _self = this;
				$(event.target).tableEditor({
					title: '编辑分数',
					type: 'text',
//					isempty: true,
					success: function(val, fn) {
						var data={
							relation_id: id,
							student_id: _self.id,
							total_score:val
						};
						_self.collbackfn('','911','','',data);
						fn()
					}
				})
			}
		},
		directives: {
			clickedit: {
				inserted(el, binding, vnode) { //双击添加标签
					setTimeout(function(){
						fn(el, binding, vnode)
					},700)
				}
			}
		},
	}

	function fn(el, binding, vnode) {
		var Fn = binding.value;
		var type, id, idx;
		var span1 = $(el).find('.span-type1');
		var span2 = $(el).find('.span-type2');
		var span3 = $(el).find('.span-type3');
		var spantype = $(el).find('.span-type');
		span1.on('click', function(e) {
			e.stopPropagation();
			$('.head-teacher-edit').remove();
			type = 1;
			id = $(this).parents('tr').data('id');
			idx = $(this).index() + 1;
			var str = '<ul class="head-teacher-edit head-teacher-edit1">' +
				'<li><b class="bgccc">无</b><b  class="notyellow">√</b><b>1</b><b>2</b><b>3</b><b>4</b></li>' +
				'<li><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b><b>10</b></li>' +
				'</ul>'
			$(this).append($(str));
		});
		span2.on('click', function(e) {
			e.stopPropagation();
			$('.head-teacher-edit').remove();
			type = 2;
			idx = '';
			id = $(this).parents('tr').data('id');
			var str = '<ul class="head-teacher-edit head-teacher-edit2">' +
				'<li><b class="notyellow">A+</b><b class="notyellow">A</b><b class="notyellow">A-</b></li>' +
				'<li><b>B+</b><b>B</b><b>B-</b></li>' +
				'</ul>';
			$(this).append($(str));
		});
		span3.on('click', function(e) {
			e.stopPropagation();
			$('.head-teacher-edit').remove();
			type = 3;
			idx = '';
			id = $(this).parents('tr').data('id');
			var str = '<ul class="head-teacher-edit head-teacher-edit3">' +
				'<li><b class="notyellow">正常进行</b><b>计划调整</b></li>' +
				'</ul>';
			$(this).append($(str));
		})
		
		$(spantype).on('click', '.head-teacher-edit li b', function(e) {
			e.stopPropagation();
			var val = $(this).text();
			switch(val) {
				case '正常进行':
					val = '1';
					break;
				case '计划调整':
					val = '2';
					break;
				case '无':
					val = '12'
					break;
				case '√':
					val = '11'
					break;
			}
			Fn(val, type, id, idx);
			$('.head-teacher-edit').remove();
		})
		$('#studentinfo').on('click', function() {
			$('.head-teacher-edit').remove();
		})
	}
</script>