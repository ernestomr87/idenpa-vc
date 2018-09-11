import { takeEvery, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import { ADD_NODE_REQUEST } from './constants';
import { addNodeResponse } from './actions';
import { loadNode } from './api';

function* addNode(action) {
	try {
		let nodeUrl = action.payload.nodeUrl;
		const { data } = yield call(loadNode, nodeUrl);
		console.log(data);
		yield put(addNodeResponse(data));
	} catch (error) {
		message.error(error.message);
		yield put(addNodeResponse(error));
	}
}

export default function* watchVisorSaga() {
	yield takeEvery(ADD_NODE_REQUEST, addNode);
}
