<template>
	<div>
		<el-form :inline="true" size="small" class="demo-form-inline">
			<el-form-item label="管理员:" style="margin-right: 20px">
				<el-input clearable placeholder="输入管理员" v-model="admin_name"></el-input>
			</el-form-item>
			<el-form-item label="店铺名称:" style="margin-right: 20px">
				<el-select v-model="shop_id" clearable filterable :popper-append-to-body="false"placeholder="全部">
					<el-option v-for="item in store_list" :key="item.shop_id" :label="item.shop_name" :value="item.shop_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品ID:" style="margin-right: 20px">
				<el-input clearable placeholder="输入商品ID" v-model="goods_id"></el-input>
			</el-form-item>
			<el-form-item label="订单号:" style="margin-right: 20px">
				<el-input clearable placeholder="输入订单号" v-model="order_sn"></el-input>
			</el-form-item>
			<el-form-item label="旺旺号:" style="margin-right: 20px">
				<el-input clearable placeholder="旺旺号" v-model="ww"></el-input>
			</el-form-item>
			<el-form-item label="评价状态:" style="margin-right: 20px">
				<el-select v-model="status" clearable :popper-append-to-body="false" placeholder="全部">
					<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单日期:" style="margin-right: 20px">
				<el-date-picker v-model="order_date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false" :picker-options="pickerOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="邀请日期:" style="margin-right: 20px">
				<el-date-picker v-model="invitation_date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false" :picker-options="pickerOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="提交日期:" style="margin-right: 20px">
				<el-date-picker v-model="commit_date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false" :picker-options="pickerOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="完成时间:" style="margin-right: 20px">
				<el-date-picker v-model="over_date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false" :picker-options="pickerOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="返款状态:" style="margin-right: 20px">
				<el-select v-model="is_payment" clearable :popper-append-to-body="false" placeholder="全部">
					<el-option label="未返款" value="0"></el-option>
					<el-option label="已返款" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单来源:" style="margin-right: 20px">
				<el-select v-model="source" clearable :popper-append-to-body="false" placeholder="全部">
					<el-option label="红包系统" value="1"></el-option>
					<el-option label="会员系统" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="searchFun">搜索</el-button>
			</el-form-item>
		</el-form>
		<div class="buts">
			<el-button size="small" type="primary" v-if="role_id == '2'" @click="import_dialog = true">导入</el-button>
			<div style="display: flex">
				<el-button type="primary" plain size="small" @click="returnMoney('all')">批量返款</el-button>
				<el-button type="primary" plain size="small" @click="exportFile">导出<i class="el-icon-download el-icon--right"></i></el-button>
			</div>
		</div>
		<el-table size="small" :data="dataObj.data" tooltip-effect="dark" style="width: 100%" max-height="600" :header-cell-style="{'background':'#f4f4f4'}" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" fixed :selectable="checkboxInit">
			</el-table-column>
			<el-table-column align="center" :width="160" property="order_id" label="编号"></el-table-column>
			<el-table-column align="center" :width="160" property="goods_id" label="商品ID"></el-table-column>
			<el-table-column align="center" :width="160" property="ww" label="旺旺号"></el-table-column>
			<el-table-column align="center" :width="160" property="admin_name" label="管理员"></el-table-column>
			<el-table-column align="center" :width="160" property="order_sn" label="订单号"></el-table-column>
			<el-table-column align="center" :width="160" property="shop_name" label="店铺"></el-table-column>
			<el-table-column align="center" :width="160" property="order_time" label="订单日期"></el-table-column>
			<el-table-column align="center" :width="160" property="invitation_time" label="邀请时间"></el-table-column>
			<el-table-column align="center" :width="160" property="status_name" label="任务状态"></el-table-column>
			<el-table-column align="center" :width="160" property="fail_reason" label="原因">
			</el-table-column>
			<el-table-column label="操作" align="center" width="180" fixed="right">
				<template slot-scope="scope">
					<div v-if="role_id == '2'">
						<el-button type="text" size="small" @click="getOrderDetail('1',scope.row.order_id)" v-if="scope.row.status == '1'">邀请评价</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == '2'" @click="cancelOrder(scope.row.order_id)">取消任务</el-button>
						<el-button type="text" size="small" @click="getOrderDetail('2',scope.row.order_id)" v-if="scope.row.status != '1' && scope.row.status != '3'">查看</el-button>
						<el-button type="text" size="small" @click="getOrderDetail('3',scope.row.order_id)" v-if="scope.row.status == '3'">审核</el-button>
					</div>
					<div v-if="role_id == '3'">
						<el-button type="text" size="small" @click="returnMoney('one',scope.row.order_id)" v-if="scope.row.status == '4' && scope.row.is_payment == 0">返款</el-button>
						<el-button type="text" size="small" @click="replaceOrder(scope.row.order_id)" v-if="scope.row.status == '2'">更换订单</el-button>
						<el-button type="text" size="small" @click="getOrderDetail('4',scope.row.order_id)" v-if="scope.row.status == '2'">提交任务</el-button>
						<el-button type="text" size="small" @click="getOrderDetail('2',scope.row.order_id)" v-if="scope.row.status != '1' && scope.row.status != '2'">查看</el-button>
						<el-button type="text" size="small" @click="getOrderDetail('4',scope.row.order_id)" v-if="scope.row.status == '3' || scope.row.status == '5'">编辑</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="page_row">
			<el-popover
			ref="popover_ref"
			placement="top"
			width="200"
			trigger="click">
			<div class="add_popover">
				<el-input style="width: 160px;margin-bottom: 10px;" size="mini" type="number" v-model="size_num">
					<template slot="append">条/页</template>
				</el-input>
				<el-button type="primary" size="mini" @click="addSizeNumber">保存</el-button>
			</div>
			<el-button slot="reference" size="mini" plain>新增</el-button>
		</el-popover>
		<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:pager-count="11"
		:page-size="pagesize"
		:page-sizes="page_sizes"
		layout="total, sizes,slot, prev, pager, next, jumper"
		:total="dataObj.total"
		>
	</el-pagination>
