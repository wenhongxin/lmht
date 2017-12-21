<style lang="less" rel="stylesheet/less" scoped>
	#yhmanage {
		h3 {
			margin: 14px 0;
			font-size: 16px;
		}
		.search_nav {
			margin: 30px 0;
			width: 518px;
			height: 36px;
			line-height: 36px;
			background: #EFEFEF;
			li {
				cursor: pointer;
				float: left;
				width: 73px;
				height: 36px;
				text-align: center;
				border-right: 1px solid #FFFFFF;
			}
			.li_active_search {
				color: #FFFFFF;
				background: #FF8900;
			}
		}
		.discount_is_usable {
			padding-left: 0;
			text-align: center;
			justify-content: center;
			cursor: pointer;
			width: 65px;
		}
	}
	
	.discount_yes_usable {
		.discount_is_usable {
			background: #FF8900;
			color: #FFFFFF;
			i{
				color: #FFFFFF;
			}
		}
	}
	.disabled{
		background: #EFEFEF;
		i{
			pointer-events: none;
			color: #999 !important;
		}
		.delyh{
			pointer-events: auto;
		}
	}
	.discount_no_usable {
		background: #EFEFEF;
		span {
			color: #cfcfcf;
		}
		.discount_is_usable {
			background: #EFEFEF;
			color: #3a5fb5;
		}
	}
</style>
<template>
	<div id="yhmanage">
		<ul class="search_nav">
			<li v-for='item in gradlist' @click='searchClass(item.value)' :class="{'li_active_search':li_active_search==item.value}">{{item.name}}</li>
		</ul>
		<router-link :to='{name:"addyh",query:{state:2}}' class='common-btn'>新建优惠</router-link>
		<table class="table" border="1">
			<thead>
				<tr>
					<td width="50">ID</td>
					<td width="150">优惠名称</td>
					<td width="150">营销优惠名称</td>
					<td width="80">创建人</td>
					<td width="80" class="td-center">类型</td>
					<td width="80">使用年级</td>
					<td width="180">优惠有效期</td>
					<td width="100">连报班</td>
					<td width="100">优惠说明</td>
					<td width="60" class="td-center">生效</td>
					<td width="40" v-if='mmby==911'>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for='(item,i) in discountList'  :class="[item.state!=1?'discount_no_usable':'discount_yes_usable',item.state==3?'disabled':'']">
					<td>{{item.id}}</td>
					<td><router-link :to='{name:"addyh",query:{id:item.id,state:item.state}}'>{{item.discount_name}}</router-link></td>
					<td>{{item.discount_market_name}}</td>
					<td>{{item.admin_name}}</td>
					<td class="td-center">{{item.class_type_man}}</td>
					<td>{{item.grade_name}}</td>
					<td>{{item.first_time_man}} — {{item.last_time_man}}</td>
					<td>{{item.binding_class}}</td>
					<td>{{item.content}}</td>
					<td class="td-center discount_is_usable"><i  @click='discountstart(item.state,item.id)'>{{item.state_name}}</i></td>
					<td  v-if='mmby==911'>
						<a class="delyh" href="javascript:;;" @click='deldiscount(item.id)'>删除</a>
					</td>
				</tr>
			</tbody>
		</table>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../../basic/trunPage.vue';
	export default {
		name: 'yhmanage',
		data() {
			return {
				discountList: null,
				pageCount: '1',
				nextString: '1',
				total: '0',
				mmby:this.$route.query.mmby,
				li_active_search:'',
				gradlist:[{name:'全部',value:''},{name:'一年级',value:'1'},{name:'二年级',value:'2'},{name:'三年级',value:'3'},{name:'四年级',value:'4'},{name:'五年级',value:'5'},{name:'六年级',value:'6'}],
				today: Date.parse(new Date())/1000
			}
		},
		components:{
			trunPage
		},
		created() {
			this.getYhlist({})
		},
		methods: {
			searchClass(val){
				var _self = this;
				_self.li_active_search = val;
				this.getYhlist({grade:val})
			},
			getYhlist(data){
				var _self = this;
				liSrv.getDiscountList(data, function(res) {
					_self.total = res.total;
					_self.pageCount = res.pageCount;
					_self.discountList = res.list
				},function(res){
					if(res.code === 'E_NOT_DATA'){
						_self.total = '0';
						_self.pageCount = '1';
						_self.discountList = '';
						_self.nextString = '1';
					}
				})
			},
			getList(nextString) {
				var _self = this;
				this.nextString = nextString;
				var data = {
					page:nextString,
					grade:this.li_active_search
				}
				liSrv.getDiscountList(data, function(res) {
					_self.discountList = res.list
				})
			},
			deldiscount(id) {
				var r = confirm('确定删除吗?');
				var _self = this;
				if(r) {
					liSrv.deldiscount(id, function(res) {
						_self.getYhlist({page:_self.nextString,grade:_self.li_active_search})
					})
				}

			},
			discountstart(state, id) {
				var _self = this;
				liSrv.startdiscount(id, function() {
					_self.getYhlist({page:_self.nextString,grade:_self.li_active_search});
				})
			}
		}
	}
</script>