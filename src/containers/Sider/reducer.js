import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { selectModules, addLayers, delLayers } from './actions';

const item = handleActions(
	{
		[selectModules](state, action) {
			return action.error ? state : action.payload;
		}
	},
	'irrigation'
);

const layers = handleActions(
	{
		[addLayers](state, action) {
			let aux = {};
			aux[action.payload.item] = action.payload.checkedKeys;
			return Object.assign({}, state, aux);
		},
		[delLayers](state, action) {
			return action.error ? state : state.concat(action.payload);
		}
	},
	[]
);

export default combineReducers({
	item,
	layers
});
