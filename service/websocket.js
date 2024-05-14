import { WEBSOCKET_URL } from './config.js'

class WebSocketClient {
	constructor(url) {
		this.url = url;
		this.ws = null;
	}

	connect() {
		if (this.ws) this.ws.close()
		return new Promise((resolve, reject) => {
			this.ws = uni.connectSocket({
				url: this.url,
				success: resolve,
				fail: reject
			});
		});
	}

	onOpen(callback) {
		this.ws.onOpen(callback);
	}

	onClose(callback) {
		this.ws.onClose(callback);
	}

	onError(callback) {
		this.ws.onError(callback);
	}

	onMessage(callback) {
		this.ws.onMessage((res) => {
			if (typeof res.data === 'string') {
				try {
					callback(JSON.parse(res.data));
				} catch (e) {
					callback(res.data);
				}
			} else {
				// Handle binary data
			}
		});
	}

	send(data) {
		if (this.ws && this.ws.readyState === 1) {
			this.ws.send({
				data: JSON.stringify(data),
			});
		} else {
			console.error('WebSocket is not open.');
		}
	}

	close() {
		if (this.ws.readyState === 1 || this.ws.readyState === 0) {
			this.ws.close();
		}
	}
}

export default new WebSocketClient(WEBSOCKET_URL)