import Vue from 'vue';
import Router from 'vue-router';
import operate from '@/components/bussiness/operate/operate.vue';
import theStore from '@/components/bussiness/the_store/the_store.vue';
import research from '@/components/bussiness/research/research.vue';
import synthesis from '@/components/bussiness/synthesis/synthesis.vue';
import userinfo from '@/components/bussiness/userinfo/userinfo.vue';
import login from '@/components/bussiness/login/login.vue';
import cc from '@/components/bussiness/CC/CC.vue';
import headteacher from '@/components/bussiness/headteacher/headteacher.vue';
import studentfile from '@/components/bussiness/studentfile/studentfile.vue';

//门店下的子路由
const searchStu = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/search_stu/search_stu.vue')), 'the_store')
const prestulist = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/prereg/prestulist.vue')), 'the_store')
const stuInfo = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/search_stu/stu_info.vue')), 'the_store')
const pdf = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/pdf/pdf.vue')), 'the_store')
const updatastuInfo = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/search_stu/updatainfo.vue')), 'the_store')
const signUp = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/sign_up/sign_up.vue')), 'the_store')
const preferential = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/sign_up/preferential.vue')), 'the_store')
const pay = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/sign_up/pay.vue')), 'the_store')
const payok = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/sign_up/pay_ok.vue')), 'the_store')
const exitclassok = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/exit_class/exit_class_ok.vue')), 'the_store')
const exitClass = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/exit_class/exit_class.vue')), 'the_store')
const ipadRent = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_rent/ipad_rent.vue')), 'the_store')
const ipadPay = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_rent/ipad_pay.vue')), 'the_store')
const ipadPayok = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_rent/ipad_pay_ok.vue')), 'the_store')
const srecords = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/refund_list/srecords.vue')), 'the_store')
const sclassrecords = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/refund_list/sclassrecords.vue')), 'the_store')
const sipadrecords = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/refund_list/sipadrecords.vue')), 'the_store')
const ipadTrent = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_t_rent/ipad_t_rent.vue')), 'the_store')
const exitIpad = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_t_rent/exit_ipad.vue')), 'the_store')
const exitIpadok = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/ipad_t_rent/exit_ipad_ok.vue')), 'the_store')
const manage = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/manage/manage.vue')), 'the_store')
const chakanipad = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/manage/chakanipad.vue')), 'the_store')
const classChargeProve = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/voucher/class_charge_prove.vue')), 'the_store')
const ipadChargeProve = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/voucher/ipad_charge_prove.vue')), 'the_store')
const classRefundProve = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/voucher/class_refund_prove.vue')), 'the_store')
const ipadRefundProve = theStore_r => require.ensure([], () => theStore_r(require('@/components/bussiness/the_store/voucher/ipad_refund_prove.vue')), 'the_store')

//(synthesis)综合管理下的路由
const storeList = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/store_control/store_list.vue')), 'synthesis')
const addStore = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/store_control/add_store.vue')), 'synthesis')
const userList = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/userlist/userlist.vue')), 'synthesis')
const roleList = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/role/rolelist.vue')), 'synthesis')
const role = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/role/role.vue')), 'synthesis')
const addUser = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/userlist/adduser.vue')), 'synthesis')
const addRole = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/role/addrole.vue')), 'synthesis')
const nodeList = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/node/nodelist.vue')), 'synthesis')
const addNode = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/node/addnode.vue')), 'synthesis')
const sclassmanage = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/classmanage/oclassmanage.vue')), 'synthesis')
const sclassstu = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/classmanage/classstu.vue')), 'synthesis')
const slessoninfo = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/classmanage/lessoninfo.vue')), 'synthesis')
const seditclass = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/editclass/editclass.vue')), 'synthesis')
const seditclassbasis = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/editclass/editclassbasis.vue')), 'synthesis')
const seditclasslesson = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/editclass/editclasslesson.vue')), 'synthesis')
const seditclassintroduce = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/editclass/editclassintroduce.vue')), 'synthesis')
const seditclasshistory = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/editclass/editclasshistory.vue')), 'synthesis')
const saddclasscourse = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/addclassrelated/addclasscourse.vue')), 'synthesis')
const saddclass = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/addclassrelated/addclass.vue')), 'synthesis')
const sseevideo = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/video/seevideo.vue')), 'synthesis')
const seditvideo = synthesis_r => require.ensure([], () => synthesis_r(require('@/components/bussiness/synthesis/video/editvideo.vue')), 'synthesis')

