<style lang="less" rel="stylesheet/less" scoped>
	#roletree {
		.zTreeDemoBackground {
			padding-top: 10px;
		}
		a {
			width: 84px;
			margin: 15px 0 30px 0;
		}
	}
</style>
<template>
	<div id="roletree" class="content_sub">
		<h2 class="tit">分配权限 </h2>
		<div class="content_wrap">
			<div class="zTreeDemoBackground">
				<ul id="treeDemo" class="ztree"></ul>
				<a href="javascript:;;" @click='roleok' class="common_btn">确定</a>
			</div>
		</div>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv';
	export default {
		name: 'roletree',
		data() {
			return {
				updataroletree: common.getS('updataroletree')
			}
		},
		beforeCreate() {
			var _self = this;
			var test = _self.$route.query.mmby;
			var id = common.getS('updataroletree').id;
			var setting = {
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				view: {
					selectedMulti :false,
					showIcon: false
				},
				edit: { //此属性添加后，树才可以被拖拽
					enable: true,
					showRemoveBtn: false,
					showRenameBtn: false,
					drag: {
						isCopy: true,
	          isMove: true,
	          prev: true,
	          next: true,
	          inner:true //function (treeId, nodes, targetNode) {
							//return !(targetNode && targetNode.level === 0);
					  //}	
					}
				},
				callback: {
					beforeDrag(treeId, treeNodes) {
						if(test != '911'){
								return false;
							}
						return true;
					},
					beforeDrop(treeId, treeNodes, targetNode, moveType) {
						//console.log("【源节点】节点id:" + treeNodes[0].id + "  父节点id:" + treeNodes[0].pId + "  级层：" + treeNodes[0].level + "  名称：" + treeNodes[0].name);
						//console.log("【目标节点】 节点id:"+targetNode.id+"  父节点id:"+targetNode.pId+"  级层："+targetNode.level+"  名称："+targetNode.name);
						 if(treeNodes[0].level==0){
                alert("不允许移动根节点");
                return false;
	            }
//						 if(!targetNode.pId && targetNode.level==0){
//              alert("不允许创建根节点");
//              return false;
//           }
					},
					 beforeDragOpen: function(){ 
              //console.log("自动展开目录");
              return true; 
          },
          onDrag: function(){
             // console.log("拖拽中");
              return true;
          },
					onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
						//console.log("【源节点】节点id:" + treeNodes[0].id + "  父节点id:" + treeNodes[0].pId + "  级层：" + treeNodes[0].level + "  名称：" + treeNodes[0].name);
					  if(!treeNodes[0].pId && treeNodes[0].level==0){ //可行
            	alert('不允许新建根节点');
            	window.location.reload()
            	return false;
           }
						var sendData={
							node_id:treeNodes[0].id,
							part_id:treeNodes[0].pId
						}
						liSrv.roleDrag(sendData,function(res){
							console.log('操作成功');
						},function(){
							console.log('操作失败');
						})
							return true;
					},
				}
			};
			liSrv.getRole(id, function(res) {
				var zNodes = JSON.parse(res);
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
				//var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				//zTree.expandAll(true);
			})
		},
		methods: {
			roleok() {
				var _self = this;
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				if(zTree) {
					var nodes = zTree.getCheckedNodes(true);
					var NodeString = '';
					$.each(nodes, function(n, value) {
						if(n > 0) {
							NodeString += ',';
						}
						NodeString += value.id;
					});
					var data = {
						rolename: _self.updataroletree.rolename,
						role_id: _self.updataroletree.id,
						rule: NodeString
					}
					liSrv.updataoraddRole(data, function(res) {
						common.setS('updataroletree', {})
						alert('操作成功')
						_self.$router.push('rolelist')
					})
				}
			}
		}
	}
</script>