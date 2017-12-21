<style lang="less" rel="stylesheet/less" scoped>
	#editclasshistory {
		margin-top: 0;
	}
</style>
<template>
	<div id="editclasshistory">
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="150">时间</td>
					<td width="120">操作员</td>
					<td width="120">模块</td>
					<td>备注</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for = 'item in list'>
					<td>{{item.ctime_man}}</td>
					<td>{{item.admin_name}}</td>
					<td>{{item.module_name}}</td>
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
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'editclasshistory',
		data() {
			return {
				list:'',
				id:this.$route.query.id,
				pageCount: '1',
				nextString: '1',
				total: '0'
			}
		},
		components:{
			trunPage
		},
		created() {
			var data = {
				class_id:this.id
			},_self=this;
			liSrv.getClassHistoryList(data,function(res){
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.list = res.list;
			},function(res){
					if(res.code=="E_NOT_DATA"){
						_self.list = ''
					}
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data =  {
					class_id:this.id,
					page:nextString
				}
				liSrv.getClassHistoryList(data, function(res) {
					_self.list = res.list
				})
			},			
		}
	}
</script>