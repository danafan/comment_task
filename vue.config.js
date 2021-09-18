module.exports = {	
	devServer: {
		proxy: {
			'/user': {
				target:'http://evaluate.qisitask.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}