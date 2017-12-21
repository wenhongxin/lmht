<style lang="less" rel="stylesheet/less" scoped>
#findstudent{
	h3{
		font-weight: normal;
		font-size: 12px;
		margin: 22px 0 5px 0;
	}
	input{
		width: 288px;
		height: 34px;
		border: 1px solid #95989a;
		padding-left: 10px;
		margin-right: 10px;
	}
	span{
		display: inline-block;
		width: 75px;
		cursor: pointer;
	}
}
</style>
<template>
  <div id="findstudent" class="content_sub">
  	<h2 class="tit">查找学生</h2>
  	<h3>按手机号查找</h3>
  	<p><input type="text" v-model.trim='stuPhone' @keyup.enter = 'searchStu'/><span class="common_btn" @click="searchStu">查找</span></p>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'findstudent',
  data(){
			return {
				stuPhone:''
			}
		},
		methods:{
			searchStu(){
				var stuPhone = this.stuPhone;
				var testPhone = this.stuPhone.substr(1,4);
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				var _self = this;
				if(!stuPhone){
					alert('请填写电话号码');
					return ;
				}
				if(testPhone!=='0000' && !reg.test(stuPhone)){
					alert('电话号码输入有误');
					return ;
				}
				liSrv.searchStu(stuPhone,function(res){
					common.setS('stuInfo',res.data)
					_self.$router.push({name:'stu_file_raisecuorse',query:{id:res.data.student_id}})
				},function(err){
					if(err.code==="E_NOT_DATA"){
						var r = window.confirm('号码无记录是否注册？')
						if(r){
							common.setS('yuzhucemobile',stuPhone)
							common.setS('stuInfo',{})
							_self.$router.push('updata_file_info');
						}
						return;
					}
					alert(err.desc)
				})
				
			}
		}
}
</script>