//(operate)运营下的路由
const discount = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/discount/discount.vue')), 'operate')
const YHmanage = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/discount/yh/yhmanage.vue')), 'operate')
const Yhistory = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/discount/history/yhistory.vue')), 'operate')
const addYH = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/discount/yh/addyh.vue')), 'operate')
const searchstu = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/searchstu/searchstu.vue')), 'operate')
const stuinfo = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/searchstu/stuinfo.vue')), 'operate')
const incomeipad = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/ipad/incomeipad.vue')), 'operate')
const ipadcheck = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/ipad/ipadcheck.vue')), 'operate')
const ipadmanage = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/ipad/ipadmanage.vue')), 'operate')
const all = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/ipad/all.vue')), 'operate')
const notall = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/ipad/notall.vue')), 'operate')
const records = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/records/records.vue')), 'operate')
const classrecords = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/records/classrecords.vue')), 'operate')
const ipadrecords = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/records/ipadrecords.vue')), 'operate')
const oclassmanage = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/classmanage/oclassmanage.vue')), 'operate')
const oclassstu = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/classmanage/classstu.vue')), 'operate')
const olessoninfo = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/classmanage/lessoninfo.vue')), 'operate')
const oeditclass = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/editclass/editclass.vue')), 'operate')
const oeditclassbasis = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/editclass/editclassbasis.vue')), 'operate')
const oeditclasslesson = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/editclass/editclasslesson.vue')), 'operate')
const oeditclassintroduce = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/editclass/editclassintroduce.vue')), 'operate')
const oeditclasshistory = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/editclass/editclasshistory.vue')), 'operate')
const oseevideo = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/video/seevideo.vue')), 'operate')
const oeditvideo = operate_r => require.ensure([], () => operate_r(require('@/components/bussiness/operate/video/editvideo.vue')), 'operate')
//教研下的路由
const lessplanlist = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/lessonplan/lessplanlist.vue')), 'research')
const planclasslist = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/lessonplan/classlist.vue')), 'research')
const question = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/lessonplan/question.vue')), 'research')
const classmanage = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/classmanage/classmanage.vue')), 'research')
const classstu = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/classmanage/classstu.vue')), 'research')
const lessoninfo = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/classmanage/lessoninfo.vue')), 'research')
const editclass = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/editclass/editclass.vue')), 'research')
const editclassbasis = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/editclass/editclassbasis.vue')), 'research')
const editclasslesson = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/editclass/editclasslesson.vue')), 'research')
const editclasshistory = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/editclass/editclasshistory.vue')), 'research')
const editclassintroduce = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/editclass/editclassintroduce.vue')), 'research')
const addclasscourse = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/addclassrelated/addclasscourse.vue')), 'research')
const addclass = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/addclassrelated/addclass.vue')), 'research')
const seevideo = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/video/seevideo.vue')), 'research')
const editvideo = research_r => require.ensure([], () => research_r(require('@/components/bussiness/research/video/editvideo.vue')), 'research')
//CC下的路由
const ccallotask = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccallotask/ccallotask.vue')), 'cc')
const ccadmin = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccadmin/ccadmin.vue')), 'cc')
const ccremind = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccabout/ccremind.vue')), 'cc')
const ccinfo = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccabout/ccinfo.vue')), 'cc')
const cchistory = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccabout/cchistory.vue')), 'cc')
const ccclassstu = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccclass/ccclassstu.vue')), 'cc')
const ccclassmanage = cc_r => require.ensure([], () => cc_r(require('@/components/bussiness/CC/ccclass/ccclassmanage.vue')), 'cc')



