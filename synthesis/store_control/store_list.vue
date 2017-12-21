<style lang="less" rel="stylesheet/less" scoped>
	#store_list {}
</style>
<template>
	<div id="store_list" class="content_sub">
		<h2 class="tit">门店列表 <a class='common_btn' href='javascript:;;' @click='addStore'>新建门店</a> </h2>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="80">ID</td>
					<td width="200">门店名称</td>
					<td width="50" class="td-center">类型</td>
					<td width="80">店长</td>
					<td width="100">店长电话</td>
					<td width="350">地址</td>
					<td width="180">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='item in storeList'>
					<td>{{item.id}}</td>
					<td>{{item.store_name}}</td>
					<td class="td-center">{{item.store_type_name}}</td>
					<td>{{item.store_user}}</td>
					<td>{{item.store_user_mobile}}</td>
					<td>{{item.prov_name}}{{item.city_name}}{{item.district_name}}{{item.store_address}}</td>
					<td>
						<a @click='updataStore(item)' href="javascript:;;">修改</a>
						<!--&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;;" @click='delstore(item.id)'>删除</a>-->
					</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'store_list',
		data() {
			return {
				storeList: null,
				pageCount: '1',
				nextString: '1',
				total: '0'
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self = this;
			liSrv.getStoreList('', function(res) {
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.storeList = res.list
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				liSrv.getStoreList(nextString, function(res) {
					_self.storeList = res.list
				})
			},
			addStore() {
				common.setS('updatastore', {})
				this.$router.push({
					path: 'add_store'
				})
			},
			updataStore(data) {
				common.setS('updatastore', data)
				this.$router.push({
					path: 'add_store'
				})
			},
			delstore(id) {
				var r = confirm('确定删除吗？');
				var _self = this;
				if(r) {
					liSrv.delStore(id, function() {
						liSrv.getStoreList('', function(res) {
							_self.total = res.total;
							_self.pageCount = res.pageCount;
							_self.storeList = res.list
						})
					})
				}
			}

		}
	}
</script>