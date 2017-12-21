<style lang="less" rel="stylesheet/less" scoped>
	#cchistory {
		.info {
			width: 100%;
			display: flex;
			padding: 30px 0;
		}
		p {
			line-height: 26px;
		}
		.info_left {
			width: 50%;
			border-right: 1px solid #c6c6c6;
			box-sizing: border-box;
			padding-right: 30px;
			.people_info {
				p {
					display: flex;
					em,
					span {
						width: 30%;
						background: #EFEFEF;
						padding-left: 5px;
						box-sizing: border-box;
						margin-right: 1%;
					}
					span {
						background: none;
					}
					em {
						height: 28px;
						cursor: default;
						margin-bottom: 10px;
						border-bottom: 2px dashed #999999;
					}
					.phone {
						width: 90%;
						font-size: 16px;
						padding-bottom: 15px;
					}
					.introduceripone {
						width: 92%;
						padding-right: 15px;
					}
				}
			}
			.sknum,
			.learn,
			.regis {
				h4 {
					font-size: 18px;
				}
				i {
					color: red;
				}
				margin: 20px 0;
			}
			.table {
				margin-bottom: 10px;
			}
		}
		.info_right {
			width: 50%;
			box-sizing: border-box;
			padding: 0 0 0 30px;
			em {
				font-size: 18px;
				color: red;
			}
			.A,
			.C,
			.D,
			.E {
				margin: 30px 0;
				p {
					margin-left: 10px;
					i {
						cursor: pointer;
						margin-top: 10px;
						display: inline-block;
						line-height: 32px;
						padding: 0 15px;
						background: #EFEFEF;
						margin-right: 3px;
					}
					.a-active {
						background: #FF8900;
						color: #FFFFFF;
					}
				}
			}
			.B {
				margin: 20px 0;
				textarea {
					width: 100%;
					height: 150px;
				}
			}
			.C {
				i {
					padding: 0;
					text-align: center;
					width: 55px;
				}
			}
			.E {
				position: relative;
				p {
					margin-bottom: 10px;
				}
				.yytyk,
				.yygj,
				.jjbm,
				.fq,
				.ybb {
					z-index: 999;
					/*position: absolute;*/
					background: #FFFFFF;
					width: 100%;
					border: 1px solid #c6c6c6;
					input {
						height: 26px;
						width: 160px;
						margin-bottom: 15px;
						padding-left: 5px;
					}
					.class_check {
						height: 26px;
						width: 147px;
						margin-bottom: 15px;
						padding-left: 5px;
						border: #999 1px solid;
					}
					textarea {
						width: 90%;
						height: 80px;
					}
					i {
						margin-bottom: 15px;
					}
					div {
						width: 90%;
						margin: 30px auto;
						p {
							margin: 0;
							a {
								width: 75px;
								display: inline-block;
								margin-top: 30px;
								margin-bottom: 20px;
								&:nth-child(1) {
									margin-right: 100px;
								}
							}
						}
					}
				}
			}
			.jjbm {
				.tj {
					margin: 0 !important;
					height: 28px;
					line-height: 28px;
				}
			}
			.tel_history {
				margin: 20px 15px 0 15px;
				p {
					line-height: 20px;
					margin-top: 15px;
				}
			}
		}
		h3 {
			margin: 20px 0;
			padding-top: 10px;
			border-top: 1px solid #c6c6c6;
		}
		.showmore {
			width: 100%;
			height: 30px;
			line-height: 30px !important;
			text-align: center;
			background-color: #dadada;
			cursor: pointer;
		}
	}
	
	.lineipt {
		display: inline-block;
	}
	
	.inputaddym {
		margin-top: 15px;
		height: 32px;
		line-height: 32px;
		display: inline-block;
		width: 70px !important;
		border: none;
		border-bottom: 2px dashed #999999;
	}
	
	.ysclass {
		color: red;
	}
