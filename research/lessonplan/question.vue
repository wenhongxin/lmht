<style lang="less" rel="stylesheet/less" scoped>
	#question {
		p{
			font-size: 16px;
			margin: 30px 0;
		}
		span{
			color: red;
		}
		.from{
			display: flex;
			margin-top: 12px;
			input[type='radio']{
				display: none;
			}
			.qtype{
				border: 1px solid #FF8900;
				padding: 0 5px;
			}
			input[type='radio']:checked + .ra{
				border: 1px solid #FF8900;
				i{
					background: #FF8900;
				}
			}
			input[type='radio']:checked + .qtype{
				border: 1px solid #FF8900;
				background: #FF8900;
				color: #FFFFFF;
			}
			label{
				height: 26px;
				border: 1px solid #CCCCCC;
				input{
					margin-right: 0;
					border: none;
				}
				i{
					line-height: 26px;
					margin-left: 5px;
					padding: 0 5px;
					background: #CCCCCC;
					border-radius: 50%;
					color: #FFFFFF;
				}
			}
		}
		input{
			padding-left: 5px;
			height: 26px;
			border: 1px solid #CCCCCC;
		}
		.tg{
			width: 250px;
			margin-right: 20px;
		}
		.da{
			width: 100px;
			margin-right: 20px;
		}
		label{
			line-height: 26px;
			margin-right: 20px;
		}
		table{
			margin-bottom: 30px;
		}
		.answer{
			color: green;
		}
		.notanswer{
			color: red;
		}
		.add_q{
			margin-left: 15px;
			width: 28px;
			height: 26px;
			background: url(../../../../assets/addquestion.jpg) no-repeat;
			background-size:100% 100%;
		}
		.add_q:hover{
			background: url(../../../../assets/addquestion-a.jpg) no-repeat;
			background-size:100% 100%;
		}
	}
