import React from 'react';
import { Drawer, message, Table, Card } from 'antd';
import styled from 'styled-components';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlInteractionSelect from 'ol/interaction/select';
import { IrrigationImg, MoneyBagImg, TractorImg, CoastImg, CareImg } from './Icons';
import { MapComponent } from '@terrestris/react-geo';

import OlSourceVector from 'ol/source/vector';
import OlSourceXYS from 'ol/source/xyz';
import OlLayerTile from 'ol/layer/tile';
import OlLayerVector from 'ol/layer/vector';
import OlView from 'ol/view';
import OlMap from 'ol/map';

import OlStroke from 'ol/style/stroke';
import OlFill from 'ol/style/fill';
import OlStyle from 'ol/style/style';
import OlCircle from 'ol/style/circle';

import Tools from './Tools';
import Legend from './Legend';
import EntitiesInv from './EntitiesInv';
import colors from './colors';
import Modules, { getModelByJson } from './../data/index';
import SateliteImg from './satelite.png';
import MapaImg from './mapa.png';

import './../react-geo.css';

const Div = styled.div`height: 100vh;`;

const MapWrapper = styled(MapComponent)`
	height: 100vh;
`;

var osm = new OlLayerTile({
	name: 'tms',
	projection: 'EPSG:4326',
	source: new OlSourceXYS({
		url: 'http://ide.enpa.minag.cu/geoserver/www/tms/2017/osmmapmapnik/{z}/{x}/{-y}.png'
	}),
	type: 'base'
});

var satelite = new OlLayerTile({
	name: 'tms',
	projection: 'EPSG:4326',
	source: new OlSourceXYS({
		url: 'http://ide.enpa.minag.cu/geoserver/www/tms/2017/sat/{z}/{x}/{-y}.jpg'
	}),
	type: 'base'
});

const map = new OlMap({
	view: new OlView({
		projection: 'EPSG:4326',
		center: [ -80.009, 22.6083 ],
		zoom: 7
	}),
	controls: [],
	layers: [ satelite ]
});

const pStyle = {
	fontWeight: 500,
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	display: 'block',
	fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
};

const ImgInversion = styled.img`
	width: 25px;
	height: 25px;
	margin-top: -7px;
	margin-right: 10px;
`;

const TableWrapper = styled(Table)`

	  tr > td {
		padding: 0px 0px !important;
	}
`;
const CardWrapper = styled(Card)`
	&.ant-card{
		position: absolute;
		bottom: 10px;
		right: 8px;
		width: 74px;
		height: 74px;
		padding: 0;
		margin: 0;
		cursor:pointer;
		background-image: ${(props) => (props.map !== 0 ? `url(${SateliteImg})` : `url(${MapaImg})`)};
	}
`;

