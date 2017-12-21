import ezSrv from './ezSrv';
import common from 'common';

function uploadFile(data, success, err = fail_cb, erroR = Error) {
	$.ajax({
		url: data.url,
		type: 'post',
		processData: false,
		contentType: false,
		data: data.formData,
		headers: {
			'ua-limi': "livevideo-teacher",
			'COOK': common.getS("COOK")
		},
		success: success,
		error: erroR
	})
}

function lg(title, obj) {
	console.log(`---===${title}===---`)
	console.log(JSON.stringify(obj, null, 4))
}

function li_proxy(response, callback, errcallback) {
	var errcallback = errcallback || function() {};
	response = JSON.parse(response)
	//lg("response",response)
	if(1 === response.result && "E_SUCCESS" === response.code) {
		//lg("response.data",response.data)
		callback(response.data);
	} else {
		errcallback(response)
	}
}

function Error(res) {
	if(res.status == 500) {
		alert('服务器内部错误');
	}
	if(res.status == 404) {
		alert('未找到页面,请联系技术人员');
	}

}

function fail_cb(response) {
	if(response.code == 'E_NOPRIV') {
		alert('无操作权限');
		window.history.go(-1);
	} else {
		if(response.desc) {
			alert(response.desc)
		}
	}
}
//配置
function getAPIList(data, success, err = fail_cb) {
	var test = data ? data.test || '0' : '0';
	var str = document.domain.split('.')[0];
	var configurl = "http://test.api.config.limiketang.com/config/index"
	common.runtimeEnvironment = str;
	if(str === 'lsp' || str === 'hui' || str === 'lss') {
		configurl = "http://api.config.limiketang.com/config/index";
	}
	if(str === 'lsp' || str === 'lss') {
		test = '0'
	}
	if(str === 'hui') {
		test = 'hui'
	}
	var bdata = {
		appid: "com.livevideo.admin.app.pc",
		version: "1.0",
		time: (new Date()).getTime(),
		test: test,
		platform: "pc"
	};
	var request = {
		type: "post",
		url: configurl,
		data: bdata
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			//集合借口列表，并写入本地配置
			var apiList = {};
			var apiListUrl = {};
			$.each(data.api, function(i, k) {
				apiList[k.name] = {
					id: k.id,
					url: k.url,
					desc: k.desc,
					name: k.name
				}
			})
			$.each(apiList, function(i, k) {
				apiListUrl[k.name] = k.url;
			})
			common.setL('apiListUrl', apiListUrl)
			common.API = apiListUrl;
			success(data.api)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(request).then(success_cb, function(res) {});
	return response;
}

//获取菜单
function getmenu(success, err = fail_cb) {
	var obj = {
		type: "get",
		url: common.API.publicx_get_menu
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/* 登录相关  */

//获取二维码code
function getQrCode(success, err = fail_cb) {
	var obj = {
		type: "get",
		url: common.API.teacher_sso_get_qr_code,
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//判断二维码是否登录
function qrCodeIsLogin(code, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teacher_sso_qr_islogin,
		data: {
			code: code
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个用户
function getTeacherOne(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teacher_get_one,
		data: {
			teacher_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*优惠相关*/

//获取优惠列表
function getDiscountList(data, success, err = fail_cb) {

	var obj = {
		type: "post",
		url: common.API.discount_get_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取优惠列表
function getDiscountYesList(data, success, err = fail_cb) {

	var obj = {
		type: "post",
		url: common.API.discount_yes_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取优惠历史记录 
function getDiscountHistory(data, success, err = fail_cb) {

	var obj = {
		type: "post",
		url: common.API.get_discount_history,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改优惠
function discountEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data);
		}, function(data) {
			err(data);
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除优惠
function deldiscount(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_del,
		data: {
			discount_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取优惠列表
function getDiscountYesList(data, success, err = fail_cb) {

	var obj = {
		type: "post",
		url: common.API.discount_yes_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加优惠
function adddiscount(sendData, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_add,
		data: sendData
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个优惠
function getdiscountone(sendData, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_get_one,
		data: sendData
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//启用优惠
function startdiscount(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_start,
		data: {
			discount_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个优惠
function getDiscountOne(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_get_one,
		data: {
			discount_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//判断优惠是否可用
function discountCheck(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.discount_check,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*门店相关*/

//获取门店列表
function getStoreList(page, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.store_get_list,
		data: {
			page: page
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改或添加门店
function updataoraddStore(data, success, err = fail_cb) {
	var postURl;

	if(data.store_id == undefined || data.store_id == 'undefined') {
		postURl = common.API.store_add
	} else {
		postURl = common.API.store_edit
	}
	var obj = {
		type: "post",
		url: postURl,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除门店
function delStore(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.store_del,
		data: {
			store_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个门店
function getStoreOne(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.store_get_one,
		data: {
			store_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*学生相关*/

//搜索学生
function searchStu(mobile, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.student_search,
		data: {
			mobile: mobile
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

//学生报过的班级
function studentClassList(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.student_class_list,
		data: {
			user_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//学生名下的ipad
function studentIpad(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.student_device,
		data: {
			student_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加学生 测评录入
function addStudent(data, success, err = fail_cb) {
	var path;
	if(data.student_id == 'undefined' || data.student_id == undefined || data.student_id == 0 || common.getS('stuInfo').student_type == 2) {
		path = common.API.student_add;
	} else {
		path = common.API.student_edit
	}
	var obj = {
		type: "post",
		url: path,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

function getvcode(mobile, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.send_verify_code,
		data: {
			mobile: mobile,
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取预注册学生列表
function getprestulist(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.perpare_user_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*班级相关*/

//获取班级列表
function getClassList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_get_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取可报名的班级列表 
function getClassYesList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_yes_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*订单相关*/

//生成订单
function createOrder(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.order_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//创建支付
function createPay(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.pay_create,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取支付状态
function getPayState(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.pay_get_one,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

//获取订单
function getOrder(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.order_get_one,
		data: {
			order_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//退款
function refund(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.order_tui,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*省市*/

//获取省
function getProvinces(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.school_get_provinces,
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取市
function getCity(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.school_get_cities,
		data: {
			province_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取县
function getCounty(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.school_get_areas,
		data: {
			city_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取学校
function getSchool(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.school_get_schools,
		data: {
			area_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//没有获取到学校
function schoolNot(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.school_not,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*用户列表相关*/

//获取用户列表
function getUserList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teacher_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

//删除用户
function delUser(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teacher_del,
		data: {
			teacher_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*角色相关*/

//获取角色列表
function getRoleList(page, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.role_list,
		data: {
			page: page
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

//修改或添加角色
function updataoraddRole(data, success, err = fail_cb) {
	var postURl;
	if(data.role_id == undefined || data.role_id == 'undefined') {
		postURl = common.API.role_add
	} else {
		postURl = common.API.role_edit
	}
	var obj = {
		type: "post",
		url: postURl,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除角色
function delRole(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.role_del,
		data: {
			role_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*节点相关*/
//获取节点列表
function getNodeList(page, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.node_list,
		data: {
			page: page
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改或添加节点
function updataoraddnode(data, success, err = fail_cb) {
	var postURl;
	if(data.node_id == undefined || data.node_id == 'undefined') {
		postURl = common.API.node_add
	} else {
		postURl = common.API.node_edit
	}
	var obj = {
		type: "post",
		url: postURl,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除节点
function delNode(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.node_del,
		data: {
			node_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取节点菜单
function getNodeMenu(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.node_get_menu
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*权限树*/
//拖拽权限树
function roleDrag(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.role_drag,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取权限树
function getRole(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.role_get_tree,
		data: {
			role_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*ipad相关*/

//添加ipad
function addIpad(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改ipad
function updataIpad(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取设备列表总部
function getIpadList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取门店设备列表
function ipadStoreList(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_store_list
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//门店签收ipad
function storeSignIpad(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.store_sign,
		data: {
			device_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//总部牵手ipad
function zbSignIpad(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_zongbu_sign,
		data: {
			device_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//ipad使用记录
function ipadLog(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_log,
		data: {
			device_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取门店可租设备列表
function ipadStoreYes(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_store_yes,
		data: {
			store_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//设置ipad可用不可用
function ipadstate(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_state,
		data: {
			device_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个设备
function getIpadOne(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_get,
		data: {
			device_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//设备退回总部
function tuiIpadZ(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_tui_zongbu,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//租设备订单
function ipadOrder(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.device_add_order,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//交易记录
function orderList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.order_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
/*
 教学教研
 */
//获取教案列表查找教案
function teacherPlanList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teach_plan_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加教案
function teacherPlanAdd(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.teach_plan_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取教案课时
function teacherPlanCourseList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加课时
function teacherPlanCourseAdd(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_add,
		data: {
			teach_plan_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//oss上传ppt获取key
function ossUploadFileStart(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_ppt_upload_muti_init, //'http://154.154.5.246:8000/teach-plan/course-ppt-upload-get-token',
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//oss上传成功
function ossUploadFileEnd(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_ppt_upload_muti_done, // 'http://154.154.5.246:8000/teach-plan/course-ppt-upload-in-oss',
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改课时
function teacherPlanCourseEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//下载ppt
//function downloadPPT (id,success, err = fail_cb) {
//	var obj = {
//		type: "get",
//		url:common.API.course_ppt_download,
//		data:{
//			course_id:id
//		}
//	}
//	function success_cb(response) {
//		li_proxy(response, function(data) {
//			success(data)
//		}, function(data) {
//			err(data)
//		})
//	}
//	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
//	return response;
//}
//获取教案一个课时
function getquickQuestion(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.get_qq_list,
		data: {
			courseid: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//教案课时拖拽排序 
function courseSort(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_up_sort,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个课时
function getOneCourse(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.course_get,
		data: {
			course_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加快速问答
function addQuestion(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.quick_question_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加快速问答
function editQuestion(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.quick_question_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除快速问答
function delQuestion(id, cid, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.quick_question_del,
		data: {
			question_id: id,
			course_id: cid
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//交换快速问答选项
function questionOptionsChange(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.quick_question_options_exchange,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//粘贴快速问答
function copyQuestionPaste(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.paste_question,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//教研获取班级列表
function getAdminClassList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//快速问答拖拽排序
function questionSort(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.quick_question_sort,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取班级学生
function classStudentList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_student_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加班级
function addClass(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加学生
function addstu(data, success, err = fail_cb) {
	var addurl;
	if(data.type == 1) {
		addurl = common.API.class_student_add;
	} else {
		addurl = common.API.class_student_add_test;
	}
	var obj = {
		type: "post",
		url: addurl,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//删除学生
function delstu(data, success, err = fail_cb) {
	var delurl;
	if(data.type == 1) {
		delurl = common.API.class_student_del;
	} else {
		delurl = common.API.class_student_del_test;
	}
	var obj = {
		type: "post",
		url: delurl,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加班级参数判断
function addClassParamsCheck(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_check_add,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//添加教案的获取教案列表
function adminTeacherPlanList(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.admin_teach_plan_list,
		//data:data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取班级课时
function getClassCourseList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_course_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改班级课时
function classCourseEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_course_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取班级信息
function getClassInfo(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_get,
		data: {
			class_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取班级历史记录  
function getClassHistoryList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.get_class_history_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改班级基础信息
function editClassBasis(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改班级介绍 
function editClassIntroduce(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_detail_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改班级课时
function editClassLesson(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_course_save,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个课时
function getClassOne(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.class_course_get,
		data: {
			lesson_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//老师检查回放的状态  
function teacherCheckVideo(id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url:common.API.teacher_check_video,
		data: {
			lesson_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//老师强制下课并生成回放   
function teacherEndLessonHand (id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url:common.API.teacher_end_lesson_hand,
		data: {
			lesson_id: id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*CC*/

//创建分配任务  
function createccallotask(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.allocat_log_create,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取任务历史记录
function getccalllist(success, err = fail_cb) {
	var obj = {
		type: "get",
		url: common.API.allocat_log_get
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//提交cc任务
function submitcctask(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.allocat_log_save,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//认领任务
function getstutask(uid, success, err = fail_cb) {
	var obj = {
		type: "get",
		url: common.API.cc_student_get,
		data: {
			uid: uid
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个学生的信息
function getstudent(uid, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_stu_info,
		data: {
			student_id: uid
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//cc更新学生信息
function ccstuupdata(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_student_update,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//学生信息更新记录
function ccstuupdate(uid, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_student_update_log,
		data: {
			student_id: uid
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//提交通话记录
function cccallcreate(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_calllog_create,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//CC放弃原因增
function addccreason(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_add_tag,
		data: {
			tag_name: data
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			console.log(data)
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//CC放弃原因删
function delccreason(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_del_tag,
		data: {
			tag_id: data
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//CC放弃原因改
function changeccreason(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_update_tag,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//CC放弃原因查
function lookccreason(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_get_tags_by_uid,
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//通话记录列表ccinfo 历史纪录
function getcccalllog(uid, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_calllog_logs,
		data: {
			uid: uid
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//搜索通话记录
function getccsearch(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_calllog_search,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//cc客服任务提醒记录
function ccremind(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_calllog_assignment
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//cc客服的历史记录  
function ccmindhistory(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_calllog_history
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//cc客服添加号码
function ccaddstudent(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_add_mobile,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
// cc客服当日工作进度
function cctodayinfo(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.allocat_today_info
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
// cc查询学生是否报班
function checkclass(student_id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_class_uid,
		data: {
			student_id: student_id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
// cc管理表格
function ccmanage(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_cc_manage,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
// cc外呼数量
function callccnum(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.cc_call_log_cc_data,
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//cc自动体验课列表
function ccclasslist(success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.get_express_class,
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

/*班主任*/

//获取班主任的班
function directorGetClassList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_get_class_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取班主任班下的学生  
function directorSmallStudentList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_small_student_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//新建班主任的班director/add-class 
function directorAddClass(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_add_class,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改学生星星director/small-student-edit 
function directorSmallStudentEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_small_student_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改班级是否自动加人 director/edit-class 
function directorEditClass(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_edit_class,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取计划列表director/get-task-list 
function directorGetTaskList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_get_task_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改学生计划director/edit-task 
function directorEditTask(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_edit_task,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//班主任新建计划
function directorAddTask(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_add_task,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取直播课记录director/live-record-list
function directorLiveRecordList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_live_record_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//修改直播课备注
function directorLiveRecordEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_live_record_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取学生操作历史记录director/get-history-list 
function directorGetHistoryList(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_get_history_list,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个学生信息
function directorStudentGet(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_student_get,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//班主任修改学生信息
function directorStudentEdit(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_student_edit,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个计划
function directorGetTaskInfo(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_get_task_info,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//班主任小班手动加人
function directorAddStudent(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.director_add_student,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//获取一个学生的交易记录（学生档案）
function orderListstudent(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.order_list_by_student_id,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}
//试听班报名（学生档案）
function addExperienceStudent(data, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.add_experience_student,
		data: data
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

//获取学生试听班列表（学生档案）
function getAuditionlist(student_id, success, err = fail_cb) {
	var obj = {
		type: "post",
		url: common.API.get_audition_list,
		data: {
			student_id: student_id
		}
	}

	function success_cb(response) {
		li_proxy(response, function(data) {
			success(data)
		}, function(data) {
			err(data)
		})
	}
	var response = ezSrv.getSrvData(obj).then(success_cb, Error);
	return response;
}

export default {
	uploadFile: uploadFile,
	getAPIList: getAPIList,
	getQrCode: getQrCode,
	qrCodeIsLogin: qrCodeIsLogin,
	getDiscountList: getDiscountList,
	getDiscountYesList: getDiscountYesList,
	getDiscountHistory: getDiscountHistory,
	discountEdit: discountEdit,
	deldiscount: deldiscount,
	getDiscountYesList:getDiscountYesList,
	adddiscount: adddiscount,
	getdiscountone: getdiscountone,
	startdiscount: startdiscount,
	getStoreList: getStoreList,
	updataoraddStore: updataoraddStore,
	delStore: delStore,
	getvcode: getvcode,
	getprestulist: getprestulist,
	searchStu: searchStu,
	getClassList: getClassList,
	createOrder: createOrder,
	createPay: createPay,
	getPayState: getPayState,
	getProvinces: getProvinces,
	getCity: getCity,
	getCounty: getCounty,
	getSchool: getSchool,
	getDiscountOne: getDiscountOne,
	getOrder: getOrder,
	schoolNot: schoolNot,
	getUserList: getUserList,
	getRoleList: getRoleList,
	delUser: delUser,
	updataoraddRole: updataoraddRole,
	delRole: delRole,
	getNodeList: getNodeList,
	updataoraddnode: updataoraddnode,
	delNode: delNode,
	getRole: getRole,
	getNodeMenu: getNodeMenu,
	studentClassList: studentClassList,
	addStudent: addStudent,
	getmenu: getmenu,
	addIpad: addIpad,
	getIpadList: getIpadList,
	getTeacherOne: getTeacherOne,
	ipadStoreYes: ipadStoreYes,
	ipadOrder: ipadOrder,
	getIpadOne: getIpadOne,
	getClassYesList: getClassYesList,
	refund: refund,
	getStoreOne: getStoreOne,
	studentIpad: studentIpad,
	updataIpad: updataIpad,
	orderList: orderList,
	ipadStoreList: ipadStoreList,
	storeSignIpad: storeSignIpad,
	zbSignIpad: zbSignIpad,
	ipadLog: ipadLog,
	tuiIpadZ: tuiIpadZ,
	ipadstate: ipadstate,
	discountCheck: discountCheck,
	roleDrag: roleDrag,
	teacherPlanList: teacherPlanList,
	teacherPlanAdd: teacherPlanAdd,
	teacherPlanCourseList: teacherPlanCourseList,
	teacherPlanCourseAdd: teacherPlanCourseAdd,
	ossUploadFileStart: ossUploadFileStart,
	ossUploadFileEnd: ossUploadFileEnd,
	teacherPlanCourseEdit: teacherPlanCourseEdit,
	getquickQuestion:getquickQuestion,
	courseSort:courseSort,
	getOneCourse:getOneCourse,
	addQuestion:addQuestion,
	editQuestion:editQuestion,
	delQuestion:delQuestion,
	questionOptionsChange:questionOptionsChange,
	copyQuestionPaste:copyQuestionPaste,
	getAdminClassList:getAdminClassList,
	questionSort:questionSort,
	classStudentList:classStudentList,
	addClass:addClass,
	addstu:addstu,
	delstu:delstu,
	addClassParamsCheck:addClassParamsCheck,
	adminTeacherPlanList:adminTeacherPlanList,
	getClassCourseList:getClassCourseList,
	classCourseEdit:classCourseEdit,
	getClassInfo:getClassInfo,
	getClassHistoryList:getClassHistoryList,
	editClassBasis:editClassBasis,
	editClassIntroduce:editClassIntroduce,
	editClassLesson:editClassLesson,
	getClassOne:getClassOne,
	teacherCheckVideo:teacherCheckVideo,
	teacherEndLessonHand:teacherEndLessonHand,
	createccallotask:createccallotask,
	getccalllist:getccalllist,
	submitcctask:submitcctask,
	getstutask:getstutask,
	ccstuupdata:ccstuupdata,
	ccstuupdate:ccstuupdate,
	cccallcreate,cccallcreate,
	getcccalllog:getcccalllog,
	getstudent:getstudent,
	getccsearch:getccsearch,
	ccremind:ccremind,
	ccmindhistory:ccmindhistory,
	ccaddstudent:ccaddstudent,
	cctodayinfo:cctodayinfo,
	checkclass:checkclass,
	directorGetClassList:directorGetClassList,
	directorSmallStudentList:directorSmallStudentList,
	directorAddClass:directorAddClass,
	directorSmallStudentEdit:directorSmallStudentEdit,
	directorEditClass:directorEditClass,
	directorGetTaskList:directorGetTaskList,
	directorEditTask:directorEditTask,
	directorAddTask:directorAddTask,
	directorLiveRecordList:directorLiveRecordList,
	directorLiveRecordEdit:directorLiveRecordEdit,
	directorGetHistoryList:directorGetHistoryList,
	directorStudentGet:directorStudentGet,
	directorStudentEdit:directorStudentEdit,
	directorGetTaskInfo:directorGetTaskInfo,
	directorAddStudent:directorAddStudent,
	addccreason:addccreason,
	delccreason:delccreason,
	changeccreason:changeccreason,
	lookccreason:lookccreason,
	ccmanage:ccmanage,
	callccnum:callccnum,
	orderListstudent:orderListstudent,
	ccclasslist:ccclasslist,
	addExperienceStudent:addExperienceStudent,
	getAuditionlist:getAuditionlist,
}