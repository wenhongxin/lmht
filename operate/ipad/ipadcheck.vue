<style lang="less" rel="stylesheet/less" scoped>
	#ipadcheck {
		.common_btn {
			margin: 20px 0;
			width: 86px;
		}
		p {
			margin-top: 20px;
		}
		.state {
			height: 60px;
			p {
				margin-top: 0;
				float: left;
				margin-right: 20px;
				em {
					padding-left: 5px;
					margin-top: 5px;
					display: inline-block;
					height: 34px;
					line-height: 34px;
					background: #CCCCCC;
					width: 135px;
				}
			}
		}
		h3 {
			border-top: 1px solid #c6c6c6;
			padding-top: 15px;
			margin: 80px 0 40px 0;
		}
		input,
		select {
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
			margin-top: 5px;
			width: 300px;
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
		<a href="javascript:;;" :class="{'disable':ipadData.btn_yes==2}" class="common_btn" @click='ipadstate'>{{ipadData.btn_yes_name}}</a>
		<div class="state">
			<p>入库时间<br />
				<em>{{ipadData.ctime_man}}</em>
			</p>
			<p>状态<br />
				<em>{{ipadData.state_name}}</em>
			</p>
		</div>
		<p>ipad编号<br /><input type="text" v-model.trim='ipad_bh' :disabled="ipadData.uid!=0" /></p>
		<p>品牌<br /><input type="text" v-model.trim='ipad_pp' :disabled="ipadData.uid!=0" /></p>
		<p>机型<br /><input type="text" v-model.trim='ipad_jx' :disabled="ipadData.uid!=0" /></p>
		<p>内存<br /><input type="text" v-model.trim='ipad_nc' :disabled="ipadData.uid!=0" /></p>
		<p>颜色<br /><input type="text" v-model.trim='ipad_ys' :disabled="ipadData.uid!=0" /></p>
		<p>尺寸<br /><input type="text" v-model.trim='ipad_cc' :disabled="ipadData.uid!=0" /></p>
		<p>门店名称<br />
			<select v-model='ipad_md' :disabled="ipadData.uid!=0">
				<option value="">分配门店</option>
				<option v-for='store in storeList' :value="store.id">{{store.store_name}}</option>
			</select>
		</p>
		<p>押金（元）<br /><input type="text" v-model.trim='ipad_yj' :disabled="ipadData.uid!=0" /></p>
		<p>日租金（元）<br /><input type="text" v-model.trim='ipad_zj' :disabled="ipadData.uid!=0" /></p>
		<p>备注</p>
		<textarea v-model.trim='ipad_bz'></textarea>
		<a href="javascript:;;" class="common_btn" @click='ipadok'>提交</a>
		<h3>历史记录</h3>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="160">时间</td>
					<td width="140">门店名称</td>
					<td width="75">操作人</td>
					<td width="75">类型</td>
					<td width="75">学生姓名</td>
					<td width="101">手机号</td>
					<td width="324" class="td-left">备注</td>
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
					<td class="td-left">{{log.content}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'ipadcheck',
		data() {
			return {
				ipad_bh: '',
				ipad_pp: '',
				ipad_jx: '',
				ipad_nc: '',
				ipad_ys: '',
				ipad_cc: '',
				ipad_md: '',
				ipad_yj: '',
				ipad_zj: '',
				storeList: '',
				ipad_bz: '',
				ipadData: {},
				ipadlog: ''
			}
		},
		created() {
			this.getipad()
		},
		methods: {
			getipad() {
				var _self = this;
				var id = _self.$route.query.id;
				liSrv.getStoreList('', function(res) {
					_self.storeList = res.list;
					liSrv.getIpadOne(id, function(res) {
						_self.ipadData = res.data;
						_self.ipad_md = res.data.store_id;
						_self.ipad_bh = res.data.device_number;
						_self.ipad_pp = res.data.device_brand;
						_self.ipad_jx = res.data.device_type;
						_self.ipad_nc = res.data.device_memory;
						_self.ipad_ys = res.data.device_color;
						_self.ipad_cc = res.data.device_size;
						_self.ipad_yj = res.data.yajing;
						_self.ipad_zj = res.data.rizujing;
					})
				})
				liSrv.ipadLog(id, function(res) {
					_self.ipadlog = res.list;
				})
			},
			ipadok() {
				var ipad_bh = this.ipad_bh,
					ipad_pp = this.ipad_pp,
					ipad_jx = this.ipad_jx,
					ipad_nc = this.ipad_nc,
					ipad_ys = this.ipad_ys,
					ipad_cc = this.ipad_cc,
					ipad_md = this.ipad_md,
					ipad_yj = this.ipad_yj,
					ipad_zj = this.ipad_zj,
					ipad_id = this.$route.query.id,
					_self = this;
				if(!ipad_bh || !ipad_pp || !ipad_jx || !ipad_nc || !ipad_ys || !ipad_cc || !ipad_md || !ipad_yj || !ipad_zj) {
					alert('请将信息填写完整');
					return;
				}
				var data = {
					device_number: ipad_bh,
					device_brand: ipad_pp,
					device_type: ipad_jx,
					device_memory: ipad_nc,
					device_color: ipad_ys,
					device_size: ipad_cc,
					yajing: ipad_yj,
					rizujing: ipad_zj,
					store_id: ipad_md,
					device_id: ipad_id,
					remark: this.ipad_bz
				}
				liSrv.updataIpad(data, function(res) {
					alert('修改成功');
					_self.getipad()
					_self.ipad_bz = '';
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