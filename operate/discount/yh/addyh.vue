<style lang="less" rel="stylesheet/less" scoped>
	#addyh {
		p {
			margin-top: 17px;
			line-height: 22px;
			em {
				color: red;
				padding-left: 10px;
			}
		}
		input[type='text'] {
			width: 298px;
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
		}
		textarea {
			resize: none;
			width: 358px;
			height: 120px;
			max-width: 358px;
			max-height: 120px;
			outline: none;
			padding: 5px 0 0 10px;
			margin-bottom: 30px;
		}
		div {
			select,
			input {
				width: 120px !important;
				margin-right: 10px;
				height: 34px;
				border: 1px solid #95989a;
				outline: none;
			}
		}
		.add_discount_deadline {
			height: 56px;
			margin: 18px 0;
			p {
				margin-top: 0;
				float: left;
			}
			input {
				cursor: pointer;
			}
		}
		select {
			width: 150px;
			height: 34px;
		}
		.common_btn {
			margin-bottom: 30px;
			width: 80px;
		}
	}
</style>
<template>
	<div id="addyh" class="content_sub" v-disable="state!=2?'':'operate'">
		<h2 class="tit">
  		新建优惠
  		<router-link :to='{name:"yhmanage"}' class='common_btn'>返回</router-link>
  	</h2>
		<p class="add_discount_name">优惠名称<em>*</em><br /><input type="text" v-model.trim='discount_name' /></p>
		<p class="add_discount_name">营销优惠名称<em>*</em><br /><input type="text" v-model.trim='discount_market_name' /></p>
		<p class="add_discount_name">营销优惠金额<em>*</em><br /><input type="text" v-model.trim='market_price' /></p>
		<p>优惠类型<em>*</em><br />
			<select v-model='discount_type'>
				<option value="1">报名</option>
				<option value="2">续费</option>
				<option value="3">小程序专用</option>
			</select>
		</p>
		<p>使用年级<em>*</em><br />
			<select v-model='grade'>
				<option value="">全部</option>
				<option value="1">一年级</option>
				<option value="2">二年级</option>
				<option value="3">三年级</option>
				<option value="4">四年级</option>
				<option value="5">五年级</option>
				<option value="6">六年级</option>
			</select>
		</p>
		<p class="add_discount_scope1"><input type="checkbox" v-model='store_idIsok' /> 仅限以下门店使用<br /><input type="text" placeholder="填写门店，多个用逗号隔开" v-model.trim='store_id' /><em>微信小程序不可使</em></p>
		<p class="add_discount_scope1"><input type="checkbox" v-model='classIsok' /> 仅限以下班级使用<br /><input type="text" placeholder="填写班级，多个用逗号隔开" v-model.trim='class_cont' /></p>
		<p class="add_discount_scope2"><input type="checkbox" v-model='discountIsok' /> 必须曾经使用过以下优惠<br /><input type="text" v-model.trim='discount_cont' placeholder="填写优惠编号，多个用逗号隔开" /><em>微信小程序不可使</em></p>
		<p class="add_discount_scope2"><input type="checkbox" v-model='useadminuidIsok' /> 仅限以下LSP用户使用<br /><input type="text" v-model.trim='useadminuid' placeholder="填写用户编号，多个用逗号隔开" /><input v-model.trim='userphone' @keyup.enter='searchuid' type="text" placeholder="输入手机号,回车键查找"  style='width:150px;' /><em>微信小程序不可使</em></p>
		<p class="add_discount_scope2"><input type="checkbox" v-model='binding_classIsok' /> 连报班<br /><input type="text" v-model.trim='binding_class' placeholder="填写班级，多个用逗号隔开" /></p>
		<div class="add_discount_deadline">
			<p>有效期开始<em>*</em><br />
				<input class="Wdate" type="text" id='discount_start_time' onClick="WdatePicker()" />
			</p>
			<p>有效期结束<em>*</em><br />
				<input class="Wdate" type="text" id='discount_end_time' onClick="WdatePicker()" />
			</p>
		</div>
		<div class="add_discount_way">
			<p>调整方法<em>*</em><em style="padding-left:80px ;">*</em><br />
				<select name="" id="" v-model='selects'>
					<option value="1">调整到</option>
					<option value="2">立减</option>
					<option value="3">打折</option>
					<option value="4">增加</option>
				</select>
				<input type="text" v-model.trim='discount_way' />
			</p>
		</div>
		<p>备注</p>
		<textarea v-model.trim='textareaBZ'></textarea>
		<p>
			<a href="javascript:;;" class="common_btn" @click='addyh' v-if='state==2'>确定</a>
		</p>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	export default {
		name: 'addyh',
		data() {
			return {
				state: this.$route.query.state,
				userphone: '',
				id: this.$route.query.id,
				discount_name: '',
				discount_market_name: '',
				market_price: '',
				discount_type: '1',
				grade: '',
				discount_end_time: '',
				store_idIsok: false,
				useadminuidIsok: false,
				useadminuid: '',
				store_id: '',
				classIsok: false,
				class_cont: '',
				discountIsok: false,
				discount_cont: '',
				selects: '1',
				discount_way: '',
				textareaBZ: '',
				binding_class: '',
				binding_classIsok: false
			}
		},
		created() {
			if(this.id) {
				var _self = this;
				liSrv.getdiscountone({
					discount_id: this.id
				}, function(res) {
					var data = res.data;
					_self.discount_name = data.discount_name;
					_self.discount_market_name = data.discount_market_name;
					_self.market_price = data.market_price;
					_self.discount_type = data.class_type;
					_self.grade = data.grade;
					_self.selects = data.discount_type;
					_self.discount_way = data.discount_number;
					$("#discount_start_time").val(data.first_time_man);
					$("#discount_end_time").val(data.last_time_man);
					_self.textareaBZ = data.remark;
					if(data.store_id && data.store_id != 0) {
						_self.store_idIsok = true;
						_self.store_id = data.store_id;
					}
					if(data.use_admin_uid && data.use_admin_uid != 0) {
						_self.useadminuidIsok = true;
						_self.useadminuid = data.use_admin_uid;
					}
					if(data.discount_class && data.discount_class != 0) {
						_self.classIsok = true;
						_self.class_cont = data.discount_class;
					}
					if(data.discount_parent_id && data.discount_parent_id != 0) {
						_self.discountIsok = true;
						_self.discount_cont = data.discount_parent_id;
					}
					if(data.binding_class && data.binding_class != 0) {
						_self.binding_classIsok = true;
						_self.binding_class = data.binding_class;
					}

				});
			}
		},
		methods: {
			searchuid(){
				var _self = this;
				if(_self.userphone==""){
					alert("请填入手机号！");
					return;
				}
				var testphone = _self.userphone.substr(1,4);
				if(testphone!=='0000' && !(/^1[34578]\d{9}$/.test(_self.userphone))){
		       alert("手机号码有误，请重填");
		       return;
		    }
				liSrv.getUserList({pageSize:10000,username: _self.userphone},function(res){
					var id = res.list[0].teacher_id;
					var len = _self.useadminuid.length;
					if(_self.useadminuid.indexOf(id)!=-1){alert('用户存在');return};
					if(len>0){
						_self.useadminuid+=','+id;
					}else{
						_self.useadminuid=id;
					}
					
				})
			},
			addyh() {
				var discount_name = this.discount_name;
				var discount_way = this.discount_way;
				var textareaBZ = this.textareaBZ;
				var discount_start_time = $("#discount_start_time").val();
				var discount_end_time = $("#discount_end_time").val();
				var discount_market_name = this.discount_market_name;
				var store_id = '';
				var class_cont = '';
				var discount_cont = '';
				var useadminuid = '';
				var binding_class = '';
				var _self = this;
				if(!discount_name) {
					alert('请输入优惠名称');
					return;
				}
				if(!discount_market_name) {
					alert('请输入营销优惠名称');
					return;
				}
				if(!this.market_price) {
					alert('请输入营销优惠名称');
					return;
				}
				if(this.store_idIsok) {
					if(!this.store_id) {
						alert('请输入可使用优惠门店')
						return;
					} else {
						store_id = this.store_id.split(',').join(',').split('，').join(',');
					}
				}
				if(this.classIsok) {
					if(!this.class_cont) {
						alert('请输入可使用优惠班级')
						return;
					} else {
						class_cont = this.class_cont.split(',').join(',').split('，').join(',');
					}
				}
				if(this.discountIsok) {
					if(!this.discount_cont) {
						alert('请输入使用过的优惠');
						return;
					} else {
						discount_cont = this.discount_cont.split(',').join(',').split('，').join(',');

					}
				}
				if(this.useadminuidIsok) {
					if(!this.useadminuid) {
						alert('请输入使用过的优惠')
						return;
					} else {
						useadminuid = this.useadminuid.split(',').join(',').split('，').join(',');
					}
				}
				if(this.binding_classIsok) {
					if(!this.binding_class) {
						alert('请选择连报班级');
						return;
					} else {
						binding_class = this.binding_class.split(',').join(',').split('，').join(',');
					}
				}
				if(!discount_start_time || !discount_end_time) {
					alert('请输入优惠有效期')
					return;
				}
				if(new Date(discount_start_time) > new Date(discount_end_time)) {
					alert('优惠有效期时间有误')
					return;
				}
				if(!discount_way) {
					alert('请输入具体优惠')
					return;
				}
				var sendData = {
					name: discount_name,
					discount_market_name: discount_market_name,
					market_price: this.market_price,
					grade: this.grade,
					class: class_cont,
					parent_id: discount_cont,
					store_id: store_id,
					remark: textareaBZ,
					type: this.selects,
					number: discount_way,
					use_admin_uid: useadminuid,
					first_time: discount_start_time,
					last_time: discount_end_time,
					class_type: this.discount_type,
					binding_class: binding_class,
				}
				if(this.id) {
					sendData['discount_id'] = this.id;
					//console.log(sendData)
					liSrv.discountEdit(sendData, function(res) {
						alert('修改成功');
					})
				} else {
					liSrv.adddiscount(sendData, function(res) {
						alert('添加成功')
						_self.$router.push({
							name: "yhmanage"
						})
					}, function(res) {
						if(res.code == 'E_NOPRIV') {
							alert('无操作权限');
							window.history.go(-1);
						} else {
							alert(res.desc)
						}
					})
				}
			}
		}
	}
</script>