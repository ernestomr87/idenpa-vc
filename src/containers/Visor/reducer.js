import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addNodeRequest, addNodeResponse } from './actions';

import { CapabilitiesUtil } from '@terrestris/react-geo';
import OlFormatCapabilities from 'ol/format/wmscapabilities';
import { getLayersFromWmsCapabilties } from './../../data/index';

const loading = handleActions(
	{
		[addNodeRequest]() {
			return true;
		},
		[addNodeResponse]() {
			return false;
		}
	},
	false
);

const nodes = handleActions(
	{
		[addNodeRequest](state) {
			return state;
		},

		[addNodeResponse](state, action) {
			if (!action.error) {
				let wmsCapabilitiesParser = new OlFormatCapabilities();
				let node = {
					title: action.payload.title,
					key: action.payload.title,
					children: getLayersFromWmsCapabilties(wmsCapabilitiesParser.read(action.payload.data))
				};
				return state.concat(node);
			}
			return state;
		}
	},
	[]
);

const error = handleActions(
	{
		[addNodeRequest]() {
			return false;
		},

		[addNodeResponse](state, action) {
			return action.error ? action.payload : false;
		}
	},
	false
);

export default combineReducers({
	nodes,
	loading,
	error
});
