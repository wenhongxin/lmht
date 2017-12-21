<style lang="less" rel="stylesheet/less" scoped>
	#all {}
</style>
<template>
	<div id="all">
		<p class="search">ipad编号：<input type="text" v-model.trim='ipad_bh' @keyup.enter='searchIpad' /><span class="common_btn" @click="searchIpad">搜索</span></p>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="66">序号</td>
					<td width="160">入库时间</td>
					<td width="160">ipad编号</td>
					<td width="66">品牌</td>
					<!--<td width="66">机型</td>
					<td width="66">内存</td>
					<td width="66">颜色</td>
					<td width="66">尺寸</td>-->
					<td width="140">门店名称</td>
					<td width="77">押金(元)</td>
					<td width="77">日租金(元)</td>
					<td width="66">操作人</td>
					<td width="100">状态</td>
					<td width="40">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='ipad in ipadList'>
					<td>{{ipad.id}}</td>
					<td>{{ipad.ctime_man}}</td>
					<td>{{ipad.device_number}}</td>
					<td>{{ipad.device_brand}}</td>
					<!--<td class="width1">{{ipad.device_type}}</td>
						<td class="width1">{{ipad.device_memory}}</td>
						<td class="width1">{{ipad.device_color}}</td>
						<td class="width1">{{ipad.device_size}}</td>-->
					<td>{{ipad.store_name}}</td>
					<td>{{ipad.yajing}}</td>
					<td>{{ipad.rizujing}}</td>
					<td>{{ipad.admin_name}}</td>
					<td>{{ipad.state_name}}</td>
					<td>
						<router-link :to="{name:'ipadcheck',query:{id:ipad.id}}">编辑</router-link>
					</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount='pageCount' :nextString='nextString' :total='total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'all',
		data() {
			return {
				ipad_bh: '',
				pageCount: '1',
				nextString: '1',
				ipadList: null,
				total: '0'
			}
		},
		components: {
			trunPage
		},
		created() {
			this.getIpadList({});
		},
		methods: {
			getIpadList(data) {
				var _self = this;
				_self.nextString = '1';
				liSrv.getIpadList(data, function(res) {
					_self.ipadList = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				}, function(res) {
					if(res.code == 'E_NOPRIV') {
						alert('无操作权限');
						window.history.go(-1);
						return;
					}
					if(res.code == 'E_NOT_DATA') {
						//alert('暂无ipad');
						_self.ipadList = '';
						_self.total = '0';
						_self.pageCount = '1';
						_self.nextString = '1';
					}
				})
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data = {
					page: nextString
				};
				liSrv.getIpadList(data, function(res) {
					_self.ipadList = res.list;
				})
			},
			searchIpad() {
				if(this.ipad_bh == '') {
					return;
				};
				this.getIpadList({
					device_number: this.ipad_bh
				});
			}
		},
		watch: {
			'ipad_bh' (a, b) {
				if(a == '') {
					this.getIpadList({})
				}
			}
		}
	}
</script>