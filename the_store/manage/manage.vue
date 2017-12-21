<style lang="less" rel="stylesheet/less" scoped>
	#manage {
		.solid{
			border-bottom:1px solid #c6c6c6;
		}
	}
</style>
<template>
	<div id="manage" class="content_sub">
		<h2 class="tit">设备管理</h2>
		<table class="table table-center-all" border="1" v-if = 'hasipad'>
			<thead>
				<tr>
					<td width="66">序号</td>
					<td width="160">时间</td>
					<td width="160">ipad编号</td>
					<td width="66">品牌</td>
					<td width="66">机型</td>
					<td width="66">内存</td>
					<!--<td width="66">颜色</td>
					<td width="66"">尺寸</td>-->
					<td width="140">门店名称</td>
					<td width="80">押金(元)</td>
					<td width="80">日租金(元)</td>
					<td width="66" class="td-left">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr  v-for='ipadn in ipadList' v-if='ipadn.state==1'>
					<td>{{ipadn.id}}</td>
					<td	>{{ipadn.ctime_man}}</td>
					<td>{{ipadn.device_number}}</td>
					<td>{{ipadn.device_brand}}</td>
					<td>{{ipadn.device_type}}</td>
					<td>{{ipadn.device_memory}}</td>
					<!--<td>{{ipadn.device_color}}</td>
					<td>{{ipadn.device_size}}</td>-->
					<td>{{ipadn.store_name}}</td>
					<td>{{ipadn.yajing}}</td>
					<td>{{ipadn.rizujing}}</td>
					<td  class="td-left"><a href="javascript:;;" @click='qsipad(ipadn.id)'>签收</a></td>
				</tr>
			</tbody>
		</table>
		<p class="solid"  v-if = 'hasipad'></p>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="66">序号</td>
					<td width="160">ipad编号</td>
					<td width="66">品牌</td>
					<td width="66">机型</td>
					<td width="66">内存</td>
					<td width="66">颜色</td>
					<!--<td width="66"">尺寸</td>-->
					<td width="140">门店名称</td>
					<td width="80">押金(元)</td>
					<td width="80">日租金(元)</td>
					<td width="140">状态</td>
					<td width="66"  class="td-left">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr  v-for='ipady in ipadList' v-if='ipady.state!=1'>
					<td>{{ipady.id}}</td>
					<td>{{ipady.device_number}}</td>
					<td>{{ipady.device_brand}}</td>
					<td>{{ipady.device_type}}</td>
					<td>{{ipady.device_memory}}</td>
					<td>{{ipady.device_color}}</td>
					<!--<td>{{ipady.device_size}}</td>-->
					<td>{{ipady.store_name}}</td>
					<td>{{ipady.yajing}}</td>
					<td>{{ipady.rizujing}}</td>
					<td>{{ipady.state_name}}</td>
					<td  class="td-left"><router-link :to="{name:'chakanipad',query:{id:ipady.id}}">查看</router-link></td>
				</tr>
				<tr	v-if='hasipad1'class="tr-left">
  					<td  colspan="11"  class="td-left">暂无ipad！！！</td>
  				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
	name: 'manage',
	data(){
		return{
			ipadList:null,
			hasipad:false,
			hasipad1:true
		}
	},
	beforeCreate(){
		var _self = this;
		liSrv.ipadStoreList(function(res){
			_self.ipadList = res;
			res.forEach(function(v,i){
				if(v.state == 1){
						_self.hasipad = true;
				}
				if(v.state == 2 || v.state == 3 || v.state == 5){
					_self.hasipad1 = false;
				}
			})
		},function(res){
			if(res.code == 'E_NOT_DATA'){
				_self.hasipad = false;
			}
		})
	},
	methods:{
		qsipad(id){
			var _self = this;
			liSrv.storeSignIpad(id,function(res){
				liSrv.ipadStoreList(function(res){
					_self.ipadList = res;
					_self.hasipad1 = true;
					_self.hasipad = false;
					res.forEach(function(v,i){
						if(v.state == 1){
								_self.hasipad = true;
						}
						if(v.state == 2){
							_self.hasipad1 = false;
						}
					})
				},function(){
					
				})
			})
		}
	}
}
</script>