<style lang="less" rel="stylesheet/less" scoped>
	#add_user {
		h2 {
			margin-bottom: 18px;
		}
		input ,select{
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
			margin-top: 5px;
		}
		.add_store_name {
			input {
				width: 298px;
			}
		}
		.add_store_main {
			margin: 18px 0;
			height: 52px;
			width: 100%;
			p {
				
				float: left;
			}
			input ,select{
				outline: none;
				width: 184px;
			}
		}
		.add_store_site {
			input {
				width: 518px;
			}
		}
		a {
			margin-top: 20px;
			width: 60px;
		}
	}
</style>
<template>
	<div id="add_user" class="content_sub">
		<h2 class="tit" v-text='updatanode.id ? "修改节点" : "新建节点"'>
   </h2>
		<div class="add_store_main">
			<p class="add_store_main_name">节点名称<br /><input type="text"  v-model.trim='updatanode.node_name'  /></p>
			<p class="add_store_main_clan_phone">模块名<br /><input type="text"  v-model.trim='updatanode.module_name'  /></p>
		</div>
		<div class="add_store_main">
			<p class="add_store_main_name">控制器<br /><input type="text"  v-model.trim='updatanode.control_name'  /></p>
			<p class="add_store_main_clan_phone">方法<br /><input type="text"  v-model.trim='updatanode.action_name'  /></p>
		</div>
		<div class="add_store_main">
			<p class="add_store_main_name">是否是菜单<br />
				<select name="" id="" v-model='updatanode.is_menu'>
					<option value="1">不是</option>
					<option value="2">是</option>
				</select>
			</p>
			<p class="add_store_main_clan_phone">父ID<br />
			<select name="" id="" v-model='updatanode.typeid'>
				<option v-for='menu in nodeMenu' :value="menu.id">{{menu.node_name}}</option>
			</select></p>
		</div>
		<a href="javascript:;;" class="common_btn" @click='addorupdata_node()'>确定</a>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv'
	export default {
		name: 'add_user',
		data() {
			return {
				storeList: null,
				updatanode:common.getS('updatanode') || {},
				nodeMenu:null
			}
		},
		beforeCreate() {
			var _self = this;
			liSrv.getNodeMenu(function(res){
				_self.nodeMenu = res;
//				console.log(res)
			})
		},
		methods: {
			addorupdata_node(){
				var _self = this;
				var updatanode = _self.updatanode;
				var node_name = updatanode.node_name;
				var module_name = updatanode.module_name;
				var control_name = updatanode.control_name;
				var action_name = updatanode.action_name;
				var typeid = $.trim(updatanode.typeid);
				if(!node_name){
					alert('请填写节点名称');
					return;
				}
				if(!module_name){
					alert('请填写模型名');
					return;
				}
				if(!module_name){
					alert('请填写控制器');
					return;
				}
				if(!action_name){
					alert('请填写方法');
					return;
				}
				if(!updatanode.is_menu){
					alert('请选择是否是菜单');
					return;
				}
				if(!typeid){
					alert('请填写父ID');
					return;
				}
				var data = {
					node_name:node_name,
					module_name:module_name,
					control_name:control_name,
					action_name:action_name,
					typeid:typeid,
					is_menu:updatanode.is_menu
				}
				if(updatanode.id != undefined || updatanode.id != 'undefined'){
					data.node_id = updatanode.id;
				}
				liSrv.updataoraddnode(data,function(){
					common.setS('updatanode',{})
					alert('操作成功');
					_self.$router.push("/synthesis/nodelist")
				})
			}
		}
	}
</script>