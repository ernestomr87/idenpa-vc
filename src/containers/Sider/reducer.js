import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { selectModules } from './actions';

const item = handleActions(
	{
		[selectModules](state, action) {
			return action.error ? state : action.payload;
		}
	},
	'irrigation'
);

export default combineReducers({
	item
});
