<style lang="less" rel="stylesheet/less" scoped>
	#planclasslist {
		table em{
			padding-right: 60px;
		}
		input[type=file]{
			display: none;
		}
		.ts{
			display: none;
			width:150px;
			height: 50px;
			border-radius: 5px;
			text-align: center;
			line-height: 50px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -75px;
			margin-top: -25px;
			background: #ccdbd8;
			z-index: 999;
		}
		h3{
			font-size: 16px;
			margin:20px 0;
		}
	}
</style>
<template>
	<div id="planclasslist" class="content_sub">
		<h2 class="tit">
  		教案管理
  	</h2>
  	<h3>教案名称：{{planame}}</h3>
  	<table class="table" border="1">
			<thead>
		    <tr>
		      <td width="50">ID</td>
		      <td width="50">序号</td>
		      <td width="200">课时名称</td>
		      <td width="130">PPT</td>
		      <td width="150">课程属性</td>
		      <td width="150">设置时长</td>
		      <td width="100">快速问答</td>
		    </tr>
  		</thead>
  		<tbody id="tbody" v-tableDn = 'tableDnFn'>
  				<tr v-if='!courselist'>
  					<td  colspan="7">暂无课时！！！</td>
  				</tr>
  				<tr v-for = '(item,i) in courselist' :data-index='i'  v-clickcopy="{copy_id:item.id,type:1,fn:menuFn,txt:planame+'-'+item.title}">
			      <td>{{item.id}}</td>
			      <td>{{item.index}}</td>
			      <td><i @click='editclassname(item.id)'>{{item.title}}</i></td>
			      <td><i><label :for="'ppt'+i">上传</label><input @change='ossUploadPPT(item.id)' type="file" :id="'ppt'+i" /></i><em></em><a v-if='item.file_md5' :href='downloadurl+"?course_id="+item.id'>下载</a></td>
			      <td><i @click='editclasstype(item.id)'>{{item.lesson_type_map}}</i></td>
			      <td><i @click='editclasstime(item.id)'>{{item.time_length_map}}</i></td>
			      <td><router-link :to='{name:"question",query:{id:item.id,planame:planame,classname:item.title}}'>{{item.quick_question_count_map}}</router-link></td>
			    </tr>
  		</tbody>
		</table>
		<div class="ts">
		</div>
		<a href="javascript:;;" @click='addcourse' class="common_btn" style="width: 80px; margin-top: 30px;">添加课时</a>
		<trun-page :pageCount = 'pageCount' :nextString = 'nextString' :total = 'total' @getList='getList'></trun-page>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	import trunPage from '../../../basic/trunPage.vue';
	export default {
		name: 'planclasslist',
		data(){
			return {
				courselist:'',
				pageCount:'1',
				nextString:'1',
				total:'0',
				downloadurl:common.API.course_ppt_download,
				planId:this.$route.query.id,
				planame:this.$route.query.planame
			}
		},
		components:{
			trunPage
		},
		created(){
			this.getCourseList();
		},
		methods:{
			menuFn(id){//复制回掉函数
				console.log(1111)
			},
			tableDnFn(table, row){
				var idx = parseInt($(row).index())+1;
				var id = $(row).find('td').eq(0).text();
				var data = {
					course_id:id,
					index:idx
				}
				liSrv.courseSort(data,function(res){
					//console.log(res)
				},function(){
					alert('排序失败');
					window.location.reload()
				})
			},
			getCourseList(){//获取课时列表
				var _self = this;
				var data = {
					page:'',
					teach_plan_id:_self.planId
				}
				liSrv.teacherPlanCourseList(data,function(res){
						_self.total = res.total;
						_self.pageCount = res.pageCount;
						_self.courselist = res.list;
				},function(){
						_self.courselist = '';
						_self.pageCount = '1';
						
				})
			},
			addcourse(){//添加课时
				var _self = this;
				liSrv.teacherPlanCourseAdd(_self.planId,function(res){
					_self.getCourseList()
				})
			},
			getList(nextString){
				var _self = this;
				this.nextString = nextString;
				var data = {
					page:nextString,
					teach_plan_id:_self.planId
				}
				liSrv.teacherPlanCourseList(data,function(res){
					_self.courselist = res.list
				})
			},
			editclassname(id){
				var _self = this;
				$(event.target).tableEditor({
					title:'编辑课程名称',
					type:'text',
					success:function(val,fn){
						var data = {
							course_id:id,
							title:val
						}
						liSrv.teacherPlanCourseEdit(data,function(res){
							fn();
						})
					}
				})
			},
			editclasstype(id){
				$(event.target).tableEditor({
					title:'编辑课程属性',
					type:'select',
					options:[{name:'大班课',value:'1'},{name:'辅导课',value:'3'},{name:'练习课',value:"2"}],
					success:function(val,fn){
						var data = {
							course_id:id,
							lesson_type:val
						}
						liSrv.teacherPlanCourseEdit(data,function(res){
							fn();
						})
					}
				})
			},
			editclasstime(id){
				$(event.target).tableEditor({
					title:'编辑课程时间',
					type:'select',
					options:[
						{name:'30分钟',value:'1800'},
						{name:'40分钟',value:'2400'},
						{name:'50分钟',value:"3000"},
						{name:'1小时',value:"3600"},
						{name:'70分钟',value:"4200"},
						{name:'80分钟',value:"4800"},
						{name:'90分钟',value:"5400"},
						{name:'100分钟',value:"6000"},
						{name:'110分钟',value:"6600"},
						{name:'2小时',value:"7200"}
					],
					success:function(val,fn){
						var data = {
							course_id:id,
							time_length:val
						}
						liSrv.teacherPlanCourseEdit(data,function(res){
							fn();
						})
					}
				})
			},
			ossUploadPPT(id){
				var _self = this;
				var el = event.target;
				var pptts;
				var sendata={
					'course_id' : id
				};
				liSrv.ossUploadFileStart(sendata,function(res){
					var oss = res.data;
					var obj = {
						el:el,
						region: oss.region,
						accessKeyId: oss.AccessKeyId,
						accessKeySecret: oss.AccessKeySecret,
						stsToken :oss.SecurityToken,
						bucket: oss.bucket,
						filename:oss.fileId,
						progress:function(a){
							$('.ts').show();
							var num = Math.round(a*100);
							pptts = '已上传'+num+'%';
							$('.ts').text(pptts);
							if(a==1){
								$('.ts').hide();
							}
						},
						success:function(data, md5val){
							var endData = {
								course_id:id,
								file_name:data.name,
							  file_md5:md5val
							};
							liSrv.ossUploadFileEnd(endData,function(res){
								_self.getCourseList();
								alert('上传成功');
							},function(res){
								alert("上传失败请重试");
							})
						}
					}
					on_click_upload_file(obj)
				},function(res){
						alert(res.desc)
				})
				
			},
			uploadPPT(id){//上传ppt
				var _self = this;
				var el = event.target
				var ppturl = $(el).val();
				var formData = new FormData();
				if(ppturl != "") {
					//判断上传文件的后缀名
					var strExtension = ppturl.substr(ppturl.lastIndexOf('.') + 1);
					if(strExtension != 'ppt' && strExtension != 'pptx') {
						alert("请选择ppt文件");
						$('#ppt').val('')
						return;
					}
				}
				formData.append('course_id',id);
				formData.append('filename',$(el)[0].files[0]);
					var sendData = {
					url:common.API.course_ppt_upload ,
					formData:formData
				}
				_self.pptts = 'ppt上传中，请勿刷新'
				liSrv.uploadFile(sendData, function(res) {
					var data = JSON.parse(res);
					if(data.result == 1 && "E_SUCCESS" === data.code){
						_self.getCourseList();
						$('#ppt').val('');
						//alert('上传成功');
						_self.pptts = 'ppt上传成功';
						setTimeout(function(){
							_self.pptts = '';
						},1000)
					}else{
						alert('上传失败请重试');
					}
				})
			}
		}
	}
</script>