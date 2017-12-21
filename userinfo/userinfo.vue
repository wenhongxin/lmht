<style lang="less" rel="stylesheet/less" scoped>
#userinfo{
	.tit{
		 span{
		 	margin-top: 20px;
		 	font-size: 12px;
		 	font-weight: normal;
		 	float: right;
		 	width: 62px;
		 	height: 35px;
		 	background: #ff8900;
		 	color: #ffe8cd;
		 	text-align: center;
		 	line-height: 35px;
		 	cursor: pointer;
		 }
	}
	.userinfo{
			margin-top: 20px;
  		width: 70px;
  		text-align: center;
  		 img{
  		 	width: 40px;
  		 	height: 40px;
  		 	border-radius: 50%;
  		 }
			i{
				display: block;
				text-align: center;
				width: 100%;
				height: 12px;
				margin-top: 5px;
			}
  	}
  	.iframe{
  		width: 100%;
  		height: 100%;
  	}
}
</style>
<template>
  <div id="userinfo" class="content_sub" >
  	<h2 class="tit">我的账号  <span @click='exitLogin'>退出</span></h2>
   	<p class="userinfo">
			<img :src="avatar" alt="" />
			<i>{{username}}</i>
    </p>
  </div>
</template>

<script>
import common from 'common';
export default {
  name: 'ipad_h_rent',
  data(){
  	return {
  		username:common.getS('username'),
  		avatar:common.getS('avatar')
  	}
  },
  methods:{
  	exitLogin(){
  		common.clearS();
  		window.location.reload()
  		this.$router.push('/');
  	},
  },
  created(){
  	var _self = this;
  },
  beforeCreate(){
  	if(!common.getS('COOK')){
  		this.$router.push('/')
  	}
  }
}
</script>

