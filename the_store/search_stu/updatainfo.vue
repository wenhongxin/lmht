<style lang="less" rel="stylesheet/less" scoped>
	#school {
		.school_sear {
			margin-top: 23px;
			input {
				width: 298px;
				margin-top: 3px;
				margin-right: 20px;
				height: 34px;
				border: 1px solid #95989a;
				outline: none;
				padding-left: 10px;
			}
		}
		ul {
			width: 100%;
			background: #E0E0E0;
			margin: 20px 0;
			li {
				padding-left: 20px;
				height: 36px;
				line-height: 36px;
				border-bottom: 1px solid #FFFFFF;
			}
			.table-tit {
				color: #dadada;
				background: #EFEFEF;
			}
		}
		.nomyschool {
			color: #6a87c8;
			padding: 0 0 10px 20px;
		}
	}
	
	#measu {
		h3 {
			font-weight: normal;
			font-size: 12px;
			margin: 22px 0 5px 0;
		}
		input {
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
		}
		.stu_name {
			input {
				width: 288px;
			}
		}
		.parents {
			height: 56px;
			margin-top: 18px;
			input {
				margin-top: 5px;
				width: 185px;
			}
			p {
				font-size: 12px;
				float: left;
			}
			.parents_gx {
				input {
					width: 128px;
				}
			}
		}
		.home_address {
			height: 56px;
			input {
				width: 519px;
			}
		}
		.stu_cls {
			margin-bottom: 15px;
			height: 60px;
			p {
				float: left;
			}
			select,
			input {
				width: 134px;
				margin-top: 10px;
				margin-right: 10px;
				height: 34px;
				border: 1px solid #95989a;
				outline: none;
			}
			a {
				display: inline-block;
				min-width: 134px;
				padding: 0 10px;
				line-height: 34px;
				margin-top: 10px;
				margin-right: 10px;
				height: 34px;
				border: 1px solid #95989a;
			}
			.source{
				width: 300px;
			}
		}
		span {
			width: 75px;
			cursor: pointer;
		}
		.hq_btn{
			span{
				text-align: center;
				display: inline-block;
				cursor: pointer;
				background: #FF8900;
				padding: 0 8px;
				color: #FFFFFF;
			}
			i{
				margin-left: 10px;
			}
			height: 34px;
			line-height: 34px;
			transform: translateY(22px);
		}
		.disable{
			pointer-events: none;
			background: #CCCCCC !important;
		}
	}
