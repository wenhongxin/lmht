<style lang="less" rel="stylesheet/less" scoped>
	#ccallotask {
		.tit span {
			font-size: 16px;
			padding-left: 20px;
		}
		.top {
			width: 100%;
			border-bottom: 1px solid #c6c6c6;
			display: flex;
			padding: 20px 0;
		}
		.top_left {
			width: 50%;
			border-right: 1px solid #c6c6c6;
			p {
				margin-top: 20px;
			}
			a {
				width: 75px;
				margin-top: 20px;
			}
		}
		.peoplenum {
			font-size: 16px;
			margin-top: 15px;
		}
		input,
		select {
			box-sizing: border-box;
			width: 26%;
			height: 26px;
			border: 1px solid #95989a;
			padding-left: 10px;
		}
		.line {
			width: 100%;
			p {
				display: inline-block;
				width: 26%;
				&:nth-child(2) {
					margin: 0px 36px;
				}
				select {
					width: 100%;
				}
			}
		}
		.top_right {
			padding-left: 20px;
			input {
				width: 300px;
				margin-top: 10px;
			}
			i {
				color: red;
			}
			h3 {
				font-size: 26px;
				text-align: center;
				margin: 30px 0;
			}
		}
		h4 {
			font-weight: normal;
			margin: 20px 0;
		}
	}
