<template>
	<view class="car">
		<view class="title">{{title || 'VIP'}}</view>
		<view class="content">{{content}}</view>
		<view class="bottom">
			<view class="text" v-if="showBtn==0">
				{{text || '￥299/月 每月立省￥1700'}}
			</view>
			<view class="but" @click="butclick" v-if="showBtn==0">
				{{but || '开通VIP'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: "",
			content: "",
			text: "",
			but: "",
			name: "",
			showBtn: 0
		},
		name: "vipcard",
		data() {
			return {

			}
		},
		methods: {
			butclick() {
				this.$emit('click', name)
			}
		}
	}
</script>

<style lang="scss">
	.car {

		height: 300rpx;
		margin: 0 auto;
		// background-color: #2C2C2E;
		// background-color: #f1cca8;
		// background: linear-gradient(170deg, #f1cca8FF 60%, #f1cca800 100%);
		background-image: radial-gradient(#f1cca855, #f1cca8FF);
		padding: 50rpx 30rpx;
		color: rgba(216, 24, 40, 1);
		border-radius: 16px;
		position: relative;

		.title {
			font-size: 50rpx;
			font-weight: 800;
			transform: skew(-15deg, 0);


			// background-image: -webkit-linear-gradient(top, #f1cca8FF, #E08A45, #de6912);
			background-image: -webkit-linear-gradient(top, rgba(216, 24, 40, 0.2), rgba(216, 24, 40, 0.5), rgba(216, 24, 40, 1));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;

			transform-origin: bottom right;

		}

		.bottom {
			position: relative;
			display: flex;
			top: 50rpx;
			justify-content: space-between;

			.text {
				line-height: 60rpx;
			}

			.but {
				background: rgba(216, 24, 40, 1);
				color: #fff;
				padding: 10rpx 30rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>