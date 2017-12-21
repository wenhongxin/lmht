const DEBUG = false
const SOCKETDEBUG = true
let SOCK_ADDRESS = SOCKETDEBUG ? 'ws://101.201.152.97:8890' : 'ws://101.201.152.97:8890';
let apiListUrl = JSON.parse(window.localStorage.getItem('apiListUrl'));
const common = {
	runtimeEnvironment:'test',
	versionNumber:'1.4.6',
	API:apiListUrl,
	userInfo: JSON.parse(window.localStorage.getItem('userInfo')),
	COOK: window.localStorage.getItem('COOK'),
	userID: window.localStorage.getItem('userID'),
	socketAddress: SOCK_ADDRESS,
	isDubug: DEBUG,
	setL: function(name, data) {
		window.localStorage.setItem(name, JSON.stringify(data))
	},
	getL: function(dataName) {
		return JSON.parse(window.localStorage.getItem(dataName));
	},
	setS: function(name, data) {
		window.sessionStorage.setItem(name, JSON.stringify(data))
	},
	getS: function(dataName) {
		return JSON.parse(window.sessionStorage.getItem(dataName));
	},
	clearS : function(){
		window.sessionStorage.clear()
	},
	clearL : function(){
		window.localStorage.clear()
	}
}
export default common;

/*说明
    common.apilist            说明：config/index本地化  **类型：JSON
    common.API                说明：接口配置列表         **类型：array
    common.userInfo           说明：用户登陆后的信息      **类型：array
    common.COOK               说明：检查用户状态是否有效   **类型：String
    common.userID             说明：老师UID             **类型：String
    common.socketAddress      说明：长链接地址           **类型：String      
    common.isDubug            说明：是否测试模式          **类型:Booleans
    common.set(name,data)     说明:localStorage写入     **类型: all
    common.get(dataName)      说明:localStorage获取     **类型: all
*/