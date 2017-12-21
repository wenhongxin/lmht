<style lang="less" rel="stylesheet/less" scoped>
	#cchistory {
		.tr_bg {
			background: rgba(255, 223, 37, 1);
		}
		.search_history {
			margin-top: 20px;
			border-bottom: 1px solid #c6c6c6;
			padding-bottom: 30px;
			p {
				margin-top: 20px;
				a {
					height: 26px;
					line-height: 24px;
					margin-left: 20px;
					display: inline-block;
					width: 75px;
				}
			}
		}
		input,
		select {
			padding-left: 5px;
			width: 160px;
			height: 26px;
		}
		input.putnum{
			width: 60px;
		}
	}
</style>
<template>
	<div id="cchistory" class="content_sub">
		<h2 class="tit">
  		CC提醒
  		<router-link to='ccremind' class='common_btn'>CC提醒</router-link>
  	</h2>
		<div class="search_history">
			<p>
				提醒时间：<input type="text" class="Wdate" :placeholder="startime(start_time)" onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'})" id="cta_time" />  至  <input type="text" :placeholder="endtime(end_time)"　class="Wdate"  id="ctb_time" onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'})" />  &nbsp; 学生姓名：<input type="text" v-model.trim='user_name' /> &nbsp; 学生手机号: <input type="text" v-model.trim='user_phone' /> 
			</p>
			<p>
				上课次数：<input type="text" class="putnum" v-model.trim='lscounta'/> 至 <input type="text" class="putnum" v-model.trim="lscountb" />
				紧急度：
				<select v-model="degree">
					<option value="0">全部</option>
					<option value="1">黄色（紧急）</option>
					<option value="2">白色（不紧急）</option>
				</select>
				客户级别：
				<select v-model="level" >
					<option value="0">全部</option>
					<option value="1">A</option>
					<option value="2">B</option>
					<option value="3">C</option>
					<option value="4">D</option>
				</select>
				编辑状态：
				<select v-model="result">
					<option value="0">全部</option>
					<option value="1">预约试听课</option>
					<option value="2">预约跟进</option>
					<option value="3">拒绝报名</option>
					<option value="4">放弃</option>
					<option value="5">已报班</option>
				</select>
				<a href="javascript:;;" class="common_btn" @click="ccsearch">搜索</a>
			</p>
		</div>
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
				<tr v-show="ynshow">
					<td colspan="11">暂时没有提醒记录……</td>
				</tr>
				<tr v-for="item in searchlist" :class="{'tr_bg':item.degree=='黄色（紧急）'}">
					<td>{{item.user_id}}</td>
					<td>{{item.notice_time}}</td>
					<td>{{item.last_call_time}}</td>
					<td>{{item.user_name}}</td>
					<td>{{item.mobile | telchange}}</td>
					<td v-if="item.not_on_reason">未接通</td>
					<td v-else-if="item.call_log">已接通</td>
					<td v-else></td>
					<td>{{item.result}}</td>
					<td class="td-center">{{item.done_lesson_count}}</td>
					<td class="td-center">{{item.level  | notling}}</td>
					<td class="td-center">{{item.degree  | notling}}</td>
					<td><i @click="goccinfo(item.user_id)">跟进</i></td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'cchistory',
		data() {
			return {
				ccid: this.$route.query.id,
				inum:1,
				ctime: [],
				done_lesson_count: [],
				degree: 0,
				level: 0,
				result: 0,
				searchlist: null,
				imporli: false,
				user_name:'',
				user_phone:'',
				ynshow:false,
				lscountb:'',
				lscounta:'',
				start_time:new Date(),
				end_time:new Date(),
				//分页
				pageCount: '1',
				nextString: '1',
				total: '0',
				pagesize:20,
			}
		},
		beforeCreate() {
			var _self = this;
		},
		components:{
			trunPage
		},
		created() {
			var _self=this;
			this.ccsearch();
			
		},
		methods: {
			startime(start){
				if(start.toString().indexOf('-')>-1){
					return start;
				}
		        return start.getFullYear()+'-'+ (parseInt(start.getMonth())+1)+'-'+start.getDate() + ' '+ '00:00:00'    //获取当前时间
			},
			endtime(start){
				if(start.toString().indexOf('-')>-1){
					return start;
				}
		        return start.getFullYear()+'-'+ (parseInt(start.getMonth())+1)+'-'+start.getDate() + ' '+ '23:59:59'    //获取当前时间
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				this.ccsearch()
			},
			ccsearch() {
//				console.log(this.ccid)
				var _self = this;
				var cta_time = $('#cta_time').val()|| this.startime(this.start_time);
				var ctb_time = $('#ctb_time').val() || this.endtime(this.end_time);
				var user_name = this.user_name;
				var lscounta =  this.lscounta;
				var lscountb =  this.lscountb;
				var degree =this.degree;
				var level = this.level;
				var result = this.result;
				var data = {
					ctime: [cta_time, ctb_time],
					user_name: user_name,
					mobile:_self.user_phone,
					operator_id:_self.ccid,
					done_lesson_count: [lscounta, lscountb],
					degree: this.degree,
					level: this.level,
					result: this.result,
					pagesize:this.pagesize,
					thispage:this.nextString
				};
				liSrv.getccsearch(data, function(res) {
					_self.start_time = cta_time;
					_self.end_time = ctb_time;
					_self.searchlist = res.list;
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					if(res=='' || !res.list.length){
						_self.ynshow=true;
						_self.pageCount = "1";
						_self.nextString='1';
						_self.total ='0';
					}else{
						_self.ynshow=false;
					}
				},function(){
					_self.searchlist = '';
					_self.pageCount = "1";
					_self.total ='0';
					_self.nextString='1';
				})
			},
			goccinfo(id) {
				this.$router.push({
					path: 'ccinfo',
					query: {
						id: id
					}
				})
			}
		},
		filters:{
			notling(val){
				if(!val) return;
				var newval = !val || val == 0 ? "" : val;
				return newval;
			},
			telchange(tel){
				if(!tel) return;
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return tel = tel.replace(reg, "$1****$2");
			}
		}
	}
</script>