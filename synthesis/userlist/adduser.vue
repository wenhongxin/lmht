<style lang="less" rel="stylesheet/less" scoped>
	#adduser {
		h2 {
			margin-bottom: 18px;
		}
		input,
		select {
			width: 184px;
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
			margin-top: 5px;
			outline: none;
		}
		input[type='file'] {
			border: none;
			padding-top: 5px;
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
			input,
			select {
				width: 184px;
			}
		}
		.add_store_site {
			input {
				width: 518px;
			}
		}
		textarea {
			resize: none;
			width: 370px;
			height: 120px;
			max-width: 370px;
			max-height: 120px;
			outline: none;
			padding: 5px 0 0 10px;
			margin-top: 5px;
		}
		a {
			margin-top: 20px;
			width: 60px;
		}
	}
</style>
<template>
	<div id="adduser" class="content_sub">
		<h2 class="tit" v-text='updatauser.teacher_id ? "修改用户信息" : "新建用户"'>
  </h2>
		<div class="add_store_main">
			<p class="add_store_main_name">手机号<br /><input type="text" v-model.trim='updatauser.username' /></p>
			<p class="add_store_main_clan_phone">微信号<br />
				<input type="text" v-model.trim='updatauser.wechat_number' />
			</p>
		</div>
		<div class="add_store_main" v-if='!updatauser.teacher_id'>
			<p class="add_store_main_name">密码<br /><input type="password" v-model.trim='paw1' /></p>
			<p class="add_store_main_clan_phone">确认密码<br /><input type="password" v-model.trim='paw' /></p>
		</div>
		<div class="add_store_main">
			<p class="add_store_main_name">昵称<br /><input type="text" v-model.trim='updatauser.nickname' /></p>
			<p class="add_store_main_clan_phone">真实姓名<br /><input type="text" v-model.trim='updatauser.realname' /></p>
		</div>
		<div class="add_store_main">
			<p>管理员角色<br />
				<select v-model='updatauser.role'>
					<option v-for='roles in rolelist' :value="roles.id">{{roles.rolename}}</option>
				</select>
			</p>
			<p class="add_store_main_clan_phone">上传头像   <span style="padding-left: 10px;color: red;" v-if='ishow'>上传中。。。</span><br /><input type="file" id='imgurl'@change='uploadimg' /></p>
		</div>
		<div class="add_store_main">
			<p class="add_store_main_clan_phone">所在门店<br />
				<select v-model='updatauser.store_id'>
					<option v-for='store in storeList' :value="store.id">{{store.store_name}}</option>
				</select>
			</p>
			<!--<p class="add_store_main_clan_phone">部门<br />
				<select v-model='updatauser.store_id'>
					<option v-for='store in storeList' :value="store.id">{{store.store_name}}</option>
				</select>
			</p>-->
		</div>
		<!--<p>
			是否是讲师<br />
			<select>
				<option value="2">不是</option>
				<option value="1">是</option>
			</select>
		</p>-->
		<!--<p  v-if='updatauser.teacher_id' >老师描述</p>
		<textarea v-if='updatauser.teacher_id' v-model='updatauser.description'></textarea>-->
		<a href="javascript:;;" class="common_btn" @click='addorupdata_user()'>确定</a>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv'
	export default {
		name: 'adduser',
		data() {
			return {
				storeList: null,
				updatauser: common.getS('updatauser') || {},
				rolelist: null,
				paw: '',
				paw1: '',
				roleid: '',
				imgurl: '',
				storeList:null,
				ishow:false,
			}
		},
		beforeCreate() {
			var _self = this;
			liSrv.getStoreList('',function(res){
				_self.storeList = res.list
			})
			liSrv.getRoleList('',function(res) {
				_self.rolelist = res.list;
			})
		},
		methods: {
			uploadimg() {
				var _self = this;
				var imgurl = $('#imgurl').val();
				if(imgurl != "") {
					//判断上传文件的后缀名
					var strExtension = imgurl.substr(imgurl.lastIndexOf('.') + 1);
					if(strExtension != 'jpg' && strExtension != 'gif' &&
						strExtension != 'png' && strExtension != 'bmp') {
						alert("请选择图片文件");
						$('#imgurl').val('')
						return;
					}
				}
			},
			addorupdata_user() {
				var _self = this,
					data,
					postURl;
				var formData = new FormData();
				var username = this.updatauser.username;
				var nickname = this.updatauser.nickname;
				var realname = this.updatauser.realname;
				var wxnum = this.updatauser.wechat_number;
				var store_id = $.trim(this.updatauser.store_id);
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				if(!username) {
					alert('请填写手机号');
					return;
				}
				if(!reg.test(username)) {
					alert('电话号码有误');
					return;
				}
				if(!wxnum) {
					alert('请输入微信号');
					return;
				}
				if(!store_id) {
					alert('请选择门店');
					return;
				}
				if(!realname) {
					alert('请输入真实名字');
					return;
				}
				if(!_self.updatauser.role || _self.updatauser.role == 0) {
					alert('请选择角色');
					return;
				}
				formData.append('avatar_url',$('input[type = file]')[0].files[0]);
				formData.append('username',username);
				formData.append('realname',realname);
				formData.append('nickname',nickname);
				formData.append('store_id',store_id);
				formData.append('role',_self.updatauser.role);
				formData.append('wechat_number',wxnum);
				if(_self.updatauser.teacher_id) { //修改
						postURl =  common.API.teacher_edit
					 formData.append('teacher_id',_self.updatauser.teacher_id)
					 formData.append('description',_self.updatauser.description)
				} else { //添加
					postURl =  common.API.teacher_add 
					if(!_self.paw1 || !_self.paw) {
						alert('请输入密码');
						return;
					}
					if(_self.paw1.length < 6 || _self.paw1.length > 16) {
						alert('请输入6-16位密码');
						return;
					}
					if(_self.paw != _self.paw1) {
						alert('两次密码输入不一致');
						return;
					}
					formData.append('password',_self.paw)
				}
				var sendData = {
					url:postURl,
					formData:formData
				}
				if($('#imgurl').val()){
					_self.ishow = true;
				}
				liSrv.uploadFile(sendData, function(res) {
					_self.ishow = false;
					var data = JSON.parse(res);
					if(data.result == 1 && "E_SUCCESS" === data.code){
						common.setS('updatauser', {})
						alert('操作成功');
						_self.$router.push("/synthesis/userlist")
					}else{
						alert('操作失败')
					}
				},function(res){
					_self.ishow = false;
					if(res.status == 500){
						alert('服务器内部错误');
					}
					if(res.status == 404){
						alert('未找到页面');
					}
				})
			}
		}
	}
</script>