</style>
<template>
	<div id="cchistory" class="content_sub">
		<h2 class="tit">
  		CC提醒
  		<router-link to='ccremind' class='common_btn'>返回</router-link>
  	</h2>
		<div class="info">
			<div class="info_left">
				<div class="people_info">
					<p><span class="phone">手机号：{{leftdata.mobile}} &nbsp; <i class="ysclass">{{yesclass}}</i> </span></p>
					<p><span>学生姓名</span><span>学生性别</span></p>
					<p><em @dblclick='editstuname'>{{leftdata.user_name}}</em><em @dblclick='editstusex'>{{leftdata.sex}}</em></p>
					<p><span>学生出生日期</span><span>学生年龄</span></p>
					<p>
						<!--<em @click.stop='editbirthday' v-if="leftdata.birthday =='0000-00-00'"></em>--><em @click.stop='editbirthday'>{{leftdata.birthday}}</em><em @dblclick='editage'>{{leftdata.age}}</em></p>
					<p><span>紧急联系人</span><span>关系</span><span>手机号</span></p>
					<p><em @dblclick='editcontact'>{{leftdata.contact}}</em><em @dblclick="editrelationship">{{leftdata.relationship}}</em><em @dblclick="editcontactphone">{{leftdata.contact_phone}}</em></p>
					<p><span>家长姓名</span><span>关系</span><span>手机号</span></p>
					<p><em @dblclick='editpatname'>{{leftdata.parent}}</em><em @dblclick='editpatrela'>{{leftdata.parent_relation}}</em><em @dblclick='editparentphone'>{{leftdata.parent_phone}}</em></p>
					<p><span>学生省份</span><span>城市</span><span>区县</span></p>
					<p><em @dblclick='editstuProv'>{{leftdata.prov_name}}</em><em @dblclick='editstuCity' class="city_name">{{leftdata.city_name}}</em><em @dblclick='editstuCounty' class="county_name">{{leftdata.county_name}}</em></p>
					<p><span>学校名称</span><span>学生年级</span><span>数学老师名字</span></p>
					<p><em class="school_name" @dblclick='editstuschoolname'>{{leftdata.school_name}}</em><em @dblclick='editstugrad'>{{leftdata.grade}}</em><em @dblclick='editteachername'>{{leftdata.math_teacher}}</em></p>
					<p><span>介绍人手机号</span></p>
					<p><em class="introduceripone" @dblclick="editreferphone">{{leftdata.references_phone}}</em></p>

				</div>
				<div class="sknum">
					<p>总报班次数： 0
					</p>
					<p>最近一次报班的，上课次数： {{leftdata.done_lesson_count || 0}}/ 0次
					</p>
				</div>
				<div class="learn">
					<h4>狸米学习情况</h4>
					<p>总做题数： {{leftdata.solve_count}}
					</p>
					<p>总正确率： {{leftdata.correct_rate || 0}}%</p>
					<p>书本数： {{leftdata.book_count || 0}}本
					</p>
					<p>是否购买狸米会员：<span v-if="leftdata.limi_vip == 1">是</span><span v-else="leftdata.limi_vip == 2">否</span></p>
					<p>是否购买狸米直播课： 否
					</p>
				</div>
				<div class="regis">
					<p>注册时间：{{leftdata.reg_time}}
						<!--（ 距今1000天）-->
					</p>
					<p>末次登陆时间：{{leftdata.last_login_time}}
						<!--（距今1000天）-->&nbsp; &nbsp; 登录位置：{{leftdata.last_login_from}}
						<!--狸米学习-->
					</p>
					<p>末次电话服务时间：{{leftdata.last_call_time}}
						<!--（距今1000天 ）-->&nbsp; &nbsp; 服务人员：{{leftdata.operator_name}}

					</p>
					<p><i>信息来源：{{leftdata.source}}</i></p>
				</div>
				<h3>历史记录</h3>
				<table class="table" border="1">
					<thead>
						<tr>
							<td width="140">时间</td>
							<td width="70">操作员</td>
							<td>备注</td>
						</tr>
					</thead>
					<tbody>
						<tr class="tr_bg" v-for="item in leftulcclist">
							<td>{{item.update_time}}</td>
							<td>{{item.operator_name}}</td>
							<td>将{{item.field_info}}{{item.old_value}}改为{{item.new_value}}</td>
						</tr>
					</tbody>
				</table>
				<p class="showmore" @click="showmore" v-show="lshowyes">显示更多></p>
			</div>
			<div class="info_right">
				<div class="A">
					<span>A.拨打电话未能接通 （单选项）</span>
					<p>
						<i v-for="item in alist" v-on:click="checkonly(item.type,item.index)" :class="{'a-active':item.index==isona && ashow}" ref="menuItema">{{item.zt}}</i>
					</p>
				</div>
				<div class="B">
					<p>B. 拨打电话已经接通，通话记录</p>
					<textarea v-model="calllog"></textarea>
				</div>
				<div class="C">
					<span>C. 客户分级 <em>*</em></span>
					<p>
						<i v-for="item in clist" v-on:click="checkone(item.type,item.index)" :class="{'a-active':item.index==isonc}" ref="menuItemc">{{item.zt}}</i>
					</p>
				</div>
				<div class="D">
					<span>D. 紧急程度 <em>*</em></span>
					<p>
						<i v-for="item in dlist" v-on:click="checkone(item.type,item.index)" :class="{'a-active':item.index==isond}" ref="menuItemd">{{item.zt}}</i>
					</p>
				</div>
				<!--<router-link :to='{name:"stuinfo1",query:{student_id:this.ccstuid,mobile:this.mobile}}' >已报名</router-link>-->
				<!--<a href='javascript:;;' @click="tjbox1()">已报名</a>-->
				<div class="E">
					<p>
						<i v-for="item in elist" v-on:click="checkonly(item.type,item.index)" v-bind:class="{'a-active':item.index==isone}" ref="menuIteme">{{item.zt}}</i>
					</p>

					<!--预约体验课-->
					<div class="yytyk" v-if='isone==1'>
						<div>
							<p>预约体验课时间</p>
							<p><input　class="Wdate" 　onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'})" type="text" id="yydate" /><em>　*</em></p>
							<p>选择试听课</p>
							<p>
								<select name="" v-model="ch_cla" class="class_check" @click="checkyes">
									<option value="">请选择试听课</option>
									<option v-for="option in ccclaslist" v-bind:value="option.class_id">
										{{ option.name }}
									</option>
								</select><em>　*</em></p>
							<p>是否添加微信</p>
							<p>
								<i v-for="item in addwx" @click="changewx(item.index)" v-bind:class="{'a-active':item.index==isonwx}" ref="wxitem">{{item.name}}</i>
							</p>
							<p>有什么设备（多选项）</p>
							<p>
								<i v-for="item in addsb" @click="changesb(item,$event)" v-bind:class="{'a-active':item.isshow==true}" v-model="sball">{{item.name}}</i>
							</p>
							<p>家里网络 （多选项）</p>
							<p>
								<i v-for="item in addwifi" @click="changewifi(item,$event)" v-bind:class="{'a-active':item.isshow==true}" v-model="wifiall">{{item.name}}</i>
							</p>
							<p>
								<a class="common_btn" href='javascript:;;' @click.stop="yytykone">提交</a>

							</p>
						</div>
					</div>
					<!--预约跟进-->
					<div class="yygj" v-if='isone==2'>
						<div>
							<p>预约跟进时间：</p>
							<p><input　class="Wdate" onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'})" type="text" id="gjdate" /><em>　*</em></p>
							<p>备注：</p>
							<p><textarea v-model="gjremark"></textarea></p>
							<p>
								<a class="common_btn" href='javascript:;;' @click.stop="yytykone">提交</a>
								<!--<a href='javascript:;;' class="common_btn">取消</a>-->
							</p>
						</div>
					</div>
					<!--拒绝报名-->
					<div class="jjbm" v-if='isone==3||isone==4'>
						<div>
							<p v-show="isone==3">拒绝报名的原因<em> ＊</em></p>
							<p v-show="isone==4">放弃的原因<em> ＊</em></p>
							<p>
								<i v-for="(item,index) in arrreason" @click="cgreason(index,$event)" :data-id='item.id' :class="{'a-active':index==isreason}" ref="giveupitem" v-html='item.tag_name' v-dbchange='videolistFn'>
									<span v-html=''></span>
								</i>
								<span class="lineipt" v-if="reastrue">
									<input type="text" class="inputaddym" v-model="reason" @blur="savereson"/>
								</span>
								<a class="common_btn tj" @click="addreason()" href='javascript:;;'>添加</a>
							</p>
							<p>
								<a class="common_btn" href='javascript:;;' @click.stop="yytykone">提交</a>
								<!--<a class="common_btn" href='javascript:;;'>取消</a>-->
							</p>
						</div>
					</div>
					<!--放弃-->
					<!--<div class="jjbm jjbm2" v-if='isone==4' v-dbchange='videolistFn'>
						<div>
							<p>放弃的原因<em> ＊</em></p>
							<p>
								<i v-for="(item,index) in arrreason" @click="cgreason(index,$event)" :data-id='item.id' :class="{'a-active':index==isreason}" ref="giveupitem" v-html='item.tag_name'>
									<span v-html=''></span>
								</i>
								<span class="lineipt" v-if="reastrue">
									<input type="text" class="inputaddym" v-model="reason" @blur="savereson"/>
								</span>
								<a class="common_btn tj" @click="addreason()" href='javascript:;;'>添加</a>
							</p>
							<p>
								<a class="common_btn" href='javascript:;;' @click="yytykone">提交</a>
							</p>
						</div>
					</div>-->
					<!--已报班-->
					<div class="ybb" v-if='isone==5'>
						<!--<div v-if='isone==5'>
							<p>经检查该学生已报班；</p>
							<p>请确认是否设置该学生为不再跟进？</p>
							<p>如确认，以后请到历史记录检索该学生即可。？</p>
							<p>
								<a class="common_btn" href='javascript:;;'  @click="yytykone">提交</a>
							</p>
						</div>-->
						<!--<div style="text-align: center;"  v-if='isone==6'>
							<p>该学生未报班，该按钮无法点击</p>
							<p>
								<a style="margin: 30px 0 0 0;" class="common_btn" href='javascript:;;'>确认</a>
							</p>
						</div>-->
					</div>
				</div>
				<h3>历史纪录</h3>
				<div class="tel_history">
					<p v-for="item in rulcclist">
						<span v-for="x in item">{{x}}；</span>
						<p class="showmore" v-show="showyes" @click="showmoreR">显示更多></p>
					</p>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'cchistory',
		data() {
			return {
				ccstuid: this.$route.query.id,
				//left
				leftdata: '',
				//right
				reason: '',
				ashow: false,
				//				cshow: false,
				//				dshow: false,
				isona: '',
				isonc: '',
				isond: '',
				isonwx: '',
				isreason: null,
				isone: '',
				calllog: '',
				gjremark: '',
				getMenuTexta: '',
				getMenuTextc: '',
				getMenuTextd: '',
				getMenuTexte: '',
				getMenuTextf: '',
				addwx: [{
					name: '已加',
					index: '1'
				}, {
					name: '未加',
					index: '2'
				}],
				addsb: [{
					name: 'pc',
					isshow: false
				}, {
					name: 'ipad',
					isshow: false
				}],
				addwifi: [{
					name: '移动',
					isshow: false
				}, {
					name: '联通',
					isshow: false
				}, {
					name: '电信',
					isshow: false
				}],
				arrreason: [],
				alist: [{
						zt: '号码无效',
						index: '1',
						type: "a"
					},
					{
						zt: '关机',
						index: '2',
						type: "a"
					},
					{
						zt: '拒接',
						index: '3',
						type: "a"
					},
					{
						zt: '打通无人接听',
						index: '4',
						type: "a"
					},
					{
						zt: '打不通',
						index: '5',
						type: "a"
					},
					{
						zt: '接通但无效',
						index: '6',
						type: "a"
					}
				],
				clist: [{
						zt: 'A',
						index: '1',
						type: "c"
					},
					{
						zt: 'B',
						index: '2',
						type: "c"
					},
					{
						zt: 'C',
						index: '3',
						type: "c"
					},
					{
						zt: 'D',
						index: '4',
						type: "c"
					}
				],
				dlist: [{
						zt: '黄色（紧急）',
						index: '1',
						type: "d"
					},
					{
						zt: '白色（不紧急）',
						index: '2',
						type: "d"
					}
				],
				elist: [{
						zt: '预约体验课',
						index: '1',
						type: "e"
					},
					{
						zt: '预约跟进',
						index: '2',
						type: "e"
					},
					{
						zt: '拒绝报名',
						index: '3',
						type: "e"
					},
					{
						zt: '放弃',
						index: '4',
						type: "e"
					},
					{
						zt: '报班（正式班）',
						//							zt: '已报班（暂停跟进）',
						index: '5',
						//						index1: '6',
						type: "e"
					}
				],
				provincesArr: '',
				selectedProv: '',
				selectedCity: '',
				selectedCounty: '',
				selectedSchool: '',
				schollname: '',
				yyone: '',
				yydate: '',
				gjdate: '',
				sball: [],
				wifiall: [],
				giveupall: [],
				giveupone: '',
				getcclist: '',
				getcclljl: '',
				str: '',
				reastrue: false,
				mobile: '',
				alldata: '',
				ch_cla: '',
				shownum: 20,
				shownumold: 20,
				showyes: false,
				lshowyes: false,
				rulcclist: '',
				leftulcclist: '',
				fjp: '',
				quik: '',
				ccclaslist: '',
				yesclass: '',
				suryes: true
			}
		},
		beforeCreate() {

		},
		created() {
			if(this.ccstuid) {
				this.getccstru(this.ccstuid);
			}
			var _self = this;
			liSrv.getProvinces(function(res) { //获取省
				_self.provincesArr = _self.changeArr(res);
			})
			liSrv.ccclasslist(function(res) { //获取自动体验课列表
				_self.ccclaslist = res;
			})
			//获取历史记录左
			this.ccstuupdate()
			//获取通话记录列表右
			this.getcccalllog()

			//cc放弃原因查询
			this.lookreason()
			//查询是否报班成功
			setTimeout(function() {
				_self.getclasslist()
			}, 600);

		},
		methods: {
			//查询是否报班成功
			getclasslist() {
				var _self = this;
				for(let i of _self.ccclaslist) {
					var data = {
						class_id: i.class_id,
						username: _self.mobile,
					};
					liSrv.classStudentList(data, function(res) {
						if(res.list.length >= 1) {
							var clasid = res.list[0].class_id;
							if(clasid == i.class_id) {
								var clasname = i.name;
							}
							_self.yesclass = "已进" + clasname;
							return;
						} else {
							_self.yesclass = "";
						};
					}, function(err) {})
				}
			},
			lookreason() {
				var _self = this;
				liSrv.lookccreason(function(res) {
					_self.arrreason = res;
				})
			},
			tjbox1() {
				var _self = this;
				liSrv.searchStu(_self.mobile, function(res) {
					common.setS('stuInfo', res.data)
					//					console.log(res)
					_self.$router.push({
						name: 'stu_file_livecourse',
						query: {
							id: res.data.student_id,
							num: 1
						}
					});
					//					_self.$router.push({name: 'stu_file_info'})
				}, function(err) {
					if(err.desc == '无更多数据') {
						if(!_self.yesorno) {
							var r = window.confirm('号码无记录是否注册？')
							if(r) {
								common.setS('yuzhucemobile', _self.mobile)
								common.setS('stuInfo', {})
								_self.$router.push({
									name: 'updata_file_info'
								});
							}
							return;
						} else {
							alert('号码无注册');
							return;
						}

					}
					alert(err.desc)
				})
			},
			//				common.setS('stuInfo',this.mobile)
			//				this.$router.push({
			//					name: 'stuinfo',
			//					query: {
			//						student_id:this.ccstuid,
			//						mobile:this.mobile
			//					}
			//				})

			getcccalllog() { //右更多
				var _self = this;
				liSrv.getcccalllog(_self.ccstuid, function(data) {
					_self.getcclist = data;
					var rlinum = data.length; //总条数
					if(rlinum > _self.shownum) {
						_self.showyes = true;
						_self.rulcclist = data.slice(0, _self.shownum);
					} else {
						_self.rulcclist = data;
					}

				})
			},
			showmoreR() { //右更多
				var _self = this;
				var rlinum = _self.getcclist.length;
				var yunum = rlinum % _self.shownum;
				var x = _self.shownumold;
				_self.shownum = _self.shownum + x;
				if(_self.shownum > rlinum) {
					_self.shownum = _self.shownum - x + yunum;
					_self.showyes = false;
				}
				_self.rulcclist = _self.getcclist.slice(0, _self.shownum);
			},
			ccstuupdate() { //左更多
				var _self = this;
				liSrv.ccstuupdate(_self.ccstuid, function(data) {
					_self.getcclljl = data;
					var rlinum = data.length; //总条数
					if(rlinum > _self.shownum) {
						_self.lshowyes = true;
						_self.leftulcclist = data.slice(0, _self.shownum);
					} else {
						_self.leftulcclist = data;
					}

				})
			},
			showmore() {
				var _self = this;
				var rlinum = _self.getcclljl.length;
				var yunum = rlinum % _self.shownum;
				var x = _self.shownumold;
				_self.shownum = _self.shownum + x;
				if(_self.shownum > rlinum) {
					_self.shownum = _self.shownum - x + yunum;
					_self.lshowyes = false;
				}
				_self.leftulcclist = _self.getcclljl.slice(0, _self.shownum);
			},
			getccstru(uid) {
				var _self = this;
				liSrv.getstudent(uid, function(res) { //左边数据
					//					console.log(res)
					_self.leftdata = res;
					_self.mobile = res.mobile;
					_self.selectedProv = res.prov;
					_self.selectedCity = res.city;
					_self.selectedCounty = res.county;
					if(res.level !== '0') { //分级
						_self.fjp = res.level;
						//						$(".C").children().find('i').eq(res.level-1).addClass("a-active");
						_self.checkone('c', res.level)
					}
					if(res.degree !== '0') { //紧急程度
						_self.quik = res.degree;
						//						$(".D").children().find('i').eq(res.degree-1).addClass("a-active");
						_self.checkone('d', res.degree)
					}
				})
			},
			changewx(index) { //是否添加微信
				var _self = this;
				this.isonwx = index;
				_self.yyone = index;
			},
			cgreason(index) { //拒绝报名原因
				var _self = this;
				this.isreason = index;
				_self.giveupone = this.$refs.giveupitem[index].innerText;
			},
			changesb(bt, $event) { //设备多选
				var sbli = $event.target.innerText;
				bt.isshow = !bt.isshow;
				if(bt.isshow == true) {
					this.sball.push(sbli);
				} else(
					this.sball.splice($.inArray(sbli, this.sball), 1)
				)
			},
			changewifi(wf, $event) { //网络多选
				var wifili = $event.target.innerText;
				wf.isshow = !wf.isshow;
				if(wf.isshow == true) {
					this.wifiall.push(wifili);
				} else(
					this.wifiall.splice($.inArray(wifili, this.wifiall), 1)
				)
			},
			checkone(type, index) { //客户分级 紧急程度
				var _self = this;
				if(type == 'c') {
					//					$(".C").children().find('i').siblings().removeClass("a-active");
					if(this.isonc == index) {
						_self.getMenuTextc = ''
					} else {
						_self.getMenuTextc = index;
					}
					this.isonc = index;
					var data = {
						filed: 'level',
						'new': _self.getMenuTextc,
						student_id: _self.leftdata.id
					}
					if(_self.getMenuTextc !== _self.fjp) {
						if(_self.getMenuTextc !== "") {
							liSrv.ccstuupdata(data, function(res) {
								_self.getcccalllog();
								_self.fjp = "";
							})
						}
					}

				}
				if(type == 'd') {
					//					$(".D").children().find('i').siblings().removeClass("a-active");
					if(this.isond == index) {
						_self.getMenuTextd = ''
					} else {
						_self.getMenuTextd = index;
					}
					this.isond = index;
					var data = {
						filed: 'degree',
						'new': _self.getMenuTextd,
						student_id: _self.leftdata.id
					}
					if(_self.getMenuTextd !== _self.quik) {
						if(_self.getMenuTextd !== "") {
							liSrv.ccstuupdata(data, function(res) {
								_self.getcccalllog()
								_self.quik = "";
							})
						}
					}

				}
			},
			checkonly(type, index) { //A E
				var _self = this;
				if(type == 'a') {
					if(this.isona == index) {
						this.ashow = !this.ashow;
						this.ashow == false ? _self.getMenuTexta = '' : _self.getMenuTexta = this.index
					} else {
						this.ashow = true;
						_self.getMenuTexta = index
					}
					this.isona = index;
				}
				if(type == 'e') {
					if(this.isone == index) {
						_self.getMenuTexte = ''
					} else {
						_self.getMenuTexte = index;
					}
					if(index == 5) { //发送请求
						var student_id = _self.leftdata.id
						var _self = this;
						//判断是否注册 根据是否注册跳转页面
						_self.yytykone()

						//						liSrv.checkclass(student_id, function(res) {
						////							var res=4;
						//							if(res=='0'){
						//								alert("该学生未报班，该按钮无法点击");
						//								_self.isone=0;
						////								_self.$router.push(path:'')//跳转报名页
						//							}else{
						//								_self.isone =5;
						//								_self.yytykone();//记录信息后跳转
						////								_self.$router.push(path:'')//跳转学生信息页
						//							}
						//						})
						return;
					}
					this.isone = index;
				}
			},
			addreason() { //添加拒绝报名原因
				if($(".inputadd").length > 0) {
					return
				}
				$(".inputadd").val("");
				if(this.reastrue == false) {
					this.reastrue = true;
				};

			},
			savereson() { //保存报名原因
				var _self = this;
				if(_self.reason.trim() == '') {
					var _self = this;
					_self.reastrue = false
				} else {
					liSrv.addccreason(this.reason, function(res) {
						//						_self.arrreason.push(tag_name);
						_self.reason = "";
						_self.reastrue = false
						_self.lookreason()
					}, function(err) {
						_self.reastrue = false
						alert("添加失败")
					})
				}
			},
			changeArr(data) {
				var arr = [];
				for(var i in data) {
					arr.push({
						name: data[i],
						value: i + '-' + data[i]
					})
				}
				return arr;
			},
			editstuname() { //修改学生姓名
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'user_name',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}

					}
				})
			},
			editbirthday() { //修改学生日期
				var _self = this;
				$(event.target).tableEditorTr({
					type: 'date',
					hms: false,
					success: function(val, fn) {
						var data = {
							filed: 'birthday',
							'new': val,
							student_id: _self.leftdata.id
						}
						liSrv.ccstuupdata(data, function(res) {
							_self.ccstuupdate()
							fn();
						})
					}
				})
				this.docuclick();
			},
			docuclick() { //日期取消焦点
				var _self = this;
				$(document).click(function() {
					setTimeout(function() {
						var val = $("#table-editor-tr-input").val();
						$("#table-editor-tr-input").parent().html(val)
						$('.relative').removeClass('relative');
						if(val == "") {
							var data = {
								filed: 'birthday',
								'new': val,
								student_id: _self.leftdata.id
							}
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
							})
						}
					}, 500)
				})
			},
			editage() { //修改学生年龄
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'age',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(val < 0 || val >= 100) {
							alert("请输入正确的年龄");
							return;
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}

					}
				})
			},
			editcontact() { //修改紧急联系人姓名
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'contact',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editrelationship() { //修改紧急联系人关系
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'relationship',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editcontactphone() { //修改紧急联系人手机号
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'contact_phone',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(val !== "" && !(/^1[34578]\d{9}$/.test(val))) {
							alert("手机号码有误，请重填");
							return;
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editstusex() { //修改性别
				var _self = this;
				$(event.target).tableEditorTr({
					type: 'select',
					options: [{
						name: '男',
						value: '1'
					}, {
						name: '女',
						value: '2'
					}],
					success: function(val, fn) {
						var data = {
							filed: 'sex',
							'new': val,
							student_id: _self.leftdata.id
						}
						liSrv.ccstuupdata(data, function(res) {
							_self.ccstuupdate()
							fn();
						})
					}
				})
			},
			editpatname() { //修改家长名字
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'parent',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editpatrela() { //修改家长关系
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'parent_relation',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editparentphone() { //修改家长手机
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						$(this).focus();
						var data = {
							filed: 'parent_phone',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(val !== "" && !(/^1[34578]\d{9}$/.test(val))) {
							alert("手机号码有误，请重填");
							return;
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editstugrad() { //修改年级
				var _self = this;
				$(event.target).tableEditorTr({
					type: 'select',
					options: [{
						name: '一年级',
						value: '1'
					}, {
						name: '二年级',
						value: '2'
					}, {
						name: '三年级',
						value: '3'
					}, {
						name: '四年级',
						value: '4'
					}, {
						name: '五年级',
						value: '5'
					}, {
						name: '六年级',
						value: '6'
					}],
					success: function(val, fn) {
						var data = {
							filed: 'grade',
							'new': val,
							student_id: _self.leftdata.id
						}
						liSrv.ccstuupdata(data, function(res) {
							_self.ccstuupdate()
							fn();
						})
					}
				})
			},
			editstuProv() { //修改学生省份
				var _self = this;
				$(event.target).tableEditorTr({
					type: 'select',
					options: _self.provincesArr,
					success: function(val, fn) {
						var id = val.split('-')[0];
						var name = val.split('-')[1];
						_self.selectedProv = id;
						var cd = {
							id: id,
							name: name
						} //[{id:val},{name:name2}]
						var data = {
							filed: 'prov',
							'new': cd,
							student_id: _self.leftdata.id
						}
						liSrv.ccstuupdata(data, function(res) {
							_self.leftdata.city_name = '';
							_self.leftdata.county_name = '';
							_self.leftdata.school_name = '';
							$(".city_name").text("");
							$(".county_name").text("");
							$(".school_name").text("");
							_self.ccstuupdate()
							fn();
						})
					}
				})
			},
			editstuCity() { //修改学生市
				var _self = this;
				var el = event.target;
				//				console.log(this.selectedProv)
				if(this.selectedProv) {
					liSrv.getCity(this.selectedProv, function(res) {
						$(el).tableEditorTr({
							type: 'select',
							options: _self.changeArr(res),
							success: function(val, fn) {
								var id = val.split('-')[0];
								var name = val.split('-')[1];
								_self.selectedCity = id;
								var cd = {
									id: id,
									name: name
								} //[{id:val},{name:name2}]
								var data = {
									filed: 'city',
									'new': cd,
									student_id: _self.leftdata.id
								}
								liSrv.ccstuupdata(data, function(res) {
									_self.leftdata.county_name = '';
									_self.leftdata.school_name = '';
									$(".county_name").text("");
									$(".school_name").text("");
									_self.ccstuupdate()
									fn();
								})
							}
						})
					})
				}
			},
			editstuCounty() { //修改学生县
				var _self = this;
				var el = event.target;
				if(this.selectedCity) {
					liSrv.getCounty(this.selectedCity, function(res) {
						$(el).tableEditorTr({
							type: 'select',
							options: _self.changeArr(res),
							success: function(val, fn) {
								var id = val.split('-')[0];
								var name = val.split('-')[1];
								_self.selectedCounty = id;
								var cd = {
									id: id,
									name: name
								} //[{id:val},{name:name2}]
								var data = {
									filed: 'county',
									'new': cd,
									student_id: _self.leftdata.id
								}
								liSrv.ccstuupdata(data, function(res) {
									_self.leftdata.school_name = '';
									$(".school_name").text("");
									_self.ccstuupdate()
									fn();
								})
							}
						})
					})
				}
			},
			editstuschoolname() { //修改学校名称
				var _self = this;
				var el = event.target;
				if(this.selectedCounty) {
					liSrv.getSchool(this.selectedCounty, function(res) {
						$(el).tableEditorTr({
							type: 'select',
							options: _self.changeArr(res.data),
							success: function(val, fn) {
								var id = val.split('-')[0];
								var name = val.split('-')[1];
								var cd = {
									id: id,
									name: name
								} //[{id:val},{name:name2}]
								var data = {
									filed: 'school',
									'new': cd,
									student_id: _self.leftdata.id
								}
								liSrv.ccstuupdata(data, function(res) {
									_self.ccstuupdate()
									fn();
								})
							}
						})
					})
				}
			},
			editteachername() { //修改老师名字
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'math_teacher',
							new: val,
							student_id: _self.leftdata.id
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			editreferphone() { //修改联系人电话
				var _self = this;
				var oldval = $(event.target).text();
				$(event.target).tableEditorTr({
					type: 'text',
					success: function(val, fn) {
						var data = {
							filed: 'references_phone',
							'new': val,
							student_id: _self.leftdata.id
						}
						if(val !== "" && !(/^1[34578]\d{9}$/.test(val))) {
							alert("手机号码有误，请重填");
							return;
						}
						if(oldval !== val) {
							liSrv.ccstuupdata(data, function(res) {
								_self.ccstuupdate()
								fn();
							})
						} else {
							fn();
						}
					}
				})
			},
			//			mustfn() {
			//				var dataabcd = [this.getMenuTexta, this.calllog, this.getMenuTextc, this.getMenuTextd] //ABCD4个单选项
			//			},	
			checkyes() {
				//				var yydate = $('#yydate').val();
				//				if(yydate!==''){
				//					alert("请求接口查询是否有课")
				//					liSrv.ccstuupdata(yydate, function(res) {
				//						if(res.length>=0){
				//							
				//						}else{
				//							alert("亲，今天没有体验课，请选择有课的时间预约")
				//						}
				//					})
				//				}else{
				//					alert('请先填写预约体验课时间');
				//				}
			},
			yytykone() { //提交
				var _self = this;

				if(_self.suryes) {
					var user_id = _self.ccstuid
					//				this.mustfn();
					var dataabcd = [this.getMenuTexta, this.calllog, this.getMenuTextc, this.getMenuTextd] //ABCD4个单选项
					if(dataabcd[2] == '') {
						alert('请选择客户分级');
						return false;
					}
					if(dataabcd[3] == '') {
						alert('请选择紧急程度');
						return false;
					}

					_self.alldata = {
						user_id: user_id,
						not_on_reason: this.getMenuTexta,
						call_log: this.calllog,
						level: this.getMenuTextc,
						degree: this.getMenuTextd,
						experience_time: '',
						//					ch_cla:this.ch_cla,//请选择试听课课
						is_wechat: '',
						device: '',
						network: '',
						follow_time: '',
						result_note: ''
					}

					var result = this.getMenuTexte;
					_self.alldata.result = result
					if(this.getMenuTexte == 1) { //预约体验课
						var yydate = $('#yydate').val();
						if(yydate == '') {
							alert('请填写预约体验课时间');
							return;
						}
						if(_self.ch_cla == '') {
							alert('请选择试听课');
							return;
						}
						var experience_time = yydate; //预约时间
						var is_wechat = this.yyone; //微信
						if(this.sball.length > 0) {
							var device = this.sball
						} else {
							var device = ''
						}
						if(this.wifiall.length > 0) {
							var network = this.wifiall
						} else {
							var network = ''
						}
						_self.alldata.experience_time = experience_time
						_self.alldata.is_wechat = is_wechat
						_self.alldata.device = device
						_self.alldata.network = network
						_self.alldata.result_note = this.ch_cla //选择试听课
						_self.serversave()
					}
					if(this.getMenuTexte == 2) { //预约跟进
						var gjdate = $('#gjdate').val();
						if(gjdate == '') {
							alert('请填写预约跟进时间');
							return;
						}
						var follow_time = gjdate; //预约时间
						var result_note = this.gjremark; //预约跟进备注
						_self.alldata.follow_time = follow_time
						_self.alldata.result_note = result_note

						_self.serversave()
					}
					if(this.getMenuTexte == 3) { //拒绝报名
						var giveupreson = this.giveupone; //拒绝原因
						if(giveupreson == '') {
							alert('请选择拒绝报名原因');
							return;
						}
						_self.alldata.result_note = giveupreson

						_self.serversave()
					}
					if(this.getMenuTexte == 4) { //放弃
						var giveupreson2 = this.giveupone; //放弃原因
						if(giveupreson2 == '') {
							alert('请选择放弃原因');
							return;
						}
						_self.alldata.result_note = giveupreson2

						_self.serversave()
					}
					if(this.getMenuTexte == 5) { //已报班
						_self.alldata.result = this.getMenuTexte

						_self.show_confirm()
					}

				}
				_self.suryes = !_self.suryes;

			},
			show_confirm() {
				var _self = this;
				var r = confirm("亲，请问确认报正式班吗？")
				if(r == true) {
					_self.serversave()
				}

			},
			serversave() {
				var _self = this
				liSrv.cccallcreate(_self.alldata, function(res) {
					if(res == true) {
						alert("提交成功")
					}
					_self.getcccalllog();
					if(_self.getMenuTexte == 1) {
						alert("预约体验课成功，请注意跟进")
					}
					if(_self.getMenuTexte == 5) {
						//保存
						common.setS('yesornocc', true)
						_self.tjbox1()
					} else {
						_self.$router.push({
							path: 'ccremind'
						})
					}

				}, function(err) {
					alert("提交失败")
				})
			},
			videolistFn(val, str, index, id) { //更改标签
				var _self = this
				if(val === 'delli') { //删除
					var data = id
					liSrv.delccreason(data, function(res) {
						//			        	_self.arrreason.splice(index,1);
						_self.lookreason()
						_self.giveupone = '';
					}, function(err) {
						console.log(err);
						alert("删除失败");
						$(".inputadd").focus();
						//window.location.reload()
					})
					return;
				}
				if(val === 'newstr') { //更改
					var data = {
						tag_id: id,
						tag_name: str
					}
					//					this.$set(this.arrreason[index], "tag", str)
					liSrv.changeccreason(data, function(res) {
						_self.lookreason()
					}, function(err) {
						alert("修改失败")
						$(".inputadd").focus();
						//						window.location.reload()
					})
				}
				this.cgreason(index)
				//				console.log(str,index)
				//this.$set(this.arrreason[index], "tag", str)
				//修改后提交后台
			},

		},
		directives: {
			dbchange: {
				inserted(el, binding) { //双击添加标签
					var Fn = binding.value;
					//					var el = $(el).find('i')
					$(el).dblclick(function(e, type) {
						if($(".inputadd").length > 0) {
							return;
						}
						e.stopPropagation();
						var index = $(this).index();
						$(this).removeClass("a-active");
						var oldval = $(this).text().trim();
						var str = '<input type="text" class="inputadd" /><span class="btndel"></span>';
						var id = $(this).data('id');
						var interval;
						$(this).html(str);
						$('.inputadd').focus();
						$(".inputadd").val("");
						$(".inputadd").val(oldval);
						$(".inputadd").bind('blur', function(e) { //修改
							interval = setTimeout(function() {
								var newstr = $(".inputadd").val()
								$(".inputadd").parent().html(newstr).addClass("a-active");
								Fn('newstr', newstr, index, id);
							}, 200)
						})
						var ind = $('.btndel').parents('i').index();
						$('.btndel').on('click', function(e) { //删除
							e.stopPropagation();
							clearInterval(interval);
							var delli = $(".inputadd").val()
							Fn('delli', oldval, ind, id);
							//							arrreason.remove(oldval);
						})

					});
				}
			}
		},
	}
</script>