</div>
<!-- 弹框 -->
<el-dialog :title="dialog_title" center @close="closeDialog" :close-on-click-modal="false" :visible.sync="showDialog">
	<div class="dialog_row">
		<div class="label">订单日期</div>
		<div class="value">{{orderDetail.order_time}}</div>
	</div>
	<div class="dialog_row" v-if="orderDetail.status > 1">
		<div class="label">邀请时间</div>
		<div class="value">{{orderDetail.invitation_time}}</div>
	</div>
	<div class="dialog_row" v-if="orderDetail.status > 2">
		<div class="label">提交时间</div>
		<div class="value">{{orderDetail.submit_time}}</div>
	</div>
	<div class="dialog_row" v-if="orderDetail.status > 3">
		<div class="label">完成时间</div>
		<div class="value">{{orderDetail.finish_time}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">编号</div>
		<div class="value">{{orderDetail.order_id}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">商品ID</div>
		<div class="value">{{orderDetail.goods_id}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">店铺名</div>
		<div class="value">{{orderDetail.shop_name}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">旺旺号</div>
		<div class="value">{{orderDetail.ww}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">管理员</div>
		<div class="value">{{orderDetail.admin_name}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">订单号</div>
		<div class="value">{{orderDetail.order_sn}}</div>
	</div>
	<div class="dialog_row">
		<div class="label">评论图片</div>
		<!-- 上传图片 -->
		<div class="value" v-if="diaLogType == '1'">
			<div class="dialog_img" v-for="(item,index) in comment_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
				<img class="img" :src="item.img_url">
				<div class="modal" v-if="item.is_del == true">
					<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
				</div>
			</div>
			<UploadFile file_type="1" @callbackFn="callbackFn" v-if="comment_show_list.length < 5"/>
		</div>
		<!-- 展示图片 -->
		<div class="value" v-else>
			<div class="dialog_img" v-for="item in orderDetail.eva_imgs">
				<img class="img" :src="item">
			</div>
		</div>
	</div>
	<div class="dialog_row">
		<div class="label">评论视频</div>
		<!-- 上传视频 -->
		<div class="value" v-if="diaLogType == '1'">
			<UploadFile :is_video="true" @callbackFn="uploadVideo" v-if="video_data == ''"/>
			<div class="dialog_img" v-else @mouseenter="del_video = true" @mouseleave="del_video = false">
				<video class="img" controls autoplay :src="video_data"></video>
				<div class="modal" v-if="del_video == true">
					<img src="../../static/deleteImg.png" @click="delVideo">
				</div>
			</div>
		</div>
		<!-- 展示视频 -->
		<div class="value" v-else>
			<div class="dialog_img">
				<video class="img" controls autoplay :src="video_data" v-if="video_data != ''"></video>
			</div>
		</div>
	</div>
	<div class="dialog_row">
		<div class="label">评论内容</div>
		<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入评论内容" :disabled="diaLogType != '1'" v-model="comment_content">
		</el-input>
	</div>
	<div class="dialog_row">
		<div class="label">追评图片</div>
		<!-- 上传图片 -->
		<div class="value" v-if="diaLogType == '1'">
			<div class="dialog_img" v-for="(item,index) in zhui_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
				<img class="img" :src="item.img_url">
				<div class="modal" v-if="item.is_del == true">
					<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
				</div>
			</div>
			<UploadFile file_type="2" @callbackFn="callbackFn" v-if="zhui_show_list.length < 5"/>
		</div>
		<!-- 展示图片 -->
		<div class="value" v-else>
			<div class="dialog_img" v-for="item in orderDetail.add_eva_imgs">
				<img class="img" :src="item">
			</div>
		</div>
	</div>
	<div class="dialog_row">
		<div class="label">追评内容</div>
		<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入追评内容" :disabled="diaLogType != '1'" v-model="zhui_content">
		</el-input>
	</div>
	<div class="dialog_row" v-if="diaLogType != '1'">
		<div class="label">任务返图</div>
		<!-- 上传图片 -->
		<div class="value" v-if="diaLogType == '4'">
			<div class="dialog_img" v-for="(item,index) in fan_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
				<img class="img" :src="item.img_url">
				<div class="modal" v-if="item.is_del == true">
					<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
				</div>
			</div>
			<UploadFile file_type="3" @callbackFn="callbackFn" v-if="fan_show_list.length < 5"/>
		</div>
		<!-- 展示图片 -->
		<div class="value" v-else>
			<div class="dialog_img" v-for="item in orderDetail.return_imgs">
				<img class="img" :src="item">
			</div>
		</div>
	</div>
	<div class="dialog_row" v-if="diaLogType == '3'">
		<div class="label">审核类型</div>
		<el-radio-group v-model="type">
			<el-radio label="1">通过</el-radio>
			<el-radio label="2">拒绝</el-radio>
		</el-radio-group>
	</div>
	<div class="dialog_row" v-if="type == '2'">
		<div class="label">拒绝理由</div>
		<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入拒绝理由" :disabled="diaLogType == '2'" v-model="reason_content">
		</el-input>
	</div>
	<div slot="footer" class="dialog-footer">
		<el-button type="primary" size="small" @click="showDialog = false">取消</el-button>
		<el-button type="primary" size="small" class="mmm" data-clipboard-target="#mmm" v-if="role_id == '3'" @click="copyContent">一键复制</el-button>
		<el-button type="primary" size="small" @click="submit" v-if="diaLogType != '2'">提交</el-button>
	</div>
</el-dialog>
<!-- 需要复制的内容 -->
<div class="m_box" id="mmm">
	<div>订单日期：</div>
	<div>{{orderDetail.order_time}}</div>
	<div>旺旺号：</div>
	<div>{{orderDetail.ww}}</div>
	<div>订单号：</div>
	<div>{{orderDetail.order_sn}}</div>
	<div>评论图片：</div>
	<img class="img" :src="item" v-for="item in orderDetail.eva_imgs">
	<div>评论内容：</div>
	<div>{{comment_content}}</div>
	<div>追评图片：</div>
	<img class="img" :src="item" v-for="item in orderDetail.add_eva_imgs">
	<div>追评内容：</div>
	<div>{{zhui_content}}</div>
</div>
<!-- 返款 -->
<el-dialog title="确认返款" :visible.sync="fk_model">
	<el-form size="small">
		<el-form-item label="返款路径:">
			<el-radio-group v-model="fk_type">
				<el-radio :label="2">返管理员支付宝</el-radio>
				<el-radio :label="1">返款给会员支付宝</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="合并返款:" v-if="fk_type == 2 && back_type == 'all'">
			<el-radio-group v-model="is_merge">
				<el-radio :label="1">是</el-radio>
				<el-radio :label="0">否</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button size="small" @click="fk_model = false">取消</el-button>
		<el-button size="small" type="primary" @click="confirmFk">确认</el-button>
	</div>
</el-dialog>
<!-- 导入 -->
<el-dialog :visible.sync="import_dialog" title="导入" width="30%">
	<div class="down_box">
		<el-button type="primary" plain size="small" @click="downTemplate">下载模版<i class="el-icon-download el-icon--right"></i></el-button>
		<div class="upload_box">
			<el-button type="primary" size="small">
				导入
				<i class="el-icon-upload el-icon--right"></i>
			</el-button>
			<input type="file" ref="csvUpload" class="upload_file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadCsv">
		</div>
	</div>
	<div slot="footer" class="dialog_footer">
		<el-button size="small" @click="import_dialog = false">取消</el-button>
	</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
	.dialog_row{
		margin-bottom: 12px;
		display: flex;
		font-size: 14px;
		.label{
			width: 80px;
			font-weight: bold;
		}
		.value{
			display:flex;
			flex-wrap: wrap;
			.dialog_img{
				margin-right: 10px;
				margin-bottom: 10px;
				position: relative;
				width: 120px;
				height: 120px;
				.img{
					width: 100%;
					height: 100%;
				}
				.modal{
					background: rgba(0,0,0,.6);
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					img{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						display:block;
						width: 30px;
						height: 30px;
					}
				}
			}
		}
		.input_ele{
			width: 380px;
		}
	}
	.m_box{
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}
	.buts{
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.down_box{
		display:flex;

		padding:30px;
		.upload_box{
			margin-left: 10px;
			position: relative;
			.upload_file{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
	.add_popover{
		display: flex;
		flex-direction: column;
		align-items:center;
	}
	.page_row{
		margin-top: 5px;
		display: flex;
		align-items: center;
	}
</style>
<script>
	import resource from '../../api/resource.js'
	import UploadFile from '../../components/upload_file.vue'
	import Clipboard from 'clipboard'
	import {exportUp} from '../../api/export.js'
	export default{
		data(){
			return{
				role_id:"",
				store_list:[],								//店铺名称
				admin_name:"",								//管理员
				shop_id:'',									//选中的店铺名称
				goods_id:'',								//商品ID
				order_sn:"",
				ww:"",
				status_list:[{
					id:'1',
					name:'待邀请'
				},{
					id:'2',
					name:'已邀请'
				},{
					id:'3',
					name:'待审核'
				},{
					id:'4',
					name:'审核通过'
				},{
					id:'5',
					name:'审核拒绝'
				},{
					id:'6',
					name:'评价失败'
				}],											//评价状态
				status:'',									//选中的评价状态
				pickerOptions: {
					shortcuts: [{
						text: '当月',
						onClick(picker) {
							const start = getMonthStartDate();
							const end = getCurrentDate();
							picker.$emit('pick', [start, end]);
						}
					},{
						text: '上个月',
						onClick(picker) {
							const start = getLastMonthStartDate(1);
							const end = getLastMonthEndDate(0);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '上上个月',
						onClick(picker) {
							const start = getLastMonthStartDate(2);
							const end = getLastMonthEndDate(1);
							picker.$emit('pick', [start, end]);
						}
					}]
				},	 										
				order_date:[],								//订单日期
				start_time:"",								//开始时间
				end_time:"",								//结束时间
				invitation_date:[],							//邀请日期
				invitation_time_start:"",
				invitation_time_end:"",	
				commit_date:[],								//提交日期
				submit_time_start:"",
				submit_time_end:"",
				over_date:[],								//完成时间
				finish_time_start:"",
				finish_time_end:"",
				is_payment:"",								//返款状态
				source:"",									//订单来源
				pagesize:10,
				page:1,
				dataObj:{},									//评价返回数据
				showDialog:false,							//默认弹框不显示
				diaLogType:'1',								//弹框类型（1:邀请；2:查看；3:审核；4:编辑）
				dialog_title:"邀请评价",
				orderDetail:{},								//评价任务详情
				comment_show_list:[],						//评论图片数组(展示)
				comment_pass_list:[],						//评论图片数组(传递)
				zhui_show_list:[],							//追评图片数组(展示)
				zhui_pass_list:[],							//追评图片数组(传递)
				fan_show_list:[],							//返图图片数组(展示)
				fan_pass_list:[],							//返图图片数组(传递)
				video_data:'',								//视频地址
				video_arg:{},								//上传的视频文件
				del_video:false,							//删除视频文件弹框
				comment_content:"",							//评论内容
				zhui_content:"",							//追评内容
				type:'1',									//审核类型（1:通过；2:拒绝）
				reason_content:"",							//拒绝理由
				fk_model:false,	//返款弹窗
				fk_type:2,			//返款路径
				is_merge:1,			//是否合并返款
				order_id:"",			
				back_type:"",				//返款类型
				multiple_selection:[],		//多选的列表
				import_dialog:false,
				page_sizes:null,
				size_num:""
			}
		},
		created(){
			let page_sizes = localStorage.getItem("page_sizes");
			this.page_sizes = page_sizes?JSON.parse(page_sizes):[5, 10, 15, 20,30];
			this.role_id =localStorage.getItem("role_id");
			//获取店铺列表
			this.shopList();
			//评价列表
			this.orderList();
		},
		watch:{
			//订单日期
			order_date:function(n){
				this.start_time = n && n.length> 0?n[0]:"";
				this.end_time = n && n.length> 0?n[1]:"";
			},
			//邀请日期
			invitation_date:function(n){
				this.invitation_time_start = n && n.length> 0?n[0]:"";
				this.invitation_time_end = n && n.length> 0?n[1]:"";
			},
			//提交日期
			commit_date:function(n){
				this.submit_time_start = n && n.length> 0?n[0]:"";
				this.submit_time_end = n && n.length> 0?n[1]:"";
			},
			//完成日期
			over_date:function(n){
				this.finish_time_start = n && n.length> 0?n[0]:"";
				this.finish_time_end = n && n.length> 0?n[1]:"";
			},
			//弹框类型
			diaLogType:function(n){
				if(n == '1'){
					this.dialog_title = '邀请评价';
				}else if(n == '2'){
					this.dialog_title = '查看';
				}else if(n == '3'){
					this.dialog_title = '审核';
				}else if(n == '4'){
					this.dialog_title = '提交任务';
				}
			},
			//审核类型
			type:function(n){
				if(n == '1'){
					this.reason_content = "";
				}
			},
		},
		methods:{
			//导出
			exportFile(){
				var arr = [];
				let arg = {
					admin_name:this.admin_name,
					status:this.status == ''?'0':this.status,
					shop_id:this.shop_id == ''?'0':this.shop_id,
					goods_id:this.goods_id,
					order_sn:this.order_sn,
					ww:this.ww,
					order_time_start:this.start_time,
					order_time_end:this.end_time,
					invitation_time_start:this.invitation_time_start,
					invitation_time_end:this.invitation_time_end,
					submit_time_start:this.submit_time_start,
					submit_time_end:this.submit_time_end,
					finish_time_start:this.finish_time_start,
					finish_time_end:this.finish_time_end,
					is_payment:this.is_payment,
					source:this.source
				}
				for(var item in arg){
					let str = item + '=' + arg[item];
					arr.push(str);
				};
				exportUp(`order/exportorderlist?${arr.join('&')}`)
			},
			//下载模版
			downTemplate(){
				let downLoadUrl = `${location.origin}/user/`
				window.open(`${downLoadUrl}file/importinvitationevaluate`);
			},
			//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					resource.importFile({file:files[0]}).then(res => {
						this.$refs.csvUpload.value = null;
						this.import_dialog = false;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//获取店铺列表
			shopList(){
				resource.shopList().then(res =>{
					if(res.data.code == 1){
						this.store_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击搜索
			searchFun(){
				this.page = 1;
				//评价列表
				this.orderList();
			},
			//评价列表
			orderList(){
				let arg = {
					admin_name:this.admin_name,
					status:this.status == ''?'0':this.status,
					shop_id:this.shop_id == ''?'0':this.shop_id,
					goods_id:this.goods_id,
					order_sn:this.order_sn,
					ww:this.ww,
					order_time_start:this.start_time,
					order_time_end:this.end_time,
					invitation_time_start:this.invitation_time_start,
					invitation_time_end:this.invitation_time_end,
					submit_time_start:this.submit_time_start,
					submit_time_end:this.submit_time_end,
					finish_time_start:this.finish_time_start,
					finish_time_end:this.finish_time_end,
					is_payment:this.is_payment,
					source:this.source,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.orderList(arg).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//设置不可勾选
			checkboxInit(row) {
				if(this.role_id == '3' && row.is_payment == 0 && row.status == 4) { 
					return 1;
				} else { 
					return 0
				}
			},
			//点击确认添加页数量
			addSizeNumber(){
				if(!this.isZzs.test(this.size_num)){
					this.$message.warning('每页数量为正整数！')
				}else if(this.page_sizes.indexOf(this.size_num) > -1){
					this.$message.warning('该数量已存在！')
				}else{
					this.page_sizes.push(parseInt(this.size_num));
					this.handleSizeChange(parseInt(this.size_num))
					this.size_num = "";
					this.$refs['popover_ref'].doClose();
					localStorage.setItem("page_sizes",JSON.stringify(this.page_sizes));
				}
			},
			//分页
			handleSizeChange(val) {
				this.pagesize = val;
				//获取列表
				this.orderList();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取列表
				this.orderList();
			},
			//返款
			returnMoney(type,order_id){
				this.back_type = type;
				if(this.back_type == 'one'){
					this.order_id = order_id;
				}else{
					if(this.multiple_selection.length == 0){
						this.$message.warning('请至少选择一条!');
						return;
					}else{
						let order_ids = [];
						this.multiple_selection.map(item => {
							order_ids.push(item.order_id);
						})
						this.order_id = order_ids;
					}
				}
				this.fk_model = true;
			},
			//确认返款
			confirmFk(){
				if(this.back_type == 'one'){
					let arg = {
						order_id:this.order_id,
						type:this.fk_type
					}
					resource.paymentEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.fk_model = false;
							//获取列表
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{
					let arg = {
						order_ids:this.order_id,
						type:this.fk_type
					}
					if(this.fk_type == 2){
						arg.is_merge = this.is_merge;
					}
					resource.paymentEvaluateBatch(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.fk_model = false;
							//获取列表
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//获取任务详情
			getOrderDetail(diaLogType,order_id){
				resource.getOrderDetail({order_id:order_id}).then(res => {
					if(res.data.code == 1){
						this.orderDetail = res.data.data;
						this.diaLogType = diaLogType;
						//评论内容
						this.comment_content = this.orderDetail.eva_content;
						//追评内容
						this.zhui_content = this.orderDetail.add_eva_content;
						//评论图片
						if(this.orderDetail.eva_videos.length > 0){
							this.video_data = this.orderDetail.eva_videos[0];
						}
						this.showDialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//关闭弹框的回调
			closeDialog(){
				this.orderDetail = {};
				this.comment_show_list = [];						//评论图片数组(展示)
				this.comment_pass_list = [];						//评论图片数组(传递)
				this.zhui_show_list = [];						//追评图片数组(展示)
				this.zhui_pass_list = [];						//追评图片数组(传递)
				this.fan_show_list = [];						//返图图片数组(展示)
				this.fan_pass_list = [];							//返图图片数组(传递)
				this.comment_content = "";
				this.zhui_content = "";
				this.reason_content = "";
				this.video_data = "";
				this.video_arg = {};
			},
			//上传视频
			uploadVideo(e){
				this.video_arg = e.files[0];
				var fr = new FileReader();
				fr.readAsDataURL(this.video_arg);
				fr.onload = (e) => {
					this.video_data = e.target.result;
				};
			},
			//删除视频
			delVideo(){
				this.video_data = '';
				this.video_arg = {};
				this.del_video = false;
			},
			//上传图片
			callbackFn(v){
				var files = v.files;			//图片数组
				var file_type = v.file_type;	//图片类型（1:评论图片；2:追评图片；3:任务返图）
				if((file_type == '1' && (this.comment_show_list.length + files.length > 5)) || (file_type == '2' && (this.zhui_show_list.length + files.length > 5)) || (file_type == '3' && (this.fan_show_list.length + files.length > 5))){
					this.$message.warning('图片不能超过5张！');
				}else{
					for(var i = 0;i < files.length;i ++){
						if(file_type == '1'){	//1:评论图片
							//传递的图片对象
							this.comment_pass_list.push(files[i]);	
						}else if(file_type == '2'){	//2:追评图片
							//传递的图片对象
							this.zhui_pass_list.push(files[i]);	
							}else if(file_type == '3'){	//3:任务返图
							//传递的图片对象
								this.fan_pass_list.push(files[i]);	
							}	
							var fr = new FileReader();
							fr.onload = (e) => {
								let show_list_obj = {
									img_url:e.target.result,
									file_type:file_type,
									is_del:false
								}
							if(file_type == '1'){	//1:评论图片
								//预览的图片地址
								this.comment_show_list.push(show_list_obj);
							}else if(file_type == '2'){	//2:追评图片
								//预览的图片地址
								this.zhui_show_list.push(show_list_obj);
							}else if(file_type == '3'){	//3:任务返图
								//预览的图片地址
								this.fan_show_list.push(show_list_obj);	
							}
						};
						fr.readAsDataURL(files[i]);
					}
				}
			},
			//删除图片
			deteleFile(file_type,index){
				if(file_type == '1'){	//1:评论图片
					this.comment_show_list.splice(index,1);
					this.comment_pass_list.splice(index,1);
				}else if(file_type == '2'){	//2:追评图片
					this.zhui_show_list.splice(index,1);
					this.zhui_pass_list.splice(index,1);
				}else if(file_type == '3'){	//3:任务返图
					this.fan_show_list.splice(index,1);
					this.fan_pass_list.splice(index,1);
				}
			},
			//复制评论内容
			copyContent (type) {
				var clipboard = new Clipboard(".mmm");
				clipboard.on('success', e => {
					this.$message.success('复制成功');
				})
				clipboard.on('error', e =>{
     				// 不支持复制
					this.$message.warning('该浏览器不支持复制')
				})
			},
			//点击取消任务
			cancelOrder(order_id){
				this.$prompt('输入取消原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					let arg = {
						order_id:order_id,
						reason:value
					}
					resource.cancelEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});       
				});
			},
			//更换订单
			replaceOrder(order_id){
				this.$prompt('输入订单编号', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					if(!value){
						this.$message.warning('请输入订单编号!');
					}else{
						let arg = {
							order_id:order_id,
							new_order_sn:value
						}
						resource.replaceOrder(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.orderList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});       
				});
			},
			//确认
			submit(){
				if(this.diaLogType == '1'){				//邀请
					if(!this.comment_content){
						this.$message.warning('请输入评价内容');
						return;
					}
					var arg = {
						order_id:this.orderDetail.order_id,
						eva_content:this.comment_content,
						add_eva_content:this.zhui_content,
						eva_video_1:this.video_arg
					}
					this.comment_pass_list.map((item,index) => {
						let kk = 'eva_img_' + (index + 1);
						arg[kk] = item;
					});
					this.zhui_pass_list.map((item,index) => {
						let kk = 'add_eva_img_' + (index + 1);
						arg[kk] = item;
					})
					resource.invitationEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.showDialog = false;
							//评价列表
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else if(this.diaLogType == '3'){		//审核
					let arg = {
						order_id:this.orderDetail.order_id,
						type:this.type,
						reason:this.type == '1'?'':this.reason_content
					}
					resource.auditEvaluate(arg).then(res => {
						this.$message.success(res.data.msg);
						this.showDialog = false;
						//评价列表
						this.orderList();
					})
				}else if(this.diaLogType == '4'){		//编辑
					if(this.fan_pass_list.length == 0){
						this.$message.warning('至少上传一张评价返图！');
						return;
					}
					var args = {
						order_id:this.orderDetail.order_id
					}
					this.fan_pass_list.map((item,index) => {
						let kk = 'return_img_' + (index + 1);
						args[kk] = item;
					});
					resource.returnEvaluate(args).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.showDialog = false;
							//评价列表
							this.orderList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			}
		},
		components:{
			UploadFile
		}
	}
</script>















