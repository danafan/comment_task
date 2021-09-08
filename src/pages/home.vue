<template>
	<div>
		<el-container class="box">
			<el-header class="header">
				<div class="gxk">评价系统</div>
				<div class="user_set">
					<img class="admin_logo" src="../static/admin_logo.png">
					<div class="header_text">用户名称</div>
					<div class="line"></div>
					<div class="header_text">退出</div>
				</div>
			</el-header>
			<el-container class="content_box">
				<div class="left_box">
					<el-menu
					@select="handleSelect" 
					:router="true" 
					:unique-opened="true" 
					:default-active="activeIndex"
					background-color="#ffffff"
					text-color="#333333"
					active-text-color="#ffffff"
					>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-date"></i>
							<span>评价管理</span>
						</template>
						<el-menu-item-group>     
							<el-menu-item index="/comment_list">评价列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</div>
			<el-main class="main">
				<el-card class="el_card">
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view v-if="!$route.meta.keepAlive"></router-view>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.header{
		background:#fff !important;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.gxk{
			margin-left: 20px;
			font-size: 18px;
			color: #333;
			font-weight: 600;
		}
		.user_set{
			border-bottom: 1px solid #ECEFF8;
			height: 64px;
			display: flex;
			align-items: center; 
			justify-content: flex-end;
			.admin_logo{
				margin-right: 8px;
				width: 21px;
				height: 21px;
			}
			.line{
				margin-right: 8px;
				margin-left: 8px;
				border-right: 1px solid #363D66;
				height:13px;
			}
			.header_text{
				font-size: 14px;
				color: #000;
			}
		}
	}
	.is-active {
		background:#008DFF !important;
	}
	.el-menu{
		border: none !important;
	}
	.content_box{
		height: 600px;
		.left_box{
			background: #ffffff;
			display: flex;
			flex-direction: column;
			height: 100%;
			i{
				color: #008DFF;
			}
		}
		.main{
			background: #ECEFF8;
			height: 100%;
			.el_card{
				height: 100%;
				overflow-y: scroll;
			}
			.el_card::-webkit-scrollbar {
				display: none; 
			}
		}
	}
}
</style>
<script>
	export default{
		data(){
			return{
				activeIndex:"/comment_list",
			}
		},
		watch:{
			$route(n){
				if(n.path != '/home'){
					this.handleSelect(n.path);
				};
			}
		},
		methods:{
			handleSelect(index){
				this.activeIndex = index;
				// if(index == '/data_role_user' || index == '/role_user'){
				// 	this.activeIndex = '/permssions_index';
				// }else{
				// 	this.activeIndex = index;
				// }
			}
		}
	}
</script>




