</style>
<template>
	<div id="ccallotask" class="content_sub">
		<h2 class="tit">设置今天分配<span>{{new Date | YMS}}</span></h2>
		<p class="peoplenum"><!--总人数：{{operator_count}}人--></p>
		<div class="top">
			<div class="top_left">
				<p>
					注册时间：<br />
					<input　class="Wdate" id="start_time"  　onclick="WdatePicker()" type="text" />　至　<input　class="Wdate" id="end_time" 　onclick="WdatePicker()" type="text" />
				</p>
				<p>
					末次登录时间：<br />
					<input　class="Wdate" id="endlog_start_time"　onclick="WdatePicker()" type="text" />　至　<input　class="Wdate" id="endlog_end_time"　onclick="WdatePicker()" type="text" />
				</p>
				<p>
					末次沟通时间：<br />
					<input　class="Wdate"  id="last_cst_t"　onclick="WdatePicker()" type="text" />　至　<input　class="Wdate"  id="last_cen_t"　onclick="WdatePicker()" type="text" />
				</p>
				<div class="line">
					<p>
						省份
						<br />
						<select v-model='selectedProv' @change="chooseProv()">
							<option value="">全部</option>
							<option v-for='(p,i) in provincesList' :value="i+' '+p">{{p}}</option>
						</select>
					</p>
					<p>
						城市
						<br />
						<select v-model='selectedCity' @change='chooseCity()'>
							<option value="">全部</option>
							<option v-for='(p,i) in cityList' :value="i+' '+p">{{p}}</option>
						</select>
					</p>
					<p>
						区县
						<br />
						<select v-model='selectedCounty'>
							<option value="">全部</option>
							<option v-for='(p,i) in countyList' :value="i+' '+p">{{p}}</option>
						</select>
					</p>
				</div>
				<div class="line">
					<p>
						年级
						<br />
						<select v-model="grade">
							<option value="">全部</option>
							<option value="1">一年级</option>
							<option value="2">二年级</option>
							<option value="3">三年级</option>
							<option value="4">四年级</option>
							<option value="5">五年级</option>
							<option value="6">六年级</option>
						</select>
					</p>
					<p>
						性别
						<br />
						<select v-model="sex">
							<option value="0">全部</option>
							<option value="1">男</option>
							<option value="2">女</option>
						</select>
					</p>
				</div>
				<div class="line">
					<p>
						来源
						<br />
						<select v-model="source">
							<option value="0">全部</option>
							<option value="1">狸米课堂</option>
							<option value="2">狸米学习</option>
							<option value="3">网站</option>
							<option value="4">合作商</option>
							<option value="5">门店</option>
							<option value="6">加盟店</option>
							<option value="7">其他</option>
						</select>
					</p>
					<p>
						设备
						<br />
						<select v-model="device">
							<option value="0">全部</option>
							<option value="1">ipad</option>
							<option value="2">pc</option>
						</select>
					</p>
				</div>
				<p>
					狸米学习正确率（%）：<br />
					<input type="text" id="correct_rate_start" v-model.trim='correct_rate_start' />　至　<input type="text" id="correct_rate_end" v-model.trim="correct_rate_end" />
				</p>
				<p>
					狸米学习做题数：<br />
					<input type="text" id="solve_count_start" v-model.trim='solve_count_start'/>　至　<input type="text" id="solve_count_end" v-model.trim="solve_count_end"/>
				</p>
				<div class="line">
					<p>
						是否狸米会员
						<br />
						<select v-model="limi_vip">
							<option value="0">全部</option>
							<option value="1">是</option>
							<option value="2">不是</option>
						</select>
					</p>
					<p>
						跟进类型
						<br />
						<select style="width:120%;" v-model='status'>
							<option value="0">未沟通的</option>
							<option value="3">拒绝报名的</option>
							<option value="4">放弃的（话务员放弃的）</option>
						</select>
					</p>
				</div>
				<a href="javascript:;;" class="common_btn" @click='search'>搜索</a>
			</div>
			<div class="top_right">
				<p><!--当前共 <i>{{operator_count}}</i> 位CC人员，-->今天每人任务为：</p>
				<input type="text" v-model="avg"/>
				<h3>共<i>{{count}}</i>位学生</h3>
				<a href="javascript:;;" class="common_btn" @click='searchok'>提交</a>
			</div>
		</div>
		<h4>历史记录</h4>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="140">时间</td>
					<td width="100">操作员</td>
					<td width="80">共学生人数</td>
					<td width="80">每人任务</td>
					<td>检索条件</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in getccalllist">
					<td>{{item.ctime}}</td>
					<td>{{item.operator_name}}</td>
					<td>{{item.search_count}}</td>
					<td>{{item.average}}</td>
					<td>{{item.sql_desc.join("；")}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'ccallotask',
		data() {
			return {
				reg_time:'',
				login_time:'',
				last_cst_t:'',
				last_cst_t:'',
				status:0,
				limi_vip:'0',
				solve_count_start:'',
				solve_count_end:'',
				correct_rate_start:'',
				correct_rate_end:'',
				device:'0',
				sex:'0',
				grade:'',
				source:'0',
				count:'0',
				avg:'',
				region:'',
				correct_rate:'',
				solve_count:'',
				last_call_time:'',
				call_time:'',
				last_login_time:'',
				provincesList: '',
				cityList: '',
				countyList: '',
				selectedProv: '',
				selectedCity: '',
				selectedCounty: '',
				getccalllist:'',
				operator_count:'300',  //多少CC人员
				rst:null
			}
		},
		beforeCreate() {
			var _self = this;
			liSrv.getProvinces(function(res) {
				_self.provincesList = res;
			})
		},
		created(){
			var _self = this;
			this.getclist();  //获取历史记录
		},
		methods: {
			getclist(){
				var _self=this;
				liSrv.getccalllist(function(data) {
//					console.log(data)
				_self.getccalllist = data;
//				console.log(data)
			})
			},
			chooseProv() { //选取省
				var _self = this;
				_self.countyList = '';
				_self.selectedCounty = '';
				_self.cityList = '';
				_self.selectedCity = '';
				if(this.selectedProv == '') {
					return;
				}
				liSrv.getCity(this.selectedProv.split(" ")[0], function(res) {
					_self.cityList = res;
				})
			},
			chooseCity() { //选取市
				var _self = this;
				_self.countyList = '';
				_self.selectedCounty = '';
				if(this.selectedCity == '') {
					return;
				}
				liSrv.getCounty(this.selectedCity.split(" ")[0], function(res) {
					_self.countyList = res;
				})
			},
			search() {
				var start_time = $('#start_time').val();
				var end_time=$('#end_time').val();
				var endlog_start_time = $('#endlog_start_time').val();
				var endlog_end_time=$('#endlog_end_time').val();
				var last_cst_t = $('#last_cst_t').val();
				var last_cen_t=$('#last_cen_t').val();
				var solve_count_start = $('#solve_count_start').val();
				var solve_count_end=$('#solve_count_end').val();
				var correct_rate_start = $('#correct_rate_start').val();
				var correct_rate_end=$('#correct_rate_end').val();
				var prov={id:this.selectedProv.split(" ")[0],name:this.selectedProv.split(" ")[1]};
				var city={id:this.selectedCity.split(" ")[0],name:this.selectedCity.split(" ")[1]};
				var county={id:this.selectedCounty.split(" ")[0],name:this.selectedCounty.split(" ")[1]};
				var data ={
					reg_time:[start_time,end_time],
					login_time:[endlog_start_time,endlog_end_time],
					call_time:[last_cst_t,last_cen_t],
					status:this.status,
					limi_vip:this.limi_vip,
					solve_count:[solve_count_start,solve_count_end],
					correct_rate:[correct_rate_start,correct_rate_end],
					device:this.device,
					sex:this.sex,
					region:{prov:prov,city:city,county:county},
					grade:this.grade,
					source:this.source
				};
				var _self = this;
				liSrv.createccallotask(data,function(res){
					if(res==""){_self.count='0';}else{
					_self.count=res.count;
//					console.log(res);
					_self.rst=res;
					}
				})
			},
			searchok() {
				var _self = this;
//				console.log(_self.rst.count);
				if(_self.count=='0'){alert("亲，没有检索出学生，请重新选择检索条件！");return;}
				if(_self.rst==null){
					alert("请重新选择检索条件");
				}else if(this.avg>0&&this.avg!==""){
					var data2 ={
						operator_count:this.operator_count,
						avg:this.avg,
						rst:this.rst,
						search_count:this.count
					};
					liSrv.submitcctask(data2,function(res){
						_self.avg="";
						_self.count=0
						alert("提交成功")
						_self.getclist()
					})
				}else{
					alert("请输入每人的任务量")
					return;
				}
				
			}
		}
	}
</script>