import { takeEvery, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import { ADD_NODE_REQUEST } from './constants';
import { addNodeResponse } from './actions';
import { loadNode } from './api';

function* addNode(action) {
	let nodeUrl = action.payload.nodeUrl;
	let title = action.payload.title;
	const hide = message.loading(`Adicionando nodo "${title}"`, 0);

	try {
		const { data } = yield call(loadNode, nodeUrl);
		yield put(addNodeResponse({ data, title }));
		setTimeout(hide, 0);
	} catch (error) {
		setTimeout(hide, 0);
		message.error(error.message);
		yield put(addNodeResponse(error));
	}
}

export default function* watchVisorSaga() {
	yield takeEvery(ADD_NODE_REQUEST, addNode);
}
