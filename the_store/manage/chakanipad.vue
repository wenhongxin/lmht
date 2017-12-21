<style lang="less" rel="stylesheet/less" scoped>
	#ipadcheck {
		.common_btn {
			margin: 20px 0;
			width: 86px;
		}
		p {
			margin-top: 20px;
		}
		em {
			padding-left: 10px;
			width: 300px;
			display: inline-block;
			height: 34px;
			line-height: 34px;
			background: #CCCCCC;
		}
		h3 {
			border-top: 1px solid #c6c6c6;
			padding-top: 15px;
			margin: 80px 0 40px 0;
		}
		.state {
			height: 60px;
			p {
				margin-top: 0;
				float: left;
				margin-right: 20px;
				em {
					margin-top: 5px;
					display: inline-block;
					width: 140px;
				}
			}
		}
		textarea {
			box-sizing: border-box;
			resize: none;
			width: 400px;
			height: 120px;
			max-width: 100%;
			max-height: 120px;
			outline: none;
			padding: 5px 0 0 10px;
		}
		.btn {
			a {
				width: auto;
				padding: 0 15px;
				display: inline-block;
				margin-right: 80px;
			}
		}
		.alert-all {
			left: -210px;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
		}
		.alert {
			width: 550px;
			height: 450px;
			background: #FFFFFF;
			border: 1px solid #000000;
			position: absolute;
			top: 50%;
			left: 430px;
			margin-top: -250px;
			h4 {
				font-weight: normal;
				font-size: 26px;
				margin: 30px 50px;
			}
			p {
				margin: 50px 0 0 50px;
				input {
					box-sizing: border-box;
					width: 300px;
					padding-left: 10px;
					height: 34px;
					border: 1px solid rgb(169, 169, 169);
				}
				textarea {
					width: 300px;
				}
			}
			span {
				a {
					display: inline-block;
					margin: 50px 5px 0 120px;
				}
			}
		}
		.disable {
			background: #CCCCCC;
			pointer-events: none;
			cursor: default;
		}
	}
</style>
<template>
	<div id="ipadcheck" class="content_sub">
		<h2 class="tit">ipad库存管理</h2>
		<a href="javascript:;;" :class="{'disable':ipadData.btn_yes==2}" @click='ipadstate' class="common_btn">{{ipadData.btn_yes_name}}</a>
		<div class="state">
			<p>入库时间<br />
				<em>{{time | time}}</em>
			</p>
			<p>状态<br />
				<em>{{state_man}}</em>
			</p>
		</div>
		<p>ipad编号<br /><em>{{ipad_bh}}</em></p>
		<p>品牌<br /><em>{{ipad_pp}}</em></p>
		<p>机型<br /><em>{{ipad_jx}}</em></p>
		<p>内存<br /><em>{{ipad_nc}}</em></p>
		<p>颜色<br /><em>{{ipad_ys}}</em></p>
		<p>尺寸<br /><em>{{ipad_cc}}</em></p>
		<p>门店名称<br /><em>{{storename}}</em></p>
		<p>押金（元）<br /><em>{{ipad_yj}}</em></p>
		<p>日租金（元）<br /><em>{{ipad_zj}}</em></p>
		<p>备注</p>
		<textarea v-model.trim='ipad_bz'></textarea>
		<div class="btn">
			<a href="javascript:;;" class="common_btn" @click='ipadok'>提交</a>
			<a href="javascript:;;" class="common_btn" :class="{'disable':ipadData.uid !=0 || ipadData.uid !=''}" @click='ipadback'>ipad退回总部</a>
		</div>

		<h3>历史记录</h3>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="160">时间</td>
					<td width="140">门店名称</td>
					<td width="75">操作人</td>
					<td width="75">类型</td>
					<td width="75">学生姓名</td>
					<td width="100">手机号</td>
					<td width="300" style="text-align: left;padding-left: 10px;">备注</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='log in ipadlog'>
					<td>{{log.ctime_man}}</td>
					<td>{{log.store_name}}</td>
					<td>{{log.admin_realname}}</td>
					<td>{{log.type_name}}</td>
					<td>{{log.urealname}}</td>
					<td>{{log.username}}</td>
					<td style="text-align: left;padding:0 10px;">{{log.content}}</td>
				</tr>
			</tbody>
		</table>
		<div class="alert-all" v-if='isAlert'>
			<div class="alert">
				<h4>确认是否将ipad退回总部？</h4>
				<p><span>快递单号：</span><input type="text" v-model='courierorder' /></p>
				<p><span>退回原因：</span><textarea name="" rows="" cols="" v-model='whybackipad'></textarea></p>
				<span>
				<a href="javascript:;;"class="common_btn" @click='okipadback'>确定</a>
				<a href="javascript:;;"class="common_btn" @click='qxipadback'>取消</a>
			</span>
			</div>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'ipadcheck',
		data() {
			return {
				ipadData: {},
				ipad_bh: '　',
				ipad_pp: '　',
				ipad_jx: '　',
				ipad_nc: '　 ',
				ipad_ys: '　 ',
				ipad_cc: '　',
				ipad_yj: '　 ',
				ipad_zj: '　',
				storename: '　 ',
				isAlert: false,
				courierorder: '',
				whybackipad: '',
				time: '　',
				state_man: '　',
				yes: '',
				ipadlog: null,
				ipad_bz: '',
			}
		},
		created() {
			this.getipad()
		},
		methods: {
			ipadback() {
				this.isAlert = true;
			},
			qxipadback() {
				this.isAlert = false;
				this.courierorder = ''
				this.whybackipad = ''
			},
			okipadback() {
				var id = this.$route.query.id;
				var courierorder = $.trim(this.courierorder);
				var whybackipad = $.trim(this.whybackipad);
				var _self = this;
				if(!courierorder) {
					alert("请填写快递单号");
					return;
				}
				if(!whybackipad) {
					alert("请填写退回原因");
					return;
				}
				var daTa = {
					device_id: id,
					express_id: courierorder,
					remark: whybackipad
				}
				liSrv.tuiIpadZ(daTa, function(res) {
					alert('操作成功');
					_self.$router.push('manage')
				})
			},
			ipadok() {
				var ipad_id = this.$route.query.id,
					ipad_bz = this.ipad_bz,
					_self = this;
				var data = {
					device_id: ipad_id,
					remark: ipad_bz
				}
				if(!ipad_bz) {
					alert('请填写备注信息');
					return;
				}
				liSrv.updataIpad(data, function(res) {
					alert('操作成功');
					_self.getipad()
				})
			},
			getipad() {
				var _self = this;
				var id = _self.$route.query.id;
				liSrv.getIpadOne(id, function(res) {
					_self.ipadData = res.data;
					_self.ipad_bh = res.data.device_number;
					_self.ipad_pp = res.data.device_brand;
					_self.ipad_jx = res.data.device_type;
					_self.ipad_nc = res.data.device_memory;
					_self.ipad_ys = res.data.device_color;
					_self.ipad_cc = res.data.device_size;
					_self.ipad_yj = res.data.yajing;
					_self.ipad_zj = res.data.rizujing;
					_self.time = res.data.ctime_man;
					_self.state_man = res.data.state_name;
					_self.storename = res.data.store_name
				})
				liSrv.ipadLog(id, function(res) {
					_self.ipadlog = res.list;
				})
			},
			ipadstate() {
				var _self = this;
				var btn_name = _self.ipadData.btn_yes_name;
				var ipad_id = this.$route.query.id;
				liSrv.ipadstate(ipad_id, function(res) {
					_self.getipad()
				})
			}
		}
	}
</script>