<style lang="less" rel="stylesheet/less" scoped>
	#trunPage {
		margin: 20px 0 30px 0;
		float: right;
		height: 34px;
		a {
			float: left;
			width: 34px;
			height: 34px;
			text-align: center;
			line-height: 34px;
			background: #e0e0e0;
			margin-right: 5px;
		}
		.input{
			background: none;
			width: 44px;
			input{
				box-sizing: border-box;
				padding:0 3px;
				width: 100%;
				height: 100%;
			}
		}
		.prevPage,
		.nextPage {
			width: auto;
			padding: 0 10px;
		}
		.disable {
			opacity: 0.5;
			pointer-events: none;
		}
		.active-a {
			background: #FF8900;
			color: #FFFFFF;
			pointer-events: none;
		}
		span {
			line-height: 34px;
		}
	}
</style>
<template>
	<div class="trunPage" id="trunPage">
		<!--v-if='pageCount!=1'-->
			<a href="javascript:;;" :class="{'disable' : nextString1==1}" class="prevPage" @click='firstpage'>首页</a>
			<a href="javascript:;;" :class="{'disable' : nextString1==1}" class="prevPage" @click='prevpage'>上一页</a>
			<a href="javascript:;;" :class="{'active-a' : nextString1==i}" v-for='i in pages' @click='trunpage(i)'>{{i}}</a>
			<a href="javascript:;;" :class="{'disable' : nextString1==pageCount}" class="nextPage" @click='nextpage'>下一页</a>
			<a href="javascript:;;" :class="{'disable' : nextString1==pageCount}" class="nextPage" @click='lastpage'>尾页</a>
			<a class="input"><input type="text" v-model.trim='gopage' @keyup.enter='tzpage' /></a>
			<a href="javascript:;;" @click='tzpage'>跳转</a>
			<a class="nextPage">共{{total}}条　共{{pageCount}}页</a>
	</div>
</template>

<script>
	export default {
		name: 'trunPage',
		data() {
			return {
				gopage:'',
				showItem:'6'
			}
		},
		props: ['nextString', 'pageCount', 'total'],
		computed: {
			nextString1: {
				get() {
					return this.nextString;
				},
				set(newValue) {
				}
			},
			 pages:function(){
        var pag = [];
          if( this.nextString1 < this.showItem ){ //如果当前的激活的项 小于要显示的条数
               //总页数和要显示的条数那个大就显示多少条
               var i = Math.min(this.showItem,this.pageCount);
               while(i){
                   pag.unshift(i--);
               }
           }else{ //当前页数大于显示页数了
               var middle = this.nextString1 - Math.floor(this.showItem / 2 ),//从哪里开始
                   i = this.showItem;
               if( middle >  (this.pageCount - this.showItem)  ){
                   middle = (this.pageCount - this.showItem) + 1
               }
               while(i--){
                   pag.push( middle++ );
               }
               //console.log(pag)
           }
         return pag;
       }
		},
		methods: {
			firstpage(){//首页
				this.nextString1 = 1;
				this.$emit('getList', 1)
			},
			lastpage(){//尾页
				this.nextString1 = this.pageCount;
				this.$emit('getList', this.pageCount)
			},
			trunpage(i) { //点击翻页
				this.nextString1 = i;
				this.$emit('getList', i)
			},
			prevpage() { //上一页
				var nextString = this.nextString1 - 1;
				this.$emit('getList', nextString)
				this.nextString1 = nextString;
			},
			nextpage() { //下一页
				var nextString = parseInt(this.nextString1) + 1;
				this.$emit('getList', nextString)
				this.nextString1 = nextString;
			},
			tzpage(){//跳转翻页
				var gopage = Number(this.gopage);
				if(!gopage || gopage<1 || gopage>this.pageCount || gopage==this.nextString1) return;
				this.$emit('getList', gopage)
				this.nextString1 = gopage;
			}
		}
	}
</script>