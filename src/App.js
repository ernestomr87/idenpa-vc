import React, { Component } from 'react';
import { MapComponent } from '@terrestris/react-geo';

import 'antd/dist/antd.css';
import './react-geo.css';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

const layer1 = new OlLayerVector({
	source: new OlSourceVector({
		format: new OlFormatGeoJSON(),
		url:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:riego_maquina_pivot&outputFormat=application%2Fjson'
	})
});

const layer = new OlLayerTile({
	source: new OlSourceOsm()
});

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
	view: new OlView({
		projection: 'EPSG:4326',
		center: [ -80.009, 22.6083 ],
		zoom: 10
	}),
	layers: [ layer, layer1 ]
});

class App extends Component {
	render() {
		return (
			<div className="App">
				<MapComponent map={map} />
			</div>
		);
	}
}

export default App;
