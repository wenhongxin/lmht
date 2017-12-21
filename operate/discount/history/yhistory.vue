<style lang="less" rel="stylesheet/less" scoped>
	#yhistory {
		margin-top: 0;
	}
</style>
<template>
	<div id="yhistory">
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="150">时间</td>
					<td width="120">操作员</td>
					<td width="120">模块</td>
					<td width="200">优惠名称</td>
					<td>备注</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for = 'item in list'>
					<td>{{item.ctime_man}}</td>
					<td>{{item.admin_name}}</td>
					<td>{{item.model_name}}</td>
					<td>{{item.discount_name}}</td>
					<td>{{item.remark}}</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
	

</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'yhistory',
		data() {
			return {
				list:'',
				id:this.$route.query.id,
				pageCount: '1',
				nextString: '1',
				total: '0',
			}
		},
		components:{
			trunPage
		},
		created() {
			var _self = this;
			liSrv.getDiscountHistory({},function(res){
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.list = res.list
			},function(){
				
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data =  {
					page:nextString
				}
				liSrv.getDiscountHistory(data, function(res) {
					_self.list = res.list
				})
			},			
		}
	}
</script>