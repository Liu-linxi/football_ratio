<template>
	<view class="home">
		<view class="d-flex a-center top text-center">
			<view class="gray-color flex-1" :class="{active:index===orderby}" v-for="(li,index) in orderbyArray" :key="li" @click="changeData(index)">
				{{li}}
			</view>
			<view @click="tonewList" class=" main-color flex-1" style="text-decoration: underline;">
				查看更多
			</view>
		</view>

		<view class="item" v-for="(item,index) in initList" :key="item.symbol">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					{{item.lname}}
				</view>
				<view class="main-color pr-4 overflow-hidden">
					{{item.lirun}}%
				</view>
			</view>
			<view class="gird text-center">
				<view class="d-flex a-center text-left">
					<uni-icons type="notification" size="16" color="#bcb5b5"></uni-icons>
					<text class="gray-color ml-2">{{parseTime(item.starttime,"{m}/{d} {h}:{i}")}}</text>
				</view>
				<view class="gray-color">
					盘口
				</view>
				<view class="gray-color">
					{{item.name}}
				</view>
				<view class="gray-color">
					利润率
				</view>
			</view>
			<view class="gird text-center">
				<view class="d-flex a-center">
					{{item.hname}}
				</view>
				<view class="">
					{{item.htype}}
				</view>
				<view class=" graybg">
					<view class="font gray-color">
						{{item.hpankou||"paname暂无"}}
					</view>
					<view class="line-h-sm">
						{{item.h||"未知"}}
					</view>
				</view>
				<view class="overflow-hidden">
					{{item.lirun}}%
				</view>
			</view>
			<view class="gird text-center">
				<view class="d-flex a-center ">
					{{item.cname}}
				</view>
				<view class="">
					{{item.ctype}}
				</view>
				<view class=" graybg">
					<view class="font gray-color">
						{{item.cpankou||"paname暂无"}}
					</view>
					<view class="line-h-sm">
						{{item.c||"未知"}}
					</view>
				</view>
				<view @click="shoPop(item)" class=" main-color" style="text-decoration: underline;">
					投注方
				</view>
			</view>

		</view>
		<view class="text-center gray-color pb-3">
			没有更多数据了 ~
		</view>

		<uni-popup ref="popup" type="center" border-radius="5px" background-color="#FFF">
			<view class="popoConten">
				<view class="text-right" @click="$refs.popup.close()">
					<uni-icons type="closeempty" size="22" color="#bcb5b5"></uni-icons>
				</view>
				<view class="font-md font-weight text-center line-h-lg mt--3">
					{{clickObj.hname}} VS {{clickObj.cname}}
				</view>
				<view class="gray-color text-center line-h-lg">
					周{{parseTime(clickObj.starttime,"{a}")}}{{clickObj.lname}} [{{clickObj.starttime_text}}]
				</view>
				<view class="text-center border-bottom">
					{{clickObj.name}}
				</view>
				<view class="grid3 text-center">
					<view class=""></view>
					<view class="">
						{{clickObj.htype}}
					</view>
					<view class="">
						{{clickObj.ctype}}
					</view>
				</view>
				<view class="grid3 text-center">
					<view class="border-right">
						赔率
					</view>
					<view class="border-right">
						{{clickObj.h}}
					</view>
					<view class="">
						{{clickObj.c}}
					</view>
				</view>
				<view class="grid3 text-center">
					<view class="border-right">
						下注额
					</view>
					<view class="border-right">
						10000.000
					</view>
					<view class="">

						{{data1}}
					</view>
				</view>
				<view class="grid2 text-center">
					<view class="border-right">
						总下注
					</view>
					<view class="">
						{{data2}}
					</view>
				</view>
				<view class="grid2 text-center">
					<view class="border-right">
						利润
					</view>
					<view class="">
						{{data3}}
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import { match } from '@/service/base.js';
	import { parseTime } from '@/utils/time.js';
	import { mergeObjArrays, insertionSort } from '@/utils/index.js'
	import ws from '@/service/websocket.js';


	export default {
		data() {
			return {
				orderbyArray: ["时间", "利率"],
				parseTime,
				userInfo: {},
				initList: [],
				page: 1,
				total: 0,
				clickObj: {},
				orderby: 0, //1时间排序 2=按利材序
			}
		},
		async onPullDownRefresh() {

			this.page = 1;
			this.total = 0;
			this.initList = []
			await this.initData()
			uni.stopPullDownRefresh();
		},
		onLoad() {
			this.getUserInfo()
			this.initData()
			// 模拟获取得到数据进行展示修改
			// setTimeout(() => {
			// 	// 生成1到3之间的随机整数
			// 	const randomNumber = Math.floor(Math.random() * 3) + 1;
			// 	const newData = { id: randomNumber, name: "林夕1", pres1: "1.2%", pres2: "1.4%", isBig: true }
			// 	let findIndexItem = this.initList.findIndex(item => item.id === newData.id);
			// 	uni.showToast({
			// 		title: "数据更新" + findIndexItem
			// 	})
			// 	this.$set(this.initList, findIndexItem, newData);
			// }, 3000)
		},
		computed: {
			data1() {
				const { h, c } = this.clickObj
				return (10000.000 * parseFloat(h) / parseFloat(c)).toFixed(3)
			},
			data2() {
				return (10000.000 + parseFloat(this.data1)).toFixed(3)
			},
			data3() {
				const { h } = this.clickObj
				return (10000.000 * parseFloat(h) - parseFloat(this.data2)).toFixed(3)
			},
		},
		onReachBottom() {
			if (this.initList.length >= this.total) return
			this.initData()
		},
		methods: {

			async initData() {
				const { data } = await match({ page: this.page, orderby: this.orderby == 0 ? 1 : 2 }, { token: this.userInfo.token });
				this.page++;
				this.total = data.total;
				this.initList = mergeObjArrays(this.initList, data.data, 'symbol')
			},
			changeData(index) {
				this.orderby = index;
				this.initList = [];
				this.page = 1;
				this.total = 0;
				this.initData()
				this.getWSData()
			},

			// 弹出层
			shoPop(item) {
				this.clickObj = item;
				this.$refs.popup.open()
			},
			wsData(data) {
				// this.initList.unshift(...data)
				let newArray = mergeObjArrays(this.initList, data, 'symbol')
				if (this.orderby == 0) {
					newArray = insertionSort(newArray, "starttime");
				} else {
					newArray = insertionSort(newArray, "lirun", "大");
				}
				this.initList = newArray;
			},
			tonewList() {
				uni.navigateTo({
					url: "/pages/newList/newList"
				})
			},
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
			getWSData() {
				ws.connect().then((res) => {
						ws.onMessage((data) => {
							if (data?.data) {
								this.wsData(data.data);
							} else {
								// console.log(data);
							}
						});
						setTimeout(() => {
							ws.send({
								uid: this.userInfo.id,
								type: 'login',
								datatype: 1
							})
						}, 2000)
					})
					.catch((error) => {
						console.error('WebSocket connection error:', error);
					});
			}
		},
		onUnload() {
			ws.send({
				uid: this.userInfo.id,
				type: 'logout',
				datatype: 1
			})
		},
		onShow() {
			// 本地测试把这里放开只有会员才可以查看首页并且进行web链接推送
			/* ws.connect().then(() => {
					console.log('WebSocket connected');
					ws.onMessage((data) => {
						if (data.data) this.wsData(data.data);
					});
				})
				.catch((error) => {
					console.error('WebSocket connection error:', error);
				});
			return */
			if (Object.keys(this.userInfo).length) {
				if (this.userInfo.isvip != 1) {
					uni.showModal({
						content: "您还不是VIP，请先开通",
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url: "/pages/user/user"
								})
							}
						}
					})
				} else {
					this.getWSData()
				}
			} else {
				uni.showModal({
					content: "您还未登录，请先登录",
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}
					}
				})
			}


		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f0f3f6;
	}

	.top {
		position: fixed;
		top: 80rpx;
		left: 0;
		right: 0;
		background-color: #fff;
		height: 100rpx;

		.active {
			color: #D81828;
		}
	}

	.home {
		padding: 100rpx 0 100rpx;

		.item {
			background-color: #fff;
			border-radius: 15rpx;
			margin: 10rpx 20rpx 20rpx;
			padding: 20rpx;

			.gird {
				display: grid;
				grid-template-columns: 2fr repeat(3, 1fr);
				grid-gap: 20rpx;
				align-items: center;
				margin-top: 20rpx;

				.graybg {
					background-color: #f7f7f7;
				}
			}
		}

		.popoConten {
			padding: 30rpx 30rpx 60rpx;

			.grid3 {
				line-height: 2;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				align-items: center;
				border-bottom: 1rpx solid #dee2e6;
			}

			.grid2 {
				line-height: 2;
				display: grid;
				grid-template-columns: 1fr 2fr;
				align-items: center;
				border-bottom: 1rpx solid #dee2e6;
			}
		}

	}
</style>