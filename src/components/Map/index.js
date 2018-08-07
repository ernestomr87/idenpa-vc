import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { message, Button } from 'antd';
import { MapComponent } from '@terrestris/react-geo';
import styled from 'styled-components';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import modules from './../../data/index';

const MapWrapper = styled(MapComponent)`
	height: 100vh;
`;

const layer = new OlLayerTile({
	source: new OlSourceOsm()
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
			layers: [ layer ]
		})
	};

	componentWillReceiveProps = (nextProps) => {
		const { layers } = nextProps;

		if (layers !== this.props.layers) {
			let array = [];
			Object.keys(layers).forEach(function(key) {
				layers[key].map((item) => {
					const aux = modules[key].filter((mitem) => {
						if (mitem.name === item) return mitem;
					});
					array.push(aux[0]);
				});
			});

			if (array.length > this.state.layers.length) {
				this.addLayer(array);
			}
			if (array.length < this.state.layers.length) {
				this.removeLayer(array);
			}
		}
	};

	addLayer = (array) => {
		let nlayers =this.state.layers;
		let diff;
		for (let j = 0; j < array.length; j++) {
			let exist = false;
			for (let i = 0; i < this.state.layers.length; i++) {
				if (
					array[j].name === this.state.layers[i].item.name &&
					array[j].json === this.state.layers[i].item.json
				) {
					exist = true;
					break;
				}
			}
			if (!exist) {
				diff = array[j];
				break;
			}
		}

		let aux = new OlLayerVector({
			source: new OlSourceVector({
				format: new OlFormatGeoJSON(),
				url: diff.json
			})
		});

		if (!this.state.map.getLayers().getArray().includes(aux)) {
			nlayers.push({ item: diff, layer: aux });
			this.state.map.addLayer(aux);

			aux.getSource().on('change', function() {
				message.success(`Capa "${diff.name}" cargada.`);
			});
		}
		this.setState({ layers: nlayers });
	};

	removeLayer = (array) => {
		let nlayers = [];
		let diff;
		for (let j = 0; j < this.state.layers.length; j++) {
			let exist = false;
			for (let i = 0; i < array.length; i++) {
				if (
					array[i].name === this.state.layers[j].item.name &&
					array[i].json === this.state.layers[j].item.json
				) {
					exist = true;
					break;
				}
			}
			if (!exist) {
				diff = this.state.layers[j];
			} else {
				nlayers.push(this.state.layers[j]);
			}
		}

		if (this.state.map.getLayers().getArray().includes(diff.layer)) {
			this.state.map.removeLayer(diff.layer);
		}

		this.setState({ layers: nlayers });
	};

	render() {
		const { map } = this.state;
		return <MapWrapper map={map} />;
	}
}

MapContainer.defaultProps = {
	layers: []
};

export default MapContainer;
