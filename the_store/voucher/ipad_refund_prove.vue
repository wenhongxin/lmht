<style lang="less" rel="stylesheet/less" scoped>
	#ipad_refund_prove {
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
		.table{
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="ipad_refund_prove">
		<div class="prove_cont">
			<h2>狸米课堂北京名师奥数课退款凭据</h2>
			<commstuinfo istit='true'></commstuinfo>
			<h3>所租设备</h3>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="108">设备</td>
						<td width="160">编号</td>
						<td width="108">实收</td>
						<td width="108">支付方式</td>
						<td width="108">实退</td>
						<td width="180">交易单号</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ipadData.device.device_type}}</td>
						<td>{{ipadData.device.device_number}}</td>
						<td>{{orderData.amount}}</td>
						<td>{{orderData.pay_channel_name}}</td>
						<td>{{money}}</td>
						<td>{{orderData.order_id}}</td>
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
		name: 'ipad_refund_prove',
		data() {
			return {
				username: common.getS('username'),
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				orderData: {},
				money: '',
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('studentIpadorderId');
			liSrv.getOrder(order_num, function(res) {
				_self.orderData = res.data;
				_self.ipadData = res.device_zuqi;
				_self.money = res.tui.amount;
			})
		}
	}
</script>