</style>
<template>
	<div class="wrap">
		<div id="school" class="content_sub" v-if='isShow'>
			<h2 class="tit">
  		选择学校
  	</h2>
			<div class="school_sear">
				关键词<br />
				<input type="text" v-model='searchstuval' />
				<a href="javascript:;;" @click='qxsearch'>取消</a>
			</div>
			<ul>
				<li class="table-tit">共找到{{schoolnum}}所学校</li>
				<li v-for='(s,i) in schoolList' @click='chooseSchool(i,s)'>{{s}}</li>
			</ul>
			<a href="javascript:;;" class="nomyschool" @click='nomyschool'>找不到我的学校</a>
		</div>
		<div id="measu" class="content_sub" v-if='!isShow'>
			<h2 class="tit" v-text = 'stuInfo.username?"修改学生信息":"测评录入"'>
  		修改学生信息
  	</h2>
			<h3>学生姓名</h3>
			<p class="stu_name"><input type="text" v-model.trim='stuInfo.realname' /></p>
			<div class="parents" v-if='!stuInfo.username'>
				<p class="parents_gx">家长手机号<br /><input type="text" v-model.trim='mobile' :disabled="mobile" /></p>
				<p class="parents_gx">输入验证码<br /><input type="text" v-model.trim='yzm' /></p>
				<p class="hq_btn"><span @click='getverify' :class="{'disable':getyhmtime}">{{btnhtml}}</span><i>验证码十分钟内有效</i></p>
			</div>
			<div class="parents">
				<p class="parents_gx" v-if='stuInfo.username'>家长手机号<br /><input type="text" v-model.trim='mobile' :disabled="mobile" /></p>
				<p>家长姓名<br /><input type="text" v-model.trim='stuInfo.jiazhang_name' /></p>
				<p>家长关系<br /><input type="text" v-model.trim='stuInfo.relationship' /></p>
			</div>
			<h3>家庭收货地址</h3>
			<p class="home_address "><input type="text" v-model.trim='stuInfo.address' /></p>
			<div class="stu_cls">
				<p>学生年级<br />
					<select name="" id="" v-model='student_grade'>
						<option value="">请选择孩子年级</option>
						<option value="1">一年级</option>
						<option value="2">二年级</option>
						<option value="3">三年级</option>
						<option value="4">四年级</option>
						<option value="5">五年级</option>
						<option value="6">六年级</option>
					</select>
				</p>
				<p>学生班<br />
					<select name="" id="" v-model='stu_cls'>
						<option value="">请选择孩子班级</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
						<option value="14">14</option>
						<option value="15">15</option>
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
						<option value="21">21</option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
						<option value="27">27</option>
						<option value="28">28</option>
						<option value="29">29</option>
						<option value="30">30</option>
						<option value="31">31</option>
						<option value="32">32</option>
						<option value="33">33</option>
						<option value="34">34</option>
						<option value="35">35</option>
						<option value="36">36</option>
						<option value="37">37</option>
						<option value="38">38</option>
						<option value="39">39</option>
						<option value="40">40</option>
						<option value="41">41</option>
						<option value="42">42</option>
						<option value="43">43</option>
						<option value="44">44</option>
						<option value="45">45</option>
						<option value="46">46</option>
						<option value="47">47</option>
						<option value="48">48</option>
						<option value="49">49</option>
						<option value="50">50</option>
					</select>
				</p>
				<p>学生性别<br />
					<select name="" id="" v-model='stu_sex'>
						<option value="">请选择孩子性别</option>
						<option value="1">男孩</option>
						<option value="2">女孩</option>
					</select>
				</p>
			</div>
			<div class="stu_cls">
				<p>学校省份<br />
					<select name="" id="" v-model='selectedProv' @change='chooseProv()'>
						<option value="">请选择省</option>
						<option v-for='(p,i) in provincesList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>城市<br />
					<select name="" v-model='selectedCity' @change='chooseCity()'>
						<option id="city" value="" selected>请选择市/区</option>
						<option v-for='(p,i) in cityList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>区/县<br />
					<select name="" id="county" @change='schname=""' v-model='selectedCounty'>
						<option value="">选择区/县</option>
						<option v-for='(p,i) in countyList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>学校名称<br />
					<a href='javascript:;;' @click='go_school' id="school">{{schname}}</a>
				</p>
			</div>
			<div class="stu_cls">
				<p>推荐人<br />
					<input type="text" v-model.trim='recommender' />
				</p>
				<p>来源<br />
					<input type="text" class="source" v-model.trim='source'/>
				</p>
			</div>
			<span class="common_btn" @click='enrollok'>确定</span>
		</div>
	</div>

