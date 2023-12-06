module.exports = {	
	devServer: {
		proxy: {
			'/user': {
				target:'http://mjx.royalnever.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}