//班主任下的路由
const teacherclass = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/teacherclass.vue')), 'headteacher')
const waitallotstu = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/waitallotstu/waitallotstu.vue')), 'headteacher')
const studentinfo = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/studentinfo.vue')), 'headteacher')
const stubasicinfo = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/studentinfo/stubasicinfo.vue')), 'headteacher')
const stuhistory = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/studentinfo/stuhistory.vue')), 'headteacher')
const stulivecourse = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/studentinfo/stulivecourse.vue')), 'headteacher')
const sturaisecuorse = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/stumanage/studentinfo/sturaisecuorse.vue')), 'headteacher')
const sendplan = headteacher_r => require.ensure([], () => headteacher_r(require('@/components/bussiness/headteacher/sendplan/sendplan.vue')), 'headteacher')

//学生档案下的路由
const findstudent = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/findstudent.vue')), 'studentfile')
const stu_file_info = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/stu_file_info.vue')), 'studentfile')
const updata_file_info = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/updata_file_info.vue')), 'studentfile')
const stu_file_raisecuorse = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/studentinfo/stu_file_raisecuorse.vue')), 'studentfile')
const stu_file_livecourse = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/studentinfo/stu_file_livecourse.vue')), 'studentfile')
const stu_file_equipment = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/studentinfo/stu_file_equipment.vue')), 'studentfile')
const stu_file_basicinfo = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/studentinfo/stu_file_basicinfo.vue')), 'studentfile')
const stu_file_history = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/studentinfo/stu_file_history.vue')), 'studentfile')

const stu_ipad_rent = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_rent/stu_ipad_rent.vue')), 'studentfile')
const stu_ipad_pay = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_rent/stu_ipad_pay.vue')), 'studentfile')
const stu_ipad_pay_ok = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_rent/stu_ipad_pay_ok.vue')), 'studentfile')
const stu_ipad_t_rent = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_t_rent/stu_ipad_t_rent.vue')), 'studentfile')
const stu_exit_ipad = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_t_rent/stu_exit_ipad.vue')), 'studentfile')
const stu_exit_ipad_ok = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/ipad_t_rent/stu_exit_ipad_ok.vue')), 'studentfile')

const stu_sign_up = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/sign_up/stu_sign_up.vue')), 'studentfile')
const stu_preferential = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/sign_up/stu_preferential.vue')), 'studentfile')
const stu_pay = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/sign_up/stu_pay.vue')), 'studentfile')
const stu_pay_ok = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/sign_up/stu_pay_ok.vue')), 'studentfile')

const stu_exit_class_ok = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/exit_class/stu_exit_class_ok.vue')), 'studentfile')
const stu_exit_class = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/exit_class/stu_exit_class.vue')), 'studentfile')

const stu_class_charge_prove = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/voucher/stu_class_charge_prove.vue')), 'studentfile')
const stu_ipad_charge_prove = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/voucher/stu_ipad_charge_prove.vue')), 'studentfile')
const stu_class_refund_prove = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/voucher/stu_class_refund_prove.vue')), 'studentfile')
const stu_ipad_refund_prove = allstudents_r => require.ensure([], () => allstudents_r(require('@/components/bussiness/studentfile/findstudent/voucher/stu_ipad_refund_prove.vue')), 'studentfile')

