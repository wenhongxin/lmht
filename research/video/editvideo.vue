<style lang="less" rel="stylesheet/less" scoped>
	#editvideo {
		.wrap {
			margin: 20px 0 30px 30px;
			h2 {
				margin: 10px 0;
				font-size: 16px;
			}
		}
		.video {
			width: 930px;
			height: 600px
		}
		.v_btn {
			width: 924px;
			height: 530px
		}
		.v_btn {
			width: 930px;
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
</style>
<template>
	<div id="editvideo" class="content_sub">
		<h2 class="tit">班级管理</h2>
		<div class="wrap">
			<h2>鸡鸭同笼  2017-11-11</h2>
			<div class="video">
				<video height="520"  @click="pause" v-timeupdate='timeupdateFn' id="video-active" controls="controls" :src="playbackUrl"></video>
			</div>
			<div class="v_btn">
				<a class="common_btn tj" href='javascript:;;' @click='videostart(1)'>起始</a>
				<a class="common_btn tj" href='javascript:;;' @click='addlabe'>加标签 </a>
				<a class="common_btn tj" href='javascript:;;' @click='videostart(2)'>结束</a>
				<a class="common_btn tj fr" href='javascript:;;' @click='addTag'>保存</a>
			</div>
			<ul class="video-cont">
				<li v-for="item in videolist" @click='jumpplay(item.time)'><span>{{sec_to_time(item.time)}} </span><span v-dbchange='videolistFn' v-html='item.tag'></span></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'editvideo',
		data() {
			return {
				videoname: "",
				currentTime: '0',
				duration: '',
				videolist: [],
				lessonid:this.$route.query.id,
				playbackUrl:null,
				tit:this.$route.query.name,
				realBeginTime : null
			}
		},
		created() {
			var _self = this;
			liSrv.getClassOne(this.lessonid, function(res) {
				var playback_url_tag = JSON.parse(res.playback_url_tag);
				_self.videolist =  playback_url_tag ? playback_url_tag.tag_list : [];
				_self.playbackTag = res.playback_url_tag;
				_self.playbackUrl = res.playback_url;
			})
		},
		methods: {
			pause() {
				if(event.target.paused) {
					event.target.play();
				} else {
					event.target.pause();
				}
			},
			jumpplay(time){//跳转指定时间
				$("#video-active").get(0).currentTime=time;
        $("#video-active").get(0).play();
			},
			compare(property) { //数组排序
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			},
			sec_to_time(s) { //转换时间格式
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
			},
			videolistFn(val, ind) { //更改标签
				if(val==='delli'){
					this.videolist.splice(ind,1);
					this.videolist.sort(this.compare('time'))
					return ;
				}
				this.$set(this.videolist[ind], 'tag', val);
				this.videolist.sort(this.compare('time'))
			},
			timeupdateFn(currentTime) { //获取播放时长;
				this.currentTime = currentTime;
			},
			videostart(type) { //点击起始
				$('#video-active').get(0).pause();
				var _self = this,
					flag = true;
				var name = type == '1' ? '起始' : '结束';
				this.videolist.forEach(function(v, i) {
					if(v.tag === name) {
						_self.$set(_self.videolist[i], 'time', _self.currentTime);
						flag = false;
					}
				})
				if(flag) {
					var data = {
						time: this.currentTime,
						tag: name
					}
					this.videolist.push(data)
				}
				this.videolist.sort(this.compare('time'));
			},
			addlabe() {//添加标签
				$('#video-active').get(0).pause();
				var str ='<input type="text" class="viput" /><i class="viddel"></i>';
				var _self = this,flag= true;
				var data = {
					time: this.currentTime,
					tag:str
				}
//				console.log(_self.videolist)
				this.videolist.forEach(function(v,i){
					if(v.tag === str){
						_self.$set(_self.videolist[i], 'time', _self.currentTime);
						flag = false;
					}
				})
				if(flag){
					_self.videolist.unshift(data)
				}
				setTimeout(function(){
					$(".video-cont .viput").parent().trigger("dblclick",'add');
				},500)
				
			},
			addTag(){
				//if(this.videolist.length<=0)return ;
				var _self = this;
				var str ='<input type="text" class="viput" /><i class="viddel"></i>';
				this.videolist.forEach(function(v,i){
					if(v.tag === str){
						_self.videolist.splice(i,1);
					}
				})
				var total_time = $('#video-active').get(0).duration;
				var tagData = {
						tag_list:this.videolist,
						total_time:total_time
					}
				var sendData = {
					lesson_id:this.lessonid,
					playback_url_tag:JSON.stringify(tagData)
				};
				//console.log(sendData)
				liSrv.classCourseEdit(sendData,function(res){
					_self.$router.push({path:"seevideo",query:{id:_self.lessonid,name:_self.tit}})
				})
			}
		},
		directives: {
			dbchange: {
				inserted(el, binding,vnode) { //双击添加标签
					var Fn = binding.value;
					$(el).dblclick(function(e,type) {
						e.stopPropagation();
						var str;
						if(type != 'add'){
							var oldval = $(this).text(),_self = this;;
								if(oldval === '起始' || oldval === '结束'){
									str = '<span class="delspan">'+oldval+'</span><i class="viddel"></i>';
								}else{
									str = '<input type="text" class="viput" /><i class="viddel"></i>';
								}
								$(_self).html(str);
								$(_self).find(".viput").val(oldval);
						}
						$('.viput').focus();
						$('.viddel').on('mousedown', function(e) {
							e.stopPropagation();
							var ind = $(this).parents('li').index();
							Fn('delli',ind);
						})
						$('.viput').bind('blur', function(e) {
								var val = $.trim($('.viput').val());
								if(val == '') {
									Fn('delli',0);
									//alert('不能为空');
									return;
								};
								if(val.length > 15) {
									alert('最多输入15个字');
									return;
								}
								if(oldval === val) {
									$('.viput').parent().html(val);
									return;
								}
								var index = $('.viput').parents('li').index();
								Fn(val, index);
						})
					});
				}
			},
			timeupdate: { //获取播放时长
				inserted(el, binding) {
					$(el).on("timeupdate", function(event) {
						binding.value(parseInt(this.currentTime))
					});
				}
			}
		},
	}
</script>