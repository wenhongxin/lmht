<style lang="less" rel="stylesheet/less" scoped>
	#seevideo {
		h3{
			margin: 30px 0;
			a{
				padding-left: 20px;
			}
		}
		.wrap {
			margin: 0 0 30px 30px;
			h2 {
				margin: 10px 0;
				font-size: 16px;
			}
		}
		.video {
			margin: 50px 0;
			width:930px;
			.v_btn {
				width: 100%;
				height: 28px;
				margin: 10px 0;
				.tj {
					display: inline-block;
					height: 28px;
					line-height: 28px;
					width: 90px;
					margin-right: 10px;
				}
				.fr {
					float: right;
				}
			}
		}
		.cont {
			border-left: 3px solid #999;
			padding: 10px 0;
			li {
				padding-left: 20px;
				line-height: 28px;
				cursor: pointer;
			}
			li:hover {
				background: #fafafa;
			}
		}
		.tit{
			margin-bottom: 20px;
		}
	}
</style>
<template>
	<div id="seevideo" class="content_sub">
		<h2 class="tit">
			{{classname}}
			<a href="javascript:;;" class="common_btn" v-if='status==1' @click='checkvideo'>生成回放</a>
		</h2>
		<p>课时ID:{{lessonid}}　课时名称：{{tit}}</p>
		<h3 v-if = '!playbackUrl'><span>{{statushit}}</span><a href="javascript:;;" v-if='status==2' @click="checkstatus" >刷新</a></h3>
		<div class="wrap" v-if = 'playbackUrl'>
			<div class="video">
				<h2>{{tit}}  {{realBeginTime}}</h2>
				<video height="520" @click="pause" id="video-active" :src="playbackUrl"></video>
				<div class="v_btn">
					<router-link class="common_btn tj fr" :to='{path:"editvideo",query:{id:lessonid,name:tit}}'>编辑</router-link>
				</div>
			</div>
			<ul class="cont">
				<li v-for="item in videolist" @click='jumpplay(item.time)'>{{sec_to_time(item.time)}}　{{item.tag}}</li>
			</ul>
			<div class="video" v-for = 'url in historyUrls'>
				<h2>{{tit}} {{url.real_begin_time}}</h2>
				<video height="520" @click="pause" :src="url.playback_url"></video>
			</div>
		</div>
	</div>
</template>
<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'seevideo',
		data() {
			return {
				lessonid:this.$route.query.id,
				classname:this.$route.query.class_name,
				historyUrls:null,
				playbackUrl:null,
				videolist:null,
				tit:this.$route.query.name,
				realBeginTime : null,
				status:'',
				statushit:'暂无视频'
			}
		},
		created() {
			this.checkstatus();
		},
		methods: {
			checkstatus(){
				var _self = this;
				liSrv.teacherCheckVideo(this.lessonid,function(res){
					_self.status = res.status;
					if(res.status==2){
						_self.statushit = '视频生成中，已过去'+res.timeuse+'，请稍后刷新查看';
						//alert('视频生成中，请稍后刷新查看');
					}else if(res.status===3){
						_self.statushit = '视频生成超时，请联系技术人员';
						//alert('视频生成超时，请联系技术人员');
					}else if(res.status===4){
						_self.getvideourl();
					}
				})
			},
			getvideourl(){
				var _self = this;
				liSrv.getClassOne(this.lessonid, function(res) {
					var playback_url_tag = JSON.parse(res.playback_url_tag);
					_self.videolist =  playback_url_tag ? playback_url_tag.tag_list : [];
					_self.playbackUrl = res.playback_url;
					_self.historyUrls = res.history_urls;
					_self.realBeginTime = res.begin_time;
				})
			},
			checkvideo(){
				var _self = this;
				if(this.status===1){
					var r = window.confirm("还没有下课，是否强制下课生成回放？");
					if(r){
						liSrv.teacherEndLessonHand(_self.lessonid,function(res){
							alert('正在生成请稍后刷新查看');
							_self.checkstatus();
						},function(res){
							if(res.code==='E_NOT_DATA'){
								alert('此班暂无视频！！！');
								return ;
							}
						})
					}
				}
			},
			pause() {
				if(event.target.paused) {
					event.target.play();
				} else {
					event.target.pause();
				}
			},
			jumpplay(time){
				$("#video-active").get(0).currentTime=time;
        $("#video-active").get(0).play();
			},
			sec_to_time(s){ //转换时间格式
				var t = '';
				if(s > -1) {
					var hour = Math.floor(s / 3600);
					var min = Math.floor(s / 60) % 60;
					var sec = s % 60;
					if(hour < 10) {
						t = '0' + hour + ":";
					} else {
						t = hour + ":";
					}
					if(min < 10) {
						t += "0";
					}
					t += min + ":";
					if(sec < 10) {
						t += "0";
					}
					t += sec.toFixed(0);
				}
				return t;
			}
		}
	}
</script>