<style lang="less" rel="stylesheet/less" scoped>
	#stu_info {
		.tit {
			span {
				font-weight: normal;
				font-size: 16px;
			}
			i {
				float: right;
				font-weight: normal;
				font-size: 16px;
			}
		}
		.jbinfo {
			height: 200px;
			float: left;
			h4 {
				border: none;
			}
		}
		.download_sj {
			width: 310px;
			height: 147px;
			float: right;
			background: #E0E0E0;
			margin-top: 23px;
			li {
				height: 36px;
				line-height: 36px;
				border-bottom: 1px solid #FFFFFF;
			}
			i,
			span {
				display: inline-block;
			}
			i {
				width: 77px;
				text-align: center;
			}
			span {
				width: 115px;
				padding-left: 10px;
				box-sizing: border-box;
				border-left: 1px solid #FFFFFF;
				a {
					padding-right: 12px;
					color: #385eb5;
				}
			}
			.download_tit {
				background: #EFEFEF;
			}
		}
		p {
			margin-bottom: 15px;
			span {
				line-height: 24px;
			}
		}
		h4 {
			padding: 14px 0 17px 0;
			font-size: 16px;
			border-top: 1px solid #c6c6c6;
			a {
				font-size: 14px;
				font-weight: normal;
				padding-left: 20px;
				color: dodgerblue;
			}
		}
		.cp{
			tbody{
				tr{
					background: #E0E0E0;
					a{
						margin-right: 10px;
					}
				}
			}
		}
		em {
			display: block;
			height: 36px;
			a {
				display: inline-block;
				padding: 0 15px;
				color: #FFFFFF;
			}
		}
		ul {
			margin-bottom: 30px;
			width: 100%;
			background: #EFEFEF;
		}
		.ipad_exit {
			color: #333333;
			background: #E0E0E0;
		}
		.table {
			margin-top: 0;
			tr {
				border-bottom: 1px solid #FFFFFF;
				background: #EFEFEF;
			}
			.ipad_exit {
				color: #333333;
				background: #E0E0E0;
			}
			.yes_x_money {
				background: #E0E0E0;
			}
		}
		.p {
			margin: 0;
			padding:0;
			span{
				display: inline-block;
				height: 100%;
			}
			a {
				background: #ff8900;
				display: inline-block;
				color: #FFFFFF;
				height: 100%;
				padding: 6px 10px;
				box-sizing: border-box;
				border-right: 1px solid #FFFFFF;
			}
		}
	}
