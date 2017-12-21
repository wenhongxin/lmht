<style lang="less" rel="stylesheet/less" scoped>
	#pay_ok {
		.jbinfo {
			height: auto;
			margin-bottom: 10px;
		}
		a {
			margin-top: 20px;
			width: 86px;
		}
	}
</style>
<template>
	<div id="pay_ok" class="content_sub">
		<h2 class="tit">支付成功：{{orderData.amount}}元</h2>
		<div class="ok_img">
			<img src="../../../../assets/okimg.png" /><b>报名成功</b>
		</div>
		<commstuinfo istit='true'></commstuinfo>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="182">班型</td>
					<td width="133">进班日期</td>
					<td width="175">交易单号</td>
					<!--<td width="60">实收</td>-->
					<td width="100">支付方式</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in classData'>
					<td>{{item.name}}</td>
					<td>{{orderData.create_time | time}}日报入</td>
					<td>{{order_num}}</td>
					<!--<td>{{orderData.amount}}</td>-->
					<td>{{orderData.pay_channel_name}}</td>
				</tr>
			</tbody>
		</table>
		<a href="/class_charge_prove" target='_blank' class="common_btn" @click='backstuinfo'>打印收据</a>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo.vue';
	export default {
		name: 'pay_ok',
		data() {
			return {
				order_num: common.getS('class_order_num'),
				stuInfo: '',
				classData: '',
				orderData: ''
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			common.setS('xu_class_id')
			var order_num = common.getS('class_order_num');
			liSrv.getOrder(order_num, function(res) {
				_self.classData = res.class;
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				common.setS('stuInfo', res.student)
			})
		},
		methods: {
			backstuinfo() {
				var cc = common.getS('yesornocc');
				if(cc){
					common.setS('yesornocc',null);
					this.$router.push('/CC/ccremind');
					return; 
				}
				this.$router.push('stu_info');
			}
		}
	}
</script>