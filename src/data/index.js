import irrigation from "./irrigation";
import investments from "./investments";
import machinery from "./machinery";
import northCoast from "./northCoast";
import lifeTask from "./lifeTask";

import * as nomenclature from "./nomenclature";
import nodes, { node_services, getLayersFromWmsCapabilties } from "./nodes";

const Modules = { irrigation, investments, machinery, northCoast, lifeTask };

const getModelByJson = json => {
  let model = null;
  let mod = null;
  let layer = null;
  Object.keys(Modules).forEach(function(key) {
    const select = Modules[key].filter(mitem => {
      return mitem.json === json ? mitem : null;
    });
    if (select.length) {
      model = select[0].nomenclature;
      layer = select[0].name;
      mod = key;
    }
  });
  if (model === null) {
    return { nomenclature: null, data: { mod, layer } };
  }

  return { nomenclature: nomenclature[model], data: { mod, layer } };
};

export default Modules;
export { getModelByJson, nodes, node_services, getLayersFromWmsCapabilties };