</style>
<template>
	<div id="stu_info" class="content_sub">
		<h2 class="tit">{{stuInfo.realname}} - <span>{{stuInfo.username}}</span><i v-if='stuInfo.student_type==1'>学习密码：{{stuInfo.password}}</i></h2>
		<div class="jbinfo">
			<h4>基本信息<router-link v-if='!yesorno' to="updatastuInfo">修改</router-link></h4>
			<p>
				<span>学生姓名：</span><span>{{stuInfo.realname}} - {{stuInfo.username}}</span><br />
				<span>学生学校：</span><span>{{stuInfo.school_name}}</span>
			</p>
			<p>
				<span>家长：</span><span>{{stuInfo.relationship}} {{stuInfo.jiazhang_name}}</span><br />
				<span>家庭收件地址：</span><span>{{stuInfo.address}}</span>
			</p>
		</div>
		<!--<ol class="download_sj">
			<li class="download_tit"><i></i><span>春季</span><span>秋季</span></li>
			<li><i>一卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
			<li><i>二卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
			<li><i>三卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
		</ol>-->
		<div class="clear"></div>
		<!--<h4>测评记录：</h4>
		<table class="table cp" border="1">
			<thead>
				<tr>
					<td width="300">试卷类型</td>
					<td width="300">测试时间</td>
					<td width="300">测试成绩</td>
					<td width="300">评测结果照片</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>三年级暑期培优班</td>
					<td>2015-3-25</td>
					<td>82</td>
					<td><a href="javascript:;;">1</a><a href="javascript:;;">1</a><a href="javascript:;;">1</a><a href="javascript:;;">1</a></td>
				</tr>
			</tbody>
		</table>-->
		<div v-if='isIpad'>
			<h4 style="padding-bottom:15px;">ipad信息</h4>
			<em v-if='!yesorno'>
				<router-link  v-if='!studentIpadorderId' :to="classlist?'ipad_rent':'stu_info'"  class="common_btn">ipad租用</router-link>
				<router-link v-if='studentIpadorderId' to="ipad_t_rent"  class="common_btn">退租</router-link>
			</em>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="108">设备</td>
						<td width="160">编号</td>
						<td width="360">备注</td>
						<td width="180">租期</td>
						<td width="80">日租金(元)</td>
						<td width="80">押金(元)</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='ipad in stuipadList' :class="{'ipad_exit':ipad.state==1}">
						<td>{{ipad.device_zuqi.device.device_type}}</td>
						<td>{{ipad.device_zuqi.device.device_number}}</td>
						<td>{{ipad.device_zuqi.device.content}}</td>
						<td>{{ipad.device_zuqi.start_time_man}} — {{ipad.device_zuqi.end_time_man}}</td>
						<td>{{ipad.device_zuqi.device.rizujing}}</td>
						<td>{{ipad.device_zuqi.device.yajing}}</td>
					</tr>
					<tr class="yes_x_money" v-if='!stuipadList  || !stuInfo.student_id'>
						<td colspan="6">该同学还没有租用ipad！！！</td>
					</tr>
				</tbody>
			</table>
		</div>
		<h4 style="padding-bottom:15px;">课程信息</h4>
		<em v-if='!yesorno'><router-link :to='{name:"sign_up",query:{type:1}}'  class="common_btn">报班</router-link></em>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="250">班型</td>
					<td width="160">进班日期</td>
					<td width="190">交易单号</td>
					<td width="80">实收</td>
					<td width="320">优惠</td>
					<td width="100">连报班</td>
					<td width="200"></td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='list in classlist' :class="{'yes_x_money':list.class.state==1}">
					<td class="class_type">{{list.class.name}}</td>
					<td class="sign_up_time">{{list.create_time | time}}日报入</td>
					<td class="order">{{list.order_id}}</td>
					<td class="actual">{{list.amount}}</td>
					<td class="cheap ">{{list.discount?list.discount.discount_name:'无'}}</td>
					<td>{{list.discount?list.binding_class : ''}}</td>
					<td class="p">
						<span  v-if='list.class.state!=2 && !yesorno'>
							<a href="javascript:;;" @click='goPagesignUp(list.product_id,"sign_up")'>续费</a><a href="javascript:;;" @click='goPageExitclass(list.order_id,"exit_class")'>退费</a>
						</span>
					</td>
				</tr>
				<tr  class="yes_x_money" v-if='!classlist || !stuInfo.student_id'>
					<td colspan="20">该同学，还没有报班哦！！！赶紧报班吧。</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'stu_info',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				classlist: null,
				studentIpadorderId: "",
				stuipadList: null,
				isIpad: false
			}
		},
		props: ['yesorno'],
		beforeCreate() {
			var _self = this;
			var stu_id = common.getS('stuInfo').student_id;
			if(stu_id && stu_id != 0) {
				liSrv.studentClassList(stu_id, function(res) {
					if(!$.isEmptyObject(res)) {
						_self.isIpad = true;
					}
					_self.classlist = res;
				}, function() {

				})
				liSrv.studentIpad(stu_id, function(res) {
					_self.stuipadList = res;
					$.each(res, function(i, v) {
						if(v.state == 1) {
							common.setS('studentIpadorderId', v.order_id)
							_self.studentIpadorderId = v.order_id;
						}
					});
				}, function() {

				})
			}
		},
		methods: {
			goPagesignUp(id, path) {
				common.setS('xu_class_id', id)
				this.$router.push({
					name: path,
					query: {
						type: 2
					}
				})
			},
			goPageExitclass(id, path) {
				var n = 0;
				for(var i in this.classlist) {
					n++;
				}
				if(this.studentIpadorderId && n == 1) {
					alert('请先退ipad');
					return;
				}
				common.setS('exit_class_order_num', id)
				this.$router.push({
					name: path
				})
			}
		}
	}
</script>