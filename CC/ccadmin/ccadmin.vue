<style lang="less" rel="stylesheet/less" scoped>
	#ccallotask {
		.search {
			height: 36px;
			margin: 15px 0 30px 0;
			line-height: 36px;
			input {
				height: 26px;
				width:150px;
				margin: -2px 20px 0 20px;
				padding-left: 5px;
			}
			a {
				height: 28px;
				line-height: 28px;
				margin-top: 5px;
				width: 80px;
				display: inline-block;
			}
		}
		.echart {
			width: 100%;
			border-top: 1px solid #c6c6c6;
			margin: 30px 0;
			height: 500px;
			h3{
				font-size: 26px;
				text-align: center;
				line-height: 60px;
			}
			.sub_echart{
				width: 100%;
				height: 400px;
				margin: 0 auto;
			}
		}
	}
</style>
<template>
	<div id="ccallotask" class="content_sub">
		<h2 class="tit">CC管理</h2>
		<div class="search">
			时间
			<input class="Wdate" type="text" id="start_time" :placeholder="startime(start_time)" onclick="WdatePicker()" /> 至
			<input class="Wdate" :placeholder="endtime(end_time)" id="end_time" type="text" onclick="WdatePicker()" /> CC姓名
			<input type="text" v-model="ccname" />
			<a href="javascript:;;" class="common_btn" @click="adminsearch">搜索</a>
		</div>
		<div class="echart">
			<h3>近{{daynum}}天数据</h3>
			<div class="sub_echart"  id="echart">
				
			</div>
		</div>
		<table class="table table-center-all" border="1">
			<thead>
				<tr>
					<td width="80">UID</td>
					<td width="124">CC姓名</td>
					<td width="124">外呼数量</td>
					<td width="124">成交量</td>
					<td width="124">转化率</td>
					<td width="124">放弃数量</td>
					<td width="124">放弃率</td>
					<!--<td width="124">任务完成率</td>
					<td width="124">退费数</td>
					<td width="124">退费率</td>-->
					<td width="124">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in cculist">
					<td>{{item.operator_id}}</td>
					<td>{{item.realname}}</td>
					<td>{{item.call_count}}</td>
					<td>{{item.deal_count}}</td>
					<td>{{item.deal_rate}}%</td>
					<td>{{item.gaveup_count}}</td>
					<td>{{item.gaveup_rate}}%</td>
					<td><i  @click="gohistory(item.operator_id)">详情</i></td>
				</tr>
			</tbody>
		</table>
		<!--<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>-->
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	import echarts from "echarts";
	export default {
		name: 'ccallotask',
		data() {
			return {
				daynum:30,
				start_time:new Date(),
				end_time:new Date(),
				ccname:'',
				daynum:'30',
				cculist:'',
				//分页
//				pageCount: '1',
//				nextString: '1',
//				total: '1',
//				thispage:1,
//				pagesize:20,
				data_date: ['1号', '2号', '3号', '4号', '5号', '6号', '7号','8号', '9号', '10号', '11号', '12号', '13号', '14号','15号', '16号', '17号', '18号', '19号', '20号', '21号','22号', '23号', '24号', '25号', '26号', '27号', '28号', '29号', '30号', '31号' ],
//				data_date:''
				
			}
		},
		beforeCreate() {
			var _self = this;
		},
//		components:{
//			trunPage
//		},
		created() {
			var _self=this;
			this.adminsearch();//默认搜索
		},
		methods: {
			startime(start){
				if(start.toString().indexOf('-')>-1){
					return start;
				}
		        return start.getFullYear()+'-'+ (parseInt(start.getMonth()))+'-'+start.getDate()    //获取当前时间
			},
			endtime(start){
				if(start.toString().indexOf('-')>-1){
					return start;
				}
		        return start.getFullYear()+'-'+ (parseInt(start.getMonth())+1)+'-'+start.getDate()    //获取当前时间
			},
//			getList(nextString) {
//				var _self = this;
//				this.nextString = nextString;
//				this.adminsearch()
//			},
			adminsearch(){//搜索
				var _self = this;
				_self.start_time = $('#start_time').val()|| this.startime(this.start_time);
				_self.end_time = $('#end_time').val() || this.endtime(this.end_time);
//				var starT= Date.parse(new Date(start_time));
//				var endT= Date.parse(new Date(end_time));
//				var diff = endT - starT; //相差的毫秒数
//				var day = Math.floor(diff / 1000 / 60 / 60 / 24); //相差天数
//				_self.daynum=day;

//				this.TodoTime(_self.start_time, _self.end_time);

				var data={
					date:[_self.start_time,_self.end_time],
					cc_name:_self.ccname
				};
				liSrv.ccmanage(data,function(res) { 
					_self.cculist=res;
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
			TodoTime(begin, end) { //获取两个时间中间的所有时间
				var ab = begin.split("-");
				var ae = end.split("-");
				var db = new Date();
				db.setFullYear(ab[0], ab[1] - 1, ab[2]);
				var de = new Date();
				de.setFullYear(ae[0], ae[1] - 1, ae[2]);
				var a = [];
				for(var i = 0, temp = db; temp < de; i++) {
					a[i] = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate();;
					temp.setTime(temp.getTime() + 24 * 60 * 60 * 1000);
				}
				a[i] = de.getFullYear() + "-" + (de.getMonth() + 1) + "-" + de.getDate();
				this.data_date=a;
				return this.data_date;
			},
			changeArr(data){
				if(!data)return ;
				var arr = [];
				for(var i in data){
					arr.push(data[i])
				}
				return arr;
			}
			
		},
		mounted() {
			var _self = this;
			var myChart = echarts.init($('#echart').get(0));
			var options = {
				 title: {
			        text: '',
//			        subtext: '纯属虚构'
			    },
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['成交量','外呼数量' ],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.data_date
				},
				yAxis: {
					type: 'value'
				},
				series: [{
						name: '成交量',
						type: 'line',
						//stack: '总量',
//						data: [120, 132, 101, 101, 134, 90, 230, 210,120, 0, 101, 134, 90, 230, 210,0, 132, 101, 134, 90, 230, 0,120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '外呼数量',
						type: 'line',
						//stack: '总量',
						//data:[120, 132, 101, 101, 134, 90, 230, 210,120, 0, 101, 134, 90, 230, 210,0, 132, 101, 134, 90, 230, 0,120, 132, 101, 134, 90, 230, 210]
					}
				]
			};
			liSrv.callccnum(function(res) { 
				options.series[0].data=res.deal_count;
				options.series[1].data=res.call_count;
//				options.series[1].data=_self.changeArr(res.call_count);
				//options.series[0].data=_self.changeArr(res.call_count);
				myChart.setOption(options);
			})
			// 使用刚指定的配置项和数据显示图表。
		}
	}
</script>