module.exports = {	
	devServer: {
		proxy: {
			'/user': {
				target:'http://evaluate.jinshijinri.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}