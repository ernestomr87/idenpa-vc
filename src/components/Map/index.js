/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { MapComponent } from '@terrestris/react-geo';
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

const MapWrapper = styled(MapComponent)`
	height: 100%;
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
	layers: [ layer ]
});

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
	render() {
		return <MapWrapper map={map} />;
	}
}

Header.propTypes = {};

export default Header;
