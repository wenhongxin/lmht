<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_history {
		margin-top: 0;
		.stu_class{
			margin: 20px 0;
			line-height: 30px;
			span{
				display: inline-block;
				border-bottom:1px solid #c6c6c6 ;
				border-right:1px solid #c6c6c6 ;
				a{
					float: left;
					width: 120px;
					height: 30px;
					border-left: 1px solid #c6c6c6;
					border-top: 1px solid #c6c6c6;
					text-align: center;
				}
			}
			.active.router-link-exact-active {
				background: #FF8900;
				color: #FFFFFF;
			}
		}
	}
</style>
<template>
	<div id="stu_file_history">
		<div class="stu_class">
			<span>
				<router-link :to='{name:"stu_file_history",query:{id:id,type:1}}' active-class="active">报名交易记录</router-link>
				<router-link :to='{name:"stu_file_history",query:{id:id,type:2}}' active-class="active">ipad租用交易记录</router-link>
			</span>
		</div>
		<!--<router-view></router-view>-->
		<div v-if='showNum=="1" && boxshow==true'>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="140">交易时间</td>
						<td width="80">学生姓名</td>
						<td width="120">手机号</td>
						<td>班型</td>
						<td>有效期</td>
						<td width="80">优惠内容</td>
						<td width="120">实收金额（元）</td>
						<td width="80">支付方式</td>
						<td width="70">交易状态</td>
						<td width="80">操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in buyall">
						<td>{{item.create_time}}</td>
						<td>{{item.urealname}}</td>
						<td>{{item.username}}</td>
						<td>{{item.class.name}}</td>
						<td>{{item.class.first_class_time}}~{{item.class.last_class_time}}</td>
						<td>{{item.discount?item.discount.content : ''}}</td>
						<td>{{item.amount}}（元）</td>
						<td>{{item.pay_channel_name}}</td>
						<td>{{item.state_name}}</td>
						<td><a href="javascript:;;" @click='goPage(item.state_name,item.order_id,item.student)'>{{item.state_name!='未付款'? '详情':'付款'}}</a></td>
					</tr>
				</tbody>
			</table>
			<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
		</div>
		<div  v-if='showNum=="2" && boxshow==true'>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="80">交易时间</td>
						<td width="80">学生姓名</td>
						<td width="80">手机号</td>
						<td width="100">机型</td>
						<td width="100">有效期</td>
						<td width="100">押金（元）</td>
						<td width="100">日租金（元）</td>
						<td width="100">实收金额（元）</td>
						<td width="80">支付方式</td>
						<td width="80">交易状态</td>
						<td width="80">操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in orderall">
						<td>{{item.create_time}}</td>
						<td>{{item.urealname}}</td>
						<td>{{item.username}}</td>
						<td>{{item.device_zuqi.device.device_type}}</td>
						<td>{{item.device_zuqi.start_time_man}} —  {{item.device_zuqi.end_time_man}}</td>
						<td>{{item.device_zuqi.device.rizujing}}</td>
						<td>{{item.device_zuqi.device.yajing}}</td>
						<td>{{item.amount}}</td>
						<td>{{item.pay_channel_name}}</td>
						<td>{{item.state_name}}</td>
						<td><a href="javascript:;;" @click='goPageipad(item.state_name,item.order_id,item.student)'>{{item.state_name!='未付款'? '详情':'付款'}}</a></td>
					</tr>
				</tbody>
			</table>
			<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
		</div>
		<p class="showyn" v-show="showyn">该学生暂时没有交易记录…………</p>
		
	</div>
	

</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'stu_file_history',
		data() {
			return {
				id:this.$route.query.id,
				buyall:'',
				orderall:'',
				type:'1',
				pageCount: '1',
				nextString: '1',
				total: '0',
				showyn:false,
				boxshow:true
			}
		},
		created() {
			var _self = this;
			var data =  {
				student_id:this.id
			}
		},
		computed:{
			showNum(){
				var _self=this;
				var type = this.$route.query.type;
				this.flushCom(type)
				return type;
			}
		},
		components:{
			trunPage
		},
		methods:{
			flushCom(type){
				var _self=this;
				_self.type=type;
				this.getList("1");
			},
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				var data = {
					product_type:this.type,
					student_id:this.id,
					page:nextString
				}
				liSrv.orderListstudent(data,function(res){
					_self.boxshow=true;
					_self.showyn=false;
					if(_self.type=='1'){
						_self.buyall = res.list;
					}else if(_self.type=='2'){
						_self.orderall = res.list;
					}
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				},function(err){
					_self.pageCount='1';
					_self.total = '0';
					_self.buyall = _self.orderall = {}
					if(err.code=="E_NOT_DATA"){
						_self.boxshow=false;
						_self.showyn=true
					}
				})
			},
			goPage(name,orderid,data){
				common.setS('stuInfo',data);
				var el = event.target;
				if(name=='未付款'){
					common.setS('class_order_num',orderid)
					this.$router.push('/studentfile/stu_pay')
				}else if(name=='退款成功'){
					common.setS('exit_class_order_num',orderid)
					$(el).attr('target','_blank')
					$(el).attr('href','/studentfile/stu_class_refund_prove')
				}else{
					common.setS('class_order_num',orderid)
					$(el).attr('target','_blank')
					$(el).attr('href','/studentfile/stu_class_charge_prove')
				}
			},
			goPageipad(name,orderid,data){
				common.setS('stuInfo',data);
				var el = event.target;
				if(name=='未付款'){
					common.setS('ipad_order_num',orderid)
					this.$router.push('/studentfile/stu_ipad_pay')
				}else if(name=='退款成功'){
					common.setS('studentIpadorderId',orderid)
					$(el).attr('target','_blank')
					$(el).attr('href','/studentfile/stu_ipad_refund_prove')
				}else{
					common.setS('ipad_order_num',orderid)
					$(el).attr('target','_blank')
					$(el).attr('href','/studentfile/stu_ipad_charge_prove')
				}
			}
		}
	}
</script>