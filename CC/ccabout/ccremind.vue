<style lang="less" rel="stylesheet/less" scoped>
	#ccremind {
		.box {
			position: relative;
			width: 100%;
			height: 200px;
			margin: 20px 0 100px 0;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.sub-box{
				position: absolute;
				z-index: 99;
				width: 100%;
				height: 100%;
				background: rgba(256, 256, 256, .5); /* 其他浏览器 */
				z-index: 99;
			}
			a {
				width: 300px;
				margin: 0 auto;
				border:2px solid #FFFFFF;
				font-size: 16px !important;
			} 
			h5,h4 {
				font-weight: normal;
				text-align: center;
				text-shadow:0 0 0.2em #FFF,
                -0 -0 0.2em #FFF;
			}
			h5 {
				margin-top: 30px;
				font-size: 26px;
			}
			h4 {
				margin: 20px 0;
				font-size: 20px;
			}
		}
		h3 {
			border-top: 1px solid #c6c6c6;
			padding-top: 10px;
			margin: 20px 0;
		}
		.tr_bg {
			background: rgba(255, 223, 37, 1);
		}
		.history {
			color: #3a5fb5;
			cursor: pointer;
		}
		.adman {
			float: right;
			width: 100px;
			position: relative;
			top: -60px;
		}
		.addstuone {
			position: absolute;
			top: 180px;
			left: 43%;
			/*margin: 0 auto;*/
			width: 400px;
			height: 290px;
			border: 1px solid #c6c6c6;
			background: #FFF;
			z-index: 999;
			h4 {
				line-height: 40px;
				padding-left: 20px;
				border-bottom: 1px solid #c6c6c6;
				background: #EFEFEF;
			}
			p {
				line-height: 40px;
				span {
					width: 150px;
					text-align: right;
					display: inline-block;
					em {
						font-size: 18px;
						color: red;
					}
				}
				input,
				select {
					box-sizing: border-box;
					width: 40%;
					height: 26px;
					border: 1px solid #95989a;
					padding-left: 10px;
				}
				a {
					width: 75px;
					margin: 20px auto;
					display: inline-block;
					&:nth-child(1) {
						margin-left: 90px;
						margin-right: 80px;
					}
				}
			}
		}
	}
