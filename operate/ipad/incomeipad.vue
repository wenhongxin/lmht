<style lang="less" rel="stylesheet/less" scoped>
#incomeipad{
	input ,select{
		box-sizing: border-box;
		height: 34px;
		border: 1px solid #95989a;
		padding-left: 10px;
		margin-right: 10px;
		margin-top: 5px;
		width: 300px;
	}
	h3{
		border-top: 1px solid #c6c6c6;
		margin-top:20px;
		padding-top: 15px;
		font-size: 14px;
	}
	p{
		margin: 20px 0 0 80px;
	}
	.lrok{
		margin: 80px 0;
		a{
			display:inline-block;
			width: 86px;
			margin-right: 20px;
		}
		i{
			color: red;
		}
	}
	textarea{
			box-sizing: border-box;
			resize: none;
			width:300px;
			height: 120px;
			max-width: 100%;
			max-height: 120px;
			outline: none;
			padding: 5px 0 0 10px;
		}
}
</style>
<template>
  <div id="incomeipad" class="content_sub">
  	<h2 class="tit">ipad入库</h2>
  		<h3 style="margin-top:0;border-top: none;">基本信息</h3>
			<p>ipad编号<br /><input type="text"  v-model.trim='ipad_bh'  /></p>
			<p>品牌<br /><input type="text"  v-model.trim='ipad_pp'  /></p>
			<p>机型<br /><input type="text"  v-model.trim='ipad_jx'  /></p>
			<h3>储存外观信息</h3>
			<p>内存<br /><input type="text"  v-model.trim='ipad_nc'  /></p>
			<p>颜色<br /><input type="text"  v-model.trim='ipad_ys'  /></p>
			<p>尺寸<br /><input type="text"  v-model.trim='ipad_cc'  /></p>
			<h3>分配门店设置</h3>
			<p>门店名称<br /><select name="" id="" v-model.trim='ipad_md'>
				<option value="">分配门店</option>
				<option v-for='store in storeList' :value="store.id">{{store.store_name}}</option>
			</select></p>
			<p>押金（元）<br /><input type="text"  v-model.trim='ipad_yj'  /></p>
			<p>日租金（元）<br /><input type="text"  v-model.trim='ipad_zj'  /></p>
			<p>备注<br />
				<textarea v-model.trim='ipad_bz'></textarea>
			</p>
		<p class="lrok">
			<a class="common_btn" href="javascript:;;" @click='ipadok'>提交</a>操作人员： <i>{{username}}</i>
		</p>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'incomeipad',
  data(){
			return {
				ipad_bh:'',
				ipad_pp:'',
				ipad_jx:'',
				ipad_nc:'',
				ipad_ys:'',
				ipad_cc:'',
				ipad_md:'',
				ipad_yj:'',
				ipad_zj:'',
				ipad_bz:'',
				username:common.getS('username'),
				storeList:null
			}
		},
		beforeCreate(){
			var _self = this;
			liSrv.getStoreList('',function(res){
				_self.storeList = res.list;
			})
		},
		methods:{
			ipadok(){
				var ipad_bh=this.ipad_bh,
				    ipad_pp=this.ipad_pp,
				    ipad_jx=this.ipad_jx,
				    ipad_nc=this.ipad_nc,
				    ipad_ys=this.ipad_ys,
				    ipad_cc=this.ipad_cc,
				    ipad_md=this.ipad_md,
				    ipad_yj=this.ipad_yj,
				    ipad_zj=this.ipad_zj,
				    _self = this;
				 if(!ipad_bh || !ipad_pp || !ipad_jx || !ipad_nc || !ipad_ys || !ipad_cc || !ipad_md || !ipad_yj || !ipad_zj){
				 		alert('请将信息填写完整');
				 		return;
				 }
				 var data = {
				 		device_number:ipad_bh,
						device_brand:ipad_pp,
						device_type:ipad_jx,
						device_memory:ipad_nc,
						device_color:ipad_ys,
						device_size:ipad_cc,
						yajing:ipad_yj,
						rizujing:ipad_zj,
						store_id:ipad_md,
						remark:this.ipad_bz
				 }
				 var r = window.confirm('确定添加吗')
				 if(r){
					 	liSrv.addIpad(data,function(res){
					 		_self.ipad_bh="";
					    _self.ipad_pp="";
					    _self.ipad_jx="";
					    _self.ipad_nc="";
					    _self.ipad_ys="";
					    _self.ipad_cc="";
					    _self.ipad_md="";
					    _self.ipad_yj="";
					    _self.ipad_zj="";
					    _self.ipad_bz="";
					    alert('添加成功');
					 })
				 }
			}
		}
}
</script>

