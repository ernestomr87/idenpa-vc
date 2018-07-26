/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { MapComponent, CapabilitiesUtil } from '@terrestris/react-geo';
import styled from 'styled-components';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const OlProj = require('ol/proj').default;

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

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
	view: new OlView({
		projection: 'EPSG:4326',
		center: [ -80.009, 22.6083 ],
		zoom: 10
	}),
	controls: [],
	layers: [ layer, layer1 ]
});
const WMS_CAPABILITIES_URL =
	'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=wms&version=1.3.0&request=GetCapabilities';
/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
	state = {
		layers: []
	};

	onClick() {
		CapabilitiesUtil.parseWmsCapabilities(WMS_CAPABILITIES_URL)
			.then((layers) => {
				console.log(layers);
				this.setState({
					layers: layers
				});
			})
			.catch(() => alert('Could not parse capabilities document.'));
	}
	render() {
		return <MapWrapper map={map} />;
	}
}

Header.propTypes = {};

export default Header;
