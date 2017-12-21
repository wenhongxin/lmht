<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_livecourse {
		.stu_class {
			margin: 20px 0;
			line-height: 30px;
			span {
				display: inline-block;
				border-bottom: 1px solid #c6c6c6;
				border-right: 1px solid #c6c6c6;
				a {
					float: left;
					width: 120px;
					height: 30px;
					border-left: 1px solid #c6c6c6;
					border-top: 1px solid #c6c6c6;
					text-align: center;
					display: block;
				}
				.active.router-link-exact-active {
					background: #FF8900;
					color: #FFFFFF;
				}
			}
		}
		h2 {
			font-size: 16px;
			font-weight: normal;
			padding: 15px 0;
			border-bottom: 1px solid #c6c6c6;
			margin-bottom: 20px;
			a {
				display: inline-block;
				width: 95px;
				user-select: none;
				background: url(/static/img/u1733.png) no-repeat 70px center;
			}
		}
		.h2-active {
			background: url(/static/img/u1731.png) no-repeat 70px center;
		}
		.showdown {
			margin-right: 10px;
			width: 30px;
			height: 30px;
			display: inline-block;
			float: right;
			background: url(/static/img/u1731.png) no-repeat center center;
		}
		.showup{
			background: url(/static/img/u1733.png) no-repeat center center;
		}
		.everycourse {
			margin: 15px 0;
			p {
				border-bottom: 1px solid #c6c6c6;
				line-height: 35px;
				padding-left: 3px;
				span {
					a {
						display: inline-block;
						color: #0000FF;
						height: 100%;
						width: 60px;
						padding: 0 10px;
						box-sizing: border-box;
					}
				}
				.rtwo {
					float: right;
				}
			}
		}
		.table {
			display: none;
			margin: 10px 0 50px 0;
		}
		.common_btn {
			display: inline-block;
			width: 75px;
			cursor: pointer;
		}
		.stkbot{
			display: table;
		}
		.showyn{
			line-height: 30px;
			padding-top: 10px;
		}
		a.aover{
			color: #999!important;
			cursor: default;
		}
	}
</style>
<template>
	<div id="stu_file_livecourse">
		<div class="stu_class">
			<span>
				<router-link :to='{name:"stu_file_livecourse",query:{id:id,num:1}}' active-class="active" >正式班</router-link>
				<router-link :to='{name:"stu_file_livecourse",query:{id:id,num:2}}' active-class="active" >试听班</router-link>
				<router-link :to='{name:"stu_file_livecourse",query:{id:id,num:4}}' active-class="active" >测试班</router-link>
				<router-link :to='{name:"stu_file_livecourse",query:{id:id,num:3}}' active-class="active" >内测班</router-link>
			</span>
		</div>
			<router-link :to='{name:"stu_sign_up",query:{type:1,num:showNum}}' class="common_btn"  v-if='showNum=="2"'>预约报名</router-link>
			<router-link :to='{name:"stu_sign_up",query:{type:1,num:showNum}}' class="common_btn" v-else>报班</router-link>
			
			<table  v-if='showNum=="2"' border="1" class="table stkbot">
				<thead>
					<tr>
						<td width="135">预约时间</td>
						<td width="135">试听课</td>
						<td width="135">学生到课时间</td>
						<td width="135">学生下课时间</td>
						<td width="100">回答问题数</td>
						<td width="135">回答正确率</td>
						<td width="120">回答问题等待时间</td>
						<td>状态</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='v in livelisttwo'>
						<td>{{v.start}}</td>
						<td>{{v.class_name}}</td>
						<td>{{v.start_time}}</td>
						<td>{{v.end_time}}</td>
						<td>{{v.reply_quick_question}}</td>
						<td>{{v.correct_rate}}</td>
						<td>{{v.reply_time}}</td>
						<td>预约成功</td>
					</tr>
				</tbody>
			</table>
				
			
			<div v-else class="everycourse" v-for='item in livelist'>
				<p><span>报名日期：{{item.ctime_map}}　</span><span>班级编号：{{item.id}}　</span><span>班级名称：{{item.name}}　</span><span>年级：{{item.grade_map}}　</span><span>授课老师：{{item.teacher_name}}　</span>
					<a :class='{"showdown":ykk}' href="javascript:;;" @click='showdown($event)'></a>
					<span class="rtwo">
					<a href="javascript:;;" @click='goPagesignUp(item.id,"stu_sign_up")'>续费</a>
					<a href="javascript:;;" v-if='item.order_state!="2" && item.state!="2"' @click='goPageExitclass(item.order_id,"stu_exit_class")'>退班</a>
					<a href="javascript:;;" v-if='item.order_state=="2"' class="aover">已退班</a>
					<a href="javascript:;;" v-if='item.state=="2"' class="aover">已结课</a>
				</span>
				</p>

				<table class="table" border="1">
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
						</tr>
					</tbody>
				</table>
			</div>
			<p class="showyn" v-show="showyn">该学生暂时没有直播课…………</p>

	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'stu_file_livecourse',
		data() {
			return {
				ykk: true,
				showyn: false,
				id: this.$route.query.id,
				livelist: null,
				livelisttwo:null,
				studentIpadorderId:'',
				num:''
			}
		},
		computed:{
			showNum(){
				var num = this.$route.query.num;
				this.flushCom(num)
				this.num=num;
				return num;
			}
		},
		created() {
			var _self = this;
			liSrv.studentIpad(_self.id, function(res) {
				$.each(res, function(i, v) {
					if(v.state == 1) {
						_self.studentIpadorderId = v.order_id;
					}
				});
			}, function() {

			})
		},
		methods: {
			flushCom(num){
				var _self = this;
				if(num=="2"){
					liSrv.getAuditionlist(_self.id, function(res) {
						_self.showyn=false;
						_self.livelisttwo = res;
					},function(err){
						_self.livelisttwo = [];
						$(".stkbot").hide()
						_self.showyn=true;
					})
				}else{
					liSrv.directorLiveRecordList({
						class_type:num,
						student_id: this.id
					}, function(res) { //获取已报班情况
						_self.showyn=false;
						_self.livelist = res;
					},function(err){
						if(err.code=="E_NOT_DATA"){
							_self.livelist = [];
							_self.showyn=true;
						}
					})
				}
				
			},
			showdown($event) {
				$(event.target).toggleClass("showup");
				$(event.target).parent().next(".table").toggle();
			},
			goPagesignUp(id,path){
				var _self=this;
				common.setS('xu_class_id', id);
				this.$router.push({
					name: path,
					query: {
						type: 2,
						num:this.num
					}
				})
				
			},
			goPageExitclass(id, path) {
				if(id==""){
					alert("由于该班属于连报班，没有订单号，故无法退班");
					return;
				}
				if(this.studentIpadorderId && this.livelist.length == 1) {
					alert('请先退ipad');
					return;
				}
				common.setS('exit_class_order_num', id);
				this.$router.push({
					name: path,
					query: {
						num:this.num
					}
				})
			}
		}
	}
</script>