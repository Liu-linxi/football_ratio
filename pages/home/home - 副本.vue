<template>
	<view class="main">
		<view v-for="(li,index) in 4" class="border-top p-1 item" :key="index">
			<view class="grid">
				<view class="d-flex flex-column j-sb">
					<view class="line-h-sm">
						<view class="gray-color">
							日012
						</view>
						<view class="tags red">
							英超
						</view>
						<view class="gray-color">
							21：00
						</view>
					</view>
					<view class="main-color">
						1.20
					</view>
				</view>
				<view class="" style="margin-left: 50rpx;">
					<view class="grid3">
						<view class="">
							<text class="gray-color">[5]</text>
							热刺
						</view>
						<view class="">
							VS
						</view>
						<view class="">
							阿森纳 <text class="gray-color">[1]</text>
						</view>
					</view>
					<view class="grid3 mt-1 position-relative">
						<view class="border rounded-sm py-1">
							胜<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="border rounded-sm py-1">
							平<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="border rounded-sm py-1">
							负<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="position-absolute border">
							0
						</view>
					</view>
					<view class="grid3 position-relative mt-1">
						<view class="border rounded-sm py-1">
							胜<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="border rounded-sm py-1">
							平<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="border rounded-sm py-1">
							负<text class="gray-color ml-2">4.00</text>
						</view>
						<view class="position-absolute border " :class="li==1?'green-color':'main-color'">
							+1
						</view>
					</view>
				</view>
				<view class="d-flex j-sb flex-column">
					<view class="text-right pr-2">
						<uni-icons type="right" size="14" color="#51a4f0"></uni-icons>
					</view>
					<view class="ml-2 mb-2 panel border">
						更多
						<view>玩法</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.main{
	background: #fafafa;
	font-size: 20rpx;
	.item{
		padding: 18rpx 40rpx;
		
		.grid{
			display: grid;
			grid-template-columns: 1fr 4fr 1fr;
			text-align: center;
			min-height: 160rpx;
			.tags{
				padding: 6rpx 8rpx;
				color: #fff;
				border-radius: 8rpx;
			}
			.grid3{
				display: grid;
				grid-template-columns: repeat(3,1fr);
				grid-gap: 10rpx;
			}
		}
	}
	.position-absolute{
		left: -50rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		text-align: center;
		top: 50%;
		transform: translate(0,-50%);
	}
	.rounded-sm{
		background-color: #fff;
	}
	.panel{
		padding: 10rpx 0;
		border-radius: 10rpx;
		color: #a4d1ff;
	}
	.red{
		background-color: rgba(216,24,40,1);
	}
}
</style>