</style>
<template>
	<div id="question" class="content_sub">
		<h2 class="tit">
  		教案管理
  	</h2>
  	<p>教案名称：{{$route.query.planame}}　　 课时名称：{{$route.query.classname}}</p>
  	<span>填空题正确答案是答案选项1，答案选项2可以不输入</span>
  	<div class="from">
  		<input type="text" class="tg" placeholder="问题" v-model.trim='questiontit' />
  		<input type="radio" name='da' v-model='optionsradio' id="ra1" value='1' />
  		<label for="ra1" class="ra">
  			<i>1</i>
  			<input type="text" class="da" placeholder="答案选项1"  v-model.trim='options1' />
  		</label>
  		<input type="radio" name='da' v-model='optionsradio' id="ra2" value='2'/>
  		<label for="ra2" class="ra">
  			<i>2</i>
  			<input type="text" class="da" placeholder="答案选项2" v-model.trim='options2' />
  		</label>
  		<input id="qtype1" type="radio" name="questiontype" v-model='questiontype' value='1' />
  		<label class="qtype" style="margin: 0 0 0 20px;border-right: none;" for="qtype1">选择题</label>
  		<input id="qtype2" type="radio" name="questiontype"  v-model='questiontype' value='2'  />
  		<label class="qtype"  for="qtype2">填空题</label>
  		<a href="javascript:;;" class="add_q" @click='addquestion'></a>
  	</div>
  	<p style="text-align: right; margin: 0;">共{{total}}条问答</p>
  	<table class="table" border="1">
			<thead>
		    <tr>
		      <td width="50">ID</td>
		      <td width="80">索引</td>
		      <td width="50">序号</td>
		      <td width="250">题目</td>
		      <td width="140">答案选项A</td>
		      <td width="140">答案选项B</td>
		      <td width="60">类型</td>
		      <td width="180">操作</td>
		    </tr>
  		</thead>
  		<!-- v-tableDn = 'tableDnFn'-->
  		<tbody>
  				<tr v-if='!questionlist'>
  					<td  colspan="8"  v-clickcopy="{paste_id:courseid,type:2,fn:menuFn,question_sort:0}">暂无问答！！！</td>
  				</tr>
  				<tr v-for = '(item,i) in questionlist' :data-index='i' v-clickcopy="{paste_id:courseid,type:2,fn:menuFn,question_sort:item.sort}">
  						<td>{{item.id}}</td>
				      <td>{{item.course_id}}－{{item.index}}</td>
				      <td>{{item.sort}}</td>
				      <td><i @click='editquestiontit(item.id)'>{{item.title}}</i></td>
				      <td><i @click='editquestionoptions1(item.id)'  :class='item.answer==1?"answer":"notanswer"'>{{item.options[1] || 0}}</i></td>
				      <td><i @click='editquestionoptions2(item.id)'  :class='item.answer==2?"answer":"notanswer"'>{{item.options[2] || 0}}</i></td>
				      <td><i @click='editquestiontype(item.id)'>{{item.qtype_info}}</i></td>
				      <td><i @click='changeOptions(item.id,item.qtype)'>交换</i>&nbsp;&nbsp;&nbsp;&nbsp;<i @click='delquestion(item.id)'>删除</i></td>
  				</tr>
  		</tbody>
		</table>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'question',
		data(){
			return {
				questionlist:'',
				optionsradio:'1',
				options1:'',
				options2:'',
				questiontit:'',
				questiontype:'1',
				disable:false,
				pageCount:'1',
				nextString:'1',
				total:'0',
				courseid:this.$route.query.id
			}
		},
		created(){
			this.getquicklist()
		},
		methods:{
			menuFn(paste_id,question_sort){//复制回掉函数
				var copyData = common.getS('copyData');
				var _self = this;
				if(!copyData){
					alert('请先复制');
					return;
				}
				var txt = '确认添加 “'+copyData.txt.split('-')[0]+'” 教案下的  “'+copyData.txt.split('-')[1]+'” 的快速问答吗？'
				var r = window.confirm(txt);
				if(r){
					var data = {
						copy_id:copyData.copy_id,
						paste_id:paste_id,
						question_sort,question_sort
					}
					liSrv.copyQuestionPaste(data,function(res){
						_self.getquicklist();
					})
				}
			},
			getquicklist(){//获取快速问答列表
				var _self = this;
				liSrv.getquickQuestion(this.courseid,function(res){
					_self.questionlist = res.list;
					_self.total = res.total;
				},function(res){
					if(res.code == 'E_NOT_DATA'){
						_self.questionlist = '';
					}
					if(res.code == 'E_NOPRIV'){
						alert('无操作权限');
					}
				})
			},
			tableDnFn(table, row){//拖拽排序回掉
				var course_id =this.$route.query.id;
				var start_sort = $(row).find('td').eq(2).text();
				var end_sort = $(row).next().find('td').eq(2).text();
				if(!end_sort){
					end_sort = 0;
				}
				var data ={
					course_id:course_id,
					start_sort:start_sort,
					end_sort:end_sort
				}
				liSrv.questionSort(data,function(res){
					console.log(res)
				},function(){
					alert('排序失败');
					window.location.reload()
				})
			},
			editquestiontit(id){//修改题干
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑题目',
					type:'text',
					success:function(val,fn){
						var data = {
							editableKey:id,
							editableAttribute:'title',
							newValue:val
						}
						liSrv.editQuestion(data,function(res){
							fn()
						})
					}
				})
			},
			editquestionoptions1(id){//修改答案1
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑选项',
					type:'text',
					success:function(val,fn){
						var data = {
							editableKey:id,
							editableAttribute:'option1Name',
							newValue:val
						}
						liSrv.editQuestion(data,function(res){
							fn()
						})
					}
				})
				
			},
			editquestionoptions2(id){//修改答案2
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑选项',
					type:'text',
					success:function(val,fn){
						var data = {
							editableKey:id,
							editableAttribute:'option2Name',
							newValue:val
						}
						liSrv.editQuestion(data,function(res){
							fn()
						})
					}
				})
			},
			editquestiontype(id){//修改题目类型
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑类型',
					type:'select',
					options:[{name:'选择题',value:'1'},{name:'填空题',value:'2'}],
					success:function(val,fn){
						var data = {
							editableKey:id,
							editableAttribute:'qtype',
							newValue:val
						}
						liSrv.editQuestion(data,function(res){
							fn()
						})
					}
				})
			},
			addquestion(){//添加问题
				if(this.questiontype == '2'){//填空题
					if(!this.questiontit || !this.options1){
						alert('请将信息填写完整');
						return ;
					}
				}else{//选择题
					if(!this.questiontit || !this.options1 || !this.options2){
						alert('请将信息填写完整');
						return ;
					}
				}
				var _self = this;
				var data ={
					courseid:this.courseid,
					title:this.questiontit,
					qtype:this.questiontype,
					option1:this.options1,
					option2:this.options2					
				};
				if(this.questiontype == '2'){
					data.answer = '1';
				}else{
					if(this.optionsradio=='1'){
						data.answer = '1';
					}else{
						data.answer = '2';
					}
				}
				liSrv.addQuestion(data,function(res){
					_self.questiontit='';
					_self.options1 = '';
					_self.options2 = '';
					_self.questiontype = '1';
					_self.optionsradio='1'
					_self.getquicklist();
				})
			},
			delquestion(id){//删除快速问答
				var _self = this;
				var cid = this.courseid
				liSrv.delQuestion(id,cid,function(){
					_self.getquicklist();
				})
			},
			changeOptions(id,type){//交换问题选项
				var data = {
					question_id:id,
					qtype:type
				};
				var _self = this;
				liSrv.questionOptionsChange(data,function(){
					_self.getquicklist();
				})
			}
		},
		watch:{
		}
	}
</script>