'use strict';
const jwt = require('jwt-simple');
const db = uniCloud.database();
exports.main = async (event, context) => {
	const token = event.token;
	// 解码 token，得到 openId
	console.log(token);
	const openId = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	// 验证数据库有无此 openId 用户
	const userInDB = await db.collection('users').where({
		openId: openId
	}).get();
	if (userInDB.data.length !== 1) {
		return {
			status: -1,
			errCode: 'TOKEN_INVALID',
			msg: '查无此人'
		};
	}
	// 解码 token，并且通过验证 exp 时间判断 token 是否过期
	const userInfoDB = userInDB.data[0];
	let userInfoDecode;
	userInfoDecode = jwt.decode(token, userInfoDB.tokenSecret);
	if (userInfoDB.exp > Date.now() && userInfoDecode == openId) {
		return {
			status: 0,
			openId: userInfoDecode,
			msg: 'token 验证成功'
		};
	}
	// 如果时间超过 token 下发时限则判断为失效
	if (userInfoDB.exp < Date.now()) {
		return {
			status: -3,
			errCode: 'TOKEN_EXPIRED',
			msg: 'token 已失效'
		};
	}
};
