<style lang="less" rel="stylesheet/less" scoped>
	#stu_ipad_t_rent {
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
		.ipad_wt {
			p {
				line-height: 30px;
				label {
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
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="stu_ipad_t_rent" class="content_sub">
		<h2 class="tit">ipad退租</h2>
		<commstuinfo istit='true'></commstuinfo>
		<h3>所租设备</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="108">设备</td>
					<td width="160">编号</td>
					<td width="108">实收</td>
					<td width="108">支付方式</td>
					<td width="160">经办人</td>
					<td width="180">交易单号</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ipadData.device.device_type}}</td>
					<td>{{ipadData.device.device_number}}</td>
					<td>{{orderData.amount}}</td>
					<td>{{orderData.pay_channel_name}}</td>
					<td>{{orderData.admin_realname}}</td>
					<td>{{orderData.order_id}}</td>
				</tr>
			</tbody>
		</table>
		<h3>检查</h3>
		<div class="ipad_wt" id="ipad_wt">
			<p><input type="checkbox" id='a' /><label for="a">外观和屏幕异常</label></p>
			<p><input type="checkbox" id='b' /><label for="b">耳机插孔异常</label></p>
			<p><input type="checkbox" id='c' /><label for="c">耳机异常</label></p>
			<p><input type="checkbox" id='d' /><label for="d">home键异常</label></p>
			<p><input type="checkbox" id='e' /><label for="e">音量键异常</label></p>
			<p><input type="checkbox" id="f" /><label for="f">电源键异常</label></p>
			<p><input type="checkbox" id='g' /><label for="g">唤醒密码不能清空</label></p>
			<p><input type="checkbox" id='h' /><label for="h">APP Store 不能退出</label></p>
		</div>
		<h3>备注</h3>
		<textarea name="" rows="" cols="" v-model='ipad_bz'></textarea>
		<a class='common_btn' @click='nextPage' href='javascript:;;'>下一步</a>
	</div>
</template>
<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'stu_ipad_t_rent',
		data() {
			return {
				username: common.getS('username'),
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				orderData: {

				},
				ipad_bz: ''
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var id = common.getS('stuInfo').student_id;
			var order_num = common.getS('studentIpadorderId');
			liSrv.getOrder(order_num, function(res) {
				_self.orderData = res.data;
				_self.ipadData = res.device_zuqi;
			})
		},
		methods: {
			nextPage() {
				var str = '';
				$("#ipad_wt input").each(function(i, v) {
					if($(v).prop('checked')) {
						str += $(v).next().text() + ','
					}
				})
				str = str.substr(0, str.length - 1)
				var data = {
					test_content: str,
					content: this.ipad_bz
				}
				common.setS('exitipaddata', data)
				this.$router.push('stu_exit_ipad')
			}
		}
	}
</script>