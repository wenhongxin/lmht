<style lang="less" rel="stylesheet/less" scoped>
	#exit_class_ok {
		.jbinfo {
			height: auto;
			margin-bottom: 10px;
		}
		a {
			margin-top: 20px;
			width: 115px;
		}
		.table tbody tr:hover{
				background: #e0e0e0!important;
			}
	}
</style>
<template>
	<div id="exit_class_ok" class="content_sub">
		<h2 class="tit">需退款{{Data.money}}元</h2>
		<div class="ok_img">
			<img src="../../../../../assets/okimg.png" /><b>退班成功</b>
		</div>
		<commstuinfo istit='true' isparent='true'></commstuinfo>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="200">班型</td>
					<td width="130">退款金额</td>
					<td width="130">上课次数</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='(item,i) in Data.classData'>
					<td>{{item.name}}</td>
					<td v-if='i==0' :rowspan="Data.classData.length">{{Data.money}}</td>
					<td>{{item.class_lesson_count}}</td>
				</tr>
			</tbody>
		</table>
		<a href="/studentfile/stu_class_refund_prove" target='_blank' class='common_btn' @click='backstuinfo'>打印退款协议</a>
	</div>
</template>
<script>
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo';
	export default {
		name: 'exit_class_ok',
		data() {
			return {
				Data: common.getS('exit_class_data') || {},
				stu_id:common.getS('stuInfo').student_id,
				num: this.$route.query.num,
			}
		},
		created(){
			console.log(this.Data)
		},
		components:{
			commstuinfo
		},
		methods: {
			backstuinfo() {
				var _self=this;
				this.$router.push({
					name: "stu_file_livecourse",
					query: {
						id: _self.stu_id,
						num:this.num
					}
				})
				common.setS('exit_class_data',null)
			}
		}
	}
</script>