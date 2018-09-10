import { createAction } from 'redux-actions';
import { ADD_NODE, REMOVE_NODE } from './constants';

export const addNodeAction = createAction(ADD_NODE);
export const removeNodeAction = createAction(REMOVE_NODE);
