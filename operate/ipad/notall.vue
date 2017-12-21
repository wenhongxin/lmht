<style lang="less" rel="stylesheet/less" scoped>
#notall{
	
}
</style>
<template>
  <div id="notall" >
  	<table class="table table-center-all" border="1">
			<thead>
		    <tr>
		      <td width="66">序号</td>
					<td width="160" >时间</td>
					<td width="160">ipad编号</td>
					<td width="66">品牌</td>
					<td width="66">机型</td>
					<!--<td width="66">内存</td>
					<td width="66">颜色</td>
					<td width="66">尺寸</td>-->
					<td width="140">门店名称</td>
					<td width="77">押金(元)</td>
					<td width="77">日租金(元)</td>
					<td width="66">操作人</td>
					<td width="40">操作</td>
		    </tr>
  		</thead>
  		<tbody>
  				<tr v-if = 'notipad'>
  					<td  colspan="15" style="padding-left: 20px; text-align: left;">无未签收ipad！！！</td>
  				</tr>
  				<tr v-for='ipad in ipadList'>
						<td class="width1">{{ipad.id}}</td>
						<td class="width3">{{ipad.ctime_man}}</td>
						<td class="width3">{{ipad.device_number}}</td>
						<td class="width1">{{ipad.device_brand}}</td>
						<td class="width1">{{ipad.device_type}}</td>
						<!--<td class="width1">{{ipad.device_memory}}</td>
						<td class="width1">{{ipad.device_color}}</td>
						<td class="width1">{{ipad.device_size}}</td>-->
						<td class="width2">{{ipad.store_name}}</td>
						<td class="width1 rizujin">{{ipad.yajing}}</td>
						<td class="width1 rizujin">{{ipad.rizujing}}</td>
						<td class="width1">{{ipad.admin_name}}</td>
						<td class="width4"><a href="javascript:;;" @click='qsipad(ipad.id)'>签收</a></td>
				</tr>
  		</tbody>
		</table>
  	<!--<ol class="ipad_list_css ipad_list">
			<li class="table_tit">
				<span class="width1">序号</span>
				<span class="width3">时间</span>
				<span class="width3">ipad编号</span>
				<span class="width1">品牌</span>
				<span class="width1">机型</span>
				<span class="width1">内存</span>
				<span class="width1">颜色</span>
				<span class="width1">尺寸</span>
				<span class="width2">门店名称</span>
				<span class="width1 rizujin">押金(元)</span>
				<span class="width1 rizujin">日租金(元)</span>
				<span class="width1">操作人</span>
				<span class="width4">操作</span>
			</li>-->
			<!--<li v-if = 'notipad' style="padding-left:20px;text-align: left;">无未签收ipad</li>
			<li v-for='ipad in ipadList' v-if='isSearch || ipad_bh == ipad.device_number'>
				<span class="width1">{{ipad.id}}</span>
				<span class="width3">{{ipad.ctime_man}}</span>
				<span class="width3">{{ipad.device_number}}</span>
				<span class="width1">{{ipad.device_brand}}</span>
				<span class="width1">{{ipad.device_type}}</span>
				<span class="width1">{{ipad.device_memory}}</span>
				<span class="width1">{{ipad.device_color}}</span>
				<span class="width1">{{ipad.device_size}}</span>
				<span class="width2">{{ipad.store_name}}</span>
				<span class="width1 rizujin">{{ipad.yajing}}</span>
				<span class="width1 rizujin">{{ipad.rizujing}}</span>
				<span class="width1">{{ipad.admin_name}}</span>
				<span class="width4"><a href="javascript:;;" @click='qsipad(ipad.id)'>签收</a></span>
			</li>
		</ol>-->
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
import trunPage from '../../../basic/trunPage.vue';
export default {
  name: 'notall',
  data(){
			return {
				pageCount:'1',
				nextString:'1',
				ipadList:null,
				notipad:false,
				total:'0'
			}
		},
		components:{
			trunPage
		},
		created(){
			this.getipadlist();
		},
		methods:{
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				liSrv.getIpadList(nextString,function(res){
					_self.ipadList = res.list
				})
			},
			getipadlist(){
				var _self = this;
				var data = {
					page:'',
					state:3
				}
				liSrv.getIpadList(data,function(res){
					_self.ipadList = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				},function(res){
					if(res.code == 'E_NOPRIV'){
						alert('无操作权限');
						window.history.go(-1);
						return ;
					}				
					if(res.code == 'E_NOT_DATA'){
						_self.notipad = true;
						_self.ipadList = '';
						_self.total = '0';
						_self.pageCount = '1';
						_self.nextString = '1';
					}
				})
			},
			qsipad(id){
				var _self = this;
				liSrv.zbSignIpad(id,function(){
					_self.getipadlist();
				})
			}
		},
		watch:{
		}
}
</script>

