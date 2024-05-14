import request from './index.js'

export function login(data) {
	return request.post('/user/login', { data })
}


export function match(data,header) {
	return request.post('/match/index', { data, header })
}