Vue.use(Router)
export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'login',
			component: login,
		}, { //班主任发送计划
			path: '/sendplan',
			name: 'sendplan',
			component: sendplan,
		}, {
			path: '/headteacher',
			name: 'headteacher',
			component: headteacher,
			children: [{
				path: 'teacherclass',
				name: 'teacherclass',
				component: teacherclass,
			}, {
				path: 'waitallotstu',
				name: 'waitallotstu',
				component: waitallotstu,
			}, {
				path: 'studentinfo',
				name: 'studentinfo',
				component: studentinfo,
				children: [{
					path: 'stubasicinfo',
					name: 'stubasicinfo',
					component: stubasicinfo,
				}, {
					path: 'stuhistory',
					name: 'stuhistory',
					component: stuhistory,
				}, {
					path: 'stulivecourse',
					name: 'stulivecourse',
					component: stulivecourse,
				}, {
					path: 'sturaisecuorse',
					name: 'sturaisecuorse',
					component: sturaisecuorse,
				}]
			}]
		}, {
			path: '/CC',
			name: 'CC',
			component: cc,
			children: [{
				path: 'ccallotask',
				name: 'ccallotask',
				component: ccallotask,
			}, {
				path: 'ccadmin',
				name: 'ccadmin',
				component: ccadmin,
			}, {
				path: 'ccremind',
				name: 'ccremind',
				component: ccremind,
			}, {
				path: 'ccinfo',
				name: 'ccinfo',
				component: ccinfo,
			}, {
				path: 'cchistory',
				name: 'cchistory',
				component: cchistory,
			}, {
				path: 'ccclassstu',
				name: 'ccclassstu',
				component: ccclassstu,
			}, {
				path: 'ccclassmanage',
				name: 'ccclassmanage',
				component: ccclassmanage,
			}]
		}, {
			path: '/studentfile',
			name: 'studentfile',
			component: studentfile,
			children: [{
					path: 'findstudent',
					name: 'findstudent',
					component: findstudent,
				}, {
					path: 'stu_file_info',
					name: 'stu_file_info',
					component: stu_file_info,
					children: [{
						path: 'stu_file_raisecuorse',
						name: 'stu_file_raisecuorse',
						component: stu_file_raisecuorse,
					}, {
						path: 'stu_file_livecourse',
						name: 'stu_file_livecourse',
						component: stu_file_livecourse,
					}, {
						path: 'stu_file_equipment',
						name: 'stu_file_equipment',
						component: stu_file_equipment,
					}, {
						path: 'stu_file_basicinfo',
						name: 'stu_file_basicinfo',
						component: stu_file_basicinfo,
					}, {
						path: 'stu_file_history',
						name: 'stu_file_history',
						component: stu_file_history,
					}]
				}, {
					path: 'stu_sign_up',
					name: 'stu_sign_up',
					component: stu_sign_up
				}, {
					path: 'stu_preferential',
					name: 'stu_preferential',
					component: stu_preferential
				},
				{
					path: 'stu_pay',
					name: 'stu_pay',
					component: stu_pay
				},
				{
					path: 'stu_pay_ok',
					name: 'stu_pay_ok',
					component: stu_pay_ok
				},
				{
					path: 'stu_ipad_rent',
					name: 'stu_ipad_rent',
					component: stu_ipad_rent,
				}, {
					path: 'stu_ipad_pay',
					name: 'stu_ipad_pay',
					component: stu_ipad_pay,
				},
				{
					path: 'stu_ipad_pay_ok',
					name: 'stu_ipad_pay_ok',
					component: stu_ipad_pay_ok,
				}, {
					path: 'stu_ipad_t_rent',
					name: 'stu_ipad_t_rent',
					component: stu_ipad_t_rent,
				},
				{
					path: 'stu_exit_ipad',
					name: 'stu_exit_ipad',
					component: stu_exit_ipad,
				}, {
					path: 'stu_exit_ipad_ok',
					name: 'stu_exit_ipad_ok',
					component: stu_exit_ipad_ok,
				}, {
					path: 'stu_exit_class',
					name: 'stu_exit_class',
					component: stu_exit_class

				}, {
					path: 'stu_exit_class_ok',
					name: 'stu_exit_class_ok',
					component: stu_exit_class_ok

				}, {
					path: 'stu_class_charge_prove',
					name: 'stu_class_charge_prove',
					component: stu_class_charge_prove

				}, {
					path: 'stu_ipad_charge_prove',
					name: 'stu_ipad_charge_prove',
					component: stu_ipad_charge_prove

				}, {
					path: 'stu_ipad_refund_prove',
					name: 'stu_ipad_refund_prove',
					component: stu_ipad_refund_prove
				}, {
					path: 'stu_class_refund_prove',
					name: 'stu_class_refund_prove',
					component: stu_class_refund_prove
				}, {
					path: 'updata_file_info',
					name: 'updata_file_info',
					component: updata_file_info,
				}
			]
		},

		{
			path: '/operate',
			name: 'operate',
			component: operate,
			children: [{
					path: 'discount',
					name: 'discount',
					component: discount,
					children: [{
						path: 'yhmanage',
						name: 'yhmanage',
						component: YHmanage,
					}, {
						path: 'yhistory',
						name: 'yhistory',
						component: Yhistory,
					}]
				},
				{
					path: 'addyh',
					name: 'addyh',
					component: addYH,
				}, {
					path: 'searchstu',
					name: 'searchstu',
					component: searchstu,
				}, {
					path: 'stu_info',
					name: 'stuinfo',
					component: stuinfo,
				}, {
					path: 'incomeipad',
					name: 'incomeipad',
					component: incomeipad,
				}, {
					path: 'ipadcheck',
					name: 'ipadcheck',
					component: ipadcheck,
				}, {
					path: 'seevideo',
					name: 'oseevideo',
					component: oseevideo
				}, {
					path: 'editvideo',
					name: 'oeditvideo',
					component: oeditvideo
				}, {
					path: 'ipadmanage',
					name: 'ipadmanage',
					component: ipadmanage,
					children: [{
						path: 'all',
						name: 'all',
						component: all
					}, {
						path: 'notall',
						name: 'notall',
						component: notall
					}]
				}, {
					path: 'records',
					name: 'records',
					component: records,
					children: [{
						path: 'classrecords',
						name: 'classrecords',
						component: classrecords
					}, {
						path: 'ipadrecords',
						name: 'ipadrecords',
						component: ipadrecords
					}]
				}, {
					path: 'classmanage',
					name: 'oclassmanage',
					component: oclassmanage
				}, {
					path: 'classstu',
					name: 'oclassstu',
					component: oclassstu
				}, {
					path: 'lessoninfo',
					name: 'olessoninfo',
					component: olessoninfo
				}, {
					path: 'editclass',
					name: 'oeditclass',
					component: oeditclass,
					children: [, {
						path: 'editclassbasis',
						name: 'oeditclassbasis',
						component: oeditclassbasis
					}, {
						path: 'editclasslesson',
						name: 'oeditclasslesson',
						component: oeditclasslesson
					}, {
						path: 'editclassintroduce',
						name: 'oeditclassintroduce',
						component: oeditclassintroduce
					}, {
						path: 'editclasshistory',
						name: 'oeditclasshistory',
						component: oeditclasshistory
					}]
				}
			]
		}, {
			path: '/theStore',
			name: 'theStore',
			component: theStore,
			children: [
			{
				path: 'search_stu',
				name: 'search_stu',
				component: searchStu,
			}, {
				path: 'updatastuInfo',
				name: 'updatastuInfo',
				component: updatastuInfo
			}, {
				path: 'sign_up',
				name: 'sign_up',
				component: signUp
			}, {
				path: 'exit_class',
				name: 'exit_class',
				component: exitClass
			}, {
				path: 'ipad_rent',
				name: 'ipad_rent',
				component: ipadRent
			}, {
				path: 'ipad_t_rent',
				name: 'ipad_t_rent',
				component: ipadTrent
			}, {
				path: 'pay',
				name: 'pay',
				component: pay
			}, {
				path: 'pay_ok',
				name: 'pay_ok',
				component: payok
			}, {
				path: 'exit_class_ok',
				name: 'exit_class_ok',
				component: exitclassok

			}, {
				path: 'ipad_pay_ok',
				name: 'ipad_pay_ok',
				component: ipadPayok
			}, {
				path: 'ipad_pay',
				name: 'ipad_pay',
				component: ipadPay
			}, {
				path: 'exit_ipad',
				name: 'exit_ipad',
				component: exitIpad
			}, {
				path: 'exit_ipad_ok',
				name: 'exit_ipad_ok',
				component: exitIpadok
			}, {
				path: 'stu_info',
				name: 'stu_info',
				component: stuInfo
			}, {
				path: 'preferential',
				name: 'preferential',
				component: preferential
			}, {
				path: 'srecords',
				name: 'srecords',
				component: srecords,
				children: [{
					path: 'sclassrecords',
					name: 'sclassrecords',
					component: sclassrecords
				}, {
					path: 'sipadrecords',
					name: 'sipadrecords',
					component: sipadrecords
				}]
			}, {
				path: 'pdf',
				name: 'pdf',
				component: pdf
			}, {
				path: 'manage',
				name: 'manage',
				component: manage
			}, {
				path: 'chakanipad',
				name: 'chakanipad',
				component: chakanipad
			}, {
				path: 'prestulist',
				name: 'prestulist',
				component: prestulist
			}]
		}, {
			path: '/research',
			name: 'research',
			component: research,
			children: [{
					path: 'lessplanlist',
					name: 'lessplanlist',
					component: lessplanlist
				}, {
					path: 'planclasslist',
					name: 'planclasslist',
					component: planclasslist
				}, {
					path: 'question',
					name: 'question',
					component: question
				}, {
					path: 'classmanage',
					name: 'classmanage',
					component: classmanage
				}, {
					path: 'classstu',
					name: 'classstu',
					component: classstu
				}, {
					path: 'lessoninfo',
					name: 'lessoninfo',
					component: lessoninfo
				}, {
					path: 'addclass',
					name: 'addclass',
					component: addclass
				}, {
					path: 'addclasscourse',
					name: 'addclasscourse',
					component: addclasscourse
				}, {
					path: 'seevideo',
					name: 'seevideo',
					component: seevideo
				}, {
					path: 'editvideo',
					name: 'editvideo',
					component: editvideo
				}, {
					path: 'editclass',
					name: 'editclass',
					component: editclass,
					children: [, {
						path: 'editclassbasis',
						name: 'editclassbasis',
						component: editclassbasis
					}, {
						path: 'editclasslesson',
						name: 'editclasslesson',
						component: editclasslesson
					}, {
						path: 'editclassintroduce',
						name: 'editclassintroduce',
						component: editclassintroduce
					}, {
						path: 'editclasshistory',
						name: 'editclasshistory',
						component: editclasshistory
					}]
				}

			]
		}, {
			path: '/synthesis',
			name: 'synthesis',
			component: synthesis,
			children: [{
					path: 'seevideo',
					name: 'sseevideo',
					component: sseevideo
				},
				{
					path: 'editvideo',
					name: 'seditvideo',
					component: seditvideo
				},
				{
					path: 'addclass',
					name: 'saddclass',
					component: saddclass
				}, {
					path: 'addclasscourse',
					name: 'saddclasscourse',
					component: saddclasscourse
				},
				{
					path: 'store_list',
					name: 'store_list',
					component: storeList
				}, {
					path: 'add_store',
					name: 'add_store',
					component: addStore
				}, {
					path: 'userlist',
					name: 'userlist',
					component: userList
				}, {
					path: 'adduser',
					name: 'adduser',
					component: addUser
				}, {
					path: 'rolelist',
					name: 'rolelist',
					component: roleList
				}, {
					path: 'addrole',
					name: 'addrole',
					component: addRole
				}, {
					path: 'role',
					name: 'role',
					component: role
				}, {
					path: 'nodelist',
					name: 'nodelist',
					component: nodeList
				}, {
					path: 'addnode',
					name: 'addnode',
					component: addNode
				}, {
					path: 'classmanage',
					name: 'sclassmanage',
					component: sclassmanage
				}, {
					path: 'classstu',
					name: 'sclassstu',
					component: sclassstu
				}, {
					path: 'lessoninfo',
					name: 'slessoninfo',
					component: slessoninfo
				}, {
					path: 'editclass',
					name: 'seditclass',
					component: seditclass,
					children: [, {
						path: 'editclassbasis',
						name: 'seditclassbasis',
						component: oeditclassbasis
					}, {
						path: 'editclasslesson',
						name: 'seditclasslesson',
						component: oeditclasslesson
					}, {
						path: 'editclassintroduce',
						name: 'seditclassintroduce',
						component: seditclassintroduce
					}, {
						path: 'editclasshistory',
						name: 'seditclasshistory',
						component: seditclasshistory
					}]
				}
			]
		}, {
			path: '/userinfo',
			name: 'userinfo',
			component: userinfo
		}, {
			path: '/class_charge_prove',
			name: 'class_charge_prove',
			component: classChargeProve

		}, {
			path: '/ipad_charge_prove',
			name: 'ipad_charge_prove',
			component: ipadChargeProve

		}, {
			path: '/ipad_refund_prove',
			name: 'ipad_refund_prove',
			component: ipadRefundProve
		}, {
			path: '/class_refund_prove',
			name: 'class_refund_prove',
			component: classRefundProve
		}, {
			path: '/login',
			redirect: '/'
		}, {
			path: '/error',
			redirect: '/'
		}
	]
})