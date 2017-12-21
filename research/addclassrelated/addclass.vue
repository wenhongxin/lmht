<style lang="less" rel="stylesheet/less" scoped>
	#addclass {
		h3{
			padding: 14px 0 17px 0;
	    font-size: 16px;
		}
		p{
			line-height: 24px;
			margin-top: 10px;
		}
		em{
			font-size: 14px;
			font-weight: normal;
			color: red;
		}
		input[type='text'],select{
			width: 240px;
			box-sizing: border-box;
			height: 34px;
			border: 1px solid #95989a;
			padding-left: 10px;
		}
		input[type='file']{
			border: none;
		}
		.pic {
			margin: 20px 0;
			img{
				width: 250px;
				height: 200px;
				margin-top: 15px;
			}
		}
		.radio_sub{
			width:370px;
			height: 240px;
			background: #CCCCCC;
			label{
				display: inline-block;
				margin: 15px 30px 0 20px;
			}
			p{
				margin:30px 0 0 20px;
			}
		}
		textarea{
			width:310px;
			height: 60px;
			padding: 5px 0 0 10px;
		}
		.next{
			margin: 30px 0;
			display: inline-block;
			padding: 0 15px;
		}
		input[type='checkbox'],input[type='radio']{
			margin-top: -3px;
		}
		.t1{
			width: 530px;
			height: 100px;
		}
		.disable {
			background: #CCCCCC;
			pointer-events: none;
		}
	}
</style>
<template>
	<div id="addclass" :class="{'content_sub':!classid}" v-disable = 'department'>
		<h2 class="tit"  v-if='!classid'>
  		班级管理
  	</h2>
  	<h3 v-if='!classid'>第一步：班级信息　<em>标记有红色符号 * 的，为必输项；</em></h3>
  	<p>班级名称 <em>*</em><br /><input type="text" v-model.trim='classname'/></p>
  	<p>营销班级名称 <em>*</em><br /><input type="text" v-model.trim='yxclassname'/></p>
  	<p>主讲老师 <em>*</em><br />
  		<select v-model='teachername'>
  			<option value="">请选择主讲老师</option>
  			<option v-for='item in teacherlist' :value="item.teacher_id">{{item.realname}}</option>
  		</select>
  		<input type="text" v-model.trim='searchteacher'  @keyup.enter='searchteacherFn(1)'  placeholder="输入手机号,回车键查找" style="width: 150px;"/>
  	</p>
  	<p>授课状态 <em>*</em><br />
  		<select v-model='classtate'>
  			<option value="1">已开课</option>
  			<option value="2">已结课</option>
  			<option value="4">待开课</option>
  		</select>
  	</p>
  	<p>助教<br />
  		<select v-model='zjteachername' multiple style="height: 150px;">
  			<option value="">请选择助教</option>
  			<option v-for='item in teacherlist' :value="item.teacher_id">{{item.realname}}</option>
  		</select>
  		<input type="text" v-model.trim='searchteacherzj' @keyup.enter='searchteacherFn(2)'  placeholder="输入手机号,回车键查找" style="width: 150px;"/>
  		
  	</p>
  	<p>年级 <em>*</em><br />
  		<select v-model='grade'>
  			<option value="">请选择年级</option>
  			<option value="1">一年级</option>
  			<option value="2">二年级</option>
  			<option value="3">三年级</option>
  			<option value="4">四年级</option>
  			<option value="5">五年级</option>
  			<option value="6">六年级</option>
  		</select>
  	</p>
  	<p>班级类型 <em>*</em><br />
  		<select v-model='classtype'>
  			<option value="">请选择班级类型</option>
  			<option value="1">正式班</option>
  			<option value="2">试听班</option>
  			<option value="4">测试班</option>
  			<option value="3">内测班 （产品部）</option>
  		</select>
  		<em>　　（内测班为技术人员专用，老师勿选）</em>
  	</p>   <!---->
  	<p>价格 <em>*</em><br /><input type="text" :disabled="classid" v-model.trim='classmoney' />　元　<em>（小数最多输入两位）不可修改，请注意</em></p>
  	<p>购买人数 <em>*</em> <br /><input v-model.trim='buycount' type="text"/>　个</p>
  	<p>课时数<em>*</em> <br /><input :disabled="classid" v-model.trim='coursenum' type="text" />　个<em>（只能输入整数），班级的课时数，不可修改，请注意</em></p>
  	<p>展示开关 <em>*</em><br />
  		<select v-model='cstype'>
  			<option value="1">搜索隐藏</option>
  			<option value="2">搜索展示</option>
  		</select>
  	</p>
  	<p>源自班级<br /><input type="text" v-model.trim='yzclass'/><em>　输入班级编号，以逗号间隔；  该班级必须报过该框输入的班级，才可以对该班进行报名	</em></p>
  	<div class="pic">
  		<em>图片大小840*583　＊</em><span style="padding-left:10px;">{{imgUrlInfo}}</span>
  		<p>展示课程封面  　<input type="file" id="imgUrl" @change='uploadImg("imgUrl")'/></p>
  		<img :src="imgUrl" alt="" />
  	</div>
  	<div class="radio">
  		 <p>请选择标签</p>
  		 <div class="radio_sub">
  		 		<label><input type="radio" name="hot" v-model='tag' value='火热班'/> 火热班</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='特价班'/> 特价班</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='即将报名结束'/> 即将报名结束</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='寒春班'/> 寒春班</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='春季班'/> 春季班</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='暑秋班'/> 暑秋班</label>
  		 		<label><input type="radio" name="hot" v-model='tag' value='暑假班'/> 暑假班</label>
  		 		<p>
		  		 	自定义<em>（最多输入十个字）</em><br />
		  		 	<textarea v-model.trim='srtag'></textarea>
		  		</p>
  		 </div>
  	</div>
  	<p>
			简单介绍
			<br />
			<textarea class="t1" v-model.trim='jieshao' placeholder="如：欢迎来到厘米课堂3年级暑假培优班,这个暑假李飞老师将带领你穿越丛林，只要攒够150个金币，将会把本探险的宝藏寄到你家中赶紧开始吧！"></textarea>
		</p>
		<div class="pic">
  		<p>课程详情背景图   <input type="file" id="classbgimgUrl" @change='uploadImg("classbgimgUrl")'/><span style="padding-left:10px;">{{classbgimgUrlInfo}}</span></p>
  		<img :src="classbgimgUrl" alt="" />
  	</div>
  	<a href="javascript:;;" class="common_btn next" :class="{'disable':!department}" @click='nextPage' v-text='classid?"提交":"下一步，选择课程"'></a>
	</div>
