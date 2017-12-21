<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_basicinfo {
		padding-top: 30px;
		input,select{
			padding-left: 10px;
			box-sizing: border-box;
			width: 174px;
			height:30px;
		}
		p{
			height: 45px;
			margin-bottom: 20px;
			span{
				margin-right:20px;
				float: left;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		.home{
			height: 78px;
			textarea{
				width: 562px;
				height: 60px;
			}
		}
		.tydjy{
			height: 118px;
			textarea{
				width: 950px;
				height: 100px;
			}
		}
		.common-btn{
			margin-bottom: 20px;
		}
	}
</style>
<template>
	<div id="stu_file_basicinfo">
		<p>
			<span>
				学生姓名<br />
				<input disabled type="text" v-model.trim='studata.realname' />
			</span>
			<span>
				性别<br />
				<select disabled v-model='studata.student_sex'>
					<option value="">请选择</option>
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</span>
			<span>
				年级<br />
				<select disabled  v-model='studata.student_grade'>
					<option value="">请选择</option>
					<option value="1">一年级</option>
					<option value="2">二年级</option>
					<option value="3">三年级</option>
					<option value="4">四年级</option>
					<option value="5">五年级</option>
					<option value="6">六年级</option>
				</select>
			</span>
		</p>
		<p>
			<span>
				紧急联系人<br />
				<input type="text" disabled v-model.trim='studata.urgent_name' />
			</span>
			<span>
				性别<br />
				<select v-model = 'studata.urgent_sex' disabled>
					<option value="">请选择</option>
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</span>
			<span>
				电话<br />
				<input type="text" disabled v-model='studata.urgent_username' />
			</span>
			<span>
				邮箱<br />
				<input type="text" disabled v-model='studata.urgent_email' />
			</span>
			<span>
				微信<br />
				<input type="text" disabled v-model.trim='studata.urgent_wechat' />
			</span>
		</p>
		<p>
			<span>
				家长姓名<br />
				<input type="text" disabled v-model.trim='studata.jiazhang_name' />
			</span>
			<span>
				性别<br />
				<select disabled v-model.trim='studata.jiazhang_sex'>
					<option value="">请选择</option>
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</span>
			<span>
				电话<br />
				<input type="text" disabled v-model.trim='studata.jiazhang_username' />
			</span>
			<span>
				邮箱<br />
				<input type="text" disabled v-model.trim = 'studata.jiazhang_email' />
			</span>
			<span>
				微信<br />
				<input type="text" disabled  v-model.trim = 'studata.jiazhang_wechat' />
			</span>
		</p>
		<p>
			<span>
				平板获取方式<br />
				<input disabled type="text" v-model.trim='ipadly' />
			</span>
			<span>
				起止时间<br />
				<input disabled type="text" v-model='ipadstartime' /> 至  <input disabled type="text"  v-model='ipadendtime' />
			</span>
		</p>
		<p>
			<span>
				基础能力—测试成绩<br />
				<input disabled type="text" />
			</span>
			<span>
				数学知识—测试成绩<br />
				<input disabled type="text" />
			</span>
			<span>
				超长能力—测试成绩<br />
				<input disabled type="text" />
			</span>
		</p>
		<p class="home">
			家庭环境<br />
			<textarea v-model.trim='studata.jiazhang_environment' disabled></textarea>
		</p>
		<p class="tydjy">
			体验店建议<br />
			<textarea v-model.trim='studata.store_proposal' disabled></textarea>
		</p>
		<!--<a href="javascript:;;" class="common-btn" @click='editstuinfo'>提交</a>-->
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'stu_file_basicinfo',
		data() {
			return {
				id:this.$route.query.id,
				studata:{},
				ipadly:'',
				ipadstartime:'',
				ipadendtime:'',
			}
		},
		created() {
			this.getstuinfo({student_id:this.id})
		},
		methods: {
			getstuinfo(data){
				var _self = this;
				liSrv.directorStudentGet(data,function(res){
					_self.studata = res.data;
					if(res.device.zuqi){
						_self.ipadly = '设备租赁';
						var start = res.device.zuqi.start_time_map.split(' ')[0];
						var end = res.device.zuqi.end_time_map.split(' ')[0];
						_self.ipadstartime=start;
						_self.ipadendtime=end;
					}
				},function(){
					
				})
			},
			editstuinfo(){
				var _self = this,studata=this.studata;
				var data = {
					student_id:this.id,
					urgent_name:studata.urgent_name,
					urgent_sex:studata.urgent_sex,
					urgent_username:studata.urgent_username,
					urgent_email:studata.urgent_email,
					urgent_wechat:studata.urgent_wechat,
					jiazhang_name:studata.jiazhang_name,
					jiazhang_wechat:studata.jiazhang_wechat,
					jiazhang_email:studata.jiazhang_email,
					jiazhang_sex:studata.jiazhang_sex,
					jiazhang_username:studata.jiazhang_username,
					jiazhang_environment:studata.jiazhang_environment,
					store_proposal:studata.store_proposal,
					realname:studata.realname,
					student_sex:studata.student_sex,
					student_grade:studata.student_grade
				}
				liSrv.directorStudentEdit(data,function(res){
					alert('修改成功');
				})
			}
		}
	}
</script>