</style>
<template>
	<div id="ccremind" class="content_sub">
		<h2 class="tit">
  		CC提醒
  	</h2>
		<div class="box">
			<img :src="randomImgSrc" alt="" />
			<div class="sub-box">
				<h5>今日任务{{todayinfo}}人</h5>
				<h4>已完成{{todaynum}}%</h4>
				<a href="javascript:;;" class="common_btn" @click="getonerw">{{fontArr}}</a>
			</div>
		</div>
		<div class="addstuone" v-show="asshow">
			<h4>添加学生</h4>
			<p><span><em>* </em>手机号：</span><input type="text" v-model="mobile" id="mobile" /></p>
			<p><span>学生姓名：</span><input type="text" v-model="asname" id="asname" /></p>
			<p><span>学生性别：</span><select v-model="assex" id="assex"><option value="">请选择</option><option value="1">男</option><option value="2">女</option>
				</select>
			</p>
			<p><span>家长姓名：</span><input type="text" v-model="asfathername" id="asfathername" /></p>
			<p>
				<a class="common_btn" href='javascript:;;' @click="addstudent">提交</a>
				<a href='javascript:;;' class="common_btn" @click="addshowbox">取消</a>
			</p>
		</div>
		<a href="javascript:;;" class="common_btn adman" @click='addshowbox'>添加学生</a>
		<h3>最近历史纪录</h3>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="100">序号</td>
					<td width="220">提醒时间</td>
					<td width="220">末次联系时间</td>
					<td width="100">学生姓名</td>
					<td width="150">手机号</td>
					<td width="100">通话状态</td>
					<td width="130">标记状态</td>
					<td width="100" class="td-center">上课次数</td>
					<td width="80" class="td-center">客户级别</td>
					<td width="150" class="td-center">紧急度</td>
					<td width="100">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in searchlist" :class="{'tr_bg':item.degree=='黄色（紧急）'}">
					<td>{{item.id}}</td>
					<td>{{item.notice_time}}</td>
					<td>{{item.last_call_time}}</td>
					<td>{{item.user_name}}</td>
					<td>{{item.mobile | telchange}}</td>
					<td v-if="item.not_on_reason">未接通</td>
					<td v-else-if="item.call_log">已接通</td>
					<td v-else></td>
					<td>{{item.status}}</td>
					<td class="td-center">{{item.done_lesson_count}}</td>
					<td class="td-center">{{item.level  | notling}}</td>
					<td class="td-center">{{item.degree | notling}}</td>
					<td><i @click="goccinfo(item.id)">跟进</i></td>
				</tr>
			</tbody>
		</table>
		<p><i class='history' @click="gohistory(ccid)"><<更多历史记录</i></p>
		<!--<router-link :to='{name:cchistory,query:{id:ccid}}' class='history'>
			<<更多历史记录 </router-link>-->
				<h3>今日任务列表；已完成{{overnum}}人</h3>
				<table class="table" border="1">
					<thead>
						<tr>
							<td width="170">今日提醒时间</td>
							<td width="170">末次联系时间</td>
							<td width="100">学生姓名</td>
							<td width="100">手机号</td>
							<td width="100" class="td-center">上课次数</td>
							<td width="80" class="td-center">客户级别</td>
							<td width="150" class="td-center">紧急度</td>
							<td width="150">上次备注信息</td>
							<td width="100">操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in tdaylist" :class="{'tr_bg':item.degree=='黄色（紧急）'}">
							<td>{{item.notice_time_map}}</td>
							<td>{{item.last_call_time}}</td>
							<td>{{item.user_name}}</td>
							<td>{{item.mobile | telchange}}</td>
							<td class="td-center">{{item.done_lesson_count}}</td>
							<td class="td-center">{{item.level  | notling}}</td>
							<td class="td-center">{{item.degree | notling}}</td>
							<td>{{item.status}}</td>
							<td><i @click="goccinfo(item.id)">跟进</i></td>
						</tr>
					</tbody>
				</table>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'ccremind',
		data() {
			return {
				ccid:common.getS('uid'),//username
				randomImgSrc:'/static/CCimg/1.jpg',
				id: '',
				todaynum:'0',
				todayinfo:'0',
				asshow: false,
				mobile: '',
				asname: '',
				assex: '',
				asfathername: '',
				searchlist: null,
				tdaylist: null,
				remindtime:'',
				overnum:'0',
				fontArr:'',
			}
		},
		beforeCreate() {
			var _self = this;
		},
		created() {
			var _self = this;
			_self.randomImg();
			//setInterval(_self.randomImg,1000)
			//cc客服当日工作进度
			liSrv.cctodayinfo(function(res) {
//				console.log(res)
				if(res==""){
					_self.todayinfo='0'
					_self.todaynum = '0'
				}else{
					_self.todayinfo = res.average;
					_self.todaynum = res.percent
					_self.overnum = res.done_count
				}
			})
			//获取通话记录列表
			liSrv.ccmindhistory(function(res) {
				_self.searchlist = res.splice(0,3);
			})
			//cc客服任务提醒记录
			liSrv.ccremind(function(res) {
//				console.log(_self.ccid)
				_self.tdaylist = res;
			})
			
		},
		methods: {
			randomImg(){
				var num = Math.floor(Math.random()*31);
				this.randomImgSrc = '/static/CCimg/'+num+'.jpg';
				var fontnum = Math.floor(Math.random()*8);
				var arr = ['加油，再捞一个！','再来一个！','下一个用户必然成单！','为了下午茶，加油！','当成交成为习惯...','点我点我','今天的努力成就明天的我','我还就不信了'];
				this.fontArr = arr[fontnum]
			},
			getonerw(){
				var _self = this;
				setTimeout(_self.getstuall(),100)
			},
			getstuall() {
				var _self = this;
				var st_time;
				if(_self.tdaylist[0]!==undefined){
					st_time=_self.tdaylist[0].notice_time;
				}else{
					st_time="";
				}
				var timestamp2 = Date.parse(new Date(st_time)) / 1000;
				var nw_time=Date.parse(new Date()) / 1000;
				if(_self.todayinfo<=0){
					alert("亲，今日任务还未设置，请联系CC主管！");
					return;
				}
				if(st_time==""||timestamp2>nw_time){
					var id = _self.id;
					liSrv.getstutask(id, function(res) {
						_self.id = res.id;
						if(res.id) {
							_self.$router.push({
								path: 'ccinfo',
								query: {
									id: res.id
								}
							})
						}else {
							alert('暂时没有可认领的学生,请通知CC主管！');
						}
					},function(res){
						if(res.code==='E_FAIL'){
							alert('亲，分配的学生已认领完,请通知CC主管分配学生！');
							return ;
						}
					})
				}else{
					alert("亲，您还有未处理完的任务，设置的提醒跟进时间已过期，仍未处理，请赶紧处理哦！");
				}				
				
			},
			addshowbox() {
				var _self = this;
				_self.asshow = !_self.asshow;
			},
			addstudent() {
				var mobile = $('#mobile').val().trim();
				var asname = $('#asname').val().trim();
				var assex = $('#assex').val();
				var asfathername = $('#asfathername').val().trim();
				if(mobile == "") {
					alert("请输入手机号！");
					return false;
				}
				if(!(/^1[34578]\d{9}$/.test(mobile))) {
					alert("手机号码有误，请重填！");
					return false;
				}
				var data = {
					mobile: this.mobile,
					user_name: this.asname,
					sex: this.assex,
					parent: this.asfathername
				};
				var _self = this;
				liSrv.ccaddstudent(data, function(res) {
					alert("添加成功！")
					_self.asshow = false;
					_self.mobile=_self.asname=_self.assex=_self.asfathername=""
					_self.$router.push({
						path: 'ccinfo',
						query: {
							id: res
						}
					})
				},function(res){
					if(res.desc=="E_REF_PHONE_REPEAT"){
						alert("亲，添加失败，该号码已被认领！")
					}
				})
			},
			goccinfo(id) {
				this.$router.push({
					path: 'ccinfo',
					query: {
						id: id
					}
				})
			},
			gohistory(id){
				this.$router.push({
					path: 'cchistory',
					query: {
						id: id
					}
				})
			},

	},
	filters:{
		notling(val){
			if(!val)return;
			var newval = !val || val == 0 ? "" : val;
			return newval;
		},
		telchange(tel){
			if(!tel) return;
			var reg = /^(\d{3})\d{4}(\d{4})$/;
			return tel = tel.replace(reg, "$1****$2");
		},
	}
	}
</script>
