<style lang="less" rel="stylesheet/less" scoped>
	#editclassintroduce {
		p{
			margin-top: 20px;
		}
		textarea{
			width: 400px;
		}
		.t1{
			height: 200px;
		}
		.t2{
			padding:0 0 0 5px;
			line-height: 28px;
			height: 30px;
		}
		a{
			width: 80px;
			margin: 30px 0;
		}
		.disable {
			background: #CCCCCC;
			pointer-events: none;
		}
		.t3{
			width: 784px;
			height: 300px;
		}
	}
</style>
<template>
	<div id="editclassintroduce"  v-disable = 'department'>
		<p>
			课前
			<br />
			<textarea class="t2" v-model='kq'></textarea>
		</p>
		<p>
			课中
			<br />
			<textarea class="t2" v-model='kz'></textarea>
		</p>
		<p>
			课后
			<br />
			<textarea class="t2" v-model='kh'></textarea>
		</p>
		<p>
			适合对象
			<br />
			<textarea class="t1" placeholder="如：全国初中二年级，成绩较好的学生" v-model.trim='shihe'></textarea>
		</p>
		<p>
			课程目标
			<br />
			<textarea class="t1" v-model.trim='mubiao'></textarea>
		</p>
		<p>
			课程内容
			<br />
			<textarea v-if='!department'class="t3" v-model='kecheng_neirong'></textarea>
			<script  v-if='department' id="classcont" type="text/plain" style="width:800px;height:300px;"></script>
		</p>
		<p>
			课程特色<br />
			<textarea  v-if='!department' class="t3" v-model = 'kecheng_teshe'></textarea>
			<script  v-if='department' id="classts" type="text/plain" style="width:800px;height:300px;"></script>
		</p>
		<a href="javascript:;;" class="common_btn" :class="{'disable':!department}" @click='editok'>提交</a>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import '../../../../../static/js/ueditor.config.js';
	import '../../../../../static/js/ueditor.all.min.js';

	export default {
		name: 'editclassintroduce',
		data(){
			return {
				kq:"",
				kz:"",
				kh:'',
				ue1:'',
				ue2:'',
				shihe:'',
				mubiao:'',
				kecheng_neirong:'',
				kecheng_teshe:'',
				classid:this.$route.query.id,
			}
		},
		created(){
			if(this.classid){
				this.getclassinfo();
			}
		},
		props:['department'],
		methods:{
			getclassinfo(){
				var _self = this;
				liSrv.getClassInfo(this.classid,function(res){
					var detail = res.data.detail;
					_self.kq = detail.ke_qian;
					_self.kz = detail.ke_zhong;
					_self.kh = detail.ke_hou;
					_self.kq = detail.ke_qian;
					_self.shihe = detail.shihe_duixiang;
					_self.mubiao = detail.kecheng_mubiao;
					_self.kecheng_neirong = detail.kecheng_neirong;
					_self.kecheng_teshe = detail.kecheng_teshe;
					if(_self.department){
						setTimeout(function(){
							_self.ue1.execCommand('insertHtml',detail.kecheng_neirong);
	  					_self.ue2.execCommand('insertHtml',detail.kecheng_teshe);
						},500)
					}
					
				})
			},
			editok(){
				var classcont = this.ue1.getContent();
				var classts = this.ue2.getContent();
				var _self = this;
				var data = {
					class_id:_self.classid,
					ke_qian:_self.kq,
					ke_hou:_self.kh,
					ke_zhong:_self.kz,
					shihe_duixiang:_self.shihe,
					kecheng_mubiao:_self.mubiao,
					kecheng_neirong:classcont,
					kecheng_teshe:classts
				}
				liSrv.editClassIntroduce(data,function(res){
					_self.ue1.setContent('') ;
					_self.ue2.setContent('') ;
					_self.getclassinfo();
					alert('修改成功');
				})
			}
		},
		mounted(){
			var _self = this;
			if(_self.department){
				_self.ue1 = UE.getEditor('classcont',{
	        elementPathEnabled:false,//元素路径
	        wordCount:false//字数统计
	 			});
	 			_self.ue2 = UE.getEditor('classts',{
		        elementPathEnabled:false,//元素路径
		        wordCount:false,//字数统计
		    });
			}
		},
		destroyed(){
			if(this.department){
				this.ue1.destroy();
    		this.ue2.destroy();
			}
    	
  	}
	}
</script>