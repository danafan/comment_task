<template>
	<div>
		<div class="imgBox">
			<img class="upload_icon" src="../static/upload_icon.png">
			<div class="upload_text">点击上传{{is_video?'视频':'图片'}}</div>
			<!-- 上传视频 -->
			<input v-if="is_video" type="file" ref="imgUpload" class="upload_file" accept="video/*" capture="camcorder" @change="uploadFn">
			<!-- 上传图片 -->
			<input v-else type="file" ref="imgUpload" class="upload_file" accept="image/*" :multiple="is_multiple" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.imgBox{
	border:1px solid #D9D9D9;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items:center;
	width: 120px;
	height: 120px;
	color: #666666;
	.upload_icon{
		width: 40px;
		height: 40px;
	}
	.upload_text{
		font-size: 12px;
	}
	.upload_file {
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
</style>
<script>
	export default{
		props:{
			is_multiple:{
				type:Boolean,
				default:true
			},
			file_type:{
				type:String,
				default:''
			},
			is_video:{
				type:Boolean,
				default:false
			},
		},
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					let files = this.$refs.imgUpload.files
					let callRes = {
						files:files,
						file_type:this.file_type
					}
					this.$emit('callbackFn',callRes);
				}
			}

		}


	}
</script>