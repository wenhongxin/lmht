<style lang="less" rel="stylesheet/less" scoped>
	#app {
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: "Microsoft YaHei", "微软雅黑", PingFangSC-Regular, sans-serif, "黑体", SimHei;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		.left_list {
			::-webkit-scrollbar {
				width: 0px
			}
			width: 70px;
			height: 100%;
			min-height: 500px;
			float: left;
			display: flex;
			flex-direction: column;
			background: #333333;
			.lss {
				width: 100%;
				height: 50px;
				background: #4a4a4a;
				text-align: center;
				color: #FFFFFF;
				b {
					display: block;
					padding-top: 5px;
					font-size: 16px;
				}
				span {
					font-size: 12px;
				}
			}
			ul {
				background: #333333;
				width: 70px;
				flex: 1;
				overflow-y: auto;
				li {
					width: 100%;
					height: 70px;
					margin-bottom: 4px;
					background-size: 26px 26px;
					text-align: center;
					line-height: 70px;
					a {
						display: block;
						width: 100%;
						height: 100%;
					}
					img {
						width: 32px;
					}
				}
				.router-link-active {
					background: #8000ff;
				}
			}
			.userinfo {
				height: 100px;
				width: 70px;
				text-align: center;
				padding-top: 20px;
				img {
					border-radius: 50%;
					width: 40px;
					height: 40px;
				}
				i {
					display: block;
					text-align: center;
					width: 100%;
					color: #FFFFFF;
					height: 12px;
					margin-top: 5px;
				}
			}
		}
	}
