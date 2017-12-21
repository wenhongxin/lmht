<style lang="less" rel="stylesheet/less" scoped>
	#preferential {
		h5 {
			padding: 11px 0;
			font-size: 16px;
			border-top: 1px solid #c6c6c6;
		}
		.ok-btn {
			margin-top: 20px;
			a {
				display: inline-block;
				width: 75px;
				margin-right: 20px;
			}
		}
	}
</style>
<template>
	<div id="preferential" class="content_sub">
		<h2 class="tit">优惠列表</h2>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="60">选择</td>
					<td width="79">代码</td>
					<td width="197">优惠名称</td>
					<td width="286">使用范围</td>
					<td width="100">连报班</td>
					<td width="197">优惠有效期</td>
					<td width="100">优惠方法</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in discountList'> <!--v-if='item.state==1'-->
					<td><input type="radio" name='pre' @click='chooseyh(item.id)' /></td>
					<td>{{item.id}}</td>
					<td>{{item.discount_name}}</td>
					<td>{{item.validity}}</td>
					<td>{{item.binding_class}}</td>
					<td>{{item.first_time_man}} — {{item.last_time_man}}</td>
					<td>{{item.content}}</td>
				</tr>
				<tr v-if='!discountList'>
					<td colspan="7">无可用优惠！！！</td>
				</tr>
			</tbody>
		</table>
		<!--<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>-->
		
		<div class="ok-btn">
			<a href='javascript:;;' @click='orderOk' class='common_btn'>确认</a>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'preferential',
		data() {
			return {
				discountList: null,
				yhid: '',
				pageCount: '1',
				nextString: '1',
				total: '0',
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self = this;
			var type = this.$route.query.type;
			var classId = common.getS('buy_class_id');
			var data = {
					class_type: type,
					class_id:classId
				}
			liSrv.getDiscountYesList(data, function(res) {
//				console.log(data)
//				_self.total = res.total;
//				_self.pageCount = res.pageCount;
				_self.discountList = res;
//				if(res==""){
//					alert("没有可使用的优惠！")
//				}
			},function(res){
					if(res.code=="E_NOT_DATA"){
						_self.discountList = '';
					}
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.getDiscountList(nextString, type, function(res) {
					_self.discountList = res.list
					
				})
			},
			orderOk() {
				if(!this.yhid) {
					alert('请选择优惠')
					return;
				}
				var _self = this;
				var Common = common.getS('stuInfo');
				var type = this.$route.query.type
				var stuId = Common.student_id;
				var classId = common.getS('buy_class_id');
				var mobile = Common.username;
				var yhId = this.yhid;
				var pastClassId = common.getS('xu_class_id');
				var dataOrder = {
					mobile: mobile,
					student_id: stuId,
					product_type: 1,
					product_id: classId,
					discount_id: yhId,
					class_type: type,
					past_class_id: pastClassId
				}
				var dataDiscount = {
					discount_id: yhId,
					class_id: classId,
					student_id: stuId
				}
				liSrv.discountCheck(dataDiscount, function() {
					liSrv.createOrder(dataOrder, function(res) { //创建订单
						common.setS('class_order_num', res.order_id)
						_self.$router.push({
							name: 'stu_pay'
						});
					},function(err){
						if(err.code=="E_REF_INVAL"){
							alert("该班级已报！")
						}
					})
				}, function() {
					alert("优惠不可用")
				})
			},
			chooseyh(id) {
				this.yhid = id;
				common.setS('yh_id', id)
			}
		}
	}
</script>