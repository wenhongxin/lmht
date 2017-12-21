<style lang="less" rel="stylesheet/less" scoped>
	#stu_ipad_charge_prove {
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 999;
		.prove_cont {
			width: 964px;
			height: 100%;
			margin: 0 auto;
		}
		.jbinfo {
			height: auto;
		}
		h2 {
			font-size: 38px;
			height: 100px;
			line-height: 100px;
			border-bottom: 1px solid #C6C6C6;
			margin-bottom: 20px;
		}
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding: 12px 0;
			margin-top: 20px;
		}
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="stu_ipad_charge_prove">
		<div class="prove_cont">
			<h2>Ipad租赁押金凭据及服务协议</h2>
			<commstuinfo></commstuinfo>
			<h3>有效课程</h3>
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
						<td width="180">交易单号</td>
						<td width="180">租期</td>
						<td width="76">实收</td>
						<td width="76">支付方式</td>
						<td width="76">日租金</td>
						<td width="76">押金</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ipadData.device.device_type}}</td>
						<td>{{ipadData.device.device_number}}</td>
						<td>{{orderData.order_id}}</td>
						<td>{{ipadData.start_time_man}}至{{ipadData.end_time_man}}</td>
						<td>{{orderData.amount}}</td>
						<td>{{orderData.pay_channel_name}}</td>
						<td>{{ipadData.device.rizujing}}</td>
						<td>{{ipadData.device.yajing}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'stu_ipad_charge_prove',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				qrcodeHtml: "",
				classlist: '',
				orderData: {}
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('ipad_order_num');
			var id = common.getS('stuInfo').student_id;
			if(id) {
				liSrv.studentClassList(id, function(res) {
					_self.classlist = res;
				})
			}
			liSrv.getOrder(order_num, function(res) {
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				_self.ipadData = res.device_zuqi;
			})
		},
	}
</script>