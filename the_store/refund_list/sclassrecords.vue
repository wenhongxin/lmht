<style lang="less" rel="stylesheet/less" scoped>
	#classrecords {
		.search {
			height: 36px;
			margin: 15px 0 30px 0;
			line-height: 36px;
			input {
				height: 26px;
				width: 100px;
				margin: -2px 10px 0 10px;
				padding-left: 5px;
			}
			select {
				width: 120px;
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
	<div id="classrecords">
		<div class="search">
			时间
			<input class="Wdate" type="text" id='start_time' :placeholder="today"  onclick="WdatePicker()" /> 至
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
			<a href="javascript:;;" class="common_btn" @click='searchrecords'>搜索</a>
		</div>
		<table class="table table-center-all" border="1">
			<thead>
		    <tr>
		      <td width="160">交易时间</td>
					<td width="75">学生姓名</td>
					<td width="100">手机号</td>
					<td width="160">班型</td>
					<!--<td class="width3 yxq">有效期</td>-->
					<td width="140">优惠内容</td>
					<td width="75">实收金额</td>
					<td width="75">支付方式</td>
					<!--<td width="75">交易类型</td>-->
					<td width="75">交易状态</td>
					<td width="70" class="td-left">操作</td>
		    </tr>
  		</thead>
  		<tbody>
  				<tr v-for='order in orderall'>
						<td>{{order.create_time}}</td>
						<td>{{order.urealname}}</td>
						<td>{{order.username}}</td>
						<td>{{order.class.name}}</td>
					<!--	<td>{{order.class.first_class_time | time}} —  {{order.class.last_class_time | time}}</td>-->
						<td>{{order.discount?order.discount.content : ''}}</td>
						<td>{{order.amount}}</td>
						<td>{{order.pay_channel_name}}</td>
						<!--<td>{{order.class_type_name}}</td>-->
						<td>{{order.state_name}}</td>
						<td  class="td-left"><a href="javascript:;;" @click='goPage(order.state_name,order.order_id,order.student)'>{{order.state_name!='未付款'? '详情':'付款'}}</a></td>
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
		name: 'classrecords',
		data() {
			return {
				today:new Date().toLocaleString().replace(/\/|\//g, "-").replace(/\//g, " ").split(" ")[0],
				fktype:'',
				zftype:'',
				pageCount:'1',
				nextString:'1',
				total:'0',
				orderall:{
				}
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			
			
		},
		created(){
			var data = {
				pay_type:this.zftype,
				store_id: common.getS('store_id'),
				state:this.zftype,
				last_time:this.today,
				fast_time:this.today,
				product_type:'1'
			}
			this.getorderlist(data)
		},
		methods: {
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				var data = {
					pay_type:this.zftype,
					store_id: common.getS('store_id'),
					state:this.zftype,
					last_time:$('#start_time').val() ||this.today,
					fast_time:$('#end_time').val() ||this.today,
					product_type:'1',
					page:nextString
				}
				liSrv.orderList(data,function(res){
					_self.orderall = res.list
				},function(){
					_slef.pageCount=1;
				})
			},
			searchrecords(){
				var data = {
					pay_type:this.zftype,
					store_id: common.getS('store_id'),
					state:this.fktype,
					last_time:$('#start_time').val() ||this.today ,
					fast_time:$('#end_time').val()  ||this.today,
					product_type:'1'
				}
				this.getorderlist(data)
			},
			getorderlist(data){
				var _self = this;
				this.nextString = '1'
				liSrv.orderList(data,function(res){
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.orderall = res.list;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
						_self.pageCount='1';
						_self.total = '0';
						_self.orderall = {}
					}
				})
			},
			goPage(name,orderid,data){
				common.setS('stuInfo',data)
				if(name=='未付款'){
					common.setS('class_order_num',orderid)
					this.$router.push('/studentfile/stu_pay')
				}else if(name=='退款成功'){
					common.setS('exit_class_order_num',orderid)
					$(event.target).attr('target','_blank')
					$(event.target).attr('href','/studentfile/stu_class_refund_prove')//class_refund_prove
				}else{
					common.setS('class_order_num',orderid)
					$(event.target).attr('target','_blank')
					$(event.target).attr('href','/studentfile/stu_class_charge_prove')//class_charge_prove
				}
			}
		},
		watch: {

		}
	}
</script>