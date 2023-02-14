import http from './request.js'
let path = {	
	login:'login/login',								//登录
	loginOut:'login/loginout',							//退出
	shopList:'order/shoplist',							//店铺列表
	orderList:'order/orderlist',						//评价列表
	getOrderDetail:'order/getorderdetail',				//获取任务详情
	auditEvaluate:'order/auditevaluate',				//任务审核
	invitationEvaluate:'order/invitationevaluate',		//邀请评价
	returnEvaluate:'order/returnevaluate',				//评价返图
	cancelEvaluate:'order/cancelevaluate',				//取消评价
	replaceOrder:'order/replaceorder',					//更换订单
	paymentEvaluate:'order/paymentevaluate',			//确认返款
	paymentEvaluateBatch:'order/paymentevaluatebatch',	//批量返款
	importFile:'file/importinvitationevaluate',			//导入模版

}
export default{
	//登录
	login(params){
		return http.post(path.login, params)
	},
	//退出
	loginOut(params){
		return http.get(path.loginOut, params)
	},
	//店铺列表
	shopList(params){
		return http.get(path.shopList, params)
	},
	//评价列表
	orderList(params){
		return http.get(path.orderList, params)
	},
	//获取任务详情
	getOrderDetail(params){
		return http.get(path.getOrderDetail, params)
	},
	//任务审核
	auditEvaluate(params){
		return http.post(path.auditEvaluate, params)
	},
	//邀请评价
	invitationEvaluate(params){
		return http.post(path.invitationEvaluate, params)
	},
	//评价返图
	returnEvaluate(params){
		return http.post(path.returnEvaluate, params)
	},
	//取消评价
	cancelEvaluate(params){
		return http.post(path.cancelEvaluate, params)
	},
	//更换订单
	replaceOrder(params){
		return http.post(path.replaceOrder, params)
	},
	//确认返款
	paymentEvaluate(params){
		return http.post(path.paymentEvaluate, params)
	},
	//批量返款
	paymentEvaluateBatch(params){
		return http.post(path.paymentEvaluateBatch, params)
	},
	//导入模版
	importFile(params){
		return http.post(path.importFile, params)
	},
}










