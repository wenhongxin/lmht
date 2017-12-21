<style lang="less" rel="stylesheet/less" scoped>
	#stu_class_charge_prove {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 999;
		background: #FFFFFF;
		#prove_cont {
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
			tbody tr:hover{
				background: #e0e0e0!important;
			}
		}
	}
</style>
<template>
	<div id="stu_class_charge_prove">
		<div id='prove_cont'>
			<h2>狸米课堂北京名师奥数课收费凭据</h2>
			<commstuinfo istit='true'></commstuinfo>
			
			<h3>班级信息</h3>
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
						<td width="261">优惠名称</td>
						<td width="100">连报班</td>
						<td width="187">优惠有效期</td>
						<td width="100">优惠内容</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{discount.id}}</td>
						<td>{{discount.discount_name}}</td>
						<td>{{discount.binding_class}}</td>
						<td>{{discount.first_time_man}} - {{discount.last_time_man}}</td>
						<td>{{discount.content}}</td>
					</tr>
				</tbody>
			</table>
			<!--<h3>报名信息</h3>
			<table class="table" border="1">
			<thead>
				<tr>
					<td width="182">班型</td>
					<td width="133">进班日期</td>
					<td width="175">交易单号</td>
					<td width="70">实收</td>
					<td width="120">支付方式</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='(item,i) in classData'>
					<td>{{item.name}}</td>
					<td>{{orderData.create_time | time}}日报入</td>
					<td>{{order_num}}</td>
					<td v-if='i==0' :rowspan="classData.length">{{orderData.amount}}</td>
					<td>{{orderData.pay_channel_name}}</td>
				</tr>
			</tbody>
		</table>-->
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common'
	import commstuinfo from '../comm/commstuinfo.vue'
	export default {
		name: 'stu_class_charge_prove',
		data() {
			return {
				order_num: common.getS('class_order_num'),
				stuInfo: '',
				classData: '',
				orderData: '',
				discount: ''
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('class_order_num');
			liSrv.getOrder(order_num, function(res) {
				_self.classData = res.class;
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				_self.discount = res.discount;
			})
		},
		methods: {
			preview(oper) {
				$(".left_list").hide();
				if(oper < 10) {
					var bdhtml = $("#prove_cont").html(); //获取当前页的html代码  
					var sprnstr = "<!--startprint" + oper + "-->"; //设置打印开始区域  
					var eprnstr = "<!--endprint" + oper + "-->"; //设置打印结束区域  
					var prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr)); //从开始代码向后取html  
					var prnhtmlprnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html  
					$("#prove_cont").html(prnhtml);
					window.print();
					$("#prove_cont").html(bdhtml);
				} else {
					window.print();
				}
			}
		},
		mounted() {
			var _self = this;
			this.$nextTick(function() {
				setTimeout(function() {
					//	_self.preview(1)
				}, 3000)
			})
		}
	}
</script>