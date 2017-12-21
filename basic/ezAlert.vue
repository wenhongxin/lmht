<style lang="less" rel="stylesheet/stylus" scoped>
	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 12;
		display: flex;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
		.probox {
			width: 360px;
			background: #fff;
			border-radius: 10px;
			text-align: center;
			h3 {
				margin-top: 18px;
				font-size: 18px;
				font-family: 'PingFang Bold';
			}
			.probox2_qx {
				margin-top: 22px;
				border-top: 1px solid #b6b6b6;
				a {
					display: inline-block;
					box-sizing: border-box;
					-moz-box-sizing: border-box;
					/* Firefox */
					-webkit-box-sizing: border-box;
					text-align: center;
					color: #007aff;
					font-size: 18px;
					font-weight: bold;
					text-decoration: none;
					height: 43px;
					line-height: 43px;
					font-family: 'PingFang Regular';
				}
			}
		}
	}
</style>
<template>
	<div class="mask" v-show='show'>
		<div class="probox">
			<h3 v-text='title'></h3>
			<p v-text='content'></p>
			<div class="probox2_qx">
				<a href="javascript:;" class="chongshu" @click='defaultAlert' v-text='btn'></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					msg: 'template',
					show: true
				}
			},
			props: {
				title: {
					type: String,
					default: '提示',
					require: true
				},
				content: {
					type: String,
					default: '请输入正确的手机号',
					require: true
				},
				btn: {
					type: String,
					default: '确定',
					require: true
				}
			},
			created() {

			},
			methods: {
				defaultAlert() {
					this.$emit('close')
				}
			}
	}
</script>