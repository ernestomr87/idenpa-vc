import { createAction } from 'redux-actions';
import { SELECT_MODULES, SELECT_MODULES_CHOICES, ADD_LAYERS, DEL_LAYERS } from './constants';

export const selectModules = createAction(SELECT_MODULES);
export const selectModulesChoices = createAction(SELECT_MODULES_CHOICES);
export const addLayers = createAction(ADD_LAYERS);
export const delLayers = createAction(DEL_LAYERS);
