import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { addNodeRequest, addNodeResponse, showActionData } from "./actions";

import OlFormatCapabilities from "ol/format/wmscapabilities";
import { getLayersFromWmsCapabilties } from "./../../data/index";

const quitSpacesOfAstring = str => {
  let cadena = "";
  let arrayString = str.split(" ");
  for (var i = 0; i < arrayString.length; i++) {
    if (arrayString[i] !== "") {
      cadena += arrayString[i];
    }
  }
  return cadena;
};

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
          key: quitSpacesOfAstring(action.payload.title),
          children: getLayersFromWmsCapabilties(
            wmsCapabilitiesParser.read(action.payload.data)
          )
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

const interaction = handleActions(
  {
    [showActionData](state, action) {
      //console.log(action.payload);
      return action.payload;
    }
  },
  false
);

export default combineReducers({
  nodes,
  loading,
  error,
  interaction
});
