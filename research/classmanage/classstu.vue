<style lang="less" rel="stylesheet/less" scoped>
	#classstu {
		.addstu{
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
				margin:15px 0 0 30px;
				em{
					color: red;
				}
				input {
					width: 200px;
					height: 24px;
					padding-left: 10px;
				}
				select{
					width: 210px;
					height: 24px;
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
		.stu_head{
			margin: 10px 0;
			display: block;
			.btnshowall {
			    width: 80px;
			    height: 30px;
			    text-align: center;
			    float: right;
			    line-height: 30px;
			}
			input{
				padding-left: 5px;
				width: 160px;
				height: 26px;
			}
			.wid100{
				display: inline-block;
				width: 80px;
				height: 30px;
				line-height: 30px;
				margin-left: 5px;
			}
		}
		.table{
			margin-top: 20px;
		}
	}
</style>
<template>
	<div id="classstu" class="content_sub">
		<h2 class="tit">
  		班级ID:{{classid}}　班级名称：{{classname}}　主讲老师：{{teachername}}
  		<a class='common_btn' href="javascript:;;" @click='isaddstu=true'>添加学生</a> 
  	</h2>
  	<p class="stu_head">
  		学生姓名：<input type="text" class="putnum" v-model.trim='stuname'/> &nbsp;
  		学生手机号： <input type="text" class="putnum" v-model.trim="stuiphone" />
		<a href="javascript:;;" class="common_btn wid100" @click="stusearch">搜索</a>
  		<!--<button @click.once="showall" class="btnshowall"  v-if="total>20" >显示全部</button>-->
  	</p>
		<table class="table" border="1">
			<thead>
		    <tr>
		      <td>UID</td>
		      <td>孩子姓名</td>
		      <td>手机号</td>
		      <td v-if="class_type==2">CC</td>
		      <td>末次登录</td>
		      <td>续费</td>
		      <td>金币</td>
		      <td>上课次数</td>
		      <td>操作</td>
		    </tr>
  		</thead>
  		<tbody id="tbody" >
  				<tr v-if='!stulist'>
  					<td  colspan="8">暂无学生！！！</td>
  				</tr>
  				<tr v-for = 'item in stulist'>
  					<td>{{item.student_id}}</td>
			      <td>{{item.name}}</td>
			      <td>{{item.mobile}}</td><!-- | telchange-->
			      <td v-if="class_type==2">
			      	{{item.cc_name}}
			      </td>
			      <td>{{item.last_modify_time_map}}</td>
			      <td>{{item.is_renewal_man}}</td>
			      <td>{{item.student_coin_count}}</td>
			      <td>{{item.lesson_count}}</td>
			      <td><i @click='delstu(item.student_id)'>删除</i></td>
  				</tr>
  		</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
		<div class="addstu" v-if='isaddstu'>
			<p><em>*</em> 手机号：　<input type="text" v-model.trim="username"/></p >
			<p><em>*</em> 学生姓名：<input type="text" v-model.trim="realname"/></p >
			<p><em>*</em> 学生性别：<select v-model="student_sex">
				<option value="">请选择</option>
				<option value="1">男</option>
				<option value="2">女</option>
			</select></p >
			<p>&nbsp;&nbsp;家长姓名：<input type="text" v-model.trim="jiazhang_name"/></p >
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
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'classstu',
		data(){
			return {
				classid:this.$route.query.id,
				teachername:this.$route.query.teacher_name,
				classname:this.$route.query.class_name,
				classid:this.$route.query.id,
				stulist:'',
				pageCount:'1',
				nextString:'1',
				total:'0',
				isaddstu:false,
				class_type:this.$route.query.type,
				pageSize:this.$route.query.pageSize,
				username:'',
				realname:'',
				student_sex:'',
				jiazhang_name:'',
				stuname:'',
				stuiphone:''
				
			}
		},
		components:{
			trunPage
		},
		created(){
			var _self = this;
			liSrv.classStudentList({class_id:this.classid},function(res){
				_self.stulist =res.list.sort(_self.sortArr("cc_name"));
//				_self.stulist = res.list;
				_self.total = res.total;
				_self.pageCount = res.pageCount;
//				if(res.total<=20){
//					_self.getxlsx();
//				}
			},function(res){
				if(res.code == 'E_NOT_DATA'){
					_self.pageCount = '1';
					_self.nextString = '1';
					_self.stulist = '';
				}
			})
		},
		methods:{
//			showall(){
//				var _self=this;
//				liSrv.classStudentList({class_id:this.classid,pageSize:_self.total},function(res){
//					_self.stulist = res.list;
//					_self.total = res.total;
//					_self.pageCount = '1';
//					_self.nextString = '1';
//					_self.getxlsx();
//				})
//			},
//			getxlsx(){
//				var claname= this.$route.query.class_name;
//				setTimeout(function(){
//			        $(".table").tableExport({
//			            formats: ["xlsx"],//导出那些格式
//			            //formats: ["xlsx", "xls", "csv", "txt"],//导出那些格式
//			            fileName:claname //导出文件名字，不要带后缀 名字要动态
//			        });
//				})
//			},
			sortArr(property){
	         return function(obj1,obj2){
	             var value1 = obj1[property] || '';
	             var value2 = obj2[property] || '';
	             return value2.localeCompare(value1);     // 升序
	    		}
			},
			stusearch(){
				var _self=this;
				$(".btn-toolbar").hide();
				$(".btnshowall").hide()
				var data = {
					class_id:this.classid,
					realname:this.stuname,
					username:this.stuiphone,
				};
				_self.nextString = '1';
				liSrv.classStudentList(data,function(res){
					_self.stulist = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
				},function(err){
					if(err.code == 'E_NOT_DATA'){
						_self.pageCount = '1';
						_self.total = '0';
						_self.stulist = '';
					}
				})
			},
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				liSrv.classStudentList({class_id:this.classid,page:nextString},function(res){
//					_self.stulist = res.list
					_self.stulist =res.list.sort(_self.sortArr("cc_name"));
				},function(res){
					if(res.code == 'E_NOT_DATA'){
						_self.pageCount = '1';
						_self.nextString = '1';
						_self.stulist = '';
					}
			})
			},
			addstuok(){
				var _self = this;
				if(_self.username==""){
					alert("请填入手机号！");
					return;
				}
				var testphone = _self.username.substr(1,4);
				if(testphone!=='0000' && !(/^1[34578]\d{9}$/.test(_self.username))){
		       alert("手机号码有误，请重填");
		       return;
		    }
				if(_self.realname==""){
					alert("请填入学生姓名！")
					return;
				}
				if(_self.student_sex==""){
					alert("请选择性别！")
					return;
				}
//				if(_self.jiazhang_name==""){
//					alert("请填入家长姓名！")
//					return;
//				}
				var data={
					class_id:_self.classid,
					username:_self.username,
					realname:_self.realname,
					student_sex:_self.student_sex,
					jiazhang_name:_self.jiazhang_name,
					type:this.class_type
				}
				liSrv.addstu(data,function(res){
					_self.isaddstu=false;
					alert("添加成功");
					_self.username="";
					_self.realname="";
					_self.student_sex="";
					_self.jiazhang_name="";
					_self.getList(_self.nextString);
				},function(res){
					//if(res.code=="E_FAIL"){
						alert("添加失败")
					//}
				})
				
			},
			delstu(id){//删除学生
				var r = window.confirm('确定删除吗');
				if(r){
					var data = {
						student_id:id,
						class_id:this.classid,
						type:this.class_type
					};
					var _self = this;
					liSrv.delstu(data,function(res){
						_self.getList(_self.nextString);
					})
				}
			}
		},
//		filters:{
//			telchange(tel){
//				if(!tel) return;
//				var reg = /^(\d{3})\d{4}(\d{4})$/;
//				return tel = tel.replace(reg, "$1****$2");
//			}
//		}
	}
</script>