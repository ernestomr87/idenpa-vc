import { createAction } from 'redux-actions';
import { ADD_NODE_REQUEST, ADD_NODE_RESPONSE } from './constants';

export const addNodeRequest = createAction(ADD_NODE_REQUEST);
export const addNodeResponse = createAction(ADD_NODE_RESPONSE);
