<style lang="less" rel="stylesheet/less" scoped>
#search_stu{
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
  <div id="search_stu" class="content_sub">
  	<h2 class="tit">查找学生</h2>
  	<h3>按手机号查找</h3>
  	<p><input type="text" v-model.trim='stuPhone' @keyup.enter = 'searchStu'/><span class="common_btn" @click="searchStu">查找</span></p>
  </div>
</template>

<script>
import liSrv from 'liSrv';
import common from 'common';
export default {
  name: 'search_stu',
  data(){
			return {
				stuPhone:''
			}
		},
		beforeCreate(){
			var _self = this;
		},
		props: ['yesorno'],
		methods:{
			searchStu(){
				var stuPhone = this.stuPhone;
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				var _self = this;
				if(!stuPhone){
					alert('请填写电话号码');
					return ;
				}
				if(!reg.test(stuPhone)){
					alert('电话号码输入有误');
					return ;
				}
				liSrv.searchStu(stuPhone,function(res){
					common.setS('stuInfo',res.data)
					_self.$router.push("stu_info")
				},function(err){
					if(err.desc=='无更多数据'){
						if(!_self.yesorno){
							var r = window.confirm('号码无记录是否注册？')
							if(r){
								common.setS('yuzhucemobile',stuPhone)
								common.setS('stuInfo',{})
								_self.$router.push('updatastuInfo');
							}
							return;
						}else{
							alert('号码无注册');
							return ;
						}
						
					}
					alert(err.desc)
				})
				
			}
		}
}
</script>

