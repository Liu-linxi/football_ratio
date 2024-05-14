<template>
	<view class="p-2">
		<view class="avatar mt-1">
			<view class="left d-flex a-center w-100">
				<image :src="userInfo.avatar" class="head" mode=""></image>
				<view class="">
					<view class="font34 font-weight">
						{{userInfo.username||"XXX"}}
					</view>
					<view class="mt-1 gray-color">
						手机号：{{userInfo.mobile||"XXXXXXX"}}
					</view>
				</view>
			</view>
		</view>
		<view class="mt-2">
			<TXm-vipCard :content="userInfo.isvip==0?'解锁VIP享受 超值权益':`VIP到期时间${userInfo.vipendtime}`" @click="openVip" :showBtn="userInfo.isvip"></TXm-vipCard>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				try {
					const value = uni.getStorageSync('setUserData');
					if (value) {
						this.userInfo = value.userInfo
					}
				} catch (e) {
					// error
				}
			},
			openVip(){
				uni.showToast({
					title:"开通vip"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx;

		.left {
			.head {
				width: 114rpx;
				height: 114rpx;
				// background: #D81828;
				border-radius: 50%;
				box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.5);
				margin-right: 26rpx;
			}

		}

	}
</style>