<template>
	<div>
		<el-form :inline="true" size="small" class="demo-form-inline">
			<el-form-item label="店铺名称:" style="margin-right: 20px">
				<el-select v-model="select_store_list" clearable :popper-append-to-body="false" multiple filterable collapse-tags placeholder="全部">
					<el-option v-for="item in store_list" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="编号:" style="margin-right: 20px">
				<el-input clearable placeholder="输入编号" v-model="code"></el-input>
			</el-form-item>
			<el-form-item label="商品ID:" style="margin-right: 20px">
				<el-input clearable placeholder="输入商品ID" v-model="goods_id"></el-input>
			</el-form-item>
			<el-form-item label="评价状态:" style="margin-right: 20px">
				<el-select v-model="select_status_list" clearable :popper-append-to-body="false" multiple filterable collapse-tags placeholder="全部">
					<el-option v-for="item in status_list" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单日期:" style="margin-right: 20px">
				<el-date-picker v-model="order_date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false" :picker-options="pickerOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="getList">搜索</el-button>
			</el-form-item>
		</el-form>
		<!-- <el-table size="small" :data="dataObj.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column align="center" :width="160" property="ksbm" label="编号"></el-table-column>
			<el-table-column align="center" :width="160" property="gyshh" label="商品ID"></el-table-column>
			<el-table-column align="center" :width="160" property="mc" label="旺旺号"></el-table-column>
			<el-table-column align="center" :width="160" property="gys" label="订单号"></el-table-column>
			<el-table-column align="center" :width="160" property="sjhpxz" label="店铺"></el-table-column>
			<el-table-column align="center" :width="160" property="jyhpxz" label="订单日期"></el-table-column>
			<el-table-column align="center" :width="160" property="sjxrrq" label="任务状态"></el-table-column>
			<el-table-column align="center" :width="160" property="remark" label="取消理由">
			</el-table-column>
			<el-table-column align="center" :width="160" property="remark" label="拒绝理由">
			</el-table-column>
			<el-table-column align="center" :width="160" property="remark" label="接单人">
			</el-table-column>
			<el-table-column label="操作" align="center" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button type="text" size="small">邀请评价</el-button>
					<el-button type="text" size="small">取消任务</el-button>
					<el-button type="text" size="small">查看</el-button>
					<el-button type="text" size="small">审核</el-button>

					<el-button type="text" size="small">编辑</el-button>
					<el-button type="text" size="small">取消</el-button>
					<el-button type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:pager-count="11"
			:page-sizes="[5, 10, 15, 20]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="dataObj.total"
			>
		</el-pagination>
	</div> -->
	<!-- 弹框 -->
	<el-dialog title="弹框" center :visible.sync="showDialog">
		<div class="dialog_row">
			<div class="label">订单日期</div>
			<div class="value">2021/6/9</div>
		</div>
		<div class="dialog_row">
			<div class="label">编号</div>
			<div class="value">111213</div>
		</div>
		<div class="dialog_row">
			<div class="label">商品ID</div>
			<div class="value">123123123</div>
		</div>
		<div class="dialog_row">
			<div class="label">店铺名</div>
			<div class="value">胖胖哥</div>
		</div>
		<div class="dialog_row">
			<div class="label">旺旺号</div>
			<div class="value">123123</div>
		</div>
		<div class="dialog_row">
			<div class="label">订单号</div>
			<div class="value">12736817236817236</div>
		</div>
		<div class="dialog_row">
			<div class="label">评论图片</div>
			<div class="value">
				<div class="dialog_img" v-for="(item,index) in comment_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
					<img class="img" :src="item.img_url">
					<div class="modal" v-if="item.is_del == true">
						<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
					</div>
				</div>
				<UploadFile file_type="1" @callbackFn="callbackFn" v-if="comment_show_list.length < 5"/>
			</div>
		</div>
		<div class="dialog_row">
			<div class="label">评论内容</div>
			<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入评论内容" v-model="comment_content">
			</el-input>
		</div>
		<div class="dialog_row">
			<div class="label">追评图片</div>
			<div class="value">
				<div class="dialog_img" v-for="(item,index) in zhui_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
					<img class="img" :src="item.img_url">
					<div class="modal" v-if="item.is_del == true">
						<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
					</div>
				</div>
				<UploadFile file_type="2" @callbackFn="callbackFn" v-if="zhui_show_list.length < 5"/>
			</div>
		</div>
		<div class="dialog_row">
			<div class="label">追评内容</div>
			<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入追评内容" v-model="zhui_content">
			</el-input>
		</div>
		<div class="dialog_row">
			<div class="label">接单人</div>
			<el-select v-model="those_orders" size="small" clearable :popper-append-to-body="false" placeholder="请选择">
				<el-option v-for="item in those_orders_list" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="dialog_row">
			<div class="label">任务返图</div>
			<div class="value">
				<div class="dialog_img" v-for="(item,index) in fan_show_list" @mouseenter="item.is_del = true" @mouseleave="item.is_del = false">
					<img class="img" :src="item.img_url">
					<div class="modal" v-if="item.is_del == true">
						<img src="../../static/deleteImg.png" @click="deteleFile(item.file_type,index)">
					</div>
				</div>
				<UploadFile file_type="3" @callbackFn="callbackFn" v-if="fan_show_list.length < 5"/>
			</div>
		</div>
		<div class="dialog_row">
			<div class="label">拒绝理由</div>
			<el-input type="textarea" class="input_ele" :rows="3" placeholder="输入拒绝理由" v-model="reason_content">
			</el-input>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" size="small">取消</el-button>
			<el-button type="primary" size="small">确认</el-button>
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
</style>
<script>
	import UploadFile from '../../components/upload_file.vue'
	export default{
		data(){
			return{
				store_list:[],								//店铺名称
				select_store_list:[],						//选中的店铺名称
				code:'',									//编号
				goods_id:'',								//商品ID
				status_list:[],								//评价状态
				select_status_list:[],						//选中的评价状态
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
				showDialog:true,							//默认弹框不显示
				comment_show_list:[],						//评论图片数组(展示)
				comment_pass_list:[],						//评论图片数组(传递)
				zhui_show_list:[],							//追评图片数组(展示)
				zhui_pass_list:[],							//追评图片数组(传递)
				fan_show_list:[],							//返图图片数组(展示)
				fan_pass_list:[],							//返图图片数组(传递)
				comment_content:"",							//评论内容
				zhui_content:"",							//追评内容
				reason_content:"",							//拒绝理由
				those_orders_list:['彪子','老王'],			//所有的接单人
				those_orders:"",							//选中的接单人

			}
		},
		methods:{
			getList(){

			},
			//上传图片
			callbackFn(v){
				var files = v.files;			//图片数组
				var file_type = v.file_type;	//图片类型（1:评论图片；2:追评图片；3:任务返图）
				if((file_type == '1' && (this.comment_show_list.length + files.length > 5)) || (file_type == '2' && (this.zhui_show_list.length + files.length > 5)) || (file_type == '3' && (this.fan_show_list.length + files.length > 5))){
					this.$message.warning('图片不能超过5张！');
				}else{
					for(var i = 0;i < files.length;i ++){		
						let fr = new FileReader();
						fr.onload = (e) => {
							let show_list_obj = {
								img_url:e.target.result,
								file_type:file_type,
								is_del:false
							}
							if(file_type == '1'){	//1:评论图片
								//预览的图片地址
								this.comment_show_list.push(show_list_obj);
								//传递的图片对象
								this.comment_pass_list.push(files[i]);	
							}else if(file_type == '2'){	//2:追评图片
								//预览的图片地址
								this.zhui_show_list.push(show_list_obj);
								//传递的图片对象
								this.zhui_pass_list.push(files[i]);	
							}else if(file_type == '3'){	//3:任务返图
								//预览的图片地址
								this.fan_show_list.push(show_list_obj);
								//传递的图片对象
								this.fan_pass_list.push(files[i]);	
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
			}
		},
		components:{
			UploadFile
		}
	}
</script>