</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'measu',
		data() {
			return {
				stuInfo:common.getS('stuInfo'),
				isShow: false,
				mobile:common.getS('stuInfo').username || common.getS('yuzhucemobile'),
				provincesList: '',
				cityList: '',
				countyList: '',
				selectedProv: '',
				selectedCity: '',
				selectedCounty: '',
				selectedSchool: '',
				schoolList: '',
				schoolList1: '',
				schname: '',
				schoolnum: '',
				searchstuval: '',
				arr: {},
				student_grade:'',
				recommender:'',
				source:'',
				stu_cls:'',
				yzm:'',
				stu_sex:'',
				btnhtml:'获取验证码',
				getyhmtime:common.getS('getyhmtime'),
				getyhminterval:null
			}
		},
		beforeCreate() {
			var _self = this;
			liSrv.getProvinces(function(res) {
				_self.provincesList = res;
			})
		},
		created(){
			this.student_grade = this.stuInfo.student_grade || '';
			this.stu_cls = this.stuInfo.school_class || '';
			this.stu_sex = this.stuInfo.student_sex || '';
			this.recommender = this.stuInfo.recommender || '';
			this.source = this.stuInfo.source || '';
			var _self = this;
			if(this.stuInfo.prov && this.stuInfo.prov!=0){
				this.selectedProv = this.stuInfo.prov +' '+this.stuInfo.prov_name;
				this.selectedCity = this.stuInfo.city +' '+this.stuInfo.city_name;
				this.selectedCounty = this.stuInfo.district +' '+this.stuInfo.district_name;
				this.schname =this.stuInfo.school_name;
				liSrv.getCity(this.stuInfo.prov, function(res) {
					_self.cityList = res;
				})
			}
			if(this.stuInfo.city && this.stuInfo.city!=0){
				liSrv.getCounty(this.stuInfo.city, function(res) {
					_self.countyList = res;
				})
			}
			if(_self.getyhmtime  && _self.mobile){
				_self.djs();
			}
		},
		methods: {
			getverify(){//获取验证码
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				var _self = this;
				if(!_self.mobile){
					alert('请填写电话号码');
					return ;
				}
				if(!reg.test(_self.mobile)){
					alert('电话号码输入有误');
					return ;
				}
				liSrv.getvcode(_self.mobile,function(){
					_self.getyhmtime = 60;
					_self.djs();
				},function(){
					alert('验证码发送失败，请稍后重试')
				})
			},
			djs(){
				var _self = this;
				_self.getyhminterval = setInterval(function(){
						_self.getyhmtime--;
						if(_self.getyhmtime>=1){
							common.setS('getyhmtime',_self.getyhmtime);
							_self.btnhtml = _self.getyhmtime + '秒后重试';
						}else{
							clearInterval(_self.getyhminterval);
							common.setS('getyhmtime',null);
							_self.btnhtml = '重新获取';
						}
					},1000)
			},
			enrollok() {
				var _self = this;
				var stu_name = _self.stuInfo.realname;
				var parents_phone = _self.mobile;
				var parents_name = _self.stuInfo.jiazhang_name;
				var parents_gx = _self.stuInfo.relationship;
				var home_address = _self.stuInfo.address;
				var student_grade = _self.student_grade;
				var stu_cls = _self.stu_cls;
				var stu_sex = _self.stu_sex;
				var vcode = _self.yzm;
				var is_add = 0;
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				if(!stu_name){
					alert('请填写孩子名字');
					return;
				}
				if(!parents_phone){
					alert('请填写家长手机号');
					return;
				}
				if(!_self.stuInfo.username){
					is_add = 1;
					if(!vcode){
						alert('请输入短信验证码');
						return;
					}
				}
				if(!reg.test(parents_phone)){
					alert('电话号码输入有误');
					return ;
				}
				if(!parents_name){
					alert('请填写家长名字');
					return;
				}
				if(!parents_gx){
					alert('请填写孩子与家长关系');
					return;
				}
				if(!home_address){
					alert('请填写家庭收获地址');
					return;
				}
				if(!student_grade){
					alert('请选择孩子年级');
					return;
				}
				if(!stu_cls){
					alert('请选择孩子班级');
					return;
				}
				if(!stu_sex){
					alert('请选择孩子性别');
					return;
				}
				if(!_self.selectedProv || !_self.selectedCity || !_self.selectedCounty || !_self.schname){
					alert('请选择孩子学校');
					return;
				}
				
				var data = {
					is_add:is_add,
					class_id:'',
					type:'',
					name:parents_name,
					mobile:parents_phone,
					remarks:'',
					student_name:stu_name,
					student_sex:stu_sex,
					student_grade:student_grade,
					prov:_self.selectedProv.split(" ")[0],
					prov_name:_self.selectedProv.split(" ")[1],
					city:_self.selectedCity.split(' ')[0],
					city_name:_self.selectedCity.split(' ')[1],
					district:_self.selectedCounty.split(' ')[0],
					district_name:_self.selectedCounty.split(' ')[1],
					school:_self.selectedSchool,
					school_name:_self.schname,
					relationship:parents_gx,
					address:home_address,
					school_class:stu_cls,
					student_id:_self.stuInfo.student_id,
					vcode:vcode,
					recommender:this.recommender,
					source:this.source
				}
				var commonData={
					jiazhang_name:parents_name,
					username:parents_phone,
					remarks:'',
					realname:stu_name,
					student_grade:student_grade,
					student_sex:stu_sex,
					prov:_self.selectedProv.split(" ")[0],
					prov_name:_self.selectedProv.split(" ")[1],
					city:_self.selectedCity.split(' ')[0],
					city_name:_self.selectedCity.split(' ')[1],
					district:_self.selectedCounty.split(' ')[0],
					district_name:_self.selectedCounty.split(' ')[1],
					school:_self.selectedSchool,
					school_name:_self.schname,
					relationship:parents_gx,
					address:home_address,
					school_class:stu_cls,
					student_id:this.stuInfo.student_id,
					recommender:this.recommender,
					source:this.source
				}
				liSrv.addStudent(data,function(res){
					common.setS('stuInfo',commonData);
					common.setS('yuzhucemobile','');
					common.setS('getyhmtime',null);
					alert('操作成功');
					_self.$router.push('stu_info');
				})
			},
			chooseProv() {
				var _self = this;
				_self.countyList = '';
				_self.selectedCounty= '';
				_self.cityList  = '';
				_self.selectedCity = '';
				_self.schname = '';
				_self.selectedSchool ='';
				if(this.selectedProv == '') {
					return;
				}
				liSrv.getCity(this.selectedProv.split(' ')[0], function(res) {
					_self.cityList = res;
				})
			},
			chooseCity() {
				var _self = this;
				_self.countyList = '';
				_self.selectedCounty= '';
				_self.schname = '';
				_self.selectedSchool ='';
				if(this.selectedCity == '') {
					return;
				}
				liSrv.getCounty(this.selectedCity.split(' ')[0], function(res) {
					_self.countyList = res;
				})
			},
			go_school() {
				if(!this.selectedCounty || !this.selectedCity || !this.selectedCounty) {
					alert('请选择城市地区');
					return;
				}
				if(!this.mobile || !this.stuInfo.realname){
					alert('请填写电话名字等信息');
					return;
				}
				var _self = this;
				liSrv.getSchool(this.selectedCounty.split(' ')[0], function(res) {
					_self.schoolList = res.data;
					_self.schoolnum = res.count;
					_self.schoolList1 = res.data;
				})
				this.isShow = true;
			},
			chooseSchool(id, name) {
				this.searchstuval = ''
				this.selectedSchool = id;
				this.schname = name;
				this.isShow = false;
			},
			nomyschool() {
				var _self = this;
				var data = {
					mobile: _self.stuInfo.username,
					realname: _self.stuInfo.realname
				}
				liSrv.schoolNot(data, function() {
					_self.searchstuval = '';
					_self.selectedSchool = '';
					_self.schname = '找不到学校';
					_self.isShow = false;
				})
			},
			qxsearch() {
				this.arr = {};
				this.schoolList = this.schoolList1;
				this.searchstuval = '';
			}
		},
		watch: {
			'searchstuval' (val, oldval) {
				var _self = this;
				_self.arr = {};
				var list = _self.schoolList1;
				if(!val) {
					_self.arr = {};
					_self.schoolList = _self.schoolList1;
					return;
				}
				for(var i in list) {
					if(list[i].indexOf(val) > -1) {
						_self.arr[i] = list[i];
					}
				}
				_self.schoolList = _self.arr;
			}
		}
	}
</script>