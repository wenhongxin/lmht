<style lang="less" rel="stylesheet/less" scoped>
	#sign_up {
		height: auto;
		h5 {
			margin-top: 20px;
			padding: 11px 0;
			font-size: 16px;
		}
		.search_nav {
			width: 512px;
			height: 36px;
			line-height: 36px;
			background: #EFEFEF;
			li {
				cursor: pointer;
				float: left;
				width: 72px;
				height: 36px;
				text-align: center;
				border-right: 1px solid #FFFFFF;
			}
			.li_active_search {
				color: #FFFFFF;
				background: #FF8900;
			}
		}
		.stkbox{
			padding-top: 30px;
			em{
				color: red;
			}
		}
		.class_check{
			height: 26px;
		    width: 147px;
		    margin-bottom: 15px;
		    padding-left: 5px;
		    border: #999 1px solid;
		}
	}
	
	.ok-btn {
		float: left;
		margin-top: 20px;
		margin-bottom: 50px;
		a {
			margin-right: 20px;
			padding:0 15px;
			display: inline-block;
			color: #FFFFFF;
		}
	}
	.disable {
		background: #CCCCCC;
		pointer-events: none;
		cursor: default;
	}
	.stufilenav{
			border-bottom: 1px solid #c6c6c6;
			padding-top: 20px;
			ul {
				width: 404px;
				margin-left: 308px;
				display: flex;
				border: 1px solid #c6c6c6;
				border-bottom: none;
				border-left: none;
				li {
					line-height: 36px;
					width: 100px;
					text-align: center;
					border-left: 1px solid #c6c6c6;
					a {
						display: block;
					}
				}
				.router-link-exact-active{
					background: #FF8900;
					color: #FFFFFF;
				}
			}
		}
