<style lang="less" rel="stylesheet/less" scoped>
	#login {
		width: 100%;
		height: 100%;
		position: absolute;
		left:0;
		z-index: 999;
		background:#FFFFFF;
		em{
			float: right;
			padding: 10px;
			cursor: pointer;
			color: #999999;
		}
		.login-sub{
			width: 400px;
			height: 300px;
			text-align: center;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -200px;
			margin-top: -200px;
			.QRCode{
				width: 200px;
				margin: 0 auto;
			}
			img{
				text-align: center;
			}
			h3,h4 {
				width: 100%;
				text-align: center;
				margin-bottom: 10px;
			}
			h3{
				font-size: 34px;
			}
		}
		.alert_download{
			width: 500px;
			height: 300px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -250px;
			margin-top: -200px;
			background: #FFFFFF;
			em{
				width: 32px;
				height: 32px;
				position: absolute;
				right:-20px;
				top: -20px;
				img{
					width: 100%;
				}
			}
			.ios,.android{
				float: left;
				width:200px;
				text-align: center;
				margin-top: 60px;
				p{
					font-size: 14px;
					margin-bottom: 10px;
				}
				img{
					width: 120px;
				}
			}
			.ios{
				margin-left: 50px;
			}
		}
		.footicp{width: 100%;text-align: center;position: absolute;bottom: 0;line-height: 50px;color: #979797;}
	}
</style>
<template>
	<div class="login" id="login">
		<em @click='showDownload = true'>下载扫码软件</em>
		<select v-model='huanjing' @change='changehuj' v-if='runtimeEnvironment!="hui" && runtimeEnvironment!="lsp" && runtimeEnvironment!="lss"'>
			<option value="test">测试</option>
			<option value="jin">金</option>
			<option value="mu">木</option>
			<option value="shui">水</option>
			<option value="huo">火</option>
			<option value="tu">土</option>
			<option value="hui">灰度</option>
			<option value="0">线上</option>
		</select>
		<div class="login-sub">
			<h3>Limi Support Platform</h3>
			<h4>{{versionNumber}}</h4>
			<div id="QRCode" class="QRCode" @click='xhr'></div>
		</div>
		<p class="footicp">Copyright © 2016 狸米学习 用户协议 京ICP备15050766号-4 
				<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502033665" style="text-decoration:none; color: #979797;"><img src="../../../../static/img/beian.png">京公网安备 11010502033665号 </a>
			</p>
		<div class="alert_download" v-if = 'showDownload'>
			<em  @click='showDownload = false'><img src="../../../assets/close.png" alt="" /></em>
			<div class="ios">
				<p>ios</p>
				<img src="../../../assets/ios.jpg" alt="" />
			</div>
			<div class="android">
				<p>Android</p>
				<img src="../../../assets/android.jpg" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'login',
		data() {
			return {
				qrcode: '',
				qrIsCode:null,
				showDownload:false,
				versionNumber:common.versionNumber,
				huanjing:'test'
			}
		},
		computed:{
			runtimeEnvironment(){
				return common.runtimeEnvironment;
			}
		},
		methods: {
			changehuj(){
				this.getApilist({test:this.huanjing})
			},
			getApilist(data){
				var _self = this;
				liSrv.getAPIList(data,function(res){
					console.log(res)
					_self.xhr();
				})
				var getQrCode = setTimeout(function(){
					$("#QRCode img").attr('src','/static/img/Refresh.png');
					$("#QRCode img").css('width','100%');
					clearInterval(_self.qrIsCode);
				},30000);
			},
			xhr() {
				var _self = this;
				clearInterval(_self.qrIsCode);
				liSrv.getQrCode(function(res) {
					_self.qrcode = res;
					$("#QRCode").html("");
					var qrcode = new QRCode('QRCode', {
						text: res,
						width:200,
						height:200
					});	
					$("#QRCode").attr('title',' ')
					_self.qrIsCode = setInterval(_self.qrCodeIsLogin,2000)
				})
			},
			qrCodeIsLogin() {
				var _self = this;
				liSrv.qrCodeIsLogin(_self.qrcode,function(res) {
					common.setS('uid',res.uid);
					common.setS('COOK',res.token);
					liSrv.getmenu(function(obj){
						_self.$root.eventHub.$emit('menuok',obj);
						common.setS('menuData',obj);
					},function(res){
						common.setS('COOK','');
						common.setS('uid','');
						if(res.code == 'E_NOPRIV'){
							//alert('您对本系统无任何操作权限');
							_self.$router.push('/');
							return ;
						}
					})
					liSrv.getTeacherOne(res.uid,function(data){
						common.setS('avatar',data.data.avatar_url);
						common.setS('username',data.data.realname);
						common.setS('store_id',data.data.store_id);
						_self.$root.eventHub.$emit('loginok',data.data);
						_self.$router.push('/userinfo');
						clearInterval(_self.qrIsCode);
					},function(res){
						common.setS('COOK','');
						common.setS('uid','');
						if(res.code == 'E_NOPRIV'){
							alert('您对本系统无任何操作权限');
							_self.$router.push('/');
							return ;
						}
					})
				},function(err){
				})
			}
		},
		beforeCreate() {
			if(common.getS('COOK')){
				window.history.go(-1);
				return ;
			};
		},
		created() {
			this.getApilist({test:'test'})
		}
	}
</script>