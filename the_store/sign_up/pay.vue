<style lang="less" rel="stylesheet/less" scoped>
	#pay {
		.tit {
			span {
				font-weight: normal;
				font-size: 14px;
				line-height: 80px;
				margin-left: 25px;
			}
		}
		.jbinfo {
			height: 145px;
			margin-top: 20px;
		}
		h3 {
			font-size: 16px;
			border-top: 1px solid #C6C6C6;
			padding-top: 12px;
		}
		.zf-btn {
			margin-top: 12px;
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
		.zf-cont{
			display: flex;
		}
		.zf-wran{
			margin-top: 40px;
			p{
				color: red;
			}
		}
		.zf-qrcode {
			width: 330px;
			margin-top: 20px;
			padding-bottom: 20px;
			p {
				margin-bottom: 10px;
			}
		}
	}
</style>
<template>
	<div id="pay" class="content_sub">
		<h2 class="tit">报名<span>订单号：{{order_num}}</span></h2>
		<commstuinfo istit='true'></commstuinfo>
		<h3>班型信息</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="79">班级ID</td>
					<td width="198">班级类型</td>
					<td width="149">剩余名额</td>
					<td width="107">主讲老师</td>
					<td width="80">原价</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in classData'>
					<td>{{item.id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.buy_count}}</td>
					<td>{{item.teacher_name}}</td>
					<td>{{item.price}}</td>
				</tr>
			</tbody>
		</table>
		<h3 v-if='discount.id'>优惠信息</h3>
		<table class="table" border="1" v-if='discount.id'>
			<thead>
				<tr>
					<td width="79">代码</td>
					<td width="197">优惠名称</td>
					<td width="286">使用范围</td>
					<td width="100">连报班</td>
					<td width="197">优惠有效期</td>
					<td width="120">优惠内容</td>
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
		<h3>支付：{{orderData.amount}}元</h3>
		<div class="zf-btn">
			<span @click='wxpay'>微信支付</span>
			<span @click='zfbpay'>支付宝支付</span>
		</div>
		<div class="zf-cont">
			<div class="zf-qrcode" v-html='qrcodeHtml'></div>
			<div class="zf-wran">
				<p>收费方式：</p>
				<p>开课后，收费方式为该班未上课次数乘以每节课的价格；  公式：剩余课次 * （班级价格÷总课次数）=收费金额</p>
			</div>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo.vue';
	export default {
		name: 'sign_up',
		data() {
			return {
				stuInfo: '',
				order_num: common.getS('class_order_num'), //创建订单的id;
				qrcodeHtml: '',
				discount: '',
				orderData: '',
				classData: {}
			}
		},
		components:{
			commstuinfo
		},
		beforeCreate() {
			var _self = this;
			var order_num = common.getS('class_order_num');
			liSrv.getOrder(order_num, function(res) {
				_self.classData = res['class'];
				_self.orderData = res.data;
				_self.stuInfo = res.student;
				_self.discount = res.discount;
			})
		},
		methods: {
			payCreate(type, txt) { //生成支付订单
				console.log(this.qrcodeHtml)
				if(this.qrcodeHtml != '') {
					if(this.qrcodeHtml != '二维码已过期，请重新生成支付') {
						var r = window.confirm('确定要重新生成二维码吗？')
						if(!r) {
							return false;
						}
					}
				}
				var _self = this;
				_self.intervalPay && clearInterval(_self.intervalPay)
				setTimeout(function() {
					_self.qrcodeHtml = '二维码已过期，请重新生成支付';
					clearInterval(_self.intervalPay);
				}, 900000)
				var data = {
					order_id: _self.order_num,
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
								name: 'pay_ok'
							})
						}
					})
				}, 3000)
			}
		}
	}
</script>