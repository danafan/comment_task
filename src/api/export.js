import { MessageBox,Message } from 'element-ui';

export function exportUp(url){
	MessageBox.confirm('确认导出?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		let req = {};
		let req_arr = url.split('?')[1].split('&');
		req_arr.map(item => {
			req[item.split('=')[0]] = item.split('=')[1];
		})
		let open_url = `${location.origin}/user/${url.split('?')[0]}?${req_arr.join('&')}`;
		window.open(open_url);
	}).catch(() => {
		Message({
			type: 'info',
			message: '取消导出'
		});          
	});
}


