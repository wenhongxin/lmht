<style lang="less" rel="stylesheet/less" scoped>
#exit_ipad_ok{
	.jbinfo{
		height: auto;
		margin-bottom:10px;
	}
	.cheap{
		color: #000000;
	}
	a{
		margin-top: 20px;
		width: 115px;
	}
	.table{
			margin-top: 0;
		}
}
</style>
<template>
  <div id="exit_ipad_ok" class="content_sub">
   	<h2 class="tit">需退款{{money}}元</h2>
   	<div class="ok_img">
   		<img src="../../../../../assets/okimg.png"/><b>退租成功</b>
   	</div>
   	<commstuinfo istit='true' isparent='true'></commstuinfo>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="130">退款金额</td>
					<td>经办人</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="sign_up_time">{{money}}</td>
					<td class="order">{{username}}</td>
				</tr>
			</tbody>
		</table>
		<a href='/studentfile/stu_ipad_refund_prove' @click='backstuinfo' target="_blank" class='common_btn'>打印退款协议</a>
  </div>
</template>

<script>
import common from 'common';
import commstuinfo from '../comm/commstuinfo';
import liSrv from 'liSrv';
export default {
  name: 'exit_ipad_ok',
  data(){
  	return{
  		stuInfo:common.getS('stuInfo'),
  		username:common.getS('username'),
  		money : this.$route.query.money,
  		stu_id:common.getS('stuInfo').student_id
  	}
  },
  components:{
		commstuinfo
	},
  methods:{
  	backstuinfo(){
  		var _self=this;
  		this.$router.push({
			name: "stu_file_equipment",
			query: {
				id: _self.stu_id
			}
		})
  	}
  }
}
</script>