const listLayerByNode = (node) => {
	let array = [];

	if (node.children) {
		for (let i = 0; i < node.children.length; i++) {
			if (node.children[i].children) {
				for (let j = 0; j < node.children[i].children.length; j++) {
					if (node.children[i].children[j].children) {
						for (let x = 0; x < node.children[i].children[j].children.length; x++) {
							array.push(node.children[i].children[j].children[x]);
						}
					} else {
						array.push(node.children[i].children[j]);
					}
				}
			} else {
				array.push(node.children[i]);
			}
		}
	}
	return array;
};

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.Component {
	state = {
		test: '',
		layers: [],
		model: {},
		module: null,
		visible: false,
		properties: null,
		interaction: null,
		typeMap: 0 //		0->normal map 1->satelite map
	};

	changeState = (feature, model, select) => {
		const { interaction } = this.state;

		if (interaction) {
			interaction.clear();
		}
		this.setState({
			visible: true,
			properties: feature,
			model: model.nomenclature,
			dataLayer: { module: model.data.mod, layer: model.data.layer },
			interaction: select
		});
	};

	componentWillReceiveProps = (nextProps) => {
		const { layers, nodes } = nextProps;

		if (layers !== this.props.layers) {
			let array = [];
			let arrayN = [];
			Object.keys(layers).forEach(function(key) {
				if (Modules[key]) {
					layers[key].map((item) => {
						const aux = Modules[key].filter((mitem) => {
							if (mitem.name === item) return mitem;
						});
						array.push(aux[0]);
					});
				} else {
					layers[key].map((item) => {
						nodes.map((node) => {
							let nodelayers = listLayerByNode(node);
							const aux = nodelayers.filter((mitem) => {
								if (!mitem.children && mitem.key === item) {
									return mitem.layer;
								}
							});
							if (aux[0]) arrayN.push(aux[0]);
						});
					});
				}
			});

			if (array.length + arrayN.length > this.state.layers.length) {
				if (array.length) this.addLayer(array);
				if (arrayN.length) this.addLayerN(arrayN);
			}
			if (array.length + arrayN.length < this.state.layers.length) {
				this.removeLayer(array, arrayN);
			}
		}
		return;
	};

	changeMap = () => {
		let layers = map.getLayers();
		if (layers.getArray().includes(satelite)) {
			layers.insertAt(0, osm);
			map.removeLayer(satelite);
			this.setState({ typeMap: 1 });
		} else if (layers.getArray().includes(osm)) {
			// map.addLayer(layer);
			layers.insertAt(0, satelite);
			map.removeLayer(osm);
			this.setState({ typeMap: 0 });
		}
	};

	addLayer = (array) => {
		let nlayers = this.state.layers;
		let diff;
		for (let j = 0; j < array.length; j++) {
			let exist = false;
			for (let i = 0; i < this.state.layers.length; i++) {
				if (
					!this.state.layers[i].node &&
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

		let color = colors.shift();
		const styleF = new OlStyle({
			fill: new OlFill({
				color: color
			}),
			stroke: new OlStroke({
				color: color
			}),
			width: 4,
			image: new OlCircle({
				radius: 5,
				fill: new OlFill({
					color: color
				}),
				stroke: new OlStroke({
					color: color
				}),
				width: 4
			})
		});
		aux.setStyle(styleF);
		diff['color'] = color;

		if (!map.getLayers().getArray().includes(aux)) {
			nlayers.push({ item: diff, layer: aux, node: false });
			try {
				map.addLayer(aux);
				aux.getSource().on('change', function() {
					message.success(`Capa "${diff.name}" cargada.`, 1);
				});
			} catch (err) {
				console.log(err);
			}
		}
		this.setState({ layers: nlayers });
	};

	addLayerN = (array) => {
		let nlayers = this.state.layers;
		let color = colors.shift();

		array.map((item) => {
			let aux = item.layer;

			if (!map.getLayers().getArray().includes(aux)) {
				nlayers.push({ item: item.key, name: item.title, layer: aux, node: true });
				try {
					map.addLayer(aux);
					aux.getSource().on('change', function() {
						message.success(`Capa "${item.title}" cargada.`, 1);
					});
				} catch (err) {
					console.log(err);
				}
			}
			this.setState({ layers: nlayers });
		});
	};

	removeLayer = (array, arrayN) => {
		let nlayers = [];
		let diff = [];
		if (array.length) {
			this.state.layers.map((lItem) => {
				let exist = array.filter((aItem) => {
					if (aItem.name === lItem.item.name && aItem.json === lItem.item.json) {
						return lItem;
					}
				});
				if (!exist.length) {
					diff.push(lItem);
				} else {
					nlayers.push(lItem);
				}
			});

			diff.map((item) => {
				if (map.getLayers().getArray().includes(item.layer)) {
					map.removeLayer(item.layer);
					colors.push(item.color);
				}
			});
		} else {
			diff = this.state.layers.filter((lItem) => {
				if (lItem.node) {
					nlayers.push(lItem);
				} else {
					return lItem;
				}
			});
			diff.map((item) => {
				if (map.getLayers().getArray().includes(item.layer)) {
					map.removeLayer(item.layer);
					colors.push(item.color);
				}
			});
		}

		this.setState({ layers: nlayers });
	};

	removeLayerN = (array) => {
		let nlayers = [];
		let diff = [];

		if (array.length) {
			for (let j = 0; j < this.state.layers.length; j++) {
				let exist = false;
				for (let i = 0; i < array.length; i++) {
					if (this.state.layers[j].node) {
						if (array[i].key === this.state.layers[j].item) {
							exist = true;
							break;
						}
					}
				}
				if (!exist && this.state.layers[j].node) {
					diff.push(this.state.layers[j]);
				} else {
					nlayers.push(this.state.layers[j]);
				}

				diff.map((item) => {
					if (map.getLayers().getArray().includes(item.layer)) {
						map.removeLayer(item.layer);
						colors.push(item.color);
					}
				});
			}
		} else {
			let rem = this.state.layers.filter((item) => {
				if (item.node) return item;
			});

			rem.map((item) => {
				if (map.getLayers().getArray().includes(item.layer)) {
					map.removeLayer(item.layer);
				}
			});
		}

		this.setState({ layers: nlayers });
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		const { interaction } = this.state;
		interaction.clear();
		this.setState({
			visible: false,
			interaction: null
		});
	};

	renderDataView = () => {
		const { model, properties, dataLayer } = this.state;

		const dataSource = [];
		const columns = [
			{
				dataIndex: 'key',
				key: 'key',
				render: (text) => {
					return <span style={{ color: 'rgb(19, 116, 205)' }}>{text}</span>;
				}
			},
			{
				dataIndex: 'value',
				key: 'value'
			}
		];
		Object.keys(model).forEach(function(key, index) {
			if (properties[key]) {
				dataSource.push({ key: model[key], value: properties[key] });
			}
		});
		if (dataSource.length > 1) {
			return (
				<div>
					<p style={{ ...pStyle, marginBottom: 24 }}>
						{/* Muestro el Icono del modulo al que pertenece la Feature seleccionada */}
						{dataLayer.module === 'irrigation' ? <ImgInversion src={IrrigationImg} alt="" /> : null}
						{dataLayer.module === 'investments' ? <ImgInversion src={MoneyBagImg} alt="" /> : null}
						{dataLayer.module === 'machinery' ? <ImgInversion src={TractorImg} alt="" /> : null}
						{dataLayer.module === 'northCoast' ? <ImgInversion src={CoastImg} alt="" /> : null}
						{dataLayer.module === 'lifeTask' ? <ImgInversion src={CareImg} alt="" /> : null}

						{dataLayer.layer}
					</p>
					<TableWrapper pagination={false} showHeader={false} dataSource={dataSource} columns={columns} />
					{dataLayer && dataLayer.layer === 'Entidades Inversionistas' ? (
						<EntitiesInv model={model} properties={properties} dataLayer={dataLayer} />
					) : null}
				</div>
			);
		}
	};

	render() {
		const _this = this;
		const select = new OlInteractionSelect();
		map.addInteraction(select);
		const selectedfeatures = select.getFeatures();

		selectedfeatures.on([ 'add', 'remove' ], (evt) => {
			selectedfeatures.getArray().map((feature) => {
				let selectedLayer = select.getLayer(feature);
				if (selectedLayer && selectedLayer.getSource().url_) {
					const model = getModelByJson(selectedLayer.getSource().url_);
					_this.changeState(feature.getProperties(), model, selectedfeatures);
				}
			});
		});

		return (
			<Div>
				<MapWrapper map={map} />
				<Tools map={map} drawer={this.props.drawer.toString()} />
				<Legend layers={this.state.layers} drawer={this.props.drawer} />
				<CardWrapper
					map={this.state.typeMap}
					onClick={this.changeMap}
					style={{ boxShadow: '0 2px 8px #f0f1f2' }}
				/>
				<Drawer
					width={400}
					placement="right"
					closable={true}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					{this.renderDataView()}
				</Drawer>
			</Div>
		);
	}
}

MapContainer.defaultProps = {
	layers: [],
	nodes: [],
	drawer: false
};

export default MapContainer;
