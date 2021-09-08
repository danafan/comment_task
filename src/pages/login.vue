<template>
	<div class="container">
		<img class="login_back" src="../static/login_back.png">
		<div class="login_box">
			<div class="title">登录</div>
			<input type="text" placeholder="请输入账号" v-model="account">
			<input type="password" placeholder="请输入登录密码" v-model="password">
			<div class="login_button" @click="login">登录</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.login_back{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.login_box{
		box-shadow: 6px 6px 30px 0px rgba(202, 202, 202, 0.5);
		border-radius: 2px;
		background: #ffffff;
		position: absolute;
		top: 260px;
		right: 225px;
		width: 450px;
		height: 455px;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		.title{
			font-size: 20px;	
			color: #008DFF;
		}
		input{
			outline: none;
			border:none;
			width: 328px;
			height: 48px;
			background: #F0F0F0;
			border-radius: 4px;
			padding-left: 25px;
			padding-right: 25px;
			font-size: 16px;
		}
	}
	.login_button{
		width: 140px;
		text-align: center;
		height: 38px;
		line-height: 38px;
		background: #008DFF;
		border-radius: 2px;
		font-size: 14px;
		color:#fff;
	}
}
</style>
<script>
	export default{
		data(){
			return{
				account:"",
				password:""
			}
		},
		methods:{
			login(){
				if(this.account == ''){
					this.$message.warning('请输入账号');
				}else if(this.password == ''){
					this.$message.warning('请输入登录密码');
				}else{
					console.log(this.account)
					console.log(this.password)
				}
			}
		}
	}
</script>