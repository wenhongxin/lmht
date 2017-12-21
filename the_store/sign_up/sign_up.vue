<style lang="less" rel="stylesheet/less" scoped>
	#sign_up {
		height: auto;
		h5 {
			padding: 11px 0;
			font-size: 16px;
			border-top: 1px solid #c6c6c6;
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
</style>
<template>
	<div id="sign_up" class="content_sub">
		<h2 class="tit">报名</h2>
		<commstuinfo></commstuinfo>
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
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import commstuinfo from '../comm/commstuinfo.vue'
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'sign_up',
		data() {
			return {
				classList: null,
				classId: '',
				stuInfo: common.getS('stuInfo'),
				pageCount: '1',
				total: '0',
				nextString: '1',
				isdisable:false,
				check:''
			}
		},
		components:{
			commstuinfo,
			trunPage
		},
		beforeCreate() {
			var type = this.$route.query.type;
			if(type == 1) {
				common.setS('xu_class_id', '')
			}
			var _self = this;
			var data = {
				page: "",
				grade: ""
			}
			liSrv.getClassYesList(data, function(res) {
				_self.total = res.total;
				_self.pageCount = res.pageCount;
				_self.classList = res.list
			})
		},
		methods: {
			getList(nextString) {
				var _self = this;
				this.check = '';
				this.isdisable = false;
				this.nextString = nextString;
				var data = {
					page: nextString,
					grade: ''
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
				if(path == 'pay') {
					var _self = this;
					var Common = common.getS('stuInfo')
					var stuId = Common.student_id;
					var mobile = Common.username;
					var classId = _self.classId;
					var pastClassId = common.getS('xu_class_id');
					var data = {
						mobile: mobile,
						student_id: stuId,
						product_type: 1,
						product_id: classId,
						class_type: 1,
						past_class_id: pastClassId
					}
					liSrv.createOrder(data, function(res) { //创建订单
						common.setS('class_order_num', res.order_id)
						_self.$router.push(path);
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
				this.tzpage('pay')
			},
			addyh() {
				this.tzpage('preferential')
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
					grade: grade,
					page: ''
				}
				this.nextString = '1';
				liSrv.getClassYesList(data, function(res) {
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