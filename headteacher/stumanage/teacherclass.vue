<style lang="less" rel="stylesheet/less" scoped>
	#teacherclass {
		.cont{
			margin-top: 20px;
			display:flex;
			.left{
				text-align: center;
				width: 100px;
				border-right: 1px solid #CCCCCC;
				min-height: 500px;
				li{
					padding: 10px 3px;
					cursor: pointer;
					background: #c6c6c6;
					margin-top: 5px;
					&:first-child{
						margin-top: 0;
					}
				}
				.active-li{
					background: #FF8900;
					color: #FFFFFF;
				}
				.add-class{
					border: 1px dashed #000000;
					background: none;
				}
			}
			.right{
				margin-left: 20px;
				width: 100%;
				.table{
					 tr{
					 	 td i span {color: red}
					 	 .namered a{
					 	 		color: red;
					 		 }
					 	 };
					 
				}
				.table tbody tr:hover td:not(.xing){
					background: #C6C6C6 !important;
				}
				.tr-yellow,.td-yellow{
					background:#ebd838;
				}
				.rightop{
					width: 100%;
					height:60px;
					p{
						float: left;
						b{
							display: block;
							font-size: 16px;
							margin: 5px 0;
						};
					}
					.pbtn{
						float: right;
						a{
							display: inline-block;
							padding: 0 15px;
							margin-right: 20px;
							margin-top: 12px;
						}
					}
				}
				.yxing{
					background: url(/static/img/u167.png) no-repeat 10px center;
				}
				.nxing{
					background: url(/static/img/u169.png) no-repeat 10px center;
				}
			}
		}
		.addclassalert{
			width: 400px;
			height: 230px;
			background: #FFFFFF;
			border: 1px solid #CCCCCC;
			position: absolute;
			border-radius: 3px;
			top: 50%;
			left: 50%;
			margin-top: -200px;
			margin-left: -100px;
			p {
				margin:30px 0 0 30px;
				input {
					width: 200px;
					height: 24px;
					padding-left: 10px;
				}
				select{
					height: 24px;
				}
			}
			.grad-class{
				display: flex;
				span{
					min-width: 80px;
				}
			}
			.btn {
				color: #CCCCCC;
				float: right;
				margin: 25px 25px 0 0;
				a {
					width: 70px;
					height: 28px;
					line-height: 28px;
					display: inline-block;
					border-radius: 3px;
					&:first-child {
						background: none;
						color: #333333;
						border: 1px solid #CCCCCC;
					}
				}
			}
		}
		.addstu{
			p {
				margin:15px 0 0 30px;}
			select{
				width: 210px;
			}
		}
		.disabled{
			a{
				background: #CCCCCC;
				pointer-events: none;
			}
		}
	}
