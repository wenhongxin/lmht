<style lang="less" rel="stylesheet/less" scoped>
	#stu_ipad_rent {
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
		a {
			width: 84px;
			margin-top: 23px;
		}
		.table {
			margin-top: 0;
		}
	}
</style>
<template>
	<div id="stu_ipad_rent" class="content_sub">
		<h2 class="tit">选择ipad</h2>
		<h3>有效课程</h3>
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
		<h3>选择ipad</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="60">选择</td>
					<td width="108">设备</td>
					<td width="160">编号</td>
					<td width="430">备注</td>
					<td width="80">日租金</td>
					<td width="80">押金</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='ipad in ipadList'>
					<td><input type="radio" @click='chooseIpad(ipad.id)' name="ipad" /></td>
					<td>{{ipad.device_type}}</td>
					<td>{{ipad.device_number}}</td>
					<td>{{ipad.content}}</td>
					<td>{{ipad.rizujing}}</td>
					<td>{{ipad.yajing}}</td>
				</tr>
			</tbody>
		</table>
		<a href='javascript:;;' @click='okipad' class='common_btn'>确认订单</a>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv'
	export default {
		name: 'stu_ipad_rent',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				class_info: {
					first_class_time: "",
					last_class_time: ""
				},
				ipadList: {},
				ipadId: '',
				classlist: ''
			}
		},
		beforeCreate() {
			var _self = this;
			var store_id = common.getS('store_id');
			var stu_id = common.getS('stuInfo').student_id;
			if(stu_id) {
				liSrv.studentClassList(stu_id, function(res) {
					_self.classlist = res;
				},function(err){
					alert("没有有效课程，暂时无法租用ipad，请先报班");
					_self.$router.push({
						name: 'stu_file_equipment',
						query:{
							id:stu_id
						}
					});
				})
			}
			liSrv.ipadStoreYes(store_id, function(res) {
				_self.ipadList = res;
			}, function(res) {
				if(res.desc == '无更多数据') alert('无可租用的设备')
			})
		},
		methods: {
			okipad() {
				if(!this.ipadId) {
					alert('请选择设备');
					return;
				}
				var _self = this;
				var stuId = common.getS('stuInfo').student_id;
				var classId = common.getS('four_class_id');
				var data = {
					student_id: stuId,
					device_id: _self.ipadId
				}
				liSrv.ipadOrder(data, function(res) { //创建订单
					common.setS('ipad_order_num', res.order_id)
					_self.$router.push({
						name: 'stu_ipad_pay'
					});
				})
			},
			chooseIpad(id) {
				common.setS('ipadId', id)
				this.ipadId = id;
			}
		}
	}
</script>