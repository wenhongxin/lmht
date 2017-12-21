<style lang="less" rel="stylesheet/less" scoped>
	#sendplan {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 999;
		background: #FFFFFF;
		.subsendplan {
			margin: 0 auto;
			background: #edeef1;
			width: 1080px;
			.header {
				width: 100%;
				height: 205px;
				background: url(../../../../assets/sendplanheader.png);
				position: relative;
				dl {
					position: absolute;
					top: 50px;
					left: 50px;
					display: flex;
					dt {
						width: 100px;
						height: 100px;
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					dd {
						margin-left: 20px;
						h2 {
							font-family: '﻿PingFang-SC-Medium';
							font-size: 44px;
							font-weight: normal;
						}
						p {
							font-family: '﻿PingFang-SC-Light';
							font-size: 32px;
						}
					}
				}
			}
			.section {
				font-family: '﻿PingFang-SC-Regular';
				width: 982px;
				height: 100%;
				margin: 0 auto;
				.sec-top {
					box-shadow: 1px 1.7px 4px 0px rgba(11, 3, 6, 0.19);
					margin: 50px 0;
					width: 100%;
					min-height: 234px;
					display: flex;
					background: #FFFFFF;
					.learncont,
					.learnpj {
						box-sizing: border-box;
						width: 490px;
						min-height: 234px;
						height: 100%;
						h2 {
							padding: 20px;
							font-size: 38px;
							font-weight: normal;
						}
						p {
							word-wrap: break-word;
							padding: 0 20px 20px 20px;
							font-size: 24px;
						}
					}
					.learncont {
						border-right: 2px solid #edeef1;
					}
				}
				.sendplaneveryplan {
					margin: 30px 0;
					width: 100%;
					min-height: 282px;
					background: #FFFFFF;
					box-shadow: 1px 1.7px 4px 0px rgba(11, 3, 6, 0.19);
					.sendplaneveryplan-top {
						display: flex;
						height: 208px;
						.i-active {
							background: #ff7928 !important;
							color: #FFFFFF;
						}
						.s-left {
							padding: 20px 0 0 20px;
							flex: 1;
							h2 {
								font-size: 36px;
								font-weight: normal;
								margin-bottom: 15px;
							}
							span {
								font-size: 22px;
								color: #989898;
							}
							p {
								margin-top: 30px;
								font-size: 24px;
								i {
									display: inline-block;
									background: #edeef1;
									padding: 5px 15px;
									border-radius: 20px;
									&:first-child {
										margin-right: 50px;
									}
								}
								.dz-active {
									background: #ff7928;
									color: #FFFFFF;
								}
							}
						}
						.flexy {
							display: flex;
							align-items: center;
						}
						.s-center {
							width: 350px;
							margin: 0 40px;
							font-size: 32px;
							padding-top: 30px;
							li {
								i {
									margin-top: 20px;
									float: left;
									width: 50px;
									height: 50px;
									border-radius: 25px;
									text-align: center;
									line-height: 50px;
									background: #ffffff;
									box-shadow: 1px 1.7px 4px 0px rgba(11, 3, 6, 0.19);
									margin-right: 20px;
								}
							}
						}
						.s-right {
							width: 200px;
							text-align: center;
							font-family: '﻿PingFang-SC-Bold';
							h2 {
								font-size: 54px;
								font-weight: normal;
								margin-top: 60px;
							}
							p {
								font-size: 46px;
								color: #989898;
							}
							.p-active {
								color: #ff7928;
							}
						}
					}
					.remark {
						min-height: 74px;
						padding: 10px;
						box-sizing: border-box;
						border-top: 1px solid #edeef1;
						line-height: 24px;
						font-size: 24px;
					}
				}
			}
			.section1 {
				font-family: '﻿PingFang-SC-Regular';
				width: 982px;
				height: 100%;
				margin: 0 auto;
				.s1-top {
					width: 100%;
					height: auto;
					min-height: 80px;
					background: #FFFFFF;
					margin: 20px 0;
					box-shadow: 1px 1.7px 4px 0px rgba(11, 3, 6, 0.19);
					p {
						box-sizing: border-box;
						font-size: 32px;
						padding: 20px 20px;
						width: 100%;
						height: 100%;
					}
				}
				ul {
					margin-bottom: 40px;
					li {
						font-size: 32px;
						width: 100%;
						height: 80px;
						line-height: 80px;
						background-color: rgba(255, 255, 255, 1);
						box-shadow: 1px 1.7px 4px 0px rgba(11, 3, 6, 0.19);
						border-radius: 4px 4px 4px 4px;
						padding-left: 30px;
						box-sizing: border-box;
						margin-bottom: 10px;
						color: #333333;
						span,
						i,
						em {
							color: #666666;
							display: inline-block;
							width: 200px;
							height: 80px;
							float: left;
						}
						i {
							width: 100px;
							box-sizing: border-box;
							color: #979797;
							text-align: center;
						}
						em {
							width: auto;
							margin-left: 80px;
							max-width: 570px;
							overflow: hidden;
							color: #000000;
						}
						&:first-child {
							font-size: 42px;
							background: none;
							box-shadow: none;
							i {
								color: #333333;
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="sendplan" id="sendplan">
		<div class="subsendplan">
			<div class="header">
				<dl>
					<dt><img :src="avatar" alt="" /></dt>
					<dd>
						<h2>{{taskdata.real_name}}</h2>
						<p>{{taskdata.prov_name}}{{taskdata.city_name}}{{taskdata.district_name}}{{taskdata.school_name}}</p>
					</dd>
				</dl>
			</div>
			<div class="section" v-if='type==2'>
				<div class="sec-top">
					<div class="learncont">
						<h2>学习内容</h2>
						<p>{{taskdata.content}}</p>
					</div>
					<div class="learnpj">
						<h2>周评</h2>
						<p>{{taskdata.week_commnet}}</p>
					</div>
				</div>
				<div class="sendplaneveryplan" v-for='item in taskdata.relationInfo' v-if='item.status==1'>
					<div class="sendplaneveryplan-top">
						<div class="s-left">
							<h2>星期{{item.week}}   {{item.task_date}}</h2>
							<span>{{item.material_start}}-{{item.material_end}}</span>
							<p><i>{{item.consume_time}}分钟</i><i :class='{"i-active":item.progress_id=="2"}'>{{item.progress_name}}</i></p>
						</div>
						<ul class="s-center" :class='{"flexy":parseInt(taskdata.question_num)==5}'>
							<li>
								<i v-for='i in parseInt(taskdata.question_num)' v-text='item["score_"+i]' :class='{"i-active":parseInt(item["score_"+i])}'></i>
							</li>
						</ul>
						<div class="s-right">
							<h2>{{item.total_score}}分</h2>
							<p :class='{"p-active":item.rating!="A"&&item.rating!="A+"&&item.rating!="A-"}'>{{item.rating}}</p>
						</div>
					</div>
					<p class="remark">备注：{{item.remark}}</p>
				</div>
			</div>
			<div class="section1" v-if='type==1'>
				<div class="s1-top">
					<p>学习内容:{{taskdata.content}}</p>
				</div>
				<ul>
					<li><span>日期</span><i>星期</i><em>编号</em></li>
					<li v-for='item in taskdata.relationInfo' v-if='item.status==1'><span>{{item.task_date}}</span><i>{{item.week}}</i><em>{{item.material_start}}-{{item.material_end}}</em></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'sendplan',
		data() {
			return {
				type: this.$route.query.type,
				stuid: this.$route.query.stuid,
				taskid: this.$route.query.taskid,
				taskdata: '',
				avatar:''
			}
		},
		methods: {},
		beforeCreate() {
			if(!common.getS('COOK')) {
				this.$router.push('/')
			};
		},
		created() {
			var data = {
					task_id: this.taskid,
					student_id: this.stuid
				},
				_self = this;
			liSrv.directorGetTaskInfo(data, function(res) {
				_self.taskdata = res.data;
				if(!res.data.avatar) return;
				if(res.data.avatar.length==3 && res.data.avatar.charAt(0)==='t'){
					_self.avatar = '/static/user_img/'+res.data.avatar+'.png';
					return ;
				}
				_self.avatar = res.data.avatar;
			})
		},
	}
</script>