</style>
<template>
	<div id="sign_up" class="content_sub">
		<h2 class="tit">选择班型</h2>
		<div class="stufilenav">
			<ul>
				<li>
					<router-link :to='{name:"stu_sign_up",query:{type:type,num:1}}'>正式班</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_sign_up",query:{type:type,num:2}}'>试听班</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_sign_up",query:{type:type,num:4}}'>测试班</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_sign_up",query:{type:type,num:3}}'>内测班</router-link>
				</li>
			</ul>
		</div>
		<div v-if="showNum==2" class="stkbox">
			<p>选择试听课上课时间</p>
			<p><input type="text" class="class_check" id="ttktime" onclick="WdatePicker()"><em>　*</em></p>
			<p>选择体验课</p>
			<p>
				<select name="" class="class_check" v-model="ttkcheck">
					<option value="">请选择试听课</option>
					<option v-for="option in ccclaslist" v-bind:value="option.class_id">  
						{{ option.name }}  
					</option> 
				</select><em>　*</em>
			</p>
			<div class="ok-btn">
				<a href="javascript:;;" class='common_btn' @click='yyorder'>确认预约</a>
			</div>
		</div>
		<div v-else>
			<h5>班级列表</h5>
			<ul class="search_nav">
				<li class="li_active_search" @click='getClassGrade("")'>全部</li>
				<li @click='getClassGrade(1)'>一年级</li>
				<li @click='getClassGrade(2)'>二年级</li>
				<li @click='getClassGrade(3)'>三年级</li>
				<li @click='getClassGrade(4)'>四年级</li>
				<li @click='getClassGrade(5)'>五年级</li>
				<li @click='getClassGrade(6)'>六年级</li>
			</ul>
			<table class="table" border="1">
				<thead>
					<tr>
						<td width="60">报名</td>
						<td width="79">班级ID</td>
						<td width="198">班级类型</td>
						<td width="149">剩余名额</td>
						<td width="107">主讲老师</td>
						<td width="50">费用</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='item in classList'>
						<td><input @click='clickRadio(item.id,item.course_count)' v-model='check' :value="item.id" type="radio" name="signup" /></td>
						<td>{{item.id}}</td>
						<td>{{item.name}}</td>
						<td>{{item.buy_count}}</td>
						<td>{{item.teacher_name}}</td>
						<td>{{item.price}}</td>
					</tr>
				</tbody>
			</table>
			<div class="ok-btn">
				<a href="javascript:;;" class='common_btn' @click='okorder'>确认订单</a>
				<a href="javascript:;;" class='common_btn' :class="{'disable':isdisable}" @click='addyh'>添加优惠并确认</a>
			</div>
			<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>

		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'sign_up',
		data() {
			return {
				type: this.$route.query.type,
				classList: null,
				classId: '',
				stuInfo: common.getS('stuInfo'),
				pageCount: '1',
				total: '0',
				nextString: '1',
				isdisable:false,
				check:'',
				grade:'',
				num:'',
				ttkcheck:'',
				ccclaslist:''
			}
		},
		computed:{
			showNum(){
				var num = this.$route.query.num;
				this.flushCom(num);
				this.num=num;
				return num;
			}
		},
		components:{
			trunPage
		},
		beforeCreate() {
			var _self=this;
			var type = this.$route.query.type;
			if(type == 1) {
				common.setS('xu_class_id', '')
			}
			liSrv.ccclasslist(function(res) { //获取自动体验课列表
				_self.ccclaslist = res;
			})
		},
		methods: {
			flushCom(num){
				var type = this.$route.query.type;
//				if(type == 1) {
//					common.setS('xu_class_id', '')
//				}
				if(num == 2){
					return
				}
				var _self = this;
				var data = {
					class_type:num,
					page: "",
					grade: ""
				}
				liSrv.getClassYesList(data, function(res) {
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.classList = res.list
				})
			},
			getList(nextString) {
				var _self = this;
				this.check = '';
				this.isdisable = false;
				this.nextString = nextString;
				var data = {
					page: nextString,
					grade: _self.grade
				}
				liSrv.getClassYesList(data, function(res) {
					_self.classList = res.list
				})
			},
			tzpage(path) {
				if(!this.classId) {
					alert('请选择班级')
					return;
				}
				if(path == 'stu_pay') {
					var _self = this;
					var Common = common.getS('stuInfo')
					var stuId = Common.student_id;
					var mobile = Common.username;
					var classId = _self.classId;
					var pastClassId = common.getS('xu_class_id');
//					console.log(pastClassId)
					var data = {
						mobile: mobile,
						student_id: stuId,
						product_type: 1,
						product_id: classId,
						class_type: 1,
						past_class_id: pastClassId
					}
//					console.log(data)
					liSrv.createOrder(data, function(res) { //创建订单
						common.setS('class_order_num', res.order_id)
						_self.$router.push(path);
					},function(err){
						if(err.code=="E_REF_INVAL"){
							alert("该班级已报！")
						}
					})
				} else {
					var type = this.$route.query.type;
					this.$router.push({
						name: path,
						query: {
							type: type
						}
					});
				}

			},
			okorder() {
				this.tzpage('stu_pay')
			},
			yyorder(){//预约体验课
				var _self=this;
				var ttktime=$("#ttktime").val();
				if(ttktime==""){
					alert("请输入预约体验课时间");
					return;
				}
				if(this.ttkcheck==""){
					alert("请选择体验课");
					return;
				}
				var id=this.stuInfo.student_id;
				var num = this.$route.query.num;
				var data={
					from:"2",
					student_id:id,
					student_name:this.stuInfo.realname,
					start_time:ttktime,
					class_id:_self.ttkcheck,
				}
				liSrv.addExperienceStudent(data, function(res) { 
					if(res==true){
						alert("预约体验课成功");
						_self.$router.push({
							name: "stu_file_livecourse",
							query: {
								id:id,
								num: num
							}
						});
					}
				})
			},
			addyh() {
				this.tzpage('stu_preferential')
			},
			clickRadio(id,num){
				//this.isdisable = num>0 ? true : false;
				common.setS('buy_class_id', id)
				this.classId = id;
			},
			getClassGrade(grade) {
				var _self = this;
				
				var ev = event.target;
				$(ev).addClass('li_active_search').siblings().removeClass('li_active_search')
				var data = {
					class_type:this.num,
					grade: grade,
					page: ''
				}
				this.nextString = '1';
				liSrv.getClassYesList(data, function(res) {
					_self.grade=res.grade;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.classList = res.list;
				}, function(res) {
					if(res.code == 'E_NOT_DATA'){
						_self.classList = '';
						return;
					}
					alert(res.desc)
				})
			}
		}
	}
</script>