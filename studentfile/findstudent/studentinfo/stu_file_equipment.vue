<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_equipment {
		padding-top: 30px;
		.common_btn{
			display: inline-block;
			width: 75px;
			cursor: pointer;
		}
		.ipad_exit{
			background: #EFEFEF;
			color: #666;
		}
		h4{
			margin-top: 20px;
			padding-top: 20px;
			border-top: 1px solid #c6c6c6;
		}
		.table{
			margin-top: 10px;
		}
		.showyn{
			line-height: 30px;
			padding-top: 10px;
		}
	}
</style>
<template>
	<div id="stu_file_equipment">
		<div>
			<em>
				<router-link  v-if='!studentIpadorderId' :to='{name:"stu_ipad_rent"}' class="common_btn">ipad租用</router-link>
				<router-link v-if='studentIpadorderId' :to='{name:"stu_ipad_t_rent"}' class="common_btn">退租</router-link>
			</em>
			<h4>ipad信息</h4>
			<table class="table" border="1" v-if="boxshow">
				<thead>
					<tr>
						<td width="108">设备</td>
						<td width="160">编号</td>
						<td width="360">备注</td>
						<td width="180">租期</td>
						<td width="80">日租金(元)</td>
						<td width="80">押金(元)</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='ipad in stuipadList' :class="{'ipad_exit':ipad.state==2}">
						<td>{{ipad.device_zuqi.device.device_type}}</td>
						<td>{{ipad.device_zuqi.device.device_number}}</td>
						<td>{{ipad.device_zuqi.device.content}}</td>
						<td>{{ipad.device_zuqi.start_time_man}} — {{ipad.device_zuqi.end_time_man}}</td>
						<td>{{ipad.device_zuqi.device.rizujing}}</td>
						<td>{{ipad.device_zuqi.device.yajing}}</td>
					</tr>
				</tbody>
			</table>
			<p class="showyn" v-if='!stuipadList  || !stuInfo.student_id'>该同学还没有租用ipad！！！</p>
		</div>
	</div>
	

</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'stu_file_equipment',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				id: this.$route.query.id,
				studentIpadorderId: "",
				stuipadList: null,
				boxshow:true
			}
		},
		components:{
			trunPage
		},
		created() {
			var _self = this;
			liSrv.studentIpad(_self.id, function(res) {
				_self.boxshow=true;
				_self.stuipadList = res;
				$.each(res, function(i, v) {
					if(v.state == 1) {
						common.setS('studentIpadorderId', v.order_id)
						_self.studentIpadorderId = v.order_id;
					}
				});
			}, function(err){
				if(err.code=="E_LIVE_OP_FAIL"){
					_self.boxshow=false;
				}
			})
		},
		methods: {
			
		}
	}
</script>