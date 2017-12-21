<style lang="less" rel="stylesheet/less" scoped>
	#studentinfo {
		.router-link-active {
			background: #FF8900;
			color: #FFFFFF;
		}
		.header {
			border-bottom: 1px solid #c6c6c6;
			padding-top: 30px;
			margin-bottom: 30px;
			.info {
				margin-bottom: 30px;
				position: relative;
				.common_btn {
					width: 80px;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -18px;
				}
				p {
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
							padding:0 10px;
							display: none;
						}
					}
					span:hover b{
						display: block;
					}
				}
			}
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
			}
		}
	}
</style>
<template>
	<div id="studentinfo" class="content_sub">
		<div class="header">
			<div class="info">
				<p>学生姓名：{{studata.realname}}　{{studata.username}}　{{studata.password}}</p>
				<p>
					<span>顾问：{{studata.operator_name}}<b>手机号：{{studata.operator_tel}}　微信号：{{studata.operator_wechat}}</b></span>
					<span>客服：{{studata.operator_name}}<b>手机号：{{studata.operator_tel}}　微信号：{{studata.operator_wechat}}</b></span>
					<span>班主任：{{studata.admin_name}}<b>手机号：{{studata.admin_tel}}　微信号：{{studata.admin_wechat}}</b></span>
				</p>
				<router-link :to='{name:gopagename,query:{nowid:nowid}}' class="common_btn">返回</router-link>
			</div>
			<ul>
				<li>
					<router-link :to='{name:"sturaisecuorse",query:{id:id}}'>综合提高课</router-link>
				</li>
				<li>
					<router-link :to='{name:"stulivecourse",query:{id:id}}'>直播课</router-link>
				</li>
				<li>
					<router-link :to='{name:"stubasicinfo",query:{id:id}}'>基本信息</router-link>
				</li>
				<li>
					<router-link :to='{name:"stuhistory",query:{id:id}}'>历史纪录</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'studentinfo',
		data() {
			return {
				id:this.$route.query.id,
				nowid:this.$route.query.nowid,
				gopagename:this.$route.query.nowid?"teacherclass":'waitallotstu',
				studata:''
			}
		},
		created() {
			var _self = this;
			this.getstuinfo({student_id:this.id})
		},
		methods: {
			getstuinfo(data){
				var _self = this;
				liSrv.directorStudentGet(data,function(res){
					_self.studata = res.data;
				})
			}
		}
	}
</script>