module.exports = {	
	devServer: {
		proxy: {
			'/user': {
				target:'http://mjx.jinshijinri.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}