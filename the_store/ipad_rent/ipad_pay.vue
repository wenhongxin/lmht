<style lang="less" rel="stylesheet/less" scoped>
	#ipad_rent {
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
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding: 12px 0;
		}
		.zf-btn {
			span {
				cursor: pointer;
				margin-right: 8px;
				display: inline-block;
				height: 36px;
				background: #FF8900;
				text-align: center;
				line-height: 36px;
				color: #FFFFFF;
				padding: 0 15px;
			}
		}
		.zf-qrcode {
			margin-top: 20px;
			padding-bottom: 20px;
			p {
				margin-bottom: 10px;
			}
		}
		.isSign {
			pointer-events: none;
			cursor: default;
		}
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="ipad_rent" class="content_sub">
		<h2 class="tit">{{stuInfo.realname}} - <span>{{stuInfo.username}}</span></h2>
		<commstuinfo></commstuinfo>
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
		<h3 style="border: none;">支付：{{ipadData.device.yajing}}元</h3>
		<div class="zf-btn">
			<span :class="{'isSign':isSign}" @click='wxpay'>微信支付</span>
			<span :class="{'isSign':isSign}" @click='zfbpay'>支付宝支付</span>
		</div>
		<div class="zf-qrcode" v-html='qrcodeHtml'></div>
	</div>
</template>

<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	import liSrv from 'liSrv';
	export default {
		name: 'ipad_rent',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				ipadData: {
					device: {}
				},
				qrcodeHtml: "",
				classlist: '',
				isSign: false
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
				}, function(res) {
					if(res.desc == '无更多数据') {
						alert('您还没有报班不能租用设备');
						_self.isSign = true;
						return;
					}
				})
			}
			liSrv.getOrder(order_num, function(res) {
				_self.stuInfo = res.student;
				_self.ipadData = res.device_zuqi;
			})
		},
		methods: {
			payCreate(type, txt) { //生成支付订单
				if(this.qrcodeHtml != '') {
					if(this.qrcodeHtml != '二维码已过期，请重新生成支付') {
						var r = window.confirm('确定要重新生成二维码吗？')
						if(!r) {
							return false;
						}
					}

				}
				var _self = this;
				_self.intervalPay && clearInterval(_self.intervalPay);
				setTimeout(function() {
					this.qrcodeHtml = '二维码已过期，请重新生成支付';
					clearInterval(_self.intervalPay);
				}, 900000)
				var order_num = common.getS('ipad_order_num');
				var data = {
					order_id: order_num,
					pay_type: type
				}
				liSrv.createPay(data, function(res) {
					var str = '<p>' + txt + '</p><img src =' + res.qr_code + ' />';
					_self.qrcodeHtml = str;
					var data = {
						order_no: res.order_no,
						order_id: res.order_id
					}
					_self.getPayState(data);
				})

			},
			wxpay() {
				this.payCreate('wx_pub_qr', '用微信扫码支付')
			},
			zfbpay() {
				this.payCreate('alipay_qr', '用支付宝扫码支付')
			},
			getPayState(data) { //轮询获取支付状态
				var _self = this;
				_self.intervalPay = setInterval(function() {
					liSrv.getPayState(data, function(res) {
						if(res[data.order_no] == '1') {
							clearInterval(_self.intervalPay)
							_self.$router.push({
								name: 'ipad_pay_ok'
							})
						}
					})
				}, 3000)
			}
		},
		watch: {
			'$route' (a, b) {
				console.log(a)
				console.log(b)
			}
		}
	}
</script>