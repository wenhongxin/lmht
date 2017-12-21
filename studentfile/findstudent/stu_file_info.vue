<style lang="less" rel="stylesheet/less" scoped>
	#stu_file_info {
		.tit {
			span {
				font-weight: normal;
				font-size: 16px;
			}
			i {
				float: right;
				font-weight: normal;
				font-size: 16px;
			}
		}
		.jbinfo {
			width: 100%;
			height: auto;
			float: left;
			h4 {
				border: none;
			}
		}
		.download_sj {
			width: 310px;
			height: 147px;
			float: right;
			background: #E0E0E0;
			margin-top: 23px;
			li {
				height: 36px;
				line-height: 36px;
				border-bottom: 1px solid #FFFFFF;
			}
			i,
			span {
				display: inline-block;
			}
			i {
				width: 77px;
				text-align: center;
			}
			span {
				width: 115px;
				padding-left: 10px;
				box-sizing: border-box;
				border-left: 1px solid #FFFFFF;
				a {
					padding-right: 12px;
					color: #385eb5;
				}
			}
			.download_tit {
				background: #EFEFEF;
			}
		}
		p {
			margin-bottom: 15px;
			line-height: 26px;
			span {
				margin-right: 20px;
				position: relative;
				b {
					/*font-weight: normal;*/
					z-index: 999;
					position: absolute;
					width: 320px;
					top: 17px;
					left: 0;
					background: #FFFFFF;
					border: 1px solid #c6c6c6;
					border-radius: 3px;
					padding: 0 10px;
					display: none;
				}
			}
			span:hover b {
				display: block;
			}
		}
		h4 {
			padding: 14px 0 17px 0;
			font-size: 16px;
			border-top: 1px solid #c6c6c6;
			a {
				font-size: 14px;
				font-weight: normal;
				padding-left: 20px;
				color: dodgerblue;
			}
		}
		.stufilenav {
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
					/*background: #EFEFEF;*/
					line-height: 36px;
					width: 100px;
					text-align: center;
					border-left: 1px solid #c6c6c6;
					a {
						display: block;
					}
				}
				.router-link-active {
					background: #FF8900;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
<template>
	<div id="stu_file_info" class="content_sub">
		<h2 class="tit">{{stuInfo.realname}} - <span>{{stuInfo.username}}</span><i v-if='stuInfo.student_type==1'>学习密码：{{stuInfo.password}}</i></h2>
		<div class="jbinfo">
			<h4>基本信息<router-link :to='{name:"updata_file_info",query:{id:stu_id}}'>修改</router-link></h4>
			<p>
				<span>学生姓名：</span><span>{{stuInfo.realname}} - {{stuInfo.username}}</span><br />
				<span>学生学校：</span><span>{{stuInfo.school_name}}</span>
			</p>
			<p>
				<span>家长：</span><span>{{stuInfo.relationship}} {{stuInfo.jiazhang_name}}</span><br />
				<span>家庭收件地址：</span><span>{{stuInfo.address}}</span>
			</p>
			<p>
				<span>顾问：{{stuInfo.cc_name}}<b>手机号：{{stuInfo.cc_phone}}　微信号：{{stuInfo.cc_wechat}}</b></span>
				<span>客服：{{stuInfo.cc_name}}<b>手机号：{{stuInfo.cc_phone}}　微信号：{{stuInfo.cc_wechat}}</b></span>
				<span>班主任：{{stuInfo.admin_name}}<b>手机号：{{stuInfo.admin_phone}} 微信号：{{stuInfo.admin_wechat}}</b></span>
			</p>
		</div>
		<div class="clear"></div>
		<div class="stufilenav">
			<ul>
				<li>
					<router-link :to='{name:"stu_file_raisecuorse",query:{id:stu_id}}'>综合提高课</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_file_livecourse",query:{id:stu_id,num:"1"}}'>直播课</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_file_equipment",query:{id:stu_id}}'>设备信息</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_file_basicinfo",query:{id:stu_id}}'>基本信息</router-link>
				</li>
				<li>
					<router-link :to='{name:"stu_file_history",query:{id:stu_id,type:"1"}}'>交易记录</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
		<!--<ol class="download_sj">
			<li class="download_tit"><i></i><span>春季</span><span>秋季</span></li>
			<li><i>一卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
			<li><i>二卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
			<li><i>三卷:</i><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span><span><a href="javascript:;;">二</a><a href="javascript:;;">三</a><a href="javascript:;;">四</a><a href="javascript:;;">五</a></span></li>
		</ol>-->
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'stu_file_info',
		data() {
			return {
				stuInfo: common.getS('stuInfo'),
				stu_id: common.getS('stuInfo').student_id,
			}
		},
		methods: {
		}
	}
</script>