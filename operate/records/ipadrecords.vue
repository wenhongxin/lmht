<style lang="less" rel="stylesheet/less" scoped>
	#ipadrecords {
		.search {
			height: 36px;
			margin: 15px 0 30px 0;
			line-height: 36px;
			input {
				height: 26px;
				width: 100px;
				margin: -2px 10px 0 10px;
			}
			select {
				height: 26px;
				margin: -3px 20px 0 10px;
			}
			a {
				height: 26px;
				line-height: 26px;
				margin-top: 5px;
				width: 80px;
				display: inline-block;
			}
		}
	}
</style>
<template>
	<div id="ipadrecords">
		<div class="search">
			时间
			<input class="Wdate" type="text" id='start_time' :placeholder="today" onclick="WdatePicker()" /> 至
			<input class="Wdate" type="text" id='end_time' :placeholder="today" onclick="WdatePicker()" /> 交易状态
			<select v-model='fktype'>
				<option value="">全部</option>
				<option value="3">未付款</option>
				<option value="1">已支付</option>
				<option value="2">已退款</option>
			</select>
			支付方式
			<select v-model='zftype'>
				<option value="">全部</option>
				<option value="1">微信</option>
				<option value="2">支付宝</option>
			</select>
			门店
			<select v-model='store'>
				<option value="">全部</option>
				<option v-for='store in storeList' :value="store.id">{{store.store_name}}</option>
			</select>
			<a href="javascript:;;" class="common_btn" @click='searchrecords'>搜索</a>
		</div>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="160">交易时间</td>
					<td width="140">门店名称</td>
					<!--<td>学生姓名</td>-->
					<td width="100">手机号</td>
					<td width="70">机型</td>
					<!--<td>有效期</td>-->
					<td width="70">日租金(元)</td>
					<td width="70">押金(元)</td>
					<td width="70">实收金额</td>
					<td width="70">支付方式</td>
					<td width="70">交易状态</td>
					<td width="50" class="td-left">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='order in orderall'>
					<td>{{order.create_time}}</td>
					<td>{{storeList[order.store_id]?storeList[order.store_id].store_name : ''}}</td>
					<!--<td>{{order.urealname}}</td>-->
					<td>{{order.username}}</td>
					<td>{{order.device_zuqi.device.device_type}}</td>
					<!--<td>{{order.device_zuqi.start_time_man}} — {{order.device_zuqi.end_time_man}}</td>-->
					<td>{{order.device_zuqi.device.rizujing}}</td>
					<td>{{order.device_zuqi.device.yajing}}</td>
					<td>{{order.amount}}</td>
					<td>{{order.pay_channel_name}}</td>
					<td>{{order.state_name}}</td>
					<td class="td-left">
						<a href="javascript:;;" @click='goPage(order.state_name,order.order_id,order)'>{{order.state_name!='未付款'? '详情':'付款'}}</a>
					</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'ipadrecords',
		data() {
			return {
				storeList: '',
				today: new Date().toLocaleString().replace(/\/|\//g, "-").replace(/\//g, " ").split(" ")[0],
				fktype: '',
				zftype: '',
				pageCount: '1',
				nextString: '1',
				total: '0',
				orderall: {},
				store: ''
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self = this;
			liSrv.getStoreList('', function(res) {
				_self.storeList = res.list;
			})
		},
		created() {
			var data = {
				pay_type: this.zftype,
				store_id: this.store,
				state: this.zftype,
				last_time: this.today,
				fast_time: this.today,
				product_type: '2'
			}
			this.getorderlist(data)
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data = {
					pay_type: this.zftype,
					store_id: this.store,
					state: this.zftype,
					last_time: $('#start_time').val() || this.today,
					fast_time: $('#end_time').val() || this.today,
					product_type: '2',
					page: nextString
				}
				liSrv.orderList(data, function(res) {
					_self.orderall = res.list
				}, function() {
					_slef.pageCount = 1;
				})
			},
			searchrecords() {
				var data = {
					pay_type: this.zftype,
					store_id: this.store,
					state: this.fktype,
					last_time: $('#start_time').val() || this.today,
					fast_time: $('#end_time').val() || this.today,
					product_type: '2'
				}
				this.getorderlist(data)
			},
			getorderlist(data) {
				var _self = this;
				liSrv.orderList(data, function(res) {
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.orderall = res.list;
					_self.nextString = '1';
				}, function(res) {
					if(res.code == 'E_NOPRIV') {
						alert('无操作权限');
						window.history.go(-1);
					}
					_self.pageCount = 1;
					if(res.code == 'E_NOT_DATA') {
						_self.orderall = {};
						_self.total = '0';
						_self.pageCount = '1';
						_self.nextString = '1';
					}
				})
			},
			goPage(name, orderid, data) {
				common.setS('stuInfo', data.student)
				if(name == '未付款') {
					common.setS('ipad_order_num', orderid)
					this.$router.push('/studentfile/stu_ipad_pay')  ///theStore/ipad_pay
				} else if(name == '退款成功') {
					common.setS('studentIpadorderId', data),
						$(event.target).attr('target', '_blank')
					$(event.target).attr('href', '/studentfile/stu_ipad_refund_prove')//ipad_refund_prove
				} else {
					common.setS('ipad_order_num', orderid)
					$(event.target).attr('target', '_blank')
					$(event.target).attr('href', '/studentfile/stu_ipad_charge_prove')//ipad_charge_prove
				}
			}
		},
		watch: {

		}
	}
</script>