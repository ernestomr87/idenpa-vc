import OlImageWms from 'ol/source/imagewms';
import OlLayerImage from 'ol/layer/image';

const quitSpacesOfAstring = (str) => {
	let cadena = '';
	let arrayString = str.split(' ');
	for (var i = 0; i < arrayString.length; i++) {
		if (arrayString[i] !== '') {
			cadena += arrayString[i];
		}
	}
	return cadena;
};

const node_services = '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';

const nodes = [
	{
		name: 'IDEPA Nacional',
		url: 'http://ide.enpa.minag:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Isla de la Juventud',
		url: 'http://geoservicios.enpa.iju.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Pinar del Rio',
		url: 'https://idepri.enpa.minag.cu/geoserver/cuba/wms'
		
	},
	{
		name: 'IDEPA UEB Habana',
		url: 'http://enpa.hab.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Matanzas',
		url: 'http://geoservicios.enpa.mtz.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Villa Clara',
		url: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Cienfuegos',
		url: 'http://geoservicios.enpa.cfg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Sancti Spíritus',
		url: 'http://geoservicios.enpa.ssp.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Ciego de Ávila',
		url: 'http://geoservicios.enpa.cav.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Camagüey',
		url: 'http://geoservicios.enpa.cmg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Las Tunas',
		url: 'http://geoservicios.enpa.ltu.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Holgüin',
		url: 'http://geoservicios.enpa.hlg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Granma',
		url: 'http://geoservicios.enpa.grm.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Santiago de Cuba',
		url: 'http://geoservicios.enpa.scu.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Guantánamo',
		url: 'http://geoservicios.enpa.gtm.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA Mi server',
		url: 'http://localhost:8080/geoserver/cite/wms?'
	}
];

const buildTree = (layer, data) => {
	if (!layer.Layer) {
		let aux = {
			title: layer.Title,
			key: quitSpacesOfAstring(layer.Title),
			layer: new OlLayerImage({
				title: layer.Title,
				opacity: 1,
				name: layer.name,
				abstract: layer.Abstract,
				getFeatureInfoUrl: data.getFeatureInfoUrl,
				getFeatureInfoFormats: data.wmsGetFeatureInfoConfig.Format,
				queryable: layer.queryable,
				source: new OlImageWms({
					url: data.getMapUrl,
					attributions: data.wmsAttribution,
					params: {
						LAYERS: layer.Name,
						VERSION: data.wmsVersion
					}
				})
			})
		};
		return aux;
	} else {
		let aux = {
			title: layer.Title,
			key: quitSpacesOfAstring(layer.Title),
			children: layer.Layer.map((item) => {
				return buildTree(item, data);
			})
		};
		return aux;
	}
};

const getLayersFromWmsCapabilties = (capabilities) => {
	let nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Name';
	let wmsVersion = capabilities.version;
	let wmsAttribution = capabilities.Service.AccessConstraints;
	let layersInCapabilities = capabilities.Capability.Layer.Layer;
	let wmsGetMapConfig = capabilities.Capability.Request.GetMap;
	let wmsGetFeatureInfoConfig = capabilities.Capability.Request.GetFeatureInfo;
	let getMapUrl = wmsGetMapConfig.DCPType[0].HTTP.Get.OnlineResource;
	let getFeatureInfoUrl = wmsGetFeatureInfoConfig.DCPType[0].HTTP.Get.OnlineResource;

	let data = {
		nameField,
		wmsVersion,
		wmsAttribution,
		layersInCapabilities,
		wmsGetMapConfig,
		wmsGetFeatureInfoConfig,
		getMapUrl,
		getFeatureInfoUrl
	};

	const layers = layersInCapabilities.map(function(layerObj) {
		return buildTree(layerObj, data);
	});
	return layers;
};

export default nodes;
export { node_services, buildTree, getLayersFromWmsCapabilties };
