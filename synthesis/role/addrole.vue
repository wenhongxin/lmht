<style lang="less" rel="stylesheet/less" scoped>
#search_stu{
	h3{
		font-weight: normal;
		font-size: 12px;
		margin: 22px 0 5px 0;
	}
	input{
		width: 288px;
		height: 34px;
		border: 1px solid #95989a;
		padding-left: 10px;
		margin:0 10px;
		
	}
	span{
		display: inline-block;
		width: 75px;
		cursor: pointer;
	}
	p{
		margin-top: 20px;
	}
}
</style>
<template>
  <div id="search_stu" class="content_sub">
  	<h2 class="tit"  v-text='updatarole.id ? "修改角色" : "新建角色"'></h2>
  	<p>角色名称：<input type="text" v-model.trim='updatarole.rolename'/><span class="common_btn" @click="addrole">添加</span></p>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'search_stu',
  data(){
			return {
				rolename:'',
				updatarole:common.getS('updatarole')
			}
		},
		beforeCreate(){
			var _self = this;
		},
		methods:{
			addrole(){
				var _self = this;
				var rolename = _self.updatarole.rolename;
				if(!rolename){
					alert('请填写角色名称');
					return ;
				}
				var data = {
					rolename:rolename
				}
				if(this.updatarole.id){
					data.role_id  = this.updatarole.id
				}
				liSrv.updataoraddRole(data,function(res){
					common.setS('updatarole',{})
					alert('操作成功');
					_self.$router.push("/synthesis/rolelist")
				})
			}
		}
}
</script>

