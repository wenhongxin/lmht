<style lang="less" rel="stylesheet/less" scoped>
	#add_user {
		h2 {
			margin-bottom: 18px;
		}
		p{
			margin-top: 20px;
		}
		input,select {
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
			margin-right: 10px;
			margin-top: 5px;
		}
		.add_store_name {
			input{
				width: 298px;
			}
		}
		.add_store_main {
			height:80px;
			width: 100%;
			p {
				
				float: left;
			}
			input{
				width:220px;
			}
			select{
				width: 100px;
			}
		}
		.add_store_site {
			input {
				width: 518px;
			}
		}
		a {
			margin-top: 20px;
			width: 60px;
		}
		.add_store_main_clan_phone{
			select{
				width: 130px;
			}
		}
		.add_store_main_name{
			input{
				width: 200px;
			}
		}
		.store_address {
			height: 80px;
			p {
				float: left;
			}
			select,
			input {
				width: 134px;
				margin-top: 10px;
				margin-right: 10px;
				height: 34px;
				border: 1px solid #95989a;
				outline: none;
			}
			input {
				width: 220px;
			}
		}
	}
</style>
<template>
	<div id="add_user" class="content_sub">
		<h2 class="tit" v-text='updataData.id ? "修改门店信息" : "新建门店"'>
			{{updataData}}
   </h2>
   	<p class="add_store_main_clan_phone">门店类型<br />
				<select name="" id="" v-model='updataData.store_type'>
					<option value="1">直营</option>
					<option value="2">加盟</option>
				</select>
		</p>
		<p class="add_store_main_name">门店名称<br /><input type="text"  v-model.trim='updataData.store_name'   /></p>
		<div class="add_store_main">
			<p>店长<br /><input type="text"  v-model.trim='updataData.store_user'  /></p>
			<p class="add_store_main_clan_phone">手机号<br /><input type="text"  v-model.trim='updataData.store_user_mobile'  /></p>
		</div>
		<div class="store_address">
				<p>门店省份<br />
					<select name="" id="" v-model='selectedProv' @change='chooseProv()'>
						<option value="">请选择省</option>
						<option v-for='(p,i) in provincesList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>城市<br />
					<select name="" v-model='selectedCity' @change='chooseCity()'>
						<option id="city" value="" selected>请选择市/区</option>
						<option v-for='(p,i) in cityList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>区/县<br />
					<select name="" id="county" @change='schname=""' v-model='selectedCounty'>
						<option value="">选择区/县</option>
						<option v-for='(p,i) in countyList' :value="i+' '+p">{{p}}</option>
					</select>
				</p>
				<p>街道详情<br />
					<input type="text" v-model.trim='store_address' />
				</p>
			</div>
		<a href="javascript:;;" class="common_btn" @click='addorupdata_store()'>确定</a>
	</div>
</template>

<script>
	import common from 'common';
	import liSrv from 'liSrv'
	export default {
		name: 'add_user',
		data() {
			return {
				storeList: null,
				updataData:common.getS('updatastore'),
				selectedProv:"",
				provincesList:"",
				selectedCity:"",
				cityList:"",
				selectedCounty:"",
				countyList:"",
				store_address:'',
			}
		},
		beforeCreate() {
			var _self = this;
			liSrv.getProvinces(function(res) {
				_self.provincesList = res;
			})
		},
		created(){
			var updataData=this.updataData,_self =this;
			if(!updataData.store_type){
				updataData.store_type = 1;
			}
			if(updataData.prov){
				this.selectedProv = updataData.prov +' '+updataData.prov_name;
				this.selectedCity = updataData.city +' '+updataData.city_name;
				this.selectedCounty = updataData.district +' '+updataData.district_name;
				this.store_address = updataData.store_address;
				liSrv.getCity(updataData.prov, function(res) {
					_self.cityList = res;
				})
			}
			if(updataData.city){
				liSrv.getCounty(updataData.city, function(res) {
					_self.countyList = res;
				})
			}
		},
		methods: {
			chooseProv() {
				var _self = this;
				_self.countyList = '';
				_self.schname = '';
				if(this.selectedProv == '') {
					return;
				}
				liSrv.getCity(this.selectedProv.split(" ")[0], function(res) {
					_self.cityList = res;
				})
			},
			chooseCity() {
				var _self = this;
				_self.schname = '';
				if(this.selectedCity == '') {
					return;
				}
				liSrv.getCounty(this.selectedCity.split(" ")[0], function(res) {
					_self.countyList = res;
				})
			},
			addorupdata_store(){
				var _self = this;
				var store_name = this.updataData.store_name;
				var store_type = this.updataData.store_type;
				var store_user = this.updataData.store_user;
				var store_user_mobile = this.updataData.store_user_mobile;
				var store_address = this.store_address;
				if(!store_type){
					alert('请选择门店类型')
					return ;
				}
				if(!store_name){
					alert('请填写门店名字')
					return ;
				}
				if(!store_user){
					alert('请填写门店店长')
					return ;
				}
				if(!store_user_mobile){
					alert('请填写店长电话')
					return ;
				}else{
					var reg = /^1[3,4,5,7,8]\d{9}$/;
					if(!reg.test(store_user_mobile)){
						alert('电话号码有误');
						return ;
					}
				}
				if( !this.selectedProv || !this.selectedCity || !this.selectedCounty || !this.store_address){
					alert('请填写门店地址')
					return ;
				}
				var data = {
					name:store_name,
					address:store_address,
					user:store_user,
					user_mobile:store_user_mobile,
					store_type:store_type,
					prov:this.selectedProv.split(" ")[0],
					prov_name:this.selectedProv.split(" ")[1],
					city_name:this.selectedCity.split(" ")[1],
					city:this.selectedCity.split(" ")[0],
					district:this.selectedCounty.split(" ")[0],
					district_name:this.selectedCounty.split(" ")[1]
				}
				if(this.updataData.id){
					data.store_id = this.updataData.id
				}
				liSrv.updataoraddStore(data,function(){
					common.setS('updatastore',{})
					alert('操作成功');
					_self.$router.push("/synthesis/store_list")
				})
			}
		}
	}
</script>