</style>
<template>
	<div id="teacherclass" class="content_sub">
		<h2 class="tit">
  		学生管理
  	</h2>
		<div class="cont">
			<ul class="left">
				<li v-for='item in classList' @click='getclasstu(item)' :class="{'active-li':nowclassid==item.id}">{{item.name}} ({{item.total_3}})</li>
				<li class="add-class" @click='isaddclass=true'>+新建班</li>
			</ul>
			<div class="right">
				<div class="rightop">
					<p>
						<span>{{classonelist.class_name}}（班号：{{classonelist.class_id}}   {{classonelist.teacher_name}}主讲   续费率：{{classonelist.renewal_rate}}）</span>
						<b>{{classonelist.name}}  {{classonelist.total}}人</b>
					</p>
					<p class="pbtn" :class="{'disabled':!classList}">
						<a href="javascript:;;" class="common_btn" @click='isjr(classonelist.join_status)' v-text='classonelist.join_status==1?"不允许自动加人":"已允许自动加人"'></a>
						<a href="javascript:;;" class="common_btn"  @click='isaddstu=true'>加人</a>
					</p>
				</div>
				<table class="table" border="1">
					<thead>
						<tr>
							<td>星标</td>
							<td>姓名</td>
							<td>计划剩余</td>
							<td>备注</td>
							<td>末次记录</td>
							<td>续班</td>
							<td>进班</td>
						</tr>
					</thead>
					<tbody>
						<tr :class="{'tr-yellow':parseInt(item.enter_class_day)<=3}"  v-for='item in stuList'>
							<td class="xing" @click='xingfn(item.star_status,item.id)' :class='{"yxing":item.star_status==2,"nxing":item.star_status==1}'></td>
							<td :class="{'namered':item.class_id==0}"><router-link :to='{name:"sturaisecuorse",query:{id:item.student_id,nowid:nowclassid}}'>{{item.realname}}</router-link></td>
							<td :class='{"td-yellow":item.plan_surplus_color==2}'>{{item.plan_surplus}}</td>
							<td><i @click='editremark(item.id)'>{{item.remarks || '暂无'}}</i></td>
							<td :class='{"td-yellow":item.last_record_color==2}'>{{item.last_record}}</td>
							<td>{{item.renewal_status}}</td>
							<td>{{item.enter_class_day}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="addclassalert" v-if='isaddclass'>
			<!--<p>班级编号：0001</p>-->
			<p>班的昵称<br />
				<input type="text" v-model.trim='classname' />
			</p>
			<p class="grad-class">
				<span>负责的年级<br />
					<select  v-model='addgrade' @change='getyesclasslist'>
						<option value="">全部</option>
						<option value="1">一年级</option>
						<option value="2">二年级</option>
						<option value="3">三年级</option>
						<option value="4">四年级</option>
						<option value="5">五年级</option>
						<option value="6">六年级</option>
					</select>
				</span>
				<span>负责的授课班<br />
					<select v-model='addclassname'>
						<option value="">全部</option>
						<option v-for='item in yesclassList' :value="item.name+'-'+item.id">{{item.name}}</option>
					
					</select></span>
			</p>
			<span class="btn">
				<a href="javascript:;;"class="common_btn" @click='isaddclass=false'>取消</a>
				<a href="javascript:;;"class="common_btn" @click='addclassok'>确定</a>
			</span>
		</div>
		<div class="addstu addclassalert" v-if='isaddstu'>
			<p>手机号：　<input type="text" v-model.trim='addstumobile' /></p>
			<p>学生姓名：<input type="text" v-model.trim='addstuname'/></p>
			<p>学生性别：<select v-model.trim='addstusex'>
				<option value="">请选择</option>
				<option value="1">男</option>
				<option value="2">女</option>
			</select></p>
			<p>家长姓名：<input type="text" v-model.trim='addstuparentname' /></p>
			<span class="btn">
				<a href="javascript:;;"class="common_btn" @click='isaddstu=false'>取消</a>
				<a href="javascript:;;"class="common_btn" @click='addstuok'>确定</a>
			</span>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'teacherclass',
		data() {
			return {
				isaddclass:false,
				isaddstu:false,
				uid:common.getS('uid'),
				classList:null,
				classonelist:{},
				stuList:null,
				classname:'',
				addclassname:'',
				addgrade:'',
				yesclassList:null,
				nowclassid:this.$route.query.nowid || '',
				addstumobile:'',
				addstusex:'',
				addstuname:'',
				addstuparentname:''
			}
		},
		beforeCreate() {

		},
		created(){
			var flag = true;
			if(this.nowclassid){
				this.getstulist(this.nowclassid);
				flag = false;
			}
			this.getClassList(flag);
			this.getyesclasslist();
		},
		methods: {
			isjr(status){//是否自动家人
				var st = status==1?2:1;
				var _self = this;
				
				var data =  {
					id:this.nowclassid,
					join_status:st
				}
				liSrv.directorEditClass(data,function(res){
					_self.classonelist.join_status = st;
				})
				
			},
			getyesclasslist(){
				var _self = this;
				var data = {
					grade: this.addgrade,
					pageSize:1000,
					page: '',
//				class_type:4
				}
				liSrv.getClassYesList(data, function(res) {
					_self.yesclassList = res.list;
				}, function(res) {
					if(res.code == 'E_NOT_DATA'){
						_self.yesclassList = {};
						return;
					}
				})
			},
			getClassList(flag){//获取班主任班的列表
				var _self = this;
				var data = {
					admin_id:this.uid
				}
				liSrv.directorGetClassList(data,function(res){
					_self.classList = res.list;
					if(flag){
						for(var i in res.list){
							_self.classonelist = res.list[i];
							_self.getstulist(res.list[i].id);
							return ;
						}
					}
					
				},function(){
					_self.classList = '';
				})
			},
			getclasstu(item){//切换班级
				this.isaddstu=false
				this.classonelist = item;
				this.getstulist(item.id);
			},
			getstulist(id){//获取班级学生
				this.nowclassid = id;
				var _self = this;
				var data = {
					id:id,
					pageSize:"1000"
				}
				liSrv.directorSmallStudentList(data,function(res){
					_self.stuList = res.list;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
							_self.stuList =null;
					}
				})
			},
			addclassok(){//添加班级确定
				var _self = this;
				if(!this.classname || !this.addclassname || !this.addgrade){alert('请将信息填写完整'); return;}
				var data ={
					name:this.classname,
					grade:this.addgrade,
					join_status:1,
					class_id:this.addclassname.split('-')[1],
					class_name:this.addclassname.split('-')[0]
				}
				liSrv.directorAddClass(data,function(res){
					_self.classname = _self.addclassname = _self.addgrade ='';
					_self.classonelist = res;
					_self.isaddclass = false;
					_self.getClassList(false);
					_self.getstulist(res.id);
				})
			},
			addstuok(){//添加班级学生
				var _self = this;
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				if(!this.addstumobile){
					alert('请输入手机号');
					return;
				}
				if(!reg.test(this.addstumobile)){
					alert('手机号输入有误');
					return;
				}
				var data = {
					id:this.nowclassid,
					phone:this.addstumobile,
					student_sex:this.addstusex,
					realname:this.addstuname,
					jiazhang_name:this.addstuparentname
				}
				liSrv.directorAddStudent(data,function(res){
					_self.addstumobile = _self.addstusex = _self.addstuname = _self.addstuparentname = '';
					_self.isaddstu = false;
					_self.getstulist(_self.nowclassid)
				},function(res){
					if(res.code=="E_REF_INVAL"){
						alert("添加失败，请检查学生信息");
						return ;
					}
					alert(res.desc)
						
				})
			},
			editstu(data){
				var _self = this;
				liSrv.directorSmallStudentEdit(data,function(){
					_self.getstulist(_self.nowclassid);
				})
			},
			xingfn(status,id){//点击星星
				var st = status==2?1:2;
				var data = {
						id:id,
						star_status:st
				}
				this.editstu(data);
			},
			editremark(id){//修改备注
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑备注',
					type:'text',
//					isempty:true,
					success:function(val,fn){
						var data = {
							id:id,
							remarks:val
						}
						_self.editstu(data);
						fn()
					}
				})
			}
		}
	}
</script>