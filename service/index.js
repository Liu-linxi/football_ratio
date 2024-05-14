import { BASE_URL, TIMEOUT } from './config.js'

class NetWork {
	baseUrl;
	time_out;

	//是否需要重写获取login true为需要 false为不需要
	isShowLoginModal = false;
	constructor(baseUrl, time_out) {
		this.baseUrl = baseUrl
		this.time_out = time_out ?? 10000
	}

	request(options) {
		uni.showLoading()
		return new Promise((resolve, reject) => {
			uni.request({
				url: options.href || `${this.baseUrl}${options.url}`,
				timeout: options.timeout ?? this.time_out,
				method: options.method ?? 'GET',
				header: options.header ?? {},
				data: options.data ?? {},
				success: async ({ data }) => {
					if (data.code ===1) {
						resolve(data)
					} else if (data.code === 401) {
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
						reject(data.msg)
					} else {
						uni.showToast({
							title: data.msg || '请求错误',
							icon: 'none',
							duration: 2000
						})
						reject(data)
					}
				},
				fail(err) {
					uni.showToast({
						title: '网络错误，换个网络试试',
						icon: 'none',
						duration: 2000
					})
					reject(err)
				},
				complete() {
					uni.hideLoading()
				}
			})
		})
	}

	#transverter(configOrUrl, config) {
		if (typeof configOrUrl === 'string') {
			config = config || {}
			config.url = configOrUrl
		} else {
			config = configOrUrl || {}
		}
		return config
	}

	get(configOrUrl, config) {
		const options = this.#transverter(configOrUrl, config)
		return this.request({ ...options, method: 'GET' })
	}
	post(configOrUrl, config) {
		const options = this.#transverter(configOrUrl, config)
		return this.request({ ...options, method: 'POST' })
	}
	delete(configOrUrl, config) {
		const options = this.#transverter(configOrUrl, config)
		return this.request({ ...options, method: 'DELETE' })
	}
	put(configOrUrl, config) {
		const options = this.#transverter(configOrUrl, config)
		return this.request({ ...options, method: 'PUT' })
	}
	uploadFile(url, config) {
		return new Promise((reslove) => {
			uni.uploadFile({
				url: `${this.baseUrl}${url}`,
				header: {},
				...config,
				success(res) {
					reslove(JSON.parse(res.data))
				},
				fail() {
					showToast('上传失败')
				}
			})
		})
	}
}

export default new NetWork(BASE_URL, TIMEOUT)