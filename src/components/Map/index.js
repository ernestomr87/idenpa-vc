import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { MapComponent } from '@terrestris/react-geo';
import styled from 'styled-components';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import makeSelectSider from './../../containers/Sider/selectors';
import Modules from './../../data/index';
import modules from './../../data/index';

const MapWrapper = styled(MapComponent)`
	height: 100vh;
`;

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

const MapInstance = new OlMap({
	view: new OlView({
		layers: [ layer ],
		projection: 'EPSG:4326',
		center: [ -80.009, 22.6083 ],
		zoom: 10
	}),
	controls: [],
	layers: [ layer ]
});

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.Component {
	state = {
		layers: [],
		map: new OlMap({
			view: new OlView({
				layers: [ layer ],
				projection: 'EPSG:4326',
				center: [ -80.009, 22.6083 ],
				zoom: 10
			}),
			controls: [],
			layers: []
		})
	};

	componentWillReceiveProps = (nextProps) => {
		const { sider: { layers } } = nextProps;
		let array = [];
		Object.keys(layers).forEach(function(key) {
			layers[key].map((item) => {
				const aux = modules[key].filter((mitem) => {
					if (mitem.name === item) return mitem;
				});
				array.push(aux[0]);
			});
		});

		array.map((item) => {
			let aux = new OlLayerVector({
				source: new OlSourceVector({
					format: new OlFormatGeoJSON(),
					url: item.json
				})
			});
			if (!MapInstance.getLayers().getArray().includes(aux)) {
				MapInstance.addLayer(aux);
			}
		});
	};

	render() {
		const map = MapInstance;
		return <MapWrapper map={map} />;
	}
}

MapContainer.defaultProps = {
	sider: {
		layers: []
	}
};

MapContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider()
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect)(MapContainer);
