import React from 'react';
import { Drawer, message, Divider, Col, Row } from 'antd';
import { MapComponent } from '@terrestris/react-geo';
import styled from 'styled-components';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlInteractionSelect from 'ol/interaction/select';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import modules from './../../data/index';

const MapWrapper = styled(MapComponent)`
	height: 100vh;
`;
const ColWrapper = styled(Col)`
	&.ant-col-12{
		height: 29px;
	}
	
`;
const P = styled.p`
	margin-right: 8px;
	display: inline-block;
	color: rgba(0, 0, 0, 0.85);
	font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;
const DI = styled.div`
	font-size: 14px,
	margin-bottom: 7px,
	color: 'rgba(0,0,0,0.65)'
    font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const layer = new OlLayerTile({
	source: new OlSourceOsm()
});

const pStyle = {
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	display: 'block',
	marginBottom: 16,
	fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
};

const DescriptionItem = ({ title, content }) => {
	return (
		<DI>
			<P>{title}:</P>
			{content}
		</DI>
	);
};

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.Component {
	state = {
		layers: [],
		visible: false,
		properties: null,
		map: new OlMap({
			view: new OlView({
				layers: [ layer ],
				projection: 'EPSG:4326',
				center: [ -80.009, 22.6083 ],
				zoom: 11
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
		let nlayers = this.state.layers;
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
				message.success(`Capa "${diff.name}" cargada.`, 1);
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

	addFeature = () => {
		const { map } = this.state;
		const _this = this;

		const select = new OlInteractionSelect();
		map.addInteraction(select);
		var selectedfeatures = select.getFeatures();
		selectedfeatures.on([ 'add', 'remove' ], function() {
			selectedfeatures.getArray().map(function(feature, index) {
				console.log(feature.getProperties());
				_this.setState({ visible: true, properties: feature.getProperties() });
			});
		});
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { map, properties } = this.state;
		this.addFeature();
		return (
			<div>
				<MapWrapper map={map} />
				<Drawer
					width={500}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p style={{ ...pStyle, marginBottom: 24, textTransform: 'uppercase' }}>
						{properties ? properties.empresa : null}
					</p>
					<Row>
						<ColWrapper span={12}>
							<DescriptionItem title="Radio" content={properties ? properties.radio : null} />{' '}
						</ColWrapper>
						<ColWrapper span={12}>
							<DescriptionItem title="Area" content={properties ? properties.area : null} />
						</ColWrapper>
					</Row>
					<Row>
						<ColWrapper span={12}>
							<DescriptionItem title="Cult_P" content={properties ? properties.cult_p : null} />
						</ColWrapper>
						<ColWrapper span={12}>
							<DescriptionItem title="F_Prod" content={properties ? properties.f_prod : null} />{' '}
						</ColWrapper>
					</Row>
					<Row>
						<ColWrapper span={12}>
							<DescriptionItem title="CX_Pivot" content={properties ? properties.cx_pivot : null} />
						</ColWrapper>
						<ColWrapper span={12}>
							<DescriptionItem title="CY_Pivot" content={properties ? properties.cy_pivot : null} />
						</ColWrapper>
					</Row>
					<Row>
						<ColWrapper span={12}>
							<DescriptionItem title="ID_Maq" content={properties ? properties.id_maq : null} />
						</ColWrapper>
						<ColWrapper span={12}>
							<DescriptionItem title="Nom_Maq" content={properties ? properties.nom_maq : null} />
						</ColWrapper>
					</Row>
					<Row>
						<ColWrapper span={12}>
							<DescriptionItem title="Exist" content={properties ? properties.exist : null} />
						</ColWrapper>
					</Row>
					<Divider />
				</Drawer>
			</div>
		);
	}
}

MapContainer.defaultProps = {
	layers: []
};

export default MapContainer;
