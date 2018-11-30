import { createAction } from "redux-actions";
import {
  ADD_NODE_REQUEST,
  ADD_NODE_RESPONSE,
  SHOW_ACTION_DATA
} from "./constants";

export const addNodeRequest = createAction(ADD_NODE_REQUEST);
export const addNodeResponse = createAction(ADD_NODE_RESPONSE);

export const showActionData = createAction(SHOW_ACTION_DATA);
