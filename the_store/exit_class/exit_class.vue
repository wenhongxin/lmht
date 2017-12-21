<style lang="less" rel="stylesheet/less" scoped>
	#t_money {
		.jbinfo {
			height: auto;
			margin: 20px 0;
		}
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding: 12px 0;
		}
		.exit-money {
			input {
				padding-left: 10px;
				width: 173px;
				height: 34px;
				border: 1px solid #95989A ;
			}
			i {
				color: red;
			}
		}
		.table tbody tr:hover{
			background: #e0e0e0!important;
		}
		.exit_class_btn {
			width: 90px;
			margin: 15px 0 30px 0;
		}
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="t_money" class="content_sub">
		<h2 class="tit">退出班级</h2>
		<commstuinfo istit='true'></commstuinfo>
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
			<tbody v-for='(item,i) in classData'>
				<tr>
					<td>{{item.class_lesson_count}}次</td>
					<td>{{item.teach_plan_id_count}}次</td>
				</tr>
			</tbody>
		</table>
		<h3 style="border: none; padding-top: 0;">应退金额</h3>
		<p class="exit-money">
			<input type="text" v-model='money' /> 元，操作人员: <i>{{username}}</i>
		</p>
		<a class="exit_class_btn common_btn" href="javascript:;;" @click='exitClass'>退出本班</a>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'exit_money',
		data() {
			return {
				username: common.getS('username'),
				stuInfo: common.getS('stuInfo'),
				classData: {},
				orderData: {
					create_time: ""
				},
				discount: {},
				money: ''
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('exit_class_order_num');
			liSrv.getOrder(order_num, function(res) {
				_self.classData = res['class'];
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				_self.discount = res.discount;
			})
		},
		methods: {
			exitClass() {
				var _self = this;
				if(!_self.money) {
					alert('请填写金额');
					return;
				}
				var data = {
					order_id: common.getS('exit_class_order_num'),
					amount: _self.money
				}
				liSrv.refund(data, function(res) {
					var commonData = {
						classData: _self.classData,
						money: _self.money
					}
					common.setS('exit_class_data', commonData)
					_self.$router.push('exit_class_ok')
				})
			}
		}
	}
</script>