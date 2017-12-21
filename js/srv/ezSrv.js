/**
 * Created by wuyu on 2017/3/28.
 */
import common from 'common';

function getSrvData(request) {
	//console.log(request)
	request.headers = {
		'ua-limi': "livevideo-teacher",
		'COOK': common.getS("COOK")
	}
	return $.ajax(request)
}
export default {
	getSrvData: getSrvData
}