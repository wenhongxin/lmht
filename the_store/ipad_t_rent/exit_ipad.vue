<style lang="less" rel="stylesheet/less" scoped>
	#ipad_t_rent {
		.jbinfo {
			width: 100%;
			height: auto;
			margin-top: 20px;
		}
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding: 12px 0;
			margin-top: 20px;
		}
		.actual {
			width: auto;
			padding-left: 10px;
		}
		.ipad_wt {
			p {
				line-height: 30px;
				i {
					margin-left: 5px;
				}
			}
		}
		textarea {
			resize: none;
			width: 358px;
			height: 120px;
			max-width: 358px;
			max-height: 120px;
			outline: none;
			padding: 5px 0 0 10px;
		}
		.common_btn {
			margin: 25px 0;
			width: 73px;
		}
		.exit-money {
			input {
				padding-left: 10px;
				width: 173px;
				height: 34px;
				border: 1px solid #95989A;
			}
			i {
				color: red;
			}
		}
		.exit_class_btn {
			width: 90px;
			margin-top: 15px;
		}
		.table{
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="ipad_t_rent" class="content_sub">
		<h2 class="tit">退租ipad</h2>
		<commstuinfo istit='true'></commstuinfo>
		<h3>所租设备</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="108">设备</td>
					<td width="160">编号</td>
					<td width="108">实收</td>
					<td width="108">支付方式</td>
					<td width="180">交易单号</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ipadData.device.device_type}}</td>
					<td>{{ipadData.device.device_number}}</td>
					<td>{{orderData.amount}}</td>
					<td>{{orderData.pay_channel_name}}</td>
					<td>{{orderData.order_id}}</td>
				</tr>
			</tbody>
		</table>
		<h3>检查</h3>
		<p style="line-height: 24px;">{{exitipaddata.test_content}}</p>
		<h3>备注</h3>
		<p style="line-height: 24px;">{{exitipaddata.content}}</p>
		<h3>应退金额</h3>
		<p class="exit-money">
			<input type="text" v-model.trim='money' /> 元，操作人员: <i>{{username}}</i>
		</p>
		<a class='common_btn' @click='exitPad' href='javascript:;;'>确定退租</a>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'exit_ipad',
		data() {
			return {
				username: common.getS('username'),
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				orderData: {
					
				},
				money: '',
				exitipaddata:common.getS('exitipaddata')
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('studentIpadorderId');
			liSrv.getOrder(order_num,function(res){
				_self.orderData = res.data;
				_self.ipadData = res.device_zuqi;
			})
		},
		methods:{
			exitPad(){
				var order_num = common.getS('studentIpadorderId');
				var data =this.exitipaddata; 
				var money = this.money,_self = this;
				if(!money){
					alert('请填写退款金额');
					return ;
				}
				var sendData = {
					test_content:data.test_content,
					content:data.content,
					order_id:order_num,
					amount:money
				}
				liSrv.refund(sendData,function(res){
					_self.$router.push({name:'exit_ipad_ok',query:{'money':money}})
				})
			}
		}
	}
</script>