<style lang="less" rel="stylesheet/less" scoped>
	#class_refund_prove {
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
			tbody tr:hover{
				background: #e0e0e0!important;
			}
		}
	}
</style>
<template>
	<div id="class_refund_prove">
		<div class="prove_cont">
			<h2>狸米课堂北京名师奥数课退款凭据</h2>
			<commstuinfo istit = 'true'></commstuinfo>
			<h3>班型信息</h3>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="70">班级编号</td>
						<td width="182">班型</td>
						<td width="133">进班日期</td>
						<td width="175">交易单号</td>
						<td width="80">原价</td>
						<td width="80">实收</td>
						<td width="100">支付方式</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,i) in classData'>
						<td>{{item.id}}</td>
						<td>{{item.name}}</td>
						<td>{{orderData.create_time.split(' ')[0]}}日报入</td>
						<td>{{orderData.order_id}}</td>
						<td>{{orderData.amount_yuanjian}}</td>
						<td v-if='i==0' :rowspan="classData.length">{{orderData.amount}}</td>
						<td>{{orderData.pay_channel_name}}</td>
					</tr>
				</tbody>
			</table>
			<h3 v-if='discount.id'>优惠信息</h3>
			<table class="table" border="1" v-if='discount.id'>
				<thead>
					<tr>
						<td width="79">代码</td>
						<td width="187">优惠名称</td>
						<td width="276">使用范围</td>
						<td width="100">连报班</td>
						<td width="187">优惠有效期</td>
						<td width="140">优惠内容</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{discount.id}}</td>
						<td>{{discount.discount_name}}</td>
						<td>{{discount.validity}}</td>
						<td>{{discount.binding_class}}</td>
						<td>{{discount.first_time_man}} — {{discount.last_time_man}}</td>
						<td>{{discount.content}}</td>
					</tr>
				</tbody>
			</table>
			<h3>上课信息</h3>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="120">上课次数</td>
						<td>总次数</td>
					</tr>
				</thead>
				<tbody>
					<tr  v-for='(item,i) in classData'>
						<td>{{item.class_lesson_count}}次</td>
						<td>{{item.teach_plan_id_count}}次</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv'
	export default {
		name: 'class_refund_prove',
		data() {
			return {
				username: common.getS('username'),
				classData: {},
				orderData: {
					create_time: ""
				},
				discount: {},
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('exit_class_order_num');
			liSrv.getOrder(order_num, function(res) {
				_self.classData = res.class;
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				_self.discount = res.discount;
			})
		},
	}
</script>