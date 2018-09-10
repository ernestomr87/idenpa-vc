import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addNodeAction, removeNodeAction } from './actions';

const nodes = handleActions(
	{
		[addNodeAction](state, action) {
			let aux = {};
			aux[action.payload.item] = action.payload.checkedKeys;
			return Object.assign({}, state, aux);
		},
		[removeNodeAction](state, action) {
			return action.error ? state : state.concat(action.payload);
		}
	},
	[]
);

export default combineReducers({
	nodes
});
