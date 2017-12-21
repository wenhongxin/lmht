<style lang="less" rel="stylesheet/less" scoped>
	#pay_ok {
		.jbinfo {
			height: auto;
			margin-bottom: 10px;
		}
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding: 12px 0;
		}
		a {
			margin-top: 20px;
			width: 86px;
		}
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="pay_ok" class="content_sub">
		<h2 class="tit">支付成功：{{orderData.amount}}元</h2>
		<div class="ok_img">
			<img src="../../../../assets/okimg.png" /><b>支付成功</b>
		</div>
		<commstuinfo istit='true'></commstuinfo>
		<h3>所用课程</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="180">班型</td>
					<td width="180">进班日期</td>
					<td width="180">结课日期</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='list in classlist' v-if='list.class.state!=2'>
					<td>{{list.class.name}}</td>
					<td>{{list.create_time | time}}日报入</td>
					<td>{{list.class.last_class_time | time}}日</td>
				</tr>
			</tbody>
		</table>
		<h3>所租设备</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="108">设备</td>
					<td width="160">编号</td>
					<td width="370">备注</td>
					<td width="180">租期</td>
					<td width="76">日租金</td>
					<td width="76">押金</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ipadData.device.device_type}}</td>
					<td>{{ipadData.device.device_number}}</td>
					<td>{{ipadData.device.content}}</td>
					<td>{{ipadData.start_time_man}} — {{ipadData.end_time_man}}</td>
					<td>{{ipadData.device.rizujing}}</td>
					<td>{{ipadData.device.yajing}}</td>
				</tr>
			</tbody>
		</table>
		<a href='/ipad_charge_prove' target="_blank" class='common_btn' @click='backstuinfo'>打印收据</a>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'pay_ok',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				qrcodeHtml: "",
				classlist: '',
				orderData: ''
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('ipad_order_num');
			var stu_id = common.getS('stuInfo').student_id;
			if(stu_id) {
				liSrv.studentClassList(stu_id, function(res) {
					_self.classlist = res;
				})
			}
			liSrv.getOrder(order_num, function(res) {
				_self.stuInfo = res.student;
				_self.ipadData = res.device_zuqi;
				_self.orderData = res.data
			})
		},
		methods: {
			backstuinfo() {
				this.$router.push('stu_info')
			}
		}
	}
</script>