</style>
<template>
  <div @click='clickPage' id="app" v-if='isChrome'>
    <div class="left_list" v-show='isleftlist'>
    	<p class="lss">
    		<b>LSP</b>
    		<span>v{{versionNumber}}</span>
    	</p>
    	<ul>
    		<li><router-link to='/studentfile'><img src="./assets/stufile.png" alt="" /></router-link></li>
    		<li><router-link to="/operate"><img src="./assets/a.png" alt="" /></router-link></li>
    		<li><router-link to='/CC'><img src="./assets/cc.png" alt="" /></router-link></li>
    		<li><router-link to='/theStore'><img src="./assets/b.png" alt="" /></router-link></li>
    		<li><router-link to='/research'><img src="./assets/c.png" alt="" /></router-link></li>
    		<li><router-link to='/headteacher'><img src="./assets/bzr.png" alt="" /></router-link></li>
    		<li><router-link to='/synthesis'><img src="./assets/d.png" alt="" /></router-link></li>
    	</ul>
    	<p class="userinfo" v-if='username'>
    		<router-link :to="this.$route.name!='login'?'/userinfo':'/login'">
    			<img :src="avatar" alt="" />
    			<i>{{username}}</i>
    		</router-link>
    	</p>
    </div>
    <div class="right_cont">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
	import Vue from "vue";
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'app',
		data() {
			return {
				username: common.getS('username'),
				avatar: common.getS('avatar'),
				isChrome: false,
				zdExit: null,
				versionNumber: common.versionNumber,
				menuData: common.getS('menuData'),
				isleftlist: false
			}
		},
		beforeCreate() {
			var _self = this;
			//	liSrv.getAPIList(function(res){
			//			console.log(res) 
			//		})
			this.$root.eventHub.$on('loginok', function(res) {
				_self.username = res.realname;
				_self.avatar = res.avatar_url;
			});
			this.$root.eventHub.$on('menuok', function(res) {
				_self.menuData = res;
				//console.log(res)
			});
		},
		created() {
			var isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			if(isChrome && !isEdge) {
				this.isChrome = true;
			} else {
				alert("请用谷歌浏览器打开");
			}
		},
		methods: {
			zdExitFn() {
				var _self = this;
				clearInterval(this.zdExit);
				_self.zdExit = setTimeout(function() {
					common.clearS();
					_self.$router.push('/')
				}, 1800000)
			},
			clickPage() {
				if(this.$route.name == 'login') return;
				clearInterval(this.zdExit);
				this.zdExitFn()
			}
		},
		watch: {
			'$route' (to, from) {
				var routeName = this.$route.name;
				if(routeName == 'login') return;
				if(routeName != 'class_charge_prove' && routeName != 'class_refund_prove' && routeName != 'ipad_charge_prove' && routeName != 'ipad_refund_prove') {
					this.isleftlist = true;
				};
				if(to.name == 'operate' && this.menuData.operate) {
					this.$router.push('/' + this.menuData.operate[0]['url']);
				}
				if(to.name == 'studentfile' && this.menuData.studentfile) {
					this.$router.push('/' + this.menuData.studentfile[0]['url']);
				}
				if(to.name == 'research' && this.menuData.teachplan) {
					this.$router.push('/' + this.menuData.teachplan[0]['url']);
				}
				if(to.name == 'theStore' && this.menuData.store) {
					this.$router.push('/' + this.menuData.store[0]['url']);
				}
				if(to.name == 'synthesis' && this.menuData.role) {
					this.$router.push('/' + this.menuData.role[0]['url']);
				}
				if(to.name == 'CC' && this.menuData.ccsystem) {
					this.$router.push('/' + this.menuData.ccsystem[0]['url']);
				}
				if(to.name == 'headteacher' && this.menuData.classdirector) {
					this.$router.push('/' + this.menuData.classdirector[0]['url']);
				}
				if(to.name == 'login' && common.getS('COOK')) {
					this.$router.push(from.path);
				}

				this.zdExitFn();
			}
		},
		mounted() {
			var _self = this;
			this.$nextTick(function() {
				var routeName = _self.$route.name;
				if(routeName == 'login') return;
				_self.zdExitFn();
				if(routeName != 'class_charge_prove' && routeName != 'class_refund_prove' && routeName != 'ipad_charge_prove' && routeName != 'ipad_refund_prove' && routeName != 'null' && routeName != null) {
					$(".left_list").show()
				};
			})
		}
	}
	Vue.directive('tableDn', {
		inserted(el, binding) {
			tableDnFn(el, binding)
		},
		componentUpdated(el, binding) {
			tableDnFn(el, binding)
		}
	});
	Vue.directive('disable', {
		inserted(el, binding) {
			if(binding.value != 'operate' && binding.value != 'synthesis') {
				//console.log(binding.value)
				$(el).find('input').attr('disabled', 'disabled');
				$(el).find('select').attr('disabled', 'disabled');
				$(el).find('textarea').attr('disabled', 'disabled');
			}
		}
	});
	Vue.directive('clickcopy', {
		inserted(el, binding) {
			var obj = binding.value;
			var num;
			el.oncontextmenu = function(e) {
				e.preventDefault();
				$('.menu').remove();
				var str = '<ul class="menu"><li class="copy">复制</li><li class="zt">粘贴快速问答</li></ul>';
				$(el).parents('tbody').append($(str));
				if(obj.type==1){
					num=1;
				}else{
					num=0;
				}
				$(".menu li").eq(num).css({
					color:"#CCC",
					pointerEvents: 'none',
					cursor: 'default'
				})
				$(".menu").css({
					left: e.clientX  + 'px',
					top: e.clientY + 'px'
				})
				$('.menu li').on('click', function(e) {
					e.stopPropagation();
					//console.log(obj)
					if(obj.type==1){
						var copyData = {
							copy_id:obj.copy_id,
							txt:obj.txt
						}
						common.setS('copyData',copyData)
					}else{
						obj.fn(obj.paste_id,obj.question_sort)
					}
					$(".menu").remove();
					
				})
			}
			$(document).on('click', function() {
				$('.menu').remove();
			})
		}
	});
	Vue.filter('time', function(value) {
		if(!value) {
			return ''
		}
		return value.split(" ")[0]
	})
	Vue.filter('YMS', function(value) {
		if(!value) {
			return ''
		}
		return value.getFullYear() + '年' + (value.getMonth() + 1) + '月' + value.getDate() + '日';

	})

	function tableDnFn(el, binding) {
		var idx;
		$(el).tableDnD({
			onDragClass: 'highlight',
			scrollAmount: 10,
			onDragStart: function(table, row) {
				idx = $(row).prev().data('index');
			},
			onDrop: function(table, row) {
				if(idx == $(row).prev().data('index')) return;
				binding.value(table, row)
			}
		});
	}
</script>