</template>

<script>
	import liSrv from 'liSrv';
	import common from 'common';
	export default {
		name: 'addclass',
		data(){
			return {
				imgUrl:'/static/img/moren.jpg',
				classbgimgUrl:'/static/img/moren.jpg',
				classbgimgUrlInfo:'',
				imgUrlInfo:'',
				searchteacher:'',
				searchteacherzj:'',
				classlist:'',
				classname:'',
				yxclassname:'',
				classtype:'',
				classtate:'4',
				teachername:'',
				grade:"",
				coursenum:'',
				classmoney:'',
				buycount:'',
				cstype:'1',
				yzclass:'',
				tag:'',
				srtag:'',
				jieshao:'',
				tagArr:['火热班','特价班','即将报名结束','寒春班','春季班','暑秋班','暑假班'],
				teacherlist:'',
				zjteachername:[]
			}
		},
		props:['classid','department'],
		created(){
			var _self = this;
			liSrv.getUserList({pageSize:10000},function(res){
				_self.teacherlist = res.list;
			})
			if(this.classid){//修改时候初始化参数
				this.getclassinfo();
			}
		},
		methods:{
			searchteacherFn(type){//搜索主讲老师
				var phone,_self=this;
				var reg = /^1[3,4,5,7,8]\d{9}$/;
				if(type==1){
					phone = this.searchteacher;
				}else{
					phone = this.searchteacherzj;
				}
				if(!phone){
					alert('请填写电话号码');
					return ;
				}
				if(!reg.test(phone)){
					alert('电话号码输入有误');
					return ;
				}
				liSrv.getUserList({pageSize:10000,username:phone},function(res){
					var id = res.list[0].teacher_id;
					if(type==1){
						_self.teachername= id;
					}else{
						_self.zjteachername.push(id)
					}
					
				})
			},
			getclassinfo(){
				var _self = this;
				liSrv.getClassInfo(this.classid,function(res){
					var data = res.data;
					_self.classname = data.name;
					_self.yxclassname = data.market_name;
					_self.grade = data.grade;
					_self.classtype = data.class_type || "";
					_self.coursenum = data.course_count;
					_self.classmoney = data.price;
					_self.buycount = data.buy_count;
					_self.cstype = data.show_state;
					_self.yzclass = data.parent_class;
					_self.imgUrl =	data.bg_img_url;
					_self.classbgimgUrl =	data.js_img_url ? data.js_img_url : '/static/img/moren.jpg';
					_self.jieshao = data.description;
					_self.classtate = data.state;
					if(_self.tagArr.indexOf(data.tag)>-1){
						_self.tag = data.tag;
					}else{
						_self.srtag = data.tag;
					}
					if(data.buy_count){
						_self.buycountcheck = true;
					}
					setTimeout(function(){
						_self.teachername=data.teacher_id || '';
					},300)
					var num=data.assistant_list.length;
					if(num>=0){
						for (var i of data.assistant_list) {
							if(_self.zjteachername.indexOf(i.teacher_id)<0){
								 _self.zjteachername.push(i.teacher_id);
							}
						}
//						for(var i=0;i<num;i++){
//							_self.zjteachername.push(data.assistant_list[i].teacher_id)
//						}
					}
					
				})
			},
			liSrvUpload(sendData,type){
				var _self = this;
				_self[type+'Info'] = '上传中。。。';
				liSrv.uploadFile(sendData, function(res) {
					var data = JSON.parse(res);
					if(data.result == 1 && "E_SUCCESS" === data.code){
						_self[type] = data.data.imagePath;
						$('#'+type).val('');
						_self[type+'Info'] = '上传成功';
					}else{
						_self[type+'Info'] = '';
						alert('上传失败请重试');
					}
				})
			},
			uploadImg(type){//上传图片
				var _self = this;
				var el = event.target
				var ppturl = $(el).val();
				var formData = new FormData();
				if(ppturl != "") {
					//判断上传文件的后缀名
					var strExtension = ppturl.substr(ppturl.lastIndexOf('.') + 1);
					if(strExtension != 'jpg' && strExtension != 'gif' &&
						strExtension != 'png' && strExtension != 'bmp') {
						alert("请选择图片文件");
						$('#'+type).val('')
						return;
					}
					var fileData = $(el)[0].files[0];
					var sendData = {
						url:common.API.upload_class_avatar
					}
          //读取图片数据
          if(type=='imgUrl'){
          	var reader = new FileReader();
	          reader.onload = function (e) {
	              var data = e.target.result;
	              //加载图片获取图片真实宽度和高度
	              var image = new Image();
	              image.onload=function(){
	                  var width = image.width;
	                  var height = image.height;
	                  if(width == 840 && height == 583){
	                  	formData.append('class_avatar',fileData);
											sendData.formData = formData;
											_self.liSrvUpload(sendData,type);
	                  }else{
											alert('请上传840*583的图片');
											$('#'+type).val('');
	                  }
	              };
	              image.src= data;
	          };
	          reader.readAsDataURL(fileData);
          }else{
          	formData.append('class_avatar',fileData);
						sendData.formData = formData;
          	_self.liSrvUpload(sendData,type);
          }
				}
			},
			nextPage(){
				var tag;
				if(!this.classname || !this.yxclassname || !this.teachername || !this.grade || !this.classtype || !this.classmoney || !this.buycount || !this.coursenum || !this.cstype || this.imgUrl=='/static/img/moren.jpg'){
					alert('请将必填信息输入完整');
					return ;
				}
				if(this.srtag){
					if(this.srtag.length>10){
						alert('最多输入十个字！！');
						return ;
					}
					tag = this.srtag;
				}else{
					tag = this.tag;
				}
				var _self = this,yzclass;
				if(_self.yzclass){
					yzclass  = _self.yzclass.split(',').join(',').split('，').join(',');
				}
				var js_img_url = _self.classbgimgUrl=='/static/img/moren.jpg'?'':_self.classbgimgUrl;
				var data = {
					assistant:_self.zjteachername,
					market_name:_self.yxclassname,
					name:_self.classname,
					teacher_id:_self.teachername,
					grade:_self.grade,
					class_type:_self.classtype,
					show_state:_self.cstype,
					price:_self.classmoney,
					bg_img_url:_self.imgUrl,
					js_img_url:js_img_url,
					tag:tag,
					buy_count:_self.buycount,
					description:_self.jieshao,
					course_count:_self.coursenum,
					parent_class:yzclass,
					state:_self.classtate
				}
//				if(_self.zjteachername.indexOf(_self.teachername)>=0){
//					alert("请重新选择助教！")
//				}
				if(!this.classid){
					liSrv.addClassParamsCheck(data,function(res){
						common.setS('addclassdata',data)
						_self.$router.push('addclasscourse')
					})
				}else{
					data.class_id = this.classid;
					liSrv.editClassBasis(data,function(res){
						_self.getclassinfo();
						alert('修改成功');
					})
					
				}
			}